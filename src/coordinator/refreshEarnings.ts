import { summarizeEarnings } from '../ledger/summarizeEarnings.ts'
import { toLedgerEntries } from '../ledger/toLedgerEntries.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'

export function refreshEarnings(runtime: CoordinatorRuntime): void {
  const payingDevices = runtime.store.get().devices.map((device) => ({
    id: device.id,
    name: device.name,
    walletAddress: runtime.helpers.get(device.id)?.hello.walletAddress ?? '',
    isCoordinator: device.id === runtime.selfDeviceId
  }))
  const records = runtime.ledger.getRecords()
  runtime.store.update({ earnings: summarizeEarnings(records, payingDevices), ledger: toLedgerEntries(records, 8) })
}
