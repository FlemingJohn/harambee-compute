import type { StatusTone } from '../types/StatusTone.ts'

export function StatusPill({ tone, label }: { tone: StatusTone; label: string }) {
  return <span className={`pill pill--${tone}`}>{label}</span>
}
