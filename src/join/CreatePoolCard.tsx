import { Button } from '../components/Button.tsx'
import { Icon } from '../components/Icon.tsx'
import { InviteQrCode } from './InviteQrCode.tsx'

export function CreatePoolCard({ inviteCode, waitingCount }: { inviteCode: string; waitingCount: number }) {
  const [secret, address] = inviteCode.split('@')
  return (
    <section aria-labelledby="create-title" className="card stack column-side">
      <h2 id="create-title" className="card-heading">
        <Icon name="laptop" size={28} className="text-sunset" />
        Your pool
      </h2>
      <p className="muted small">This laptop runs the model and the screens. Share the invite code with the helpers.</p>
      <div className="row">
        <InviteQrCode text={inviteCode} />
        <div className="stack">
          <span className="label">Invite code</span>
          <div className="invite-code">
            <span className="invite-code-value">{secret}</span>
            <span className="mono small muted">@ {address}</span>
          </div>
          <Button onClick={() => void navigator.clipboard?.writeText(inviteCode)}>Copy code</Button>
        </div>
      </div>
      <div className="row-spread">
        {waitingCount > 0 && <span className="pill pill--waiting">{waitingCount} waiting to join</span>}
        {waitingCount === 0 && <span className="small muted">No helpers waiting yet</span>}
        <Button variant="primary" href="#/devices">Review devices</Button>
      </div>
    </section>
  )
}
