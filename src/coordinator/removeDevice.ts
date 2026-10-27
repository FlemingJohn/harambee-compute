import { sendPeerMessage } from '../network/sendPeerMessage.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import { handleDeviceLeaving } from './handleDeviceLeaving.ts'

export async function removeDevice(runtime: CoordinatorRuntime, deviceId: string): Promise<void> {
  if (deviceId === runtime.selfDeviceId) return
  const helper = runtime.helpers.get(deviceId)
  if (helper) sendPeerMessage(helper.connection, { type: 'removed' })
  runtime.approved.remove(deviceId)
  await handleDeviceLeaving(runtime, deviceId)
  helper?.connection.end()
}
