import { Icon } from '../components/Icon.tsx'

export function EarningsSummary({ queuedSats, helperCount }: { queuedSats: number; helperCount: number }) {
  return (
    <div className="grid-auto">
      <div className="card stack">
        <span className="label row"><Icon name="offline" size={18} />Internet</span>
        <strong className="card-title">Offline</strong>
        <span className="small muted">Payouts wait in the queue</span>
      </div>
      <div className="card stack">
        <span className="label row"><Icon name="wallet" size={18} />Payer wallet</span>
        <strong className="card-title mono">50,000 sats</strong>
        <span className="small muted">Last checked while online</span>
      </div>
      <div className="card stack">
        <span className="label row"><Icon name="sats" size={18} className="text-gold" />Waiting to pay</span>
        <strong className="card-title mono text-gold">{queuedSats} sats</strong>
        <span className="small muted">To {helperCount} helpers</span>
      </div>
      <div className="card stack">
        <label htmlFor="rate" className="label">Rate, sats per 10 token-layers</label>
        <input id="rate" className="text-input" type="number" min="1" defaultValue="1" />
      </div>
    </div>
  )
}
