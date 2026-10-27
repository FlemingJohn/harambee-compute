import type { ReactNode } from 'react'
import { Icon } from '../components/Icon.tsx'
import type { IconName } from '../types/IconName.ts'

export function SectionHeading({
  id,
  icon,
  eyebrow,
  title,
  children
}: {
  id: string
  icon: IconName
  eyebrow: string
  title: string
  children?: ReactNode
}) {
  return (
    <div className="stack section-heading">
      <span className="eyebrow">
        <Icon name={icon} size={20} />
        {eyebrow}
      </span>
      <h2 id={id} className="section-title">{title}</h2>
      {children && <p className="section-lead">{children}</p>}
    </div>
  )
}
