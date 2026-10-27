import assert from 'node:assert/strict'
import { test } from 'node:test'
import { splitLayersByWeight } from '../src/pool/splitLayersByWeight.ts'

test('splits layers in proportion to weight', () => {
  assert.deepEqual(splitLayersByWeight([2, 1], 36), [24, 12])
})

test('always hands out every layer', () => {
  const counts = splitLayersByWeight([3, 2.2, 1.5], 36)
  assert.equal(counts.reduce((sum, count) => sum + count, 0), 36)
})

test('gives every device at least one layer', () => {
  const counts = splitLayersByWeight([100, 1], 28)
  assert.equal(counts[1], 1)
  assert.equal(counts[0], 27)
})
