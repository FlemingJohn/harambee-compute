import { Icon } from '../components/Icon.tsx'
import { formatGigabytes } from '../lib/formatGigabytes.ts'
import { reservedBytesPerDevice } from '../pool/reservedBytesPerDevice.ts'

export function DeviceNotes() {
  return (
    <div className="columns">
      <p className="card card--outline row column-side small muted">
        <Icon name="layers" />
        Memory is measured by the app itself over RPC. {formatGigabytes(reservedBytesPerDevice)} stays free on each device for its own apps.
      </p>
      <p className="card card--outline row column-side small muted">
        <Icon name="shield" className="text-sage" />
        Every helper is reached through an encrypted pipe that only this coordinator may open.
      </p>
    </div>
  )
}
