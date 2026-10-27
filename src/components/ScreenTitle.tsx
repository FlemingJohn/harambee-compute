import type { ReactNode } from 'react'
import { screenSteps } from '../lib/screenSteps.ts'
import type { RouteName } from '../types/RouteName.ts'
import { Icon } from './Icon.tsx'

export function ScreenTitle({ route, title, children }: { route: RouteName; title: string; children?: ReactNode }) {
  const icon = screenSteps.find((step) => step.route === route)?.icon ?? 'link'
  return (
    <div className="screen-heading">
      <span className="icon-tile">
        <Icon name={icon} size={30} className={icon === 'sats' ? 'text-gold' : 'text-sunset'} />
      </span>
      <div className="stack screen-heading-text">
        <h1 className="screen-title">{title}</h1>
        {children && <p className="muted">{children}</p>}
      </div>
    </div>
  )
}
