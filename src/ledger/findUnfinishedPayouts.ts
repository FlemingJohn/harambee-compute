import type { LedgerRecord } from '../types/LedgerRecord.ts'
import type { PayoutStartedRecord } from '../types/PayoutStartedRecord.ts'

export function findUnfinishedPayouts(records: LedgerRecord[]): PayoutStartedRecord[] {
  const unfinished = new Map<string, PayoutStartedRecord>()
  for (const record of records) {
    if (record.kind === 'payout-started') unfinished.set(record.deviceId, record)
    if (record.kind === 'payout' || record.kind === 'payout-cancelled') unfinished.delete(record.deviceId)
  }
  return [...unfinished.values()]
}
