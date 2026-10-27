import assert from 'node:assert/strict'
import { test } from 'node:test'
import { makeWorkRecords } from '../src/ledger/makeWorkRecords.ts'
import { summarizeEarnings } from '../src/ledger/summarizeEarnings.ts'
import { toLedgerEntries } from '../src/ledger/toLedgerEntries.ts'
import type { LedgerRecord } from '../src/types/LedgerRecord.ts'
import { makeDevice } from './makeDevice.ts'

const devices = [makeDevice('coordinator', 4, true), makeDevice('helper', 3)]
const paying = [
  { id: 'coordinator', name: 'coordinator', walletAddress: '', isCoordinator: true },
  { id: 'helper', name: 'helper', walletAddress: 'sparkrt1helper', isCoordinator: false }
]
const shares = [
  { deviceId: 'coordinator', layerCount: 20, bytes: 1 },
  { deviceId: 'helper', layerCount: 8, bytes: 1 }
]

test('pays helpers one sat for every ten token-layers and never pays the coordinator', () => {
  const records = makeWorkRecords(shares, devices, 50, '10:00:00')
  const [coordinator, helper] = summarizeEarnings(records, paying)
  assert.equal(coordinator?.sats, 0)
  assert.equal(helper?.tokenLayers, 400)
  assert.equal(helper?.sats, 40)
})

test('a recorded payout is taken off what is still owed', () => {
  const records: LedgerRecord[] = [
    ...makeWorkRecords(shares, devices, 50, '10:00:00'),
    { kind: 'payout', time: '10:05:00', deviceId: 'helper', sats: 40, transferId: 'transfer-1' },
    ...makeWorkRecords(shares, devices, 25, '10:06:00')
  ]
  const helper = summarizeEarnings(records, paying)[1]
  assert.equal(helper?.paidSats, 40)
  assert.equal(helper?.sats, 20)
})

test('the ledger view shows newest work first and skips payouts', () => {
  const records: LedgerRecord[] = [
    ...makeWorkRecords(shares, devices, 50, '10:00:00'),
    { kind: 'payout', time: '10:05:00', deviceId: 'helper', sats: 40, transferId: 'transfer-1' }
  ]
  const entries = toLedgerEntries(records, 10)
  assert.deepEqual(entries.map((entry) => entry.sequence), [2, 1])
})
