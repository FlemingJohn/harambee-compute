import { AppScreen } from '../components/AppScreen.tsx'
import { NextStepBar } from '../components/NextStepBar.tsx'
import { NotConnectedScreen } from '../components/NotConnectedScreen.tsx'
import { ScreenTitle } from '../components/ScreenTitle.tsx'
import { useCoordinator } from '../hooks/useCoordinator.ts'
import { CreatePoolCard } from '../join/CreatePoolCard.tsx'
import { JoinPoolCard } from '../join/JoinPoolCard.tsx'
import { JoinSteps } from '../join/JoinSteps.tsx'

export function JoinScreen() {
  const { state } = useCoordinator()
  if (!state) return <NotConnectedScreen route="join" />
  const waitingCount = state.pendingDevices.length
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
        <CreatePoolCard inviteCode={state.inviteCode} waitingCount={waitingCount} />
        <JoinPoolCard inviteCode={state.inviteCode} />
      </div>
      <NextStepBar nextRoute="devices" text={nextText} />
    </AppScreen>
  )
}
