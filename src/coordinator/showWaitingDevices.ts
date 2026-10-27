import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'

export function showWaitingDevices(runtime: CoordinatorRuntime): void {
  const pendingDevices = [...runtime.waiting.entries()].map(([id, entry]) => ({ id, name: entry.hello.name, isGpu: entry.hello.isGpu }))
  runtime.store.update({ pendingDevices })
}
