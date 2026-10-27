export interface PoolDevice {
  id: string
  name: string
  url: string
  isGpu: boolean
  freeBytes: number
  totalBytes: number
}
