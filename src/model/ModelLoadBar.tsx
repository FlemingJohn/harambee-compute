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
  return (
    <div className="card stack">
      <div className="row">
        <StatusPill tone={tones[status]} label={labels[status]} />
        <span className="small muted">{message}</span>
      </div>
      <div className="row-spread">
        <span className="small muted">The first load sends each helper its layers. After that they load from the helper's cache.</span>
        <div className="row">
          {status === 'ready' && <Button href="#/chat">Go to chat</Button>}
          <Button variant="primary" isLarge isDisabled={!canLoad || status === 'loading'} onClick={onLoad}>
            {canLoad ? `Load ${modelName}` : 'Not enough memory'}
          </Button>
        </div>
      </div>
    </div>
  )
}
