import { Button } from '../components/Button.tsx'
import { Icon } from '../components/Icon.tsx'
import type { PayoutNotice } from '../types/PayoutNotice.ts'

const longestNoticeLength = 220

export function PayoutCard({
  queuedSats,
  isOnline,
  isPaying,
  notice,
  onSend
}: {
  queuedSats: number
  isOnline: boolean
  isPaying: boolean
  notice: PayoutNotice
  onSend: () => void
}) {
  const shortNotice = notice.text.length > longestNoticeLength ? `${notice.text.slice(0, longestNoticeLength)}…` : notice.text
  return (
    <section aria-labelledby="payout-title" className="card stack column-side">
      <h2 id="payout-title" className="card-title">Send payouts</h2>
      <p className="small muted">Payouts go through Spark REGTEST and need the internet. Everything else on this screen works offline.</p>
      <Button variant="primary" isLarge isDisabled={queuedSats === 0 || isPaying} onClick={onSend}>
        {isPaying ? 'Paying…' : `Send ${queuedSats} sats`}
      </Button>
      {!isOnline && (
        <span className="row small text-ember">
          <Icon name="warning" size={18} />
          Offline now. Pressing send checks the network first.
        </span>
      )}
      {shortNotice && !isPaying && <span className={`small ${notice.isError ? 'text-ember' : 'text-sage'}`}>{shortNotice}</span>}
      <span className="small muted">Each payout is written to the ledger before and after it is sent, so a retry never pays twice.</span>
    </section>
  )
}
