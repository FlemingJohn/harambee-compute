import type { ReactNode } from 'react'
import { screenSteps } from '../lib/screenSteps.ts'
import type { RouteName } from '../types/RouteName.ts'
import { Icon } from './Icon.tsx'

export function ScreenTitle({ route, title, children }: { route: RouteName; title: string; children?: ReactNode }) {
  const position = screenSteps.findIndex((step) => step.route === route)
  const icon = screenSteps[position]?.icon ?? 'link'
  return (
    <div className="screen-heading">
      <span className="icon-tile">
        <Icon name={icon} size={30} className={icon === 'sats' ? 'text-gold' : 'text-sunset'} />
      </span>
      <div className="stack screen-heading-text">
        <span className="label">Step {position + 1} of {screenSteps.length}</span>
        <h1 className="screen-title">{title}</h1>
        {children && <p className="muted">{children}</p>}
      </div>
    </div>
  )
}
