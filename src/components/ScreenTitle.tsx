import type { ReactNode } from 'react'
import type { IconName } from '../types/IconName.ts'
import { Icon } from './Icon.tsx'

export function ScreenTitle({ icon, title, children }: { icon: IconName; title: string; children?: ReactNode }) {
  return (
    <div className="stack">
      <h1 className="screen-title">
        <span className="icon-tile">
          <Icon name={icon} size={30} className={icon === 'sats' ? 'text-gold' : 'text-sunset'} />
        </span>
        {title}
      </h1>
      {children && <p className="muted">{children}</p>}
    </div>
  )
}
