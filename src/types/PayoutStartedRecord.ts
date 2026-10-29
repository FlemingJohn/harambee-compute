export interface PayoutStartedRecord {
  kind: 'payout-started'
  time: string
  deviceId: string
  sats: number
  knownTransferIds: string[]
}
