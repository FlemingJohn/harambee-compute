import type { RouteName } from '../types/RouteName.ts'
import { Logo } from './Logo.tsx'
import { OfflineBadge } from './OfflineBadge.tsx'

const screens: { route: RouteName; label: string }[] = [
  { route: 'join', label: 'Pool setup' },
  { route: 'devices', label: 'Devices' },
  { route: 'model', label: 'Model' },
  { route: 'chat', label: 'Chat' },
  { route: 'earnings', label: 'Earnings' }
]

export function AppHeader({ currentRoute }: { currentRoute: RouteName }) {
  return (
    <header className="app-header">
      <a className="brand" href="#">
        <Logo />
        Harambee Compute
      </a>
      <nav aria-label="Main" className="navigation">
        {screens.map((screen) => (
          <a
            key={screen.route}
            href={`#/${screen.route}`}
            aria-current={screen.route === currentRoute ? 'page' : undefined}
            className={`navigation-link${screen.route === currentRoute ? ' navigation-link--current' : ''}`}
          >
            {screen.label}
          </a>
        ))}
      </nav>
      <OfflineBadge />
    </header>
  )
}
