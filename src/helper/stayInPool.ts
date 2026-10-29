import type { HelperOptions } from '../types/HelperOptions.ts'
import type { PoolSession } from '../types/PoolSession.ts'
import { joinPool } from './joinPool.ts'

const checkEveryMs = 30000
const missedChecksBeforeRejoin = 2

export async function stayInPool(options: HelperOptions, rpcUrl: string, walletAddress: string): Promise<() => Promise<void>> {
  let session: PoolSession = await joinPool(options, rpcUrl, walletAddress)
  let missedChecks = 0
  let isRejoining = false
  const timer = setInterval(async () => {
    missedChecks = session.hasCoordinator() ? 0 : missedChecks + 1
    if (missedChecks < missedChecksBeforeRejoin || isRejoining) return
    missedChecks = 0
    isRejoining = true
    console.log(`No coordinator for a while. Joining the pool again. Check that this laptop is on the same network as ${options.invite.bootstrapAddress}.`)
    try {
      await session.leave()
      session = await joinPool(options, rpcUrl, walletAddress)
    } catch (error) {
      console.log(`Could not join again yet: ${(error as Error).message}. Trying again in a minute.`)
    } finally {
      isRejoining = false
    }
  }, checkEveryMs)
  return async () => {
    clearInterval(timer)
    await session.leave()
  }
}
