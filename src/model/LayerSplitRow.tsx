import { MemoryMeter } from '../components/MemoryMeter.tsx'
import { formatGigabytes } from '../lib/formatGigabytes.ts'
import { getDeviceClass } from '../lib/getDeviceClass.ts'
import { reservedBytesPerDevice } from '../pool/reservedBytesPerDevice.ts'
import type { LayerShare } from '../types/LayerShare.ts'
import type { PoolDevice } from '../types/PoolDevice.ts'

export function LayerSplitRow({ device, devicePosition, share }: { device: PoolDevice; devicePosition: number; share: LayerShare }) {
  const usableBytes = device.freeBytes - reservedBytesPerDevice
  return (
    <div className={`split-row ${getDeviceClass(devicePosition)}`}>
      <span className="split-device">
        <span className="device-swatch" />
        <strong>{device.name}</strong>
      </span>
      <span className="small muted">{device.isGpu ? 'GPU, fastest' : 'CPU'}</span>
      <span className="split-usage">
        <MemoryMeter usedShare={share.bytes / usableBytes} />
        <span className="mono small muted">uses {formatGigabytes(share.bytes)} of {formatGigabytes(usableBytes)}</span>
      </span>
    </div>
  )
}
