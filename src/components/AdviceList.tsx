import type { Advice } from '../types/Advice.ts'
import { Icon } from './Icon.tsx'

export function AdviceList({ advice }: { advice: Advice[] }) {
  return (
    <section aria-labelledby="advice-title" className="card stack">
      <h2 id="advice-title" className="row card-title">
        <Icon name="advice" className="text-gold" />
        Advice
      </h2>
      {advice.length === 0 && <p className="muted">The pool is a good fit for this model.</p>}
      {advice.map((item) => (
        <div key={item.kind} className="card card--raised stack advice-item">
          <strong>{item.title}</strong>
          <span className="muted small">{item.detail}</span>
        </div>
      ))}
    </section>
  )
}
