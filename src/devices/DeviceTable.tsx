import type { PoolDevice } from '../types/PoolDevice.ts'
import { DeviceTableRow } from './DeviceTableRow.tsx'

export function DeviceTable({ devices, onRemove }: { devices: PoolDevice[]; onRemove: (deviceId: string) => void }) {
  return (
    <section aria-label="Devices" className="card table-scroll device-table-card">
      <table className="device-table">
        <thead>
          <tr>
            <th scope="col">Device</th>
            <th scope="col">Type</th>
            <th scope="col">Memory free</th>
            <th scope="col">Reached at</th>
            <th scope="col">Status</th>
            <th scope="col"><span className="visually-hidden">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device, position) => (
            <DeviceTableRow key={device.id} device={device} position={position} onRemove={() => onRemove(device.id)} />
          ))}
        </tbody>
      </table>
    </section>
  )
}
