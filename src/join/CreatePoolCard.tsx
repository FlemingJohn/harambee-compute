import { Button } from '../components/Button.tsx'
import { Icon } from '../components/Icon.tsx'
import { InviteQrCode } from './InviteQrCode.tsx'

export function CreatePoolCard() {
  return (
    <section aria-labelledby="create-title" className="card stack column-side">
      <h2 id="create-title" className="card-heading">
        <Icon name="laptop" size={28} className="text-sunset" />
        Create a pool
      </h2>
      <p className="muted small">This laptop runs the model and the screens. Share the code below with the helpers.</p>
      <div className="row">
        <InviteQrCode />
        <div className="stack">
          <span className="label">Invite code</span>
          <div className="invite-code">
            <span className="invite-code-value">HARAMBEE-7F3K-92QX</span>
            <span className="mono small muted">@ 192.168.43.10</span>
          </div>
          <div className="row">
            <Button>Copy code</Button>
            <Button variant="quiet">Make a new code</Button>
          </div>
        </div>
      </div>
      <div className="row-spread">
        <span className="pill pill--waiting">1 helper wants to join</span>
        <Button variant="primary" href="#/devices">Review devices</Button>
      </div>
    </section>
  )
}
