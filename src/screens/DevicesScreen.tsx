import { AppScreen } from '../components/AppScreen.tsx'
import { NextStepBar } from '../components/NextStepBar.tsx'
import { NotConnectedScreen } from '../components/NotConnectedScreen.tsx'
import { ScreenTitle } from '../components/ScreenTitle.tsx'
import { DeviceNotes } from '../devices/DeviceNotes.tsx'
import { DeviceTable } from '../devices/DeviceTable.tsx'
import { PendingDeviceBanner } from '../devices/PendingDeviceBanner.tsx'
import { useCoordinator } from '../hooks/useCoordinator.ts'
import { formatGigabytes } from '../lib/formatGigabytes.ts'
import { reservedBytesPerDevice } from '../pool/reservedBytesPerDevice.ts'

export function DevicesScreen() {
  const { state, send } = useCoordinator()
  if (!state) return <NotConnectedScreen route="devices" />
  const { devices, pendingDevices } = state
  const shareableBytes = devices.reduce((sum, device) => sum + Math.max(0, device.freeBytes - reservedBytesPerDevice), 0)
  return (
    <AppScreen route="devices">
      <ScreenTitle route="devices" title="Devices in the pool">
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
      <NextStepBar nextRoute="model" text={`Pick a model that fits the ${formatGigabytes(shareableBytes)} the pool can share.`} />
    </AppScreen>
  )
}
