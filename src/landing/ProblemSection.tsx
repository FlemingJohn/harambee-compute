import { Icon } from '../components/Icon.tsx'
import type { IconName } from '../types/IconName.ts'
import { FeatureCard } from './FeatureCard.tsx'
import { SectionHeading } from './SectionHeading.tsx'

const problems: { icon: IconName; title: string; text: string }[] = [
  { icon: 'offline', title: 'Cloud AI needs data', text: 'Every question costs bundles. When the internet drops, the lesson stops.' },
  { icon: 'shield', title: 'Student data leaves the school', text: 'Questions, names and essays go to servers in another country.' },
  { icon: 'laptop', title: 'One PC means a tiny model', text: 'A 4 GB machine can only run a small model, and small models get school questions wrong.' }
]

export function ProblemSection() {
  return (
    <section aria-labelledby="problem-title" className="landing-section">
      <SectionHeading id="problem-title" icon="warning" eyebrow="THE PROBLEM" title="A computer lab full of PCs, and still no good AI.">
        Picture a school lab: twenty PCs with 4 GB of memory each, no graphics card, and a data bundle that runs out fast.
        Each machine on its own is too weak for a useful AI.
      </SectionHeading>
      <div className="grid-auto">
        {problems.map((problem) => (
          <FeatureCard key={problem.title} picture={<Icon name={problem.icon} size={44} className="text-ember" />} title={problem.title}>
            {problem.text}
          </FeatureCard>
        ))}
      </div>
    </section>
  )
}
