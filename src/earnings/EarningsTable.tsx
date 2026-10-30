import { StatusPill } from '../components/StatusPill.tsx'
import { getDeviceClass } from '../lib/getDeviceClass.ts'
import type { Earning } from '../types/Earning.ts'

export function EarningsTable({ earnings }: { earnings: Earning[] }) {
  return (
    <section aria-label="Earnings per device" className="card table-scroll device-table-card">
      <table className="device-table">
        <thead>
          <tr>
            <th scope="col">Device</th>
            <th scope="col">Work, tokens × layers</th>
            <th scope="col">Owed</th>
            <th scope="col">Paid</th>
            <th scope="col">Wallet</th>
            <th scope="col">Payout</th>
          </tr>
        </thead>
        <tbody>
          {earnings.map((earning, position) => (
            <tr key={earning.deviceId} className={getDeviceClass(position)}>
              <td><span className="row"><span className="device-swatch" /><strong>{earning.deviceName}</strong></span></td>
              <td className="mono">{earning.tokenLayers.toLocaleString('en')}</td>
              <td className={earning.isCoordinator ? 'muted' : 'mono text-gold'}>{earning.isCoordinator ? 'Not paid' : `${earning.sats} sats`}</td>
              <td className="mono muted">{earning.isCoordinator ? '' : `${earning.paidSats} sats`}</td>
              <td className="mono small muted">{earning.isCoordinator ? 'Payer' : shortAddress(earning.walletAddress)}</td>
              <td>{payoutStatus(earning)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

function payoutStatus(earning: Earning) {
  if (earning.isCoordinator) return <span className="small muted">Coordinator</span>
  if (earning.unconfirmedSats > 0) return <StatusPill tone="waiting" label={`Checking ${earning.unconfirmedSats} sats`} />
  if (!earning.walletAddress) return <StatusPill tone="warning" label="No address" />
  if (earning.sats > 0) return <StatusPill tone="waiting" label="Queued" />
  return <StatusPill tone="ready" label="Settled" />
}

function shortAddress(address: string): string {
  return address ? `${address.slice(0, 10)}…${address.slice(-4)}` : 'Unknown'
}
