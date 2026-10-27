import type { LedgerEntry } from '../types/LedgerEntry.ts'
import type { LedgerRecord } from '../types/LedgerRecord.ts'

export function toLedgerEntries(records: LedgerRecord[], newestCount: number): LedgerEntry[] {
  const entries: LedgerEntry[] = []
  records.forEach((record, index) => {
    if (record.kind !== 'work') return
    entries.push({ sequence: index + 1, time: record.time, deviceName: record.deviceName, tokens: record.tokens, layers: record.layers })
  })
  return entries.reverse().slice(0, newestCount)
}
