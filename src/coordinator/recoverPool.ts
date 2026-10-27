import { readRpcInventory } from '../pool/readRpcInventory.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import { forgetDevice } from './forgetDevice.ts'
import { loadModelOnPool } from './loadModelOnPool.ts'
import { unloadCurrentModel } from './unloadCurrentModel.ts'

export async function recoverPool(runtime: CoordinatorRuntime, reason: string): Promise<void> {
  await unloadCurrentModel(runtime)
  runtime.store.update({ modelStatus: 'failed', modelMessage: `${reason}. Checking the devices that are left.` })
  for (const [deviceId, helper] of [...runtime.helpers.entries()]) {
    const isReachable = await readRpcInventory(helper.pipeUrl, 4000).then(
      () => true,
      () => false
    )
    if (!isReachable) forgetDevice(runtime, deviceId)
  }
  await loadModelOnPool(runtime, runtime.store.get().modelName)
}
