import type { LayerShare } from '../types/LayerShare.ts'
import type { PoolDevice } from '../types/PoolDevice.ts'
import type { WorkRecord } from '../types/WorkRecord.ts'

export function makeWorkRecords(shares: LayerShare[], devices: PoolDevice[], tokens: number, time: string): WorkRecord[] {
  return shares.map((share) => ({
    kind: 'work',
    time,
    deviceId: share.deviceId,
    deviceName: devices.find((device) => device.id === share.deviceId)?.name ?? share.deviceId,
    tokens,
    layers: share.layerCount
  }))
}
