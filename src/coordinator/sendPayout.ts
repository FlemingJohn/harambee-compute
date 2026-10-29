import { TimeoutError } from '../lib/TimeoutError.ts'
import { withTimeout } from '../lib/withTimeout.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import type { Earning } from '../types/Earning.ts'
import type { SparkWallet } from '../types/SparkWallet.ts'
import { payoutTimeoutMs } from './payoutTimeoutMs.ts'

export async function sendPayout(runtime: CoordinatorRuntime, wallet: SparkWallet, earning: Earning): Promise<string> {
  const { deviceId, sats } = earning
  let knownTransferIds: string[]
  try {
    knownTransferIds = (await wallet.listOutgoingTransfers()).map((transfer) => transfer.id)
  } catch (error) {
    return `could not read the payout history: ${(error as Error).message}`
  }
  await runtime.ledger.append({ kind: 'payout-started', time: new Date().toISOString(), deviceId, sats, knownTransferIds })
  try {
    const transferId = await withTimeout(wallet.sendSats(earning.walletAddress, sats), payoutTimeoutMs, 'Spark did not confirm the payout in time')
    await runtime.ledger.append({ kind: 'payout', time: new Date().toISOString(), deviceId, sats, transferId })
    return ''
  } catch (error) {
    if (error instanceof TimeoutError) return 'not confirmed yet, it is checked again before the next payout'
    await runtime.ledger.append({ kind: 'payout-cancelled', time: new Date().toISOString(), deviceId, sats })
    return (error as Error).message
  }
}
