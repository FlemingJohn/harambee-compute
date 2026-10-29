import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import type { SparkWallet } from '../types/SparkWallet.ts'
import { openSparkWallet } from '../wallet/openSparkWallet.ts'

export function openWalletOnce(runtime: CoordinatorRuntime): Promise<SparkWallet> {
  runtime.walletOpening ??= openSparkWallet(runtime.seed)
    .then((wallet) => {
      runtime.wallet = wallet
      return wallet
    })
    .finally(() => {
      runtime.walletOpening = null
    })
  return runtime.walletOpening
}
