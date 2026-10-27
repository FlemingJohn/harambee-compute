import type { ModelChoice } from '../types/ModelChoice.ts'
import type { PoolDevice } from '../types/PoolDevice.ts'
import { ModelOption } from './ModelOption.tsx'

export function ModelPicker({
  models,
  devices,
  useEveryDevice,
  selectedModel,
  onSelect
}: {
  models: ModelChoice[]
  devices: PoolDevice[]
  useEveryDevice: boolean
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
          useEveryDevice={useEveryDevice}
          sizeTier={position + 1}
          isSelected={model.name === selectedModel.name}
          onSelect={() => onSelect(model)}
        />
      ))}
    </fieldset>
  )
}
