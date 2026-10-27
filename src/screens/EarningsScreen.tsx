import { AppScreen } from '../components/AppScreen.tsx'
import { ScreenTitle } from '../components/ScreenTitle.tsx'
import { StatusPill } from '../components/StatusPill.tsx'
import { EarningsSummary } from '../earnings/EarningsSummary.tsx'
import { EarningsTable } from '../earnings/EarningsTable.tsx'
import { LedgerCard } from '../earnings/LedgerCard.tsx'
import { PayoutCard } from '../earnings/PayoutCard.tsx'
import { useCoordinator } from '../hooks/useCoordinator.ts'
import { sampleDevices } from '../sample/sampleDevices.ts'
import { sampleEarnings } from '../sample/sampleEarnings.ts'
import { sampleLedger } from '../sample/sampleLedger.ts'

const sampleWallet = { address: '', balanceSats: 50000, isOnline: false, lastError: '' }

export function EarningsScreen() {
  const { state, send } = useCoordinator()
  const earnings = state?.earnings ?? sampleEarnings
  const wallet = state?.wallet ?? sampleWallet
  const queuedSats = earnings.reduce((sum, earning) => sum + earning.sats, 0)
  const deviceIds = (state?.devices ?? sampleDevices).map((device) => device.id)
  return (
    <AppScreen route="earnings">
      <div className="row-spread">
        <ScreenTitle route="earnings" title="Earnings">
          Helpers are paid for the work their layers did, with a WDK Spark wallet.
        </ScreenTitle>
        <StatusPill tone="waiting" label="REGTEST · test sats, not real money" />
      </div>
      <EarningsSummary wallet={wallet} queuedSats={queuedSats} helperCount={earnings.filter((earning) => !earning.isCoordinator).length} />
      <EarningsTable earnings={earnings} deviceIds={deviceIds} />
      <div className="columns columns--top">
        <LedgerCard entries={state?.ledger ?? sampleLedger} />
        <PayoutCard queuedSats={queuedSats} isOnline={wallet.isOnline} lastError={wallet.lastError} onSend={() => send({ type: 'send-payouts' })} />
      </div>
    </AppScreen>
  )
}
