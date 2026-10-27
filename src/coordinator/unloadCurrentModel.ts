import { unloadModel } from '@qvac/sdk'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'

export async function unloadCurrentModel(runtime: CoordinatorRuntime): Promise<void> {
  const modelId = runtime.modelId
  runtime.modelId = null
  if (!modelId) return
  try {
    await unloadModel({ modelId })
  } catch {
    return
  }
}
