import type { SwarmConnection } from 'hyperswarm'
import { sendPeerMessage } from '../network/sendPeerMessage.ts'
import { startRpcPipeClient } from '../network/startRpcPipeClient.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import type { HelperHello } from '../types/HelperHello.ts'
import type { PoolDevice } from '../types/PoolDevice.ts'
import { isSupportedRpcProtocol } from '../pool/isSupportedRpcProtocol.ts'
import { isRegtestSparkAddress } from '../wallet/isRegtestSparkAddress.ts'
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
    if (!isSupportedRpcProtocol(inventory.protocolVersion)) throw new Error(`its QVAC RPC version ${inventory.protocolVersion} does not match this coordinator. Update the app on that device`)
    runtime.helpers.set(deviceId, { hello: entry.hello, connection: entry.connection, pipeUrl: pipe.url, closePipe: pipe.close })
    runtime.approved.add(deviceId)
    if (entry.hello.selfToken === runtime.selfToken) runtime.selfDeviceId = deviceId
    else rememberWallet(runtime, deviceId, entry.hello)
    addDevice(runtime, toPoolDevice(deviceId, entry.hello, pipe.url, inventory))
    console.log(`${entry.hello.name} joined the pool`)
  } catch (error) {
    pipe.close()
    console.log(`Could not add ${entry.hello.name}: ${(error as Error).message}`)
  }
}

function rememberWallet(runtime: CoordinatorRuntime, deviceId: string, hello: HelperHello): void {
  const walletAddress = isRegtestSparkAddress(hello.walletAddress) ? hello.walletAddress : runtime.helperWallets.get(deviceId)?.walletAddress ?? ''
  runtime.helperWallets.set(deviceId, { name: hello.name, walletAddress })
}

function addDevice(runtime: CoordinatorRuntime, device: PoolDevice): void {
  const others = runtime.store.get().devices.filter((existing) => existing.id !== device.id)
  const devices = device.id === runtime.selfDeviceId ? [device, ...others] : [...others, device]
  runtime.store.update({ devices })
  refreshEarnings(runtime)
}
