import type { PoolDevice } from '../types/PoolDevice.ts'

const gigabyte = 1024 ** 3

export const sampleDevices: PoolDevice[] = [
  { id: 'flem-laptop', name: 'Flem-laptop', url: '127.0.0.1:50051', isGpu: true, freeBytes: 4 * gigabyte, totalBytes: 6 * gigabyte },
  { id: 'lab-pc-07', name: 'Lab-PC-07', url: '192.168.43.22:50052', isGpu: false, freeBytes: 3.2 * gigabyte, totalBytes: 4 * gigabyte },
  { id: 'amina-laptop', name: 'Amina-laptop', url: '192.168.43.31:50052', isGpu: false, freeBytes: 2.5 * gigabyte, totalBytes: 8 * gigabyte }
]
