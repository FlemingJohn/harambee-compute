import type { LedgerRecord } from './LedgerRecord.ts'

export interface LedgerHandle {
  publicKey: string
  getRecords(): LedgerRecord[]
  append(record: LedgerRecord): Promise<void>
  close(): Promise<void>
}
