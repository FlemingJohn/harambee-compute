import { Button } from '../components/Button.tsx'
import { HeroIllustration } from './HeroIllustration.tsx'
import { LandingNavigation } from './LandingNavigation.tsx'

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="hero">
      <div className="hero-inner">
        <LandingNavigation />
        <div className="hero-content">
          <div className="hero-text">
            <span className="harambee-tag">
              <span className="mono text-gold">HARAMBEE</span>
              Swahili for "let's all pull together"
            </span>
            <h1 id="hero-title" className="hero-title">
              Three old laptops.<br />One smart AI.<br /><span className="text-sunset">Zero internet.</span>
            </h1>
            <p className="hero-lead">
              Harambee Compute pools the computers a school already owns into one private AI that runs on a phone
              hotspot, and pays every device that helps.
            </p>
            <div className="row">
              <Button variant="primary" href="#/join" isLarge>Start a pool</Button>
              <Button href="#how" isLarge>See how it works</Button>
            </div>
          </div>
          <HeroIllustration />
        </div>
      </div>
    </section>
  )
}
