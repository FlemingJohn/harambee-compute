import { useState } from 'react'
import { AdviceList } from '../components/AdviceList.tsx'
import { NextStepBar } from '../components/NextStepBar.tsx'
import { ScreenTitle } from '../components/ScreenTitle.tsx'
import { usePoolPlan } from '../hooks/usePoolPlan.ts'
import { formatGigabytes } from '../lib/formatGigabytes.ts'
import { reservedBytesPerDevice } from '../pool/reservedBytesPerDevice.ts'
import type { ClientCommand } from '../types/ClientCommand.ts'
import type { CoordinatorState } from '../types/CoordinatorState.ts'
import type { ModelChoice } from '../types/ModelChoice.ts'
import { LayerSplitCard } from './LayerSplitCard.tsx'
import { ModelLoadBar } from './ModelLoadBar.tsx'
import { ModelPicker } from './ModelPicker.tsx'

export function ModelView({ state, models, send }: { state: CoordinatorState; models: ModelChoice[]; send: (command: ClientCommand) => void }) {
  const [pickedName, setPickedName] = useState<string | null>(null)
  const selectedModel = models.find((model) => model.name === (pickedName ?? state.modelName)) ?? models[0]!
  const plan = usePoolPlan(state.devices, selectedModel, models, state.isSpreading)
  const shareableBytes = state.devices.reduce((sum, device) => sum + Math.max(0, device.freeBytes - reservedBytesPerDevice), 0)
  const isSelectedModel = state.modelName === selectedModel.name
  const isAnyModelReady = state.modelStatus === 'ready'
  const nextText = isAnyModelReady ? `${state.modelName} is loaded. Ask your first question.` : 'Load a model first, then ask questions in Chat.'
  return (
    <>
      <ScreenTitle route="model" title="Choose a model">
        The pool has {formatGigabytes(shareableBytes)} to share. Fit is checked before anything is downloaded.
      </ScreenTitle>
      <div className="columns">
        <ModelPicker models={models} devices={state.devices} useEveryDevice={state.isSpreading} downloadedNames={state.downloadedModels} selectedModel={selectedModel} onSelect={(model) => setPickedName(model.name)} />
        <div className="column-main stack">
          <LayerSplitCard model={selectedModel} allocation={plan.allocation} devices={state.devices} />
          <AdviceList advice={plan.advice} />
          <ModelLoadBar
            modelName={selectedModel.name}
            status={isSelectedModel ? state.modelStatus : 'idle'}
            message={isSelectedModel ? state.modelMessage : 'Not loaded yet'}
            canLoad={plan.allocation.shortfallBytes === 0}
            onLoad={() => send({ type: 'load-model', modelName: selectedModel.name })}
          />
        </div>
      </div>
      <NextStepBar nextRoute="chat" text={nextText} isReady={isAnyModelReady} />
    </>
  )
}
