export interface PayoutRecord {
  kind: 'payout'
  time: string
  deviceId: string
  sats: number
  transferId: string
}
