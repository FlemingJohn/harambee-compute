import { useState } from 'react'
import { AdviceList } from '../components/AdviceList.tsx'
import { AppScreen } from '../components/AppScreen.tsx'
import { ScreenTitle } from '../components/ScreenTitle.tsx'
import { useCoordinator } from '../hooks/useCoordinator.ts'
import { usePoolPlan } from '../hooks/usePoolPlan.ts'
import { formatGigabytes } from '../lib/formatGigabytes.ts'
import { LayerSplitCard } from '../model/LayerSplitCard.tsx'
import { ModelLoadBar } from '../model/ModelLoadBar.tsx'
import { ModelPicker } from '../model/ModelPicker.tsx'
import { reservedBytesPerDevice } from '../pool/reservedBytesPerDevice.ts'
import { sampleDevices } from '../sample/sampleDevices.ts'
import { sampleModels } from '../sample/sampleModels.ts'

export function ModelScreen() {
  const { state, send } = useCoordinator()
  const models = state?.models ?? sampleModels
  const devices = state?.devices ?? sampleDevices
  const isSpreading = state?.isSpreading ?? false
  const [pickedName, setPickedName] = useState<string | null>(null)
  const selectedModel = models.find((model) => model.name === (pickedName ?? state?.modelName)) ?? models[2] ?? models[0]!
  const plan = usePoolPlan(devices, selectedModel, models, isSpreading)
  const shareableBytes = devices.reduce((sum, device) => sum + Math.max(0, device.freeBytes - reservedBytesPerDevice), 0)
  return (
    <AppScreen route="model">
      <ScreenTitle icon="layers" title="Choose a model">
        The pool has {formatGigabytes(shareableBytes)} to share. Fit is checked before anything is downloaded.
      </ScreenTitle>
      <div className="columns">
        <ModelPicker models={models} devices={devices} useEveryDevice={isSpreading} selectedModel={selectedModel} onSelect={(model) => setPickedName(model.name)} />
        <div className="column-main stack">
          <LayerSplitCard model={selectedModel} allocation={plan.allocation} devices={devices} />
          <AdviceList advice={plan.advice} />
          <ModelLoadBar
            modelName={selectedModel.name}
            status={state?.modelName === selectedModel.name ? state.modelStatus : 'idle'}
            message={state?.modelName === selectedModel.name ? state.modelMessage : 'Not loaded yet'}
            canLoad={plan.allocation.shortfallBytes === 0}
            onLoad={() => send({ type: 'load-model', modelName: selectedModel.name })}
          />
        </div>
      </div>
    </AppScreen>
  )
}
