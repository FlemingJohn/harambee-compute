import { Button } from '../components/Button.tsx'
import { ClosingIllustration } from './ClosingIllustration.tsx'

export function ClosingSection() {
  return (
    <section aria-labelledby="closing-title" className="landing-band">
      <div className="landing-section closing">
        <ClosingIllustration />
        <h2 id="closing-title" className="closing-title">The power was already in the room.</h2>
        <p className="section-lead">Pull the devices together and they become one AI that belongs to you.</p>
        <Button variant="primary" href="#/join" isLarge>Start a pool</Button>
      </div>
    </section>
  )
}
