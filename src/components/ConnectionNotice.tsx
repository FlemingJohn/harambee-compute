import { useCoordinator } from '../hooks/useCoordinator.ts'
import { Icon } from './Icon.tsx'

export function ConnectionNotice() {
  const { isConnected } = useCoordinator()
  if (isConnected) return null
  return (
    <p className="card card--raised row small muted" role="status">
      <Icon name="warning" size={18} className="text-sunset" />
      Showing sample data. Start the pool with <span className="mono">npm run coordinator</span> to see live devices.
    </p>
  )
}
