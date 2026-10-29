import { findUnfinishedPayouts } from '../ledger/findUnfinishedPayouts.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import type { OutgoingTransfer } from '../types/OutgoingTransfer.ts'
import type { PayoutStartedRecord } from '../types/PayoutStartedRecord.ts'
import type { SparkWallet } from '../types/SparkWallet.ts'

const missingTransferWaitMs = 120000

export async function reconcilePayouts(runtime: CoordinatorRuntime, wallet: SparkWallet, now = Date.now()): Promise<void> {
  const records = runtime.ledger.getRecords()
  const unfinished = findUnfinishedPayouts(records)
  if (unfinished.length === 0) return
  const transfers = await wallet.listOutgoingTransfers()
  const recordedIds = new Set(records.flatMap((record) => (record.kind === 'payout' ? [record.transferId] : [])))
  for (const started of unfinished) {
    const match = transfers.find((transfer) => transfer.sats === started.sats && !started.knownTransferIds.includes(transfer.id) && !recordedIds.has(transfer.id))
    if (match) recordedIds.add(match.id)
    await settlePayout(runtime, wallet, started, match, now)
  }
}

async function settlePayout(runtime: CoordinatorRuntime, wallet: SparkWallet, started: PayoutStartedRecord, match: OutgoingTransfer | undefined, now: number): Promise<void> {
  const { deviceId, sats } = started
  const time = new Date(now).toISOString()
  if (!match) {
    if (now - Date.parse(started.time) < missingTransferWaitMs) return
    await runtime.ledger.append({ kind: 'payout-cancelled', time, deviceId, sats })
    return
  }
  const finality = await wallet.getFinality(match.id)
  if (finality === 'pending') return
  if (finality === 'dropped') await runtime.ledger.append({ kind: 'payout-cancelled', time, deviceId, sats })
  if (finality === 'final') await runtime.ledger.append({ kind: 'payout', time, deviceId, sats, transferId: match.id })
}
