import { Button } from '../components/Button.tsx'
import { StatusPill } from '../components/StatusPill.tsx'
import type { ModelStatus } from '../types/ModelStatus.ts'
import type { StatusTone } from '../types/StatusTone.ts'

const tones: Record<ModelStatus, StatusTone> = { idle: 'waiting', loading: 'waiting', ready: 'ready', failed: 'warning' }
const labels: Record<ModelStatus, string> = { idle: 'Not loaded', loading: 'Loading', ready: 'Ready', failed: 'Problem' }

export function ModelLoadBar({
  modelName,
  status,
  message,
  canLoad,
  onLoad
}: {
  modelName: string
  status: ModelStatus
  message: string
  canLoad: boolean
  onLoad: () => void
}) {
  const isLoaded = status === 'ready'
  return (
    <section aria-label="Load the model" className="card row-spread">
      <div className="stack load-status">
        <div className="row">
          <StatusPill tone={tones[status]} label={labels[status]} />
          <span className="small muted">{message}</span>
        </div>
        <span className="small muted">The first load sends each helper its layers. After that they load from the helper's cache.</span>
      </div>
      <Button variant={isLoaded ? 'secondary' : 'primary'} isLarge isDisabled={!canLoad || status === 'loading'} onClick={onLoad}>
        {getLoadLabel(modelName, canLoad, isLoaded)}
      </Button>
    </section>
  )
}

function getLoadLabel(modelName: string, canLoad: boolean, isLoaded: boolean): string {
  if (!canLoad) return 'Not enough memory'
  if (isLoaded) return 'Load again'
  return `Load ${modelName}`
}
