import { StatusPill } from '../components/StatusPill.tsx'
import { getDeviceClass } from '../lib/getDeviceClass.ts'
import { sampleDevices } from '../sample/sampleDevices.ts'
import type { Earning } from '../types/Earning.ts'

export function EarningsTable({ earnings }: { earnings: Earning[] }) {
  return (
    <section aria-label="Earnings per device" className="card table-scroll device-table-card">
      <table className="device-table">
        <thead>
          <tr>
            <th scope="col">Device</th>
            <th scope="col">Work, tokens × layers</th>
            <th scope="col">Earned</th>
            <th scope="col">Wallet</th>
            <th scope="col">Payout</th>
          </tr>
        </thead>
        <tbody>
          {earnings.map((earning) => (
            <tr key={earning.deviceId} className={getDeviceClass(sampleDevices.findIndex((device) => device.id === earning.deviceId))}>
              <td><span className="row"><span className="device-swatch" /><strong>{earning.deviceName}</strong></span></td>
              <td className="mono">{earning.tokenLayers.toLocaleString('en')}</td>
              <td className={earning.isCoordinator ? 'muted' : 'mono text-gold'}>{earning.isCoordinator ? 'Not paid' : `${earning.sats} sats`}</td>
              <td className="mono small muted">{earning.isCoordinator ? 'Payer' : earning.walletAddress}</td>
              <td>{earning.isCoordinator ? <span className="small muted">Coordinator</span> : <StatusPill tone="waiting" label="Queued" />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
