import type { ModelChoice } from '../types/ModelChoice.ts'
import type { PoolDevice } from '../types/PoolDevice.ts'
import { ModelOption } from './ModelOption.tsx'

export function ModelPicker({
  models,
  devices,
  selectedModel,
  onSelect
}: {
  models: ModelChoice[]
  devices: PoolDevice[]
  selectedModel: ModelChoice
  onSelect: (model: ModelChoice) => void
}) {
  return (
    <fieldset className="card model-picker column-side">
      <legend className="label">Models</legend>
      {models.map((model, position) => (
        <ModelOption
          key={model.name}
          model={model}
          devices={devices}
          sizeTier={position + 1}
          isSelected={model.name === selectedModel.name}
          onSelect={() => onSelect(model)}
        />
      ))}
    </fieldset>
  )
}
