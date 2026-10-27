import { Button } from '../components/Button.tsx'
import { Icon } from '../components/Icon.tsx'

export function PendingDeviceBanner({ name, summary }: { name: string; summary: string }) {
  return (
    <section aria-label="Device waiting for approval" className="pending-device">
      <div className="row">
        <Icon name="laptop" size={28} className="text-sunset" />
        <div className="stack">
          <strong>{name} wants to join</strong>
          <span className="muted small">{summary}</span>
        </div>
      </div>
      <div className="row">
        <Button variant="primary">Approve</Button>
        <Button>Reject</Button>
      </div>
    </section>
  )
}
