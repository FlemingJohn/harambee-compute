import type { ReactElement } from 'react'
import { EarnStepIllustration } from './EarnStepIllustration.tsx'
import { FeatureCard } from './FeatureCard.tsx'
import { JoinStepIllustration } from './JoinStepIllustration.tsx'
import { SectionHeading } from './SectionHeading.tsx'
import { SplitStepIllustration } from './SplitStepIllustration.tsx'

const steps: { picture: ReactElement; title: string; text: string }[] = [
  {
    picture: <JoinStepIllustration />,
    title: 'Join with one code',
    text: 'Everyone connects to the same phone hotspot. Helpers type the invite code or scan the QR, and the teacher approves them.'
  },
  {
    picture: <SplitStepIllustration />,
    title: 'Split by free memory',
    text: "The app measures each device's free memory and gives it a fair share of layers, using the fewest devices that fit."
  },
  {
    picture: <EarnStepIllustration />,
    title: 'Ask, and everyone earns',
    text: "Students ask from a phone browser. A signed ledger records each helper's work, and sats go out when there is internet."
  }
]

export function HowItWorksSection() {
  return (
    <section id="how" aria-labelledby="how-title" className="landing-band">
      <div className="landing-section">
        <SectionHeading id="how-title" icon="layers" eyebrow="HOW IT WORKS" title="Pull together, like a harambee.">
          Each device holds a few layers of one big model. A question passes through all of them, and the answer comes back.
        </SectionHeading>
        <ol className="steps grid-auto">
          {steps.map((step, position) => (
            <li key={step.title}>
              <FeatureCard picture={step.picture} title={<span className="step-heading"><span className="step-number">0{position + 1}</span>{step.title}</span>}>
                {step.text}
              </FeatureCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
