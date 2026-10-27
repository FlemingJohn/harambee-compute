import type { HelperOptions } from '../types/HelperOptions.ts'
import type { PoolSession } from '../types/PoolSession.ts'
import { joinPool } from './joinPool.ts'

const checkEveryMs = 30000
const missedChecksBeforeRejoin = 2

export async function stayInPool(options: HelperOptions, rpcUrl: string, walletAddress: string): Promise<() => Promise<void>> {
  let session: PoolSession = await joinPool(options, rpcUrl, walletAddress)
  let missedChecks = 0
  const timer = setInterval(async () => {
    missedChecks = session.hasCoordinator() ? 0 : missedChecks + 1
    if (missedChecks < missedChecksBeforeRejoin) return
    missedChecks = 0
    console.log('No coordinator for a while. Joining the pool again.')
    await session.leave()
    session = await joinPool(options, rpcUrl, walletAddress)
  }, checkEveryMs)
  return async () => {
    clearInterval(timer)
    await session.leave()
  }
}
