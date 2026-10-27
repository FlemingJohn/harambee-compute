import { AppScreen } from '../components/AppScreen.tsx'
import { ScreenTitle } from '../components/ScreenTitle.tsx'
import { StatusPill } from '../components/StatusPill.tsx'
import { EarningsSummary } from '../earnings/EarningsSummary.tsx'
import { EarningsTable } from '../earnings/EarningsTable.tsx'
import { LedgerCard } from '../earnings/LedgerCard.tsx'
import { PayoutCard } from '../earnings/PayoutCard.tsx'
import { sampleEarnings } from '../sample/sampleEarnings.ts'
import { sampleLedger } from '../sample/sampleLedger.ts'

export function EarningsScreen() {
  const queuedSats = sampleEarnings.reduce((sum, earning) => sum + earning.sats, 0)
  return (
    <AppScreen route="earnings">
      <div className="row-spread">
        <ScreenTitle icon="sats" title="Earnings">
          Helpers are paid for the work their layers did, with a WDK Spark wallet.
        </ScreenTitle>
        <StatusPill tone="waiting" label="REGTEST · test sats, not real money" />
      </div>
      <EarningsSummary queuedSats={queuedSats} helperCount={sampleEarnings.filter((earning) => !earning.isCoordinator).length} />
      <EarningsTable earnings={sampleEarnings} />
      <div className="columns">
        <LedgerCard entries={sampleLedger} />
        <PayoutCard queuedSats={queuedSats} />
      </div>
    </AppScreen>
  )
}
