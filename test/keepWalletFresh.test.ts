import assert from 'node:assert/strict'
import { test } from 'node:test'
import { keepWalletFresh } from '../src/coordinator/keepWalletFresh.ts'
import { makeFakeWallet } from './makeFakeWallet.ts'
import { makePayoutRuntime } from './makePayoutRuntime.ts'

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

test('the wallet status turns offline on its own when the internet goes away', async () => {
  const fake = makeFakeWallet()
  const runtime = makePayoutRuntime(fake.wallet, [], ['coordinator'], {})
  const stop = keepWalletFresh(runtime, 20)
  await wait(30)
  assert.equal(runtime.store.get().wallet.isOnline, true)
  fake.settings.isOffline = true
  await wait(60)
  stop()
  assert.equal(runtime.store.get().wallet.isOnline, false)
})
