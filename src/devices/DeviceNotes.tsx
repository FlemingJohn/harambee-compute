import { InfoNote } from '../components/InfoNote.tsx'
import { formatGigabytes } from '../lib/formatGigabytes.ts'
import { reservedBytesPerDevice } from '../pool/reservedBytesPerDevice.ts'

export function DeviceNotes() {
  return (
    <div className="grid-auto">
      <InfoNote icon="layers">
        Memory is measured by the app itself over RPC. {formatGigabytes(reservedBytesPerDevice)} stays free on each device for its own apps.
      </InfoNote>
      <InfoNote icon="shield" iconClassName="text-sage">
        Every helper is reached through an encrypted pipe that only this coordinator may open.
      </InfoNote>
    </div>
  )
}
