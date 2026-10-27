import type { Allocation } from '../types/Allocation.ts'
import type { LayerShare } from '../types/LayerShare.ts'
import type { ModelChoice } from '../types/ModelChoice.ts'
import type { PoolDevice } from '../types/PoolDevice.ts'
import type { UsableDevice } from '../types/UsableDevice.ts'
import { pickFewestThatFit } from './pickFewestThatFit.ts'
import { rankByUsableBytes } from './rankByUsableBytes.ts'
import { splitLayersByWeight } from './splitLayersByWeight.ts'

export function allocateLayers(devices: PoolDevice[], model: ModelChoice, reserveBytes: number, useEveryDevice = false): Allocation {
  const ranked = rankByUsableBytes(devices, reserveBytes)
  const chosen = useEveryDevice ? ranked : pickFewestThatFit(ranked, model.requiredBytes)
  const chosenBytes = chosen.reduce((sum, entry) => sum + entry.usableBytes, 0)
  if (chosenBytes < model.requiredBytes) {
    return { shares: [], shortfallBytes: model.requiredBytes - chosenBytes, unusedDeviceIds: [] }
  }
  const chosenIds = new Set(chosen.map((entry) => entry.device.id))
  return {
    shares: makeShares(chosen, model),
    shortfallBytes: 0,
    unusedDeviceIds: devices.filter((device) => !chosenIds.has(device.id)).map((device) => device.id)
  }
}

function makeShares(chosen: UsableDevice[], model: ModelChoice): LayerShare[] {
  const layerCounts = splitLayersByWeight(chosen.map((entry) => entry.usableBytes), model.layerCount)
  return chosen.map((entry, index) => {
    const layerCount = layerCounts[index]!
    return {
      deviceId: entry.device.id,
      layerCount,
      bytes: Math.round((model.requiredBytes * layerCount) / model.layerCount)
    }
  })
}
