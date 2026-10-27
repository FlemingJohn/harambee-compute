import assert from 'node:assert/strict'
import { test } from 'node:test'
import { removeThinking } from '../src/inference/removeThinking.ts'

test('drops a finished thinking block', () => {
  assert.equal(removeThinking('<think>\nhmm\n</think>\n\nPlants make food.'), 'Plants make food.')
})

test('hides a thinking block that is still being written', () => {
  assert.equal(removeThinking('<think>\nlet me'), '')
})

test('keeps plain answers as they are', () => {
  assert.equal(removeThinking('Plants make food.'), 'Plants make food.')
})
