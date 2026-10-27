import { screenSteps } from '../lib/screenSteps.ts'
import type { RouteName } from '../types/RouteName.ts'
import { Button } from './Button.tsx'
import { Icon } from './Icon.tsx'

export function NextStepBar({ nextRoute, text, isReady = true }: { nextRoute: RouteName; text: string; isReady?: boolean }) {
  const step = screenSteps.find((screenStep) => screenStep.route === nextRoute) ?? screenSteps[0]!
  return (
    <section aria-label="Next step" className="next-step">
      <span className="icon-tile icon-tile--small">
        <Icon name={step.icon} className="text-sunset" />
      </span>
      <div className="stack next-step-text">
        <strong>Next: {step.label}</strong>
        <span className="small muted">{text}</span>
      </div>
      <Button variant={isReady ? 'primary' : 'secondary'} href={`#/${nextRoute}`} isLarge>
        Go to {step.label}
        <Icon name="arrow" size={20} />
      </Button>
    </section>
  )
}
