import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import { refreshEarnings } from './refreshEarnings.ts'
import { refreshWallet } from './refreshWallet.ts'

export async function payHelpers(runtime: CoordinatorRuntime): Promise<void> {
  await refreshWallet(runtime)
  const wallet = runtime.wallet
  if (!wallet || !runtime.store.get().wallet.isOnline) return
  const owed = runtime.store.get().earnings.filter((earning) => earning.sats > 0 && earning.walletAddress && !earning.isCoordinator)
  for (const earning of owed) {
    try {
      const transferId = await wallet.sendSats(earning.walletAddress, earning.sats)
      await runtime.ledger.append({ kind: 'payout', time: new Date().toISOString(), deviceId: earning.deviceId, sats: earning.sats, transferId })
      console.log(`Paid ${earning.sats} sats to ${earning.deviceName}`)
    } catch (error) {
      const walletView = runtime.store.get().wallet
      runtime.store.update({ wallet: { ...walletView, lastError: `${earning.deviceName}: ${(error as Error).message}` } })
    }
  }
  refreshEarnings(runtime)
  await refreshWallet(runtime)
}
