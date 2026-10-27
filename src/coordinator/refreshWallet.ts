import { withTimeout } from '../lib/withTimeout.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import { openSparkWallet } from '../wallet/openSparkWallet.ts'

export async function refreshWallet(runtime: CoordinatorRuntime): Promise<void> {
  try {
    runtime.wallet ??= await withTimeout(openSparkWallet(runtime.seed), 30000, 'Spark did not answer')
    const address = await withTimeout(runtime.wallet.getAddress(), 15000, 'Spark did not answer')
    const balanceSats = await withTimeout(runtime.wallet.getBalanceSats(), 15000, 'Spark did not answer')
    runtime.store.update({ wallet: { address, balanceSats, isOnline: true, lastError: '' } })
  } catch (error) {
    const wallet = runtime.store.get().wallet
    runtime.store.update({ wallet: { ...wallet, isOnline: false, lastError: (error as Error).message } })
  }
}
