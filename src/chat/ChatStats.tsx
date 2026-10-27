import { Icon } from '../components/Icon.tsx'
import { LayerBar } from '../components/LayerBar.tsx'

export function ChatStats() {
  return (
    <aside aria-label="Live stats" className="stack column-side">
      <section className="card stack">
        <span className="label">Speed</span>
        <div className="row">
          <Icon name="speed" size={28} className="text-sunset" />
          <span className="stat-number">6.2</span>
          <span className="muted">tokens per second</span>
        </div>
        <div className="grid-auto stat-grid">
          <div className="stat-tile"><span className="small muted">Tokens</span><strong className="mono">184</strong></div>
          <div className="stat-tile"><span className="small muted">Network hops</span><strong className="mono">1</strong></div>
        </div>
      </section>
      <section className="card stack">
        <span className="label">Who is working</span>
        <LayerBar segments={[{ label: 'Flem', layerCount: 21, devicePosition: 0 }, { label: 'Lab-PC', layerCount: 15, devicePosition: 1 }]} />
      </section>
      <p className="card card--outline row small muted">
        <Icon name="shield" className="text-sage" />
        Every answer is made on this network. If a device leaves, the pool reloads on the devices that are left.
      </p>
    </aside>
  )
}
