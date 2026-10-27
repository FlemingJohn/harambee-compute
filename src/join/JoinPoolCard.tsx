import { Button } from '../components/Button.tsx'
import { Icon } from '../components/Icon.tsx'

export function JoinPoolCard() {
  return (
    <section aria-labelledby="join-title" className="card stack column-side">
      <h2 id="join-title" className="card-heading">
        <Icon name="link" size={28} className="text-gold" />
        Join a pool
      </h2>
      <p className="muted small">Lend this laptop's memory to a pool and earn test sats for the work it does.</p>
      <label htmlFor="invite-code" className="small">Invite code</label>
      <input id="invite-code" className="text-input" type="text" placeholder="HARAMBEE-XXXX-XXXX @ 192.168.x.x" />
      <div className="row">
        <Button variant="primary">Join pool</Button>
        <Button>
          <Icon name="qr" size={18} />
          Scan QR
        </Button>
      </div>
      <div className="card card--raised stack">
        <strong>What this laptop shares</strong>
        <ul className="share-list">
          <li><Icon name="layers" size={20} className="text-muted" />Spare memory and GPU or CPU time, to hold part of the model.</li>
          <li><Icon name="shield" size={20} className="text-sage" />Only the coordinator can reach it, over an encrypted link.</li>
          <li><Icon name="wallet" size={20} className="text-gold" />Its wallet address, so the coordinator can pay it.</li>
        </ul>
      </div>
    </section>
  )
}
