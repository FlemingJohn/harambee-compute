import { sendPeerMessage } from '../network/sendPeerMessage.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import { showWaitingDevices } from './showWaitingDevices.ts'

export function rejectDevice(runtime: CoordinatorRuntime, deviceId: string): void {
  const entry = runtime.waiting.get(deviceId)
  if (!entry) return
  sendPeerMessage(entry.connection, { type: 'rejected' })
  runtime.waiting.delete(deviceId)
  showWaitingDevices(runtime)
  entry.connection.end()
}
