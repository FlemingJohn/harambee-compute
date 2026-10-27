export interface WalletView {
  address: string
  balanceSats: number | null
  isOnline: boolean
  lastError: string
}
