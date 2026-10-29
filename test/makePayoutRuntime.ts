import { makeInitialState } from '../src/coordinator/makeInitialState.ts'
import { makeStateStore } from '../src/coordinator/makeStateStore.ts'
import type { CoordinatorRuntime } from '../src/types/CoordinatorRuntime.ts'
import type { HelperWallet } from '../src/types/HelperWallet.ts'
import type { LedgerRecord } from '../src/types/LedgerRecord.ts'
import type { SparkWallet } from '../src/types/SparkWallet.ts'
import { makeDevice } from './makeDevice.ts'

export const helperAddress = 'sparkrt1pgss88h4t2m0x7d3q9w5n6k8r2y4u7c3v5x8n2m4l6k8j9h7g5f3d0s'

export function makePayoutRuntime(wallet: SparkWallet, records: LedgerRecord[], connectedIds: string[], wallets: Record<string, HelperWallet>): CoordinatorRuntime {
  const store = makeStateStore(makeInitialState('HARAMBEE-TEST-CODE@127.0.0.1:1', false))
  store.update({ devices: connectedIds.map((id) => makeDevice(id, 3, id === 'coordinator')) })
  const helperWallets = new Map(Object.entries(wallets))
  const runtime = {
    store,
    ledger: { publicKey: '', getRecords: () => records, append: async (record: LedgerRecord) => void records.push(record), close: async () => {} },
    seed: '',
    selfDeviceId: 'coordinator',
    helpers: new Map(),
    helperWallets: {
      get: (deviceId: string) => helperWallets.get(deviceId),
      set: (deviceId: string, value: HelperWallet) => void helperWallets.set(deviceId, value),
      entries: () => [...helperWallets.entries()]
    },
    wallet,
    walletOpening: null
  }
  return runtime as unknown as CoordinatorRuntime
}
