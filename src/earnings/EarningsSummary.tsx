import { Icon } from '../components/Icon.tsx'
import { tokenLayersPerSat } from '../ledger/tokenLayersPerSat.ts'
import type { WalletView } from '../types/WalletView.ts'

export function EarningsSummary({ wallet, queuedSats, helperCount }: { wallet: WalletView; queuedSats: number; helperCount: number }) {
  return (
    <div className="grid-auto">
      <div className="card stack">
        <span className="label row"><Icon name="offline" size={18} />Spark network</span>
        <strong className={`card-title ${wallet.isOnline ? 'text-sage' : ''}`}>{wallet.isOnline ? 'Online' : 'Offline'}</strong>
        <span className="small muted">{wallet.isOnline ? 'Payouts can be sent now' : 'Payouts wait in the queue'}</span>
      </div>
      <div className="card stack">
        <span className="label row"><Icon name="wallet" size={18} />Payer wallet</span>
        <strong className="card-title mono">{wallet.balanceSats === null ? 'Unknown' : `${wallet.balanceSats.toLocaleString('en')} sats`}</strong>
        <span className="small muted mono wallet-address">{wallet.address || 'Address appears once online'}</span>
      </div>
      <div className="card stack">
        <span className="label row"><Icon name="sats" size={18} className="text-gold" />Waiting to pay</span>
        <strong className="card-title mono text-gold">{queuedSats} sats</strong>
        <span className="small muted">To {helperCount} {helperCount === 1 ? 'helper' : 'helpers'}</span>
      </div>
      <div className="card stack">
        <span className="label row"><Icon name="layers" size={18} />Rate</span>
        <strong className="card-title mono">1 sat</strong>
        <span className="small muted">for every {tokenLayersPerSat} token-layers a helper computes</span>
      </div>
    </div>
  )
}
