import { AppScreen } from '../components/AppScreen.tsx'
import { NotConnectedScreen } from '../components/NotConnectedScreen.tsx'
import { ScreenTitle } from '../components/ScreenTitle.tsx'
import { EarningsSummary } from '../earnings/EarningsSummary.tsx'
import { EarningsTable } from '../earnings/EarningsTable.tsx'
import { LedgerCard } from '../earnings/LedgerCard.tsx'
import { PayoutCard } from '../earnings/PayoutCard.tsx'
import { useCoordinator } from '../hooks/useCoordinator.ts'

export function EarningsScreen() {
  const { state, send } = useCoordinator()
  if (!state) return <NotConnectedScreen route="earnings" />
  const { earnings, wallet } = state
  const queuedSats = earnings.reduce((sum, earning) => sum + earning.sats, 0)
  return (
    <AppScreen route="earnings">
      <ScreenTitle route="earnings" title="Earnings">
        Helpers are paid for the work their layers did, with a WDK Spark wallet.
      </ScreenTitle>
      <EarningsSummary wallet={wallet} queuedSats={queuedSats} helperCount={earnings.filter((earning) => !earning.isCoordinator).length} />
      <EarningsTable earnings={earnings} />
      <div className="columns columns--top">
        <LedgerCard entries={state.ledger} />
        <PayoutCard queuedSats={queuedSats} isOnline={wallet.isOnline} isPaying={state.isPaying} notice={state.payoutNotice} onSend={() => send({ type: 'send-payouts' })} />
      </div>
    </AppScreen>
  )
}
