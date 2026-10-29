import type Hyperswarm from 'hyperswarm'
import type { SwarmConnection } from 'hyperswarm'
import type { ApprovedList } from './ApprovedList.ts'
import type { ConnectedHelper } from './ConnectedHelper.ts'
import type { CoordinatorOptions } from './CoordinatorOptions.ts'
import type { HelperHello } from './HelperHello.ts'
import type { HelperWallets } from './HelperWallets.ts'
import type { LedgerHandle } from './LedgerHandle.ts'
import type { SparkWallet } from './SparkWallet.ts'
import type { StateStore } from './StateStore.ts'

export interface CoordinatorRuntime {
  options: CoordinatorOptions
  store: StateStore
  swarm: Hyperswarm
  ledger: LedgerHandle
  seed: string
  selfToken: string
  selfDeviceId: string
  approved: ApprovedList
  helperWallets: HelperWallets
  helpers: Map<string, ConnectedHelper>
  waiting: Map<string, { hello: HelperHello; connection: SwarmConnection }>
  modelId: string | null
  wallet: SparkWallet | null
  walletOpening: Promise<SparkWallet> | null
  walletReading: Promise<{ address: string; balanceSats: number }> | null
}
