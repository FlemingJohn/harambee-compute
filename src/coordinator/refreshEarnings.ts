import { summarizeEarnings } from '../ledger/summarizeEarnings.ts'
import { toLedgerEntries } from '../ledger/toLedgerEntries.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import { listPayingDevices } from './listPayingDevices.ts'

export function refreshEarnings(runtime: CoordinatorRuntime): void {
  const records = runtime.ledger.getRecords()
  runtime.store.update({ earnings: summarizeEarnings(records, listPayingDevices(runtime, records)), ledger: toLedgerEntries(records, 8) })
}
