import { Button } from '../components/Button.tsx'
import { Icon } from '../components/Icon.tsx'
import { Logo } from '../components/Logo.tsx'

export function LandingNavigation() {
  return (
    <nav aria-label="Main" className="landing-navigation">
      <a className="brand" href="#">
        <Logo size={36} />
        Harambee Compute
      </a>
      <div className="landing-navigation-links">
        <a className="navigation-link" href="#how"><Icon name="layers" size={18} />How it works</a>
        <a className="navigation-link" href="#stories"><Icon name="people" size={18} />Who it's for</a>
        <a className="navigation-link" href="#proof"><Icon name="chart" size={18} />Proof</a>
        <Button variant="primary" href="#/join">
          Open the app
          <Icon name="arrow" size={20} />
        </Button>
      </div>
    </nav>
  )
}
