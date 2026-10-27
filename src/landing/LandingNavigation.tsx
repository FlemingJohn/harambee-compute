import { Button } from '../components/Button.tsx'
import { Logo } from '../components/Logo.tsx'

export function LandingNavigation() {
  return (
    <nav aria-label="Main" className="landing-navigation">
      <a className="brand" href="#">
        <Logo size={36} />
        Harambee Compute
      </a>
      <div className="landing-navigation-links">
        <a className="navigation-link" href="#how">How it works</a>
        <a className="navigation-link" href="#stories">Who it's for</a>
        <a className="navigation-link" href="#proof">Proof</a>
        <Button variant="primary" href="#/join">Open the app</Button>
      </div>
    </nav>
  )
}
