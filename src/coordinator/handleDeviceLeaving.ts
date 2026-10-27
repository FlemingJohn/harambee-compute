import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import { forgetDevice } from './forgetDevice.ts'
import { recoverPool } from './recoverPool.ts'

export async function handleDeviceLeaving(runtime: CoordinatorRuntime, deviceId: string): Promise<void> {
  const wasHoldingLayers = forgetDevice(runtime, deviceId)
  if (wasHoldingLayers && runtime.modelId && !runtime.store.get().isAnswering) {
    await recoverPool(runtime, 'A device holding layers left the pool')
  }
}
