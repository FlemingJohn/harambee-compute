import type { ReactNode } from 'react'
import type { IconName } from '../types/IconName.ts'
import { Icon } from './Icon.tsx'

export function InfoNote({ icon, iconClassName, children }: { icon: IconName; iconClassName?: string; children: ReactNode }) {
  return (
    <p className="info-note small muted">
      <Icon name={icon} size={22} className={iconClassName} />
      <span>{children}</span>
    </p>
  )
}
