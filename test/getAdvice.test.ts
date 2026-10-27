import assert from 'node:assert/strict'
import { test } from 'node:test'
import { allocateLayers } from '../src/pool/allocateLayers.ts'
import { getAdvice } from '../src/pool/getAdvice.ts'
import type { ModelChoice } from '../src/types/ModelChoice.ts'
import type { PoolDevice } from '../src/types/PoolDevice.ts'
import { makeDevice } from './makeDevice.ts'

const gigabyte = 1024 ** 3
const qwen06b = { name: 'Qwen3 0.6B', layerCount: 28, requiredBytes: 0.8 * gigabyte }
const qwen4b = { name: 'Qwen3 4B', layerCount: 36, requiredBytes: 3.1 * gigabyte }
const qwen8b = { name: 'Qwen3 8B', layerCount: 36, requiredBytes: 5.9 * gigabyte }
const catalog = [qwen06b, qwen4b, qwen8b]

function adviceKinds(devices: PoolDevice[], model: ModelChoice): string[] {
  const allocation = allocateLayers(devices, model, gigabyte)
  const otherModels = catalog.filter((other) => other !== model)
  return getAdvice({ devices, model, allocation, otherModels, reserveBytes: gigabyte }).map((advice) => advice.kind)
}

test('asks for another device when the model does not fit', () => {
  assert.deepEqual(adviceKinds([makeDevice('a', 2), makeDevice('b', 2)], qwen8b), ['add-device'])
})

test('says the helpers are idle when one device is enough', () => {
  const kinds = adviceKinds([makeDevice('a', 4), makeDevice('b', 3)], qwen06b)
  assert.ok(kinds.includes('fits-alone'))
})

test('suggests leaving out devices the model does not need', () => {
  const kinds = adviceKinds([makeDevice('a', 3), makeDevice('b', 3), makeDevice('c', 2)], qwen4b)
  assert.ok(kinds.includes('fewer-devices'))
})

test('names a bigger model that the pool can also hold', () => {
  const devices = [makeDevice('a', 4), makeDevice('b', 3.2), makeDevice('c', 2.5)]
  const allocation = allocateLayers(devices, qwen4b, gigabyte)
  const advice = getAdvice({ devices, model: qwen4b, allocation, otherModels: [qwen06b, qwen8b], reserveBytes: gigabyte })
  assert.equal(advice.find((item) => item.kind === 'bigger-model')?.title, 'Qwen3 8B also fits in the pool')
})
