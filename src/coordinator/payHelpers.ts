import { pickPayable } from '../ledger/pickPayable.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import type { Earning } from '../types/Earning.ts'
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

async function payWhileLocked(runtime: CoordinatorRuntime): Promise<{ text: string; isError: boolean }> {
  await refreshWallet(runtime)
  const wallet = runtime.wallet
  const view = runtime.store.get().wallet
  if (!wallet || !view.isOnline) return { text: 'Offline. The payouts wait in the queue.', isError: true }
  const problems: string[] = []
  await reconcilePayouts(runtime, wallet).catch((error: Error) => problems.push(`Could not check earlier payouts: ${error.message}`))
  refreshEarnings(runtime)
  const { payable, waitingSats } = pickPayable(runtime.store.get().earnings.filter(isPayable), view.balanceSats ?? 0)
  if (waitingSats > 0) problems.push(`${waitingSats} sats wait: the wallet has ${view.balanceSats ?? 0} sats. Add REGTEST sats from the faucet.`)
  let paidSats = 0
  for (const earning of payable) {
    const problem = await sendPayout(runtime, wallet, earning)
    if (problem) problems.push(`${earning.deviceName}: ${problem}`)
    else paidSats += earning.sats
  }
  refreshEarnings(runtime)
  await refreshWallet(runtime)
  const paidText = paidSats > 0 ? `Paid ${paidSats} sats.` : ''
  return { text: [paidText, ...problems].filter(Boolean).join(' ') || 'Nothing to pay.', isError: problems.length > 0 }
}

function isPayable(earning: Earning): boolean {
  return earning.sats > 0 && !earning.isCoordinator && earning.unconfirmedSats === 0 && isRegtestSparkAddress(earning.walletAddress)
}
