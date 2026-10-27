import { Icon } from '../components/Icon.tsx'
import type { IconName } from '../types/IconName.ts'

const steps: { icon: IconName; text: string }[] = [
  { icon: 'hotspot', text: 'Everyone joins the same hotspot' },
  { icon: 'link', text: 'Helpers type the code or scan the QR' },
  { icon: 'check', text: 'The coordinator approves each device' }
]

export function JoinSteps() {
  return (
    <ol aria-label="How joining works" className="steps grid-auto">
      {steps.map((step, position) => (
        <li key={step.text} className="step">
          <span className="step-number">{position + 1}</span>
          <Icon name={step.icon} />
          {step.text}
        </li>
      ))}
    </ol>
  )
}
