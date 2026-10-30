import { useCoordinator } from '../hooks/useCoordinator.ts'
import { Icon } from './Icon.tsx'

export function ConnectionNotice() {
  const { state, isConnected } = useCoordinator()
  if (isConnected || !state) return null
  return (
    <p className="card card--raised row small muted" role="status">
      <Icon name="warning" size={18} className="text-sunset" />
      Lost the connection to the coordinator. Reconnecting…
    </p>
  )
}
