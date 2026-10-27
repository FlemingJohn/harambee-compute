import type { PoolDevice } from '../types/PoolDevice.ts'
import type { UsableDevice } from '../types/UsableDevice.ts'

export function rankByUsableBytes(devices: PoolDevice[], reserveBytes: number): UsableDevice[] {
  return devices
    .map((device) => ({ device, usableBytes: Math.max(0, device.freeBytes - reserveBytes) }))
    .filter((entry) => entry.usableBytes > 0)
    .sort((first, second) => second.usableBytes - first.usableBytes || Number(second.device.isGpu) - Number(first.device.isGpu))
}
