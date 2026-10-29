import { withTimeout } from '../lib/withTimeout.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import { openWalletOnce } from './openWalletOnce.ts'
import { readWalletOnce } from './readWalletOnce.ts'

const sparkTimeoutMs = 15000
const openTimeoutMs = 30000

export async function refreshWallet(runtime: CoordinatorRuntime): Promise<void> {
  try {
    const wallet = runtime.wallet ?? (await withTimeout(openWalletOnce(runtime), openTimeoutMs, 'Spark did not answer'))
    const { address, balanceSats } = await withTimeout(readWalletOnce(runtime, wallet), sparkTimeoutMs, 'Spark did not answer')
    runtime.store.update({ wallet: { address, balanceSats, isOnline: true, lastError: '' } })
  } catch (error) {
    const wallet = runtime.store.get().wallet
    runtime.store.update({ wallet: { ...wallet, isOnline: false, lastError: (error as Error).message } })
  }
}
