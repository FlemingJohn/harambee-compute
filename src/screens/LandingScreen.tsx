import { ClosingSection } from '../landing/ClosingSection.tsx'
import { HeroSection } from '../landing/HeroSection.tsx'
import { HowItWorksSection } from '../landing/HowItWorksSection.tsx'
import { KeyFacts } from '../landing/KeyFacts.tsx'
import { LandingFooter } from '../landing/LandingFooter.tsx'
import { OfflineSection } from '../landing/OfflineSection.tsx'
import { ProblemSection } from '../landing/ProblemSection.tsx'
import { ProofSection } from '../landing/ProofSection.tsx'
import { StoriesSection } from '../landing/StoriesSection.tsx'

export function LandingScreen() {
  return (
    <>
      <HeroSection />
      <KeyFacts />
      <ProblemSection />
      <HowItWorksSection />
      <StoriesSection />
      <ProofSection />
      <OfflineSection />
      <ClosingSection />
      <LandingFooter />
    </>
  )
}
