import { Icon } from '../components/Icon.tsx'

export function JoinPoolCard({ inviteCode }: { inviteCode: string }) {
  return (
    <section aria-labelledby="join-title" className="card stack column-side">
      <h2 id="join-title" className="card-heading">
        <Icon name="link" size={28} className="text-gold" />
        Join from a helper
      </h2>
      <p className="muted small">On each helper laptop, open the project folder and run this once. It lends spare memory and earns test sats.</p>
      <code className="command">npm run helper -- --code {inviteCode}</code>
      <p className="muted small">Add <span className="mono">--gpu</span> if the helper has a graphics card, and <span className="mono">--name Lab-PC-07</span> to give it a name.</p>
      <div className="card card--raised stack at-bottom">
        <strong>What a helper shares</strong>
        <ul className="share-list">
          <li><Icon name="layers" size={20} className="text-muted" />Spare memory and GPU or CPU time, to hold part of the model.</li>
          <li><Icon name="shield" size={20} className="text-sage" />Only this coordinator can reach it, over an encrypted link.</li>
          <li><Icon name="wallet" size={20} className="text-gold" />Its wallet address, so the coordinator can pay it.</li>
        </ul>
      </div>
    </section>
  )
}
