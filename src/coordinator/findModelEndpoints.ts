import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import type { LayerShare } from '../types/LayerShare.ts'

export function findModelEndpoints(runtime: CoordinatorRuntime, shares: LayerShare[]): { url: string; layerCount: number }[] {
  return shares.map((share) => {
    const helper = runtime.helpers.get(share.deviceId)
    if (!helper) throw new Error('A device left before loading started. Press Load again.')
    return { url: helper.pipeUrl, layerCount: share.layerCount }
  })
}
