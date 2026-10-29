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
  isDownloaded,
  isSelected,
  onSelect
}: {
  model: ModelChoice
  devices: PoolDevice[]
  useEveryDevice: boolean
  sizeTier: number
  isDownloaded: boolean
  isSelected: boolean
  onSelect: () => void
}) {
  const verdict = getFitVerdict(allocateLayers(devices, model, reservedBytesPerDevice, useEveryDevice))
  return (
    <label className={`model-option${isSelected ? ' model-option--selected' : ''}`}>
      <input type="radio" name="model" checked={isSelected} onChange={onSelect} />
      <ModelSizeIcon sizeTier={sizeTier} />
      <span className="model-option-text">
        <strong className="model-option-name">{model.name}</strong>
        <span className="small muted model-option-needs">
          Needs {formatGigabytes(model.requiredBytes)} · {model.layerCount} layers
        </span>
        <span className={`small model-option-download ${isDownloaded ? 'text-sage' : 'muted'}`}>
          {isDownloaded ? 'Downloaded · works offline' : 'Not downloaded yet'}
        </span>
        <StatusPill tone={verdict.tone} label={verdict.label} />
      </span>
    </label>
  )
}
