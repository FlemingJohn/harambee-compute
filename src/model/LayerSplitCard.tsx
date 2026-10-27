import { LayerBar } from '../components/LayerBar.tsx'
import type { Allocation } from '../types/Allocation.ts'
import type { ModelChoice } from '../types/ModelChoice.ts'
import type { PoolDevice } from '../types/PoolDevice.ts'
import { LayerSplitRow } from './LayerSplitRow.tsx'

export function LayerSplitCard({ model, allocation, devices }: { model: ModelChoice; allocation: Allocation; devices: PoolDevice[] }) {
  const rows = allocation.shares.map((share) => {
    const devicePosition = devices.findIndex((device) => device.id === share.deviceId)
    return { share, device: devices[devicePosition]!, devicePosition }
  })
  const segments = rows.map((row) => ({ label: row.device.name, layerCount: row.share.layerCount, devicePosition: row.devicePosition }))
  return (
    <section aria-labelledby="split-title" className="card stack">
      <div className="row-spread">
        <h2 id="split-title" className="card-title">Layer split · {model.name}</h2>
        <span className="small muted">{model.layerCount} layers on {rows.length} {rows.length === 1 ? 'device' : 'devices'}</span>
      </div>
      {rows.length === 0 && <p className="text-ember">The pool does not have enough memory for this model yet.</p>}
      {rows.length > 0 && <LayerBar segments={segments} />}
      {rows.map((row) => (
        <LayerSplitRow key={row.device.id} device={row.device} devicePosition={row.devicePosition} share={row.share} />
      ))}
    </section>
  )
}
