import assert from 'node:assert/strict'
import { test } from 'node:test'
import { allocateLayers } from '../src/pool/allocateLayers.ts'
import { makeDevice } from './makeDevice.ts'

const gigabyte = 1024 ** 3
const qwen4b = { name: 'Qwen3 4B', layerCount: 36, requiredBytes: 3.1 * gigabyte }

test('uses the fewest devices that fit, biggest first', () => {
  const devices = [makeDevice('small', 2.5), makeDevice('big', 3.5, true), makeDevice('middle', 3.2)]
  const allocation = allocateLayers(devices, qwen4b, gigabyte)
  assert.deepEqual(allocation.shares.map((share) => share.deviceId), ['big', 'middle'])
  assert.deepEqual(allocation.unusedDeviceIds, ['small'])
  assert.equal(allocation.shortfallBytes, 0)
})

test('hands out every layer across the chosen devices', () => {
  const devices = [makeDevice('a', 2.7), makeDevice('b', 2.6)]
  const allocation = allocateLayers(devices, qwen4b, gigabyte)
  assert.equal(allocation.shares.reduce((sum, share) => sum + share.layerCount, 0), 36)
})

test('reports how much memory is missing when the pool is too small', () => {
  const devices = [makeDevice('a', 2), makeDevice('b', 2)]
  const allocation = allocateLayers(devices, qwen4b, gigabyte)
  assert.deepEqual(allocation.shares, [])
  assert.equal(Math.round((allocation.shortfallBytes / gigabyte) * 10) / 10, 1.1)
})

test('spreads over every device when asked, even if one would fit', () => {
  const devices = [makeDevice('a', 5), makeDevice('b', 5)]
  const allocation = allocateLayers(devices, qwen4b, gigabyte, true)
  assert.deepEqual(allocation.shares.map((share) => share.layerCount), [18, 18])
  assert.deepEqual(allocation.unusedDeviceIds, [])
})

test('prefers the GPU device when free memory is equal', () => {
  const devices = [makeDevice('cpu', 5), makeDevice('gpu', 5, true)]
  const allocation = allocateLayers(devices, qwen4b, gigabyte)
  assert.equal(allocation.shares[0]?.deviceId, 'gpu')
})
