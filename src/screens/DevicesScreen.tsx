import { AppScreen } from '../components/AppScreen.tsx'
import { Button } from '../components/Button.tsx'
import { ScreenTitle } from '../components/ScreenTitle.tsx'
import { DeviceNotes } from '../devices/DeviceNotes.tsx'
import { DeviceTable } from '../devices/DeviceTable.tsx'
import { PendingDeviceBanner } from '../devices/PendingDeviceBanner.tsx'
import { useCoordinator } from '../hooks/useCoordinator.ts'
import { formatGigabytes } from '../lib/formatGigabytes.ts'
import { reservedBytesPerDevice } from '../pool/reservedBytesPerDevice.ts'
import { sampleDevices } from '../sample/sampleDevices.ts'

const samplePending = [{ id: 'lab-pc-11', name: 'Lab-PC-11', isGpu: false }]

export function DevicesScreen() {
  const { state, send } = useCoordinator()
  const devices = state?.devices ?? sampleDevices
  const pendingDevices = state?.pendingDevices ?? samplePending
  const shareableBytes = devices.reduce((sum, device) => sum + Math.max(0, device.freeBytes - reservedBytesPerDevice), 0)
  return (
    <AppScreen route="devices">
      <ScreenTitle icon="devices" title="Devices in the pool">
        {devices.length} {devices.length === 1 ? 'device' : 'devices'} · {formatGigabytes(shareableBytes)} of memory to share
      </ScreenTitle>
      {pendingDevices.map((device) => (
        <PendingDeviceBanner
          key={device.id}
          device={device}
          onApprove={() => send({ type: 'approve-device', deviceId: device.id })}
          onReject={() => send({ type: 'reject-device', deviceId: device.id })}
        />
      ))}
      <DeviceTable devices={devices} onRemove={(deviceId) => send({ type: 'remove-device', deviceId })} />
      <DeviceNotes />
      <div className="row">
        <Button variant="primary" href="#/model" isLarge>Choose a model</Button>
      </div>
    </AppScreen>
  )
}
