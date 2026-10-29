import { TimeoutError } from '../src/lib/TimeoutError.ts'
import type { OutgoingTransfer } from '../src/types/OutgoingTransfer.ts'
import type { SparkWallet } from '../src/types/SparkWallet.ts'
import type { TransferFinality } from '../src/types/TransferFinality.ts'

export interface FakeWalletBehaviour {
  balanceSats: number
  isOffline: boolean
  sendDelayMs: number
  refusal: string
  isReplyLost: boolean
  finality: TransferFinality
}

export function makeFakeWallet(behaviour: Partial<FakeWalletBehaviour> = {}) {
  const settings: FakeWalletBehaviour = { balanceSats: 1000, isOffline: false, sendDelayMs: 0, refusal: '', isReplyLost: false, finality: 'final', ...behaviour }
  const sent: { to: string; sats: number }[] = []
  const history: OutgoingTransfer[] = []
  const wallet: SparkWallet = {
    getAddress: async () => 'sparkrt1coordinator',
    getBalanceSats: async () => {
      if (settings.isOffline) throw new Error('fetch failed')
      return settings.balanceSats
    },
    sendSats: async (to, sats) => {
      await new Promise((resolve) => setTimeout(resolve, settings.sendDelayMs))
      if (settings.refusal) throw new Error(settings.refusal)
      sent.push({ to, sats })
      const transfer = { id: `transfer-${history.length + 1}`, sats }
      history.push(transfer)
      if (settings.isReplyLost) throw new TimeoutError('Spark did not confirm the payout in time')
      return transfer.id
    },
    listOutgoingTransfers: async () => [...history],
    getFinality: async () => settings.finality,
    dispose: () => {}
  }
  return { wallet, settings, sent, history }
}
