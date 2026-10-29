import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import type { LedgerRecord } from '../types/LedgerRecord.ts'
import type { PayingDevice } from '../types/PayingDevice.ts'
import { isRegtestSparkAddress } from '../wallet/isRegtestSparkAddress.ts'

export function listPayingDevices(runtime: CoordinatorRuntime, records: LedgerRecord[]): PayingDevice[] {
  const connected = runtime.store.get().devices.map((device) => ({
    id: device.id,
    name: device.name,
    walletAddress: findWalletAddress(runtime, device.id),
    isCoordinator: device.id === runtime.selfDeviceId
  }))
  const connectedIds = new Set(connected.map((device) => device.id))
  const workedIds = new Set(records.flatMap((record) => (record.kind === 'work' ? [record.deviceId] : [])))
  const departed = runtime.helperWallets
    .entries()
    .filter(([deviceId]) => !connectedIds.has(deviceId) && workedIds.has(deviceId) && deviceId !== runtime.selfDeviceId)
    .map(([deviceId, wallet]) => ({ id: deviceId, name: wallet.name, walletAddress: findWalletAddress(runtime, deviceId), isCoordinator: false }))
  return [...connected, ...departed]
}

function findWalletAddress(runtime: CoordinatorRuntime, deviceId: string): string {
  const address = runtime.helpers.get(deviceId)?.hello.walletAddress || runtime.helperWallets.get(deviceId)?.walletAddress || ''
  return isRegtestSparkAddress(address) ? address : ''
}
