import { Button } from '../components/Button.tsx'
import { Icon } from '../components/Icon.tsx'
import { MemoryMeter } from '../components/MemoryMeter.tsx'
import { StatusPill } from '../components/StatusPill.tsx'
import { formatGigabytes } from '../lib/formatGigabytes.ts'
import { getDeviceClass } from '../lib/getDeviceClass.ts'
import type { PoolDevice } from '../types/PoolDevice.ts'

export function DeviceTableRow({ device, position }: { device: PoolDevice; position: number }) {
  const isCoordinator = position === 0
  return (
    <tr className={getDeviceClass(position)}>
      <td>
        <div className="row">
          <span className="device-swatch" />
          <div className="stack device-name">
            <strong>{device.name}</strong>
            <span className="small muted">{isCoordinator ? 'You · coordinator' : 'Helper'}</span>
          </div>
        </div>
      </td>
      <td>
        <span className="row">
          <Icon name={device.isGpu ? 'gpu' : 'cpu'} size={20} className={device.isGpu ? 'text-sunset' : undefined} />
          {device.isGpu ? 'GPU' : 'CPU'}
        </span>
      </td>
      <td>
        <div className="stack device-memory">
          <span className="mono">{formatGigabytes(device.freeBytes)} of {formatGigabytes(device.totalBytes)}</span>
          <MemoryMeter usedShare={device.freeBytes / device.totalBytes} />
        </div>
      </td>
      <td className="mono small muted">{device.url}</td>
      <td><StatusPill tone="ready" label="Ready" /></td>
      <td>{!isCoordinator && <Button variant="danger">Remove</Button>}</td>
    </tr>
  )
}
