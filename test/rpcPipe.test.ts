import HyperDHT from 'hyperdht'
import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { startRpcPipeClient } from '../src/network/startRpcPipeClient.ts'
import { startRpcPipeServer } from '../src/network/startRpcPipeServer.ts'
import { readRpcInventory } from '../src/pool/readRpcInventory.ts'
import { startFakeRpcServer } from './startFakeRpcServer.ts'

const devices = [{ index: 0, freeBytes: 3 * 1024 ** 3, totalBytes: 6 * 1024 ** 3 }]
const bootstrapNode = HyperDHT.bootstrapper(49799, '127.0.0.1')
const bootstrap = ['127.0.0.1:49799']
const helperDht = new HyperDHT({ bootstrap })
const coordinatorDht = new HyperDHT({ bootstrap })

after(async () => {
  await Promise.all([helperDht.destroy(), coordinatorDht.destroy(), bootstrapNode.destroy()])
})

test('an allowed coordinator reads helper memory through the encrypted pipe', async () => {
  const rpcServer = await startFakeRpcServer(devices)
  const pipeServer = await startRpcPipeServer(helperDht, rpcServer.url)
  const coordinatorKeys = HyperDHT.keyPair()
  pipeServer.allow(coordinatorKeys.publicKey.toString('hex'))
  const pipeClient = await startRpcPipeClient(coordinatorDht, coordinatorKeys, pipeServer.publicKey)
  try {
    const inventory = await readRpcInventory(pipeClient.url, 10000)
    assert.deepEqual(inventory.devices, devices)
  } finally {
    pipeClient.close()
    await pipeServer.close()
    rpcServer.stop()
  }
})

test('the same identity seed gives the same helper key after a restart', async () => {
  const rpcServer = await startFakeRpcServer(devices)
  const identitySeed = Buffer.alloc(32, 9)
  const first = await startRpcPipeServer(helperDht, rpcServer.url, identitySeed)
  const firstKey = first.publicKey
  await first.close()
  const second = await startRpcPipeServer(helperDht, rpcServer.url, identitySeed)
  try {
    assert.equal(second.publicKey, firstKey)
  } finally {
    await second.close()
    rpcServer.stop()
  }
})

test('a coordinator that was never allowed is blocked', async () => {
  const rpcServer = await startFakeRpcServer(devices)
  const pipeServer = await startRpcPipeServer(helperDht, rpcServer.url)
  const pipeClient = await startRpcPipeClient(coordinatorDht, HyperDHT.keyPair(), pipeServer.publicKey)
  try {
    await assert.rejects(readRpcInventory(pipeClient.url, 5000))
  } finally {
    pipeClient.close()
    await pipeServer.close()
    rpcServer.stop()
  }
})
