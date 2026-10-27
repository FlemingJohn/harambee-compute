import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import { refreshEarnings } from './refreshEarnings.ts'
import { showWaitingDevices } from './showWaitingDevices.ts'

export function forgetDevice(runtime: CoordinatorRuntime, deviceId: string): boolean {
  runtime.helpers.get(deviceId)?.closePipe()
  runtime.helpers.delete(deviceId)
  if (runtime.waiting.delete(deviceId)) showWaitingDevices(runtime)
  const state = runtime.store.get()
  const leaver = state.devices.find((device) => device.id === deviceId)
  if (!leaver) return false
  runtime.store.update({ devices: state.devices.filter((device) => device.id !== deviceId) })
  refreshEarnings(runtime)
  console.log(`${leaver.name} left the pool`)
  return state.allocation?.shares.some((share) => share.deviceId === deviceId) ?? false
}
