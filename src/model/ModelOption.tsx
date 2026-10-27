import { StatusPill } from '../components/StatusPill.tsx'
import { formatGigabytes } from '../lib/formatGigabytes.ts'
import { allocateLayers } from '../pool/allocateLayers.ts'
import { getFitVerdict } from '../pool/getFitVerdict.ts'
import { reservedBytesPerDevice } from '../pool/reservedBytesPerDevice.ts'
import type { ModelChoice } from '../types/ModelChoice.ts'
import type { PoolDevice } from '../types/PoolDevice.ts'
import { ModelSizeIcon } from './ModelSizeIcon.tsx'

export function ModelOption({
  model,
  devices,
  useEveryDevice,
  sizeTier,
  isSelected,
  onSelect
}: {
  model: ModelChoice
  devices: PoolDevice[]
  useEveryDevice: boolean
  sizeTier: number
  isSelected: boolean
  onSelect: () => void
}) {
  const verdict = getFitVerdict(allocateLayers(devices, model, reservedBytesPerDevice, useEveryDevice))
  return (
    <label className={`model-option${isSelected ? ' model-option--selected' : ''}`}>
      <input type="radio" name="model" checked={isSelected} onChange={onSelect} />
      <ModelSizeIcon sizeTier={sizeTier} />
      <span className="stack model-option-text">
        <strong>{model.name}</strong>
        <span className="small muted">
          needs <span className="mono">{formatGigabytes(model.requiredBytes)}</span> · <span className="mono">{model.layerCount}</span> layers
        </span>
      </span>
      <StatusPill tone={verdict.tone} label={verdict.label} />
    </label>
  )
}
