import type { HelperWallet } from './HelperWallet.ts'

export interface HelperWallets {
  get(deviceId: string): HelperWallet | undefined
  set(deviceId: string, wallet: HelperWallet): void
  entries(): [string, HelperWallet][]
}
