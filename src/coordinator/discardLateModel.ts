import { unloadModel } from '@qvac/sdk'

export function discardLateModel(loading: Promise<string>): void {
  loading.then((modelId) => unloadModel({ modelId })).catch(() => undefined)
}
