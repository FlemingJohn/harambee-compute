import { AppScreen } from '../components/AppScreen.tsx'
import { Button } from '../components/Button.tsx'
import { Icon } from '../components/Icon.tsx'
import { ScreenTitle } from '../components/ScreenTitle.tsx'
import { DeviceTable } from '../devices/DeviceTable.tsx'
import { PendingDeviceBanner } from '../devices/PendingDeviceBanner.tsx'
import { formatGigabytes } from '../lib/formatGigabytes.ts'
import { reservedBytesPerDevice } from '../pool/reservedBytesPerDevice.ts'
import { sampleDevices } from '../sample/sampleDevices.ts'

export function DevicesScreen() {
  const shareableBytes = sampleDevices.reduce((sum, device) => sum + Math.max(0, device.freeBytes - reservedBytesPerDevice), 0)
  return (
    <AppScreen route="devices">
      <div className="row-spread">
        <ScreenTitle icon="devices" title="Devices in the pool">
          {sampleDevices.length} devices · {formatGigabytes(shareableBytes)} of memory to share
        </ScreenTitle>
        <Button>Add device by IP</Button>
      </div>
      <PendingDeviceBanner name="Lab-PC-11" summary="CPU · 2.0 GB free · used the invite code · app version matches" />
      <DeviceTable devices={sampleDevices} />
      <div className="columns">
        <p className="card card--outline row column-side small muted">
          <Icon name="layers" />
          Memory is measured by the app itself over RPC. {formatGigabytes(reservedBytesPerDevice)} stays free on each device for its own apps.
        </p>
        <p className="card card--outline row column-side small muted">
          <Icon name="shield" className="text-sage" />
          All links are encrypted. A device that did not use the code cannot reach any helper.
        </p>
      </div>
      <div className="row">
        <Button variant="primary" href="#/model" isLarge>Choose a model</Button>
      </div>
    </AppScreen>
  )
}
