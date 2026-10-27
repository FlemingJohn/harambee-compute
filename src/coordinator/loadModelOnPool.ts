import { loadPoolModel } from '../inference/loadPoolModel.ts'
import { modelCatalog } from '../inference/modelCatalog.ts'
import { formatGigabytes } from '../lib/formatGigabytes.ts'
import { allocateLayers } from '../pool/allocateLayers.ts'
import { reservedBytesPerDevice } from '../pool/reservedBytesPerDevice.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import { unloadCurrentModel } from './unloadCurrentModel.ts'

export async function loadModelOnPool(runtime: CoordinatorRuntime, modelName: string): Promise<void> {
  const model = modelCatalog.find((entry) => entry.name === modelName)
  const state = runtime.store.get()
  if (!model || state.modelStatus === 'loading' || state.isAnswering) return
  const allocation = allocateLayers(state.devices, model, reservedBytesPerDevice, runtime.options.useEveryDevice)
  runtime.store.update({ modelName, allocation })
  if (allocation.shortfallBytes > 0) {
    runtime.store.update({ modelStatus: 'failed', modelMessage: `Not enough memory. Add a device with ${formatGigabytes(allocation.shortfallBytes)} free.` })
    return
  }
  await unloadCurrentModel(runtime)
  runtime.store.update({ modelStatus: 'loading', modelMessage: `Loading ${model.name} across ${allocation.shares.length} devices` })
  const endpoints = allocation.shares.map((share) => ({ url: runtime.helpers.get(share.deviceId)!.pipeUrl, layerCount: share.layerCount }))
  try {
    runtime.modelId = await loadPoolModel(model.registryName, endpoints)
    runtime.store.update({ modelStatus: 'ready', modelMessage: `${model.name} is ready on ${allocation.shares.length} devices` })
  } catch (error) {
    runtime.store.update({ modelStatus: 'failed', modelMessage: `Loading failed: ${(error as Error).message}` })
  }
}
