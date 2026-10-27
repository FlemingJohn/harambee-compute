import { Button } from '../components/Button.tsx'
import { Icon } from '../components/Icon.tsx'

export function PayoutCard({ queuedSats }: { queuedSats: number }) {
  return (
    <section aria-labelledby="payout-title" className="card stack column-side">
      <h2 id="payout-title" className="card-title">Send payouts</h2>
      <p className="small muted">Payouts go through Spark and need the internet. Everything else on this screen works offline.</p>
      <Button variant="primary" isLarge isDisabled>Send {queuedSats} sats</Button>
      <span className="row small text-ember">
        <Icon name="warning" size={18} />
        Connect to the internet to send
      </span>
      <span className="small muted">Each payout ID is saved, so a retry never pays twice.</span>
    </section>
  )
}
