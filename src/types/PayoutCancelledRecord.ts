export interface PayoutCancelledRecord {
  kind: 'payout-cancelled'
  time: string
  deviceId: string
  sats: number
}
