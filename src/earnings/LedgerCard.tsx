import { Icon } from '../components/Icon.tsx'
import type { LedgerEntry } from '../types/LedgerEntry.ts'

export function LedgerCard({ entries }: { entries: LedgerEntry[] }) {
  return (
    <section aria-labelledby="ledger-title" className="card stack column-main">
      <div className="row-spread">
        <h2 id="ledger-title" className="card-title">Work ledger</h2>
        <span className="row small muted">
          <Icon name="shield" size={18} className="text-sage" />
          Append-only and signed · newest first
        </span>
      </div>
      {entries.length === 0 && <p className="small muted">No work yet. Ask a question in the chat.</p>}
      <ol className="steps stack ledger-list">
        {entries.map((entry) => (
          <li key={entry.sequence} className="ledger-entry">
            <span className="muted">#{entry.sequence}</span>
            <span className="muted">{entry.time}</span>
            <span>{entry.deviceName}</span>
            <span>{entry.tokens} tokens × {entry.layers} layers</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
