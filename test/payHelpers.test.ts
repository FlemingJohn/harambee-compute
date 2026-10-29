import assert from 'node:assert/strict'
import { test } from 'node:test'
import { payHelpers } from '../src/coordinator/payHelpers.ts'
import type { CoordinatorRuntime } from '../src/types/CoordinatorRuntime.ts'
import type { LedgerRecord } from '../src/types/LedgerRecord.ts'
import { makeFakeWallet } from './makeFakeWallet.ts'
import { helperAddress, makePayoutRuntime } from './makePayoutRuntime.ts'

const helperWallets = { helper: { name: 'Lab-PC-2', walletAddress: helperAddress } }
const bothDevices = ['coordinator', 'helper']

function workFor(deviceId: string, tokens: number, layers: number): LedgerRecord {
  return { kind: 'work', time: '10:00:00', deviceId, deviceName: deviceId, tokens, layers }
}

function earningOf(runtime: CoordinatorRuntime, deviceId: string) {
  return runtime.store.get().earnings.find((earning) => earning.deviceId === deviceId)
}

test('two quick presses of Send pay the helper only once', async () => {
  const fake = makeFakeWallet({ sendDelayMs: 40 })
  const runtime = makePayoutRuntime(fake.wallet, [workFor('helper', 40, 10)], bothDevices, helperWallets)
  await Promise.all([payHelpers(runtime), payHelpers(runtime)])
  assert.equal(fake.sent.length, 1)
  assert.equal(earningOf(runtime, 'helper')?.paidSats, 40)
  assert.equal(earningOf(runtime, 'helper')?.sats, 0)
})

test('a payout whose reply was lost is found in the history instead of being sent again', async () => {
  const fake = makeFakeWallet({ isReplyLost: true })
  const runtime = makePayoutRuntime(fake.wallet, [workFor('helper', 40, 10)], bothDevices, helperWallets)
  await payHelpers(runtime)
  assert.equal(earningOf(runtime, 'helper')?.unconfirmedSats, 40)
  assert.equal(earningOf(runtime, 'helper')?.sats, 0)
  fake.settings.isReplyLost = false
  await payHelpers(runtime)
  assert.equal(fake.sent.length, 1)
  assert.equal(earningOf(runtime, 'helper')?.paidSats, 40)
  assert.equal(earningOf(runtime, 'helper')?.unconfirmedSats, 0)
})

test('a payout cut off by a crash is settled from the history after a restart', async () => {
  const fake = makeFakeWallet()
  fake.history.push({ id: 'old-transfer', sats: 40 }, { id: 'sent-before-crash', sats: 40 })
  const started: LedgerRecord = { kind: 'payout-started', time: new Date().toISOString(), deviceId: 'helper', sats: 40, knownTransferIds: ['old-transfer'] }
  const runtime = makePayoutRuntime(fake.wallet, [workFor('helper', 40, 10), started], bothDevices, helperWallets)
  await payHelpers(runtime)
  assert.equal(fake.sent.length, 0)
  const payout = runtime.ledger.getRecords().find((record) => record.kind === 'payout')
  assert.equal(payout?.kind === 'payout' ? payout.transferId : '', 'sent-before-crash')
  assert.equal(earningOf(runtime, 'helper')?.paidSats, 40)
})

test('a started payout that never reached Spark is cancelled and then paid once', async () => {
  const fake = makeFakeWallet()
  const tenMinutesAgo = new Date(Date.now() - 600000).toISOString()
  const started: LedgerRecord = { kind: 'payout-started', time: tenMinutesAgo, deviceId: 'helper', sats: 40, knownTransferIds: [] }
  const runtime = makePayoutRuntime(fake.wallet, [workFor('helper', 40, 10), started], bothDevices, helperWallets)
  await payHelpers(runtime)
  assert.equal(fake.sent.length, 1)
  assert.equal(earningOf(runtime, 'helper')?.paidSats, 40)
})

test('a refused payout stays owed and the reason is shown', async () => {
  const fake = makeFakeWallet({ refusal: 'Insufficient balance' })
  const runtime = makePayoutRuntime(fake.wallet, [workFor('helper', 40, 10)], bothDevices, helperWallets)
  await payHelpers(runtime)
  assert.equal(earningOf(runtime, 'helper')?.sats, 40)
  assert.equal(earningOf(runtime, 'helper')?.unconfirmedSats, 0)
  assert.equal(runtime.store.get().payoutNotice.isError, true)
  assert.match(runtime.store.get().payoutNotice.text, /Insufficient balance/)
})

test('only what the balance covers is paid, and the rest is reported as waiting', async () => {
  const fake = makeFakeWallet({ balanceSats: 50 })
  const wallets = { ...helperWallets, second: { name: 'Lab-PC-3', walletAddress: helperAddress.replace('d0s', 'd2s') } }
  const records = [workFor('helper', 40, 10), workFor('second', 30, 10)]
  const runtime = makePayoutRuntime(fake.wallet, records, ['coordinator', 'helper', 'second'], wallets)
  await payHelpers(runtime)
  assert.deepEqual(fake.sent.map((payment) => payment.sats), [40])
  assert.match(runtime.store.get().payoutNotice.text, /30 sats wait: the wallet has 50 sats/)
})

test('a helper that has left the pool can still be paid', async () => {
  const fake = makeFakeWallet()
  const runtime = makePayoutRuntime(fake.wallet, [workFor('helper', 40, 10)], ['coordinator'], helperWallets)
  await payHelpers(runtime)
  assert.equal(fake.sent.length, 1)
  assert.equal(fake.sent[0]?.to, helperAddress)
  assert.equal(earningOf(runtime, 'helper')?.deviceName, 'Lab-PC-2')
})

test('a device that was never a remembered helper is not listed while it is away', async () => {
  const fake = makeFakeWallet()
  const records = [{ ...workFor('old-test-run', 40, 10), deviceName: 'Flem-laptop' }]
  const runtime = makePayoutRuntime(fake.wallet, records, ['coordinator'], {})
  await payHelpers(runtime)
  assert.equal(fake.sent.length, 0)
  assert.equal(earningOf(runtime, 'old-test-run'), undefined)
})

test('the coordinator is never listed as a helper that left', async () => {
  const fake = makeFakeWallet()
  const runtime = makePayoutRuntime(fake.wallet, [workFor('coordinator', 40, 10)], [], {})
  await payHelpers(runtime)
  assert.equal(earningOf(runtime, 'coordinator'), undefined)
  assert.equal(fake.sent.length, 0)
})

test('an address from another network is never paid', async () => {
  const fake = makeFakeWallet()
  const wallets = { helper: { name: 'Lab-PC-2', walletAddress: helperAddress.replace('sparkrt1', 'sp1') } }
  const runtime = makePayoutRuntime(fake.wallet, [workFor('helper', 40, 10)], bothDevices, wallets)
  await payHelpers(runtime)
  assert.equal(fake.sent.length, 0)
  assert.equal(earningOf(runtime, 'helper')?.walletAddress, '')
})

test('nothing is sent while the wallet is offline, and the lock is released', async () => {
  const fake = makeFakeWallet({ isOffline: true })
  const runtime = makePayoutRuntime(fake.wallet, [workFor('helper', 40, 10)], bothDevices, helperWallets)
  await payHelpers(runtime)
  assert.equal(fake.sent.length, 0)
  assert.equal(runtime.store.get().wallet.isOnline, false)
  assert.equal(runtime.store.get().isPaying, false)
})
