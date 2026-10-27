import { Icon } from '../components/Icon.tsx'
import { SectionHeading } from './SectionHeading.tsx'
import { TechnologyCards } from './TechnologyCards.tsx'

export function OfflineSection() {
  return (
    <section aria-labelledby="offline-title" className="landing-section">
      <SectionHeading id="offline-title" icon="offline" eyebrow="OFFLINE FIRST" title="What needs the internet? Almost nothing." />
      <div className="grid-auto">
        <div className="card stack offline-good">
          <span className="row small text-sage"><Icon name="check" size={22} />WORKS OFFLINE</span>
          <ul className="plain-list">
            <li>Every AI answer, made by QVAC on your devices</li>
            <li>Finding devices and splitting the model</li>
            <li>Encrypted links between devices</li>
            <li>The signed work ledger</li>
          </ul>
        </div>
        <div className="card stack">
          <span className="row small text-gold"><Icon name="offline" size={22} />NEEDS INTERNET, ONCE IN A WHILE</span>
          <ul className="plain-list">
            <li>Downloading a model the first time</li>
            <li>Sending the queued payouts on Spark</li>
          </ul>
        </div>
      </div>
      <TechnologyCards />
    </section>
  )
}
