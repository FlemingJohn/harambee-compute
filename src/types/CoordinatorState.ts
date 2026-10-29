import type { Allocation } from './Allocation.ts'
import type { ChatMessage } from './ChatMessage.ts'
import type { Earning } from './Earning.ts'
import type { LedgerEntry } from './LedgerEntry.ts'
import type { ModelChoice } from './ModelChoice.ts'
import type { ModelStatus } from './ModelStatus.ts'
import type { PayoutNotice } from './PayoutNotice.ts'
import type { PendingDevice } from './PendingDevice.ts'
import type { PoolDevice } from './PoolDevice.ts'
import type { WalletView } from './WalletView.ts'

export interface CoordinatorState {
  inviteCode: string
  isSpreading: boolean
  models: ModelChoice[]
  devices: PoolDevice[]
  pendingDevices: PendingDevice[]
  modelName: string
  modelStatus: ModelStatus
  modelMessage: string
  allocation: Allocation | null
  chat: ChatMessage[]
  isAnswering: boolean
  tokensPerSecond: number
  tokenCount: number
  earnings: Earning[]
  ledger: LedgerEntry[]
  wallet: WalletView
  isPaying: boolean
  payoutNotice: PayoutNotice
}
