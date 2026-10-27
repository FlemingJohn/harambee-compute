import { Icon } from '../components/Icon.tsx'
import type { IconName } from '../types/IconName.ts'

const technologies: { icon: IconName; color: string; name: string; job: string }[] = [
  { icon: 'cpu', color: 'text-sunset', name: 'QVAC', job: 'Local AI and the layer split across devices with RPC servers' },
  { icon: 'wallet', color: 'text-gold', name: 'WDK', job: 'Self-custody Spark wallets that pay each helper' },
  { icon: 'link', color: 'text-rose', name: 'Pears', job: 'Encrypted peer links with Hyperswarm and the signed ledger with Hypercore' }
]

export function TechnologyCards() {
  return (
    <div className="grid-auto">
      {technologies.map((technology) => (
        <div key={technology.name} className="tech-card">
          <Icon name={technology.icon} size={26} className={technology.color} />
          <div className="stack">
            <strong className={`mono ${technology.color}`}>{technology.name}</strong>
            <span className="small muted">{technology.job}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
