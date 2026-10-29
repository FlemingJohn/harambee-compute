import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readWalletOnce } from '../src/coordinator/readWalletOnce.ts'
import { recordWorkOrWarn } from '../src/coordinator/recordWorkOrWarn.ts'
import { makeFakeWallet } from './makeFakeWallet.ts'
import { makePayoutRuntime } from './makePayoutRuntime.ts'

test('a wallet that stops answering is asked only once, not again every check', () => {
  const fake = makeFakeWallet({ isBalanceHanging: true })
  const runtime = makePayoutRuntime(fake.wallet, [], ['coordinator'], {})
  void readWalletOnce(runtime, fake.wallet)
  void readWalletOnce(runtime, fake.wallet)
  void readWalletOnce(runtime, fake.wallet)
  assert.equal(fake.calls.balance, 1)
})

test('a ledger that cannot be written shows a warning instead of a lost device', async () => {
  const runtime = makePayoutRuntime(makeFakeWallet().wallet, [], ['coordinator', 'helper'], {})
  runtime.store.update({ allocation: { shares: [{ deviceId: 'helper', layerCount: 14, bytes: 1 }], shortfallBytes: 0 } as never })
  runtime.ledger.append = async () => {
    throw new Error('disk full')
  }
  await recordWorkOrWarn(runtime, 20)
  assert.equal(runtime.store.get().payoutNotice.isError, true)
  assert.match(runtime.store.get().payoutNotice.text, /could not be written to the ledger: disk full/)
  assert.equal(runtime.store.get().modelStatus, 'idle')
})
