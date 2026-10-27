import type { SwarmConnection } from 'hyperswarm'
import { sendPeerMessage } from '../network/sendPeerMessage.ts'
import { startRpcPipeClient } from '../network/startRpcPipeClient.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import type { HelperHello } from '../types/HelperHello.ts'
import type { PoolDevice } from '../types/PoolDevice.ts'
import { readInventoryWithRetry } from './readInventoryWithRetry.ts'
import { refreshEarnings } from './refreshEarnings.ts'
import { showWaitingDevices } from './showWaitingDevices.ts'
import { toPoolDevice } from './toPoolDevice.ts'

export async function approveDevice(
  runtime: CoordinatorRuntime,
  deviceId: string,
  entry: { hello: HelperHello; connection: SwarmConnection } | undefined = runtime.waiting.get(deviceId)
): Promise<void> {
  if (!entry) return
  runtime.waiting.delete(deviceId)
  showWaitingDevices(runtime)
  sendPeerMessage(entry.connection, { type: 'approved' })
  const pipe = await startRpcPipeClient(runtime.swarm.dht, runtime.swarm.keyPair, entry.hello.pipePublicKey)
  try {
    const inventory = await readInventoryWithRetry(pipe.url)
    runtime.helpers.set(deviceId, { hello: entry.hello, connection: entry.connection, pipeUrl: pipe.url, closePipe: pipe.close })
    runtime.approved.add(deviceId)
    if (entry.hello.selfToken === runtime.selfToken) runtime.selfDeviceId = deviceId
    addDevice(runtime, toPoolDevice(deviceId, entry.hello, pipe.url, inventory))
    console.log(`${entry.hello.name} joined the pool`)
  } catch (error) {
    pipe.close()
    console.log(`Could not read memory from ${entry.hello.name}: ${(error as Error).message}`)
  }
}

function addDevice(runtime: CoordinatorRuntime, device: PoolDevice): void {
  const others = runtime.store.get().devices.filter((existing) => existing.id !== device.id)
  const devices = device.id === runtime.selfDeviceId ? [device, ...others] : [...others, device]
  runtime.store.update({ devices })
  refreshEarnings(runtime)
}
