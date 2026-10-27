import type { HelperHello } from '../types/HelperHello.ts'
import type { PoolDevice } from '../types/PoolDevice.ts'
import type { RpcInventory } from '../types/RpcInventory.ts'

export function toPoolDevice(deviceId: string, hello: HelperHello, url: string, inventory: RpcInventory): PoolDevice {
  return {
    id: deviceId,
    name: hello.name,
    url,
    isGpu: hello.isGpu,
    freeBytes: inventory.devices.reduce((sum, device) => sum + device.freeBytes, 0),
    totalBytes: inventory.devices.reduce((sum, device) => sum + device.totalBytes, 0)
  }
}
