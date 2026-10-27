import type { PayoutRecord } from './PayoutRecord.ts'
import type { WorkRecord } from './WorkRecord.ts'

export type LedgerRecord = WorkRecord | PayoutRecord
