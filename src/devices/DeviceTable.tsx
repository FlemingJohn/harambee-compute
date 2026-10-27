import type { PoolDevice } from '../types/PoolDevice.ts'
import { DeviceTableRow } from './DeviceTableRow.tsx'

export function DeviceTable({ devices }: { devices: PoolDevice[] }) {
  return (
    <section aria-label="Devices" className="card table-scroll device-table-card">
      <table className="device-table">
        <thead>
          <tr>
            <th scope="col">Device</th>
            <th scope="col">Type</th>
            <th scope="col">Memory free</th>
            <th scope="col">Address</th>
            <th scope="col">Status</th>
            <th scope="col"><span className="visually-hidden">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device, position) => (
            <DeviceTableRow key={device.id} device={device} position={position} />
          ))}
        </tbody>
      </table>
    </section>
  )
}
