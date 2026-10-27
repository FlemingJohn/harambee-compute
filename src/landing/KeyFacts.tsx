import { Icon } from '../components/Icon.tsx'
import type { IconName } from '../types/IconName.ts'

const facts: { icon: IconName; color: string; title: string; detail: string }[] = [
  { icon: 'offline', color: 'text-sage', title: 'Runs fully offline', detail: 'A phone hotspot is the only network' },
  { icon: 'layers', color: 'text-sunset', title: 'Bigger than any one device', detail: "The model's layers are split by free memory" },
  { icon: 'sats', color: 'text-gold', title: 'Every helper earns', detail: 'Paid in sats with a WDK wallet' }
]

export function KeyFacts() {
  return (
    <section aria-label="Key facts" className="landing-section key-facts">
      <div className="grid-auto">
        {facts.map((fact) => (
          <div key={fact.title} className="fact">
            <Icon name={fact.icon} size={28} className={fact.color} />
            <div className="stack">
              <strong>{fact.title}</strong>
              <span className="small muted">{fact.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
