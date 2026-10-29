import { findUnfinishedPayouts } from '../ledger/findUnfinishedPayouts.ts'
import { pickPayable } from '../ledger/pickPayable.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import type { Earning } from '../types/Earning.ts'
import type { PayoutNotice } from '../types/PayoutNotice.ts'
import type { SparkWallet } from '../types/SparkWallet.ts'
import { isRegtestSparkAddress } from '../wallet/isRegtestSparkAddress.ts'
import { reconcilePayouts } from './reconcilePayouts.ts'
import { refreshEarnings } from './refreshEarnings.ts'
import { refreshWallet } from './refreshWallet.ts'
import { sendPayout } from './sendPayout.ts'

export async function payHelpers(runtime: CoordinatorRuntime): Promise<void> {
  if (runtime.store.get().isPaying) return
  runtime.store.update({ isPaying: true, payoutNotice: { text: 'Paying…', isError: false } })
  try {
    runtime.store.update({ payoutNotice: await payWhileLocked(runtime) })
  } catch (error) {
    runtime.store.update({ payoutNotice: { text: (error as Error).message, isError: true } })
  } finally {
    runtime.store.update({ isPaying: false })
  }
}

async function payWhileLocked(runtime: CoordinatorRuntime): Promise<PayoutNotice> {
  await refreshWallet(runtime)
  const wallet = runtime.wallet
  const view = runtime.store.get().wallet
  if (!wallet || !view.isOnline) return { text: 'Offline. The payouts wait in the queue.', isError: true }
  const problems: string[] = []
  await reconcilePayouts(runtime, wallet).catch((error: Error) => problems.push(`Could not check earlier payouts: ${error.message}`))
  refreshEarnings(runtime)
  const paidSats = findUnfinishedPayouts(runtime.ledger.getRecords()).length > 0
    ? holdBack(problems)
    : await payOwed(runtime, wallet, view.balanceSats ?? 0, problems)
  refreshEarnings(runtime)
  await refreshWallet(runtime)
  const paidText = paidSats > 0 ? `Paid ${paidSats} sats.` : ''
  return { text: [paidText, ...problems].filter(Boolean).join(' ') || 'Nothing to pay.', isError: problems.length > 0 }
}

async function payOwed(runtime: CoordinatorRuntime, wallet: SparkWallet, balanceSats: number, problems: string[]): Promise<number> {
  const { payable, waitingSats } = pickPayable(runtime.store.get().earnings.filter(isPayable), balanceSats)
  if (waitingSats > 0) problems.push(`${waitingSats} sats wait: the wallet has ${balanceSats} sats. Add REGTEST sats from the faucet.`)
  let paidSats = 0
  for (const earning of payable) {
    const result = await sendPayout(runtime, wallet, earning)
    if (result.problem) problems.push(`${earning.deviceName}: ${result.problem}`)
    else paidSats += earning.sats
    if (result.isUnconfirmed) return holdBack(problems, paidSats)
  }
  return paidSats
}

function holdBack(problems: string[], paidSats = 0): number {
  problems.push('A payout is still being checked, so the other payouts wait until it is confirmed.')
  return paidSats
}

function isPayable(earning: Earning): boolean {
  return earning.sats > 0 && !earning.isCoordinator && earning.unconfirmedSats === 0 && isRegtestSparkAddress(earning.walletAddress)
}
