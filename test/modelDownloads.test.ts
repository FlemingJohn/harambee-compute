import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { describeLoadError } from '../src/inference/describeLoadError.ts'
import { listDownloadedModels } from '../src/inference/listDownloadedModels.ts'

test('finds the models already in the QVAC cache folder', () => {
  const folder = mkdtempSync(join(tmpdir(), 'qvac-models-'))
  writeFileSync(join(folder, '5b8aae816570a09d_Qwen3-0.6B-Q4_0.gguf'), '')
  writeFileSync(join(folder, 'notes.txt'), '')
  assert.deepEqual(listDownloadedModels(folder), ['Qwen3 0.6B'])
  assert.deepEqual(listDownloadedModels(join(folder, 'missing')), [])
  rmSync(folder, { recursive: true })
})

test('a model that was never downloaded says to go online once', () => {
  assert.match(describeLoadError('Qwen3 4B', 'fetch failed', false), /not downloaded on this laptop yet/)
  assert.equal(describeLoadError('Qwen3 0.6B', 'RPC0 closed', true), 'Loading failed: RPC0 closed')
})
