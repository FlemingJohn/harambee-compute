import type { DeviceMemory } from './DeviceMemory.ts'

export interface RpcInventory {
  protocolVersion: string
  devices: DeviceMemory[]
}
