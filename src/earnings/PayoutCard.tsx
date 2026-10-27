import { Button } from '../components/Button.tsx'
import { Icon } from '../components/Icon.tsx'

const longestErrorLength = 160

export function PayoutCard({ queuedSats, isOnline, lastError, onSend }: { queuedSats: number; isOnline: boolean; lastError: string; onSend: () => void }) {
  const shortError = lastError.length > longestErrorLength ? `${lastError.slice(0, longestErrorLength)}…` : lastError
  return (
    <section aria-labelledby="payout-title" className="card stack column-side">
      <h2 id="payout-title" className="card-title">Send payouts</h2>
      <p className="small muted">Payouts go through Spark REGTEST and need the internet. Everything else on this screen works offline.</p>
      <Button variant="primary" isLarge isDisabled={queuedSats === 0} onClick={onSend}>Send {queuedSats} sats</Button>
      {!isOnline && (
        <span className="row small text-ember">
          <Icon name="warning" size={18} />
          Offline now. Pressing send checks the network first.
        </span>
      )}
      {shortError && <span className="small text-ember">{shortError}</span>}
      <span className="small muted">Each payout is written to the ledger, so a retry never pays twice.</span>
    </section>
  )
}
