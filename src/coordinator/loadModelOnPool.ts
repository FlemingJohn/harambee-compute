import { describeLoadError } from '../inference/describeLoadError.ts'
import { listDownloadedModels } from '../inference/listDownloadedModels.ts'
import { loadPoolModel } from '../inference/loadPoolModel.ts'
import { modelCatalog } from '../inference/modelCatalog.ts'
import { formatGigabytes } from '../lib/formatGigabytes.ts'
import { TimeoutError } from '../lib/TimeoutError.ts'
import { withTimeout } from '../lib/withTimeout.ts'
import { allocateLayers } from '../pool/allocateLayers.ts'
import { reservedBytesPerDevice } from '../pool/reservedBytesPerDevice.ts'
import type { Allocation } from '../types/Allocation.ts'
import type { CatalogModel } from '../types/CatalogModel.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import { discardLateModel } from './discardLateModel.ts'
import { findModelEndpoints } from './findModelEndpoints.ts'
import { modelLoadTimeoutMs } from './modelLoadTimeoutMs.ts'
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
  runtime.store.update({ modelStatus: 'loading', modelMessage: `Loading ${model.name} across ${countDevices(allocation)}` })
  await loadOrFail(runtime, model, allocation)
}

async function loadOrFail(runtime: CoordinatorRuntime, model: CatalogModel, allocation: Allocation): Promise<void> {
  let loading: Promise<string> | null = null
  try {
    loading = loadPoolModel(model.registryName, findModelEndpoints(runtime, allocation.shares))
    runtime.modelId = await withTimeout(loading, modelLoadTimeoutMs, 'Loading took too long. Check that every helper is still on the network.')
    runtime.store.update({ modelStatus: 'ready', modelMessage: `${model.name} is ready on ${countDevices(allocation)}`, downloadedModels: listDownloadedModels() })
  } catch (error) {
    if (error instanceof TimeoutError && loading) discardLateModel(loading)
    const isDownloaded = listDownloadedModels().includes(model.name)
    runtime.store.update({ modelStatus: 'failed', modelMessage: describeLoadError(model.name, (error as Error).message, isDownloaded) })
  }
}

function countDevices(allocation: Allocation): string {
  const count = allocation.shares.length
  return `${count} ${count === 1 ? 'device' : 'devices'}`
}
