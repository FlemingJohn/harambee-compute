import { Button } from '../components/Button.tsx'
import { Icon } from '../components/Icon.tsx'
import type { PendingDevice } from '../types/PendingDevice.ts'

export function PendingDeviceBanner({ device, onApprove, onReject }: { device: PendingDevice; onApprove: () => void; onReject: () => void }) {
  return (
    <section aria-label={`${device.name} is waiting for approval`} className="pending-device">
      <div className="row">
        <Icon name="laptop" size={28} className="text-sunset" />
        <div className="stack">
          <strong>{device.name} wants to join</strong>
          <span className="muted small">{device.isGpu ? 'GPU' : 'CPU'} · used the invite code · memory is read after approval</span>
        </div>
      </div>
      <div className="row">
        <Button variant="primary" onClick={onApprove}>Approve</Button>
        <Button onClick={onReject}>Reject</Button>
      </div>
    </section>
  )
}
