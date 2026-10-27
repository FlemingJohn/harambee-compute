import type { SwarmConnection } from 'hyperswarm'
import { listenForPeerMessages } from '../network/listenForPeerMessages.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import type { HelperHello } from '../types/HelperHello.ts'
import { approveDevice } from './approveDevice.ts'
import { handleDeviceLeaving } from './handleDeviceLeaving.ts'
import { showWaitingDevices } from './showWaitingDevices.ts'

export function acceptHelper(runtime: CoordinatorRuntime, connection: SwarmConnection): void {
  let deviceId = ''
  connection.on('error', () => connection.destroy())
  connection.on('close', () => {
    if (deviceId && isCurrentConnection(runtime, deviceId, connection)) void handleDeviceLeaving(runtime, deviceId)
  })
  listenForPeerMessages(connection, (message) => {
    if (message.type !== 'hello' || deviceId) return
    deviceId = message.pipePublicKey
    handleHello(runtime, deviceId, message, connection)
  })
}

function handleHello(runtime: CoordinatorRuntime, deviceId: string, hello: HelperHello, connection: SwarmConnection): void {
  const connected = runtime.helpers.get(deviceId)
  if (connected) {
    connected.connection = connection
    return
  }
  const isSelf = hello.selfToken !== '' && hello.selfToken === runtime.selfToken
  if (isSelf || runtime.approved.has(deviceId)) {
    void approveDevice(runtime, deviceId, { hello, connection })
    return
  }
  runtime.waiting.set(deviceId, { hello, connection })
  showWaitingDevices(runtime)
  console.log(`${hello.name} wants to join`)
}

function isCurrentConnection(runtime: CoordinatorRuntime, deviceId: string, connection: SwarmConnection): boolean {
  return runtime.helpers.get(deviceId)?.connection === connection || runtime.waiting.get(deviceId)?.connection === connection
}
