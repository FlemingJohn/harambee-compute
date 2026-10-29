export interface Earning {
  deviceId: string
  deviceName: string
  tokenLayers: number
  sats: number
  paidSats: number
  unconfirmedSats: number
  walletAddress: string
  isCoordinator: boolean
}
