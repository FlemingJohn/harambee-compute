import assert from 'node:assert/strict'
import { test } from 'node:test'
import { isSupportedRpcProtocol } from '../src/pool/isSupportedRpcProtocol.ts'
import { readRpcInventory } from '../src/pool/readRpcInventory.ts'
import { startFakeRpcServer } from './startFakeRpcServer.ts'

const gigabyte = 1024 ** 3

test('reads the protocol version and the memory of every device', async () => {
  const devices = [
    { index: 0, freeBytes: 3 * gigabyte, totalBytes: 6 * gigabyte },
    { index: 1, freeBytes: 1 * gigabyte, totalBytes: 2 * gigabyte }
  ]
  const server = await startFakeRpcServer(devices)
  try {
    const inventory = await readRpcInventory(server.url)
    assert.equal(inventory.protocolVersion, '111.0.0')
    assert.deepEqual(inventory.devices, devices)
  } finally {
    server.stop()
  }
})

test('fails when nothing is listening', async () => {
  await assert.rejects(readRpcInventory('127.0.0.1:1', 1000))
})

test('accepts only protocol major 111', () => {
  assert.equal(isSupportedRpcProtocol('111.0.4'), true)
  assert.equal(isSupportedRpcProtocol('110.9.0'), false)
})
