import { screenSteps } from '../lib/screenSteps.ts'
import type { RouteName } from '../types/RouteName.ts'
import { Icon } from './Icon.tsx'
import { Logo } from './Logo.tsx'

export function AppHeader({ currentRoute }: { currentRoute: RouteName }) {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <a className="brand" href="#">
          <Logo />
          Harambee Compute
        </a>
        <nav aria-label="Main" className="navigation">
          {screenSteps.map((step) => (
            <a
              key={step.route}
              href={`#/${step.route}`}
              aria-current={step.route === currentRoute ? 'page' : undefined}
              className={`navigation-link${step.route === currentRoute ? ' navigation-link--current' : ''}`}
            >
              <Icon name={step.icon} size={18} />
              {step.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
