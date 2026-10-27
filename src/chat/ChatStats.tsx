import { Icon } from '../components/Icon.tsx'
import { InfoNote } from '../components/InfoNote.tsx'
import { LayerBar } from '../components/LayerBar.tsx'

export function ChatStats({
  tokensPerSecond,
  tokenCount,
  segments
}: {
  tokensPerSecond: number
  tokenCount: number
  segments: { label: string; layerCount: number; devicePosition: number }[]
}) {
  return (
    <aside aria-label="Live stats" className="stack column-side">
      <section className="card stack">
        <span className="label">Speed of the last answer</span>
        <div className="row">
          <Icon name="speed" size={28} className="text-sunset" />
          <span className="stat-number">{tokensPerSecond.toFixed(1)}</span>
          <span className="muted">tokens per second</span>
        </div>
        <div className="stat-tiles">
          <div className="stat-tile"><span className="small muted">Tokens</span><strong className="mono">{tokenCount}</strong></div>
          <div className="stat-tile"><span className="small muted">Network hops</span><strong className="mono">{Math.max(0, segments.length - 1)}</strong></div>
        </div>
      </section>
      <section className="card stack">
        <span className="label">Who is working</span>
        {segments.length > 0 ? <LayerBar segments={segments} /> : <span className="small muted">No model loaded</span>}
      </section>
      <InfoNote icon="shield" iconClassName="text-sage">
        Every answer is made on this network. If a device leaves, the pool reloads on the devices that are left.
      </InfoNote>
    </aside>
  )
}
