import { makeWorkRecords } from '../ledger/makeWorkRecords.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import { refreshEarnings } from './refreshEarnings.ts'

export async function recordWork(runtime: CoordinatorRuntime, tokenCount: number): Promise<void> {
  const { allocation, devices } = runtime.store.get()
  if (!allocation) return
  const time = new Date().toLocaleTimeString('en-GB', { hour12: false })
  for (const record of makeWorkRecords(allocation.shares, devices, tokenCount, time)) {
    await runtime.ledger.append(record)
  }
  refreshEarnings(runtime)
}
