import type { PoolDevice } from './PoolDevice.ts'

export interface UsableDevice {
  device: PoolDevice
  usableBytes: number
}
