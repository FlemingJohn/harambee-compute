import { TimeoutError } from '../lib/TimeoutError.ts'
import { withTimeout } from '../lib/withTimeout.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import type { Earning } from '../types/Earning.ts'
import type { PayoutResult } from '../types/PayoutResult.ts'
import type { SparkWallet } from '../types/SparkWallet.ts'
import { payoutTimeoutMs } from './payoutTimeoutMs.ts'

export async function sendPayout(runtime: CoordinatorRuntime, wallet: SparkWallet, earning: Earning): Promise<PayoutResult> {
  const { deviceId, sats } = earning
  let knownTransferIds: string[]
  try {
    knownTransferIds = (await wallet.listOutgoingTransfers()).map((transfer) => transfer.id)
  } catch (error) {
    return { problem: `could not read the payout history: ${(error as Error).message}`, isUnconfirmed: false }
  }
  await runtime.ledger.append({ kind: 'payout-started', time: new Date().toISOString(), deviceId, sats, knownTransferIds })
  try {
    const transferId = await withTimeout(wallet.sendSats(earning.walletAddress, sats), payoutTimeoutMs, 'Spark did not confirm the payout in time')
    await runtime.ledger.append({ kind: 'payout', time: new Date().toISOString(), deviceId, sats, transferId })
    return { problem: '', isUnconfirmed: false }
  } catch (error) {
    if (error instanceof TimeoutError) return { problem: 'not confirmed yet, it is checked again before the next payout', isUnconfirmed: true }
    await runtime.ledger.append({ kind: 'payout-cancelled', time: new Date().toISOString(), deviceId, sats })
    return { problem: (error as Error).message, isUnconfirmed: false }
  }
}
