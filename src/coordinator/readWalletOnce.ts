import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import type { SparkWallet } from '../types/SparkWallet.ts'

export function readWalletOnce(runtime: CoordinatorRuntime, wallet: SparkWallet): Promise<{ address: string; balanceSats: number }> {
  runtime.walletReading ??= Promise.all([wallet.getAddress(), wallet.getBalanceSats()])
    .then(([address, balanceSats]) => ({ address, balanceSats }))
    .finally(() => {
      runtime.walletReading = null
    })
  return runtime.walletReading
}
