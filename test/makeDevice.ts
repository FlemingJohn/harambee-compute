import type { PoolDevice } from '../src/types/PoolDevice.ts'

const gigabyte = 1024 ** 3

export function makeDevice(id: string, freeGigabytes: number, isGpu = false): PoolDevice {
  return {
    id,
    name: id,
    url: `127.0.0.1:${50000 + id.length}`,
    isGpu,
    freeBytes: freeGigabytes * gigabyte,
    totalBytes: 2 * freeGigabytes * gigabyte
  }
}
