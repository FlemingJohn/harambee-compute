import type { ReactNode } from 'react'

export function FeatureCard({ picture, title, children }: { picture: ReactNode; title: ReactNode; children: ReactNode }) {
  return (
    <div className="feature-card">
      {picture}
      <strong className="feature-title">{title}</strong>
      <span className="feature-text">{children}</span>
    </div>
  )
}
