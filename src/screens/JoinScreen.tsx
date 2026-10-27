import { AppScreen } from '../components/AppScreen.tsx'
import { NextStepBar } from '../components/NextStepBar.tsx'
import { ScreenTitle } from '../components/ScreenTitle.tsx'
import { useCoordinator } from '../hooks/useCoordinator.ts'
import { CreatePoolCard } from '../join/CreatePoolCard.tsx'
import { JoinPoolCard } from '../join/JoinPoolCard.tsx'
import { JoinSteps } from '../join/JoinSteps.tsx'

const sampleInviteCode = 'HARAMBEE-7F3K-92QX@192.168.43.10:49737'

export function JoinScreen() {
  const { state } = useCoordinator()
  const inviteCode = state?.inviteCode ?? sampleInviteCode
  const waitingCount = state?.pendingDevices.length ?? 0
  const nextText = waitingCount > 0
    ? `${waitingCount} ${waitingCount === 1 ? 'helper is' : 'helpers are'} waiting for you to approve them.`
    : 'Approve each helper that joins, and see how much memory the pool can share.'
  return (
    <AppScreen route="join">
      <ScreenTitle route="join" title="Start or join a pool">
        Every device must be on the same Wi-Fi or phone hotspot. No internet needed.
      </ScreenTitle>
      <JoinSteps />
      <div className="columns">
        <CreatePoolCard inviteCode={inviteCode} waitingCount={waitingCount} />
        <JoinPoolCard inviteCode={inviteCode} />
      </div>
      <NextStepBar nextRoute="devices" text={nextText} />
    </AppScreen>
  )
}
