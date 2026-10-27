import { useState } from 'react'
import { AdviceList } from '../components/AdviceList.tsx'
import { AppScreen } from '../components/AppScreen.tsx'
import { Button } from '../components/Button.tsx'
import { ScreenTitle } from '../components/ScreenTitle.tsx'
import { usePoolPlan } from '../hooks/usePoolPlan.ts'
import { formatGigabytes } from '../lib/formatGigabytes.ts'
import { LayerSplitCard } from '../model/LayerSplitCard.tsx'
import { ModelPicker } from '../model/ModelPicker.tsx'
import { reservedBytesPerDevice } from '../pool/reservedBytesPerDevice.ts'
import { sampleDevices } from '../sample/sampleDevices.ts'
import { sampleModels } from '../sample/sampleModels.ts'

export function ModelScreen() {
  const [selectedModel, setSelectedModel] = useState(sampleModels[2]!)
  const plan = usePoolPlan(sampleDevices, selectedModel, sampleModels)
  const shareableBytes = sampleDevices.reduce((sum, device) => sum + Math.max(0, device.freeBytes - reservedBytesPerDevice), 0)
  const canLoad = plan.allocation.shortfallBytes === 0

  return (
    <AppScreen route="model">
      <ScreenTitle icon="layers" title="Choose a model">
        The pool has {formatGigabytes(shareableBytes)} to share. Fit is checked before anything is downloaded.
      </ScreenTitle>
      <div className="columns">
        <ModelPicker models={sampleModels} devices={sampleDevices} selectedModel={selectedModel} onSelect={setSelectedModel} />
        <div className="column-main stack">
          <LayerSplitCard model={selectedModel} allocation={plan.allocation} devices={sampleDevices} />
          <AdviceList advice={plan.advice} />
          <div className="row-spread">
            <span className="muted small">The first load sends each helper its layers. After that they load from the helper's cache.</span>
            {canLoad && <Button variant="primary" href="#/chat" isLarge>Load {selectedModel.name}</Button>}
            {!canLoad && <Button variant="primary" isLarge isDisabled>Not enough memory</Button>}
          </div>
        </div>
      </div>
    </AppScreen>
  )
}
