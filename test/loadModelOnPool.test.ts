import assert from 'node:assert/strict'
import { test } from 'node:test'
import { loadModelOnPool } from '../src/coordinator/loadModelOnPool.ts'
import { makeFakeWallet } from './makeFakeWallet.ts'
import { makePayoutRuntime } from './makePayoutRuntime.ts'

test('a device that left before loading gives a clear failure instead of loading forever', async () => {
  const runtime = makePayoutRuntime(makeFakeWallet().wallet, [], ['coordinator', 'helper'], {})
  runtime.helpers.set('coordinator', { pipeUrl: '127.0.0.1:1' } as never)
  await loadModelOnPool(runtime, 'Qwen3 0.6B')
  assert.equal(runtime.store.get().modelStatus, 'failed')
  assert.match(runtime.store.get().modelMessage, /A device left before loading started/)
})
