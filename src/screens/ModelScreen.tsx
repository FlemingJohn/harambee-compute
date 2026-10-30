import { AppScreen } from '../components/AppScreen.tsx'
import { NotConnectedScreen } from '../components/NotConnectedScreen.tsx'
import { useCoordinator } from '../hooks/useCoordinator.ts'
import { ModelView } from '../model/ModelView.tsx'

export function ModelScreen() {
  const { state, send } = useCoordinator()
  if (!state || state.models.length === 0) return <NotConnectedScreen route="model" />
  return (
    <AppScreen route="model">
      <ModelView state={state} models={state.models} send={send} />
    </AppScreen>
  )
}
