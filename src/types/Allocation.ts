import type { LayerShare } from './LayerShare.ts'

export interface Allocation {
  shares: LayerShare[]
  shortfallBytes: number
  unusedDeviceIds: string[]
}
