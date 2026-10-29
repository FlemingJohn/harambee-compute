import type { PayoutCancelledRecord } from './PayoutCancelledRecord.ts'
import type { PayoutRecord } from './PayoutRecord.ts'
import type { PayoutStartedRecord } from './PayoutStartedRecord.ts'
import type { WorkRecord } from './WorkRecord.ts'

export type LedgerRecord = WorkRecord | PayoutStartedRecord | PayoutRecord | PayoutCancelledRecord
