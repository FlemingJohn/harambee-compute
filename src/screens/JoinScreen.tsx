import { AppScreen } from '../components/AppScreen.tsx'
import { ScreenTitle } from '../components/ScreenTitle.tsx'
import { useCoordinator } from '../hooks/useCoordinator.ts'
import { CreatePoolCard } from '../join/CreatePoolCard.tsx'
import { JoinPoolCard } from '../join/JoinPoolCard.tsx'
import { JoinSteps } from '../join/JoinSteps.tsx'

const sampleInviteCode = 'HARAMBEE-7F3K-92QX@192.168.43.10:49737'

export function JoinScreen() {
  const { state } = useCoordinator()
  const inviteCode = state?.inviteCode ?? sampleInviteCode
  return (
    <AppScreen route="join">
      <ScreenTitle icon="link" title="Start or join a pool">
        Every device must be on the same Wi-Fi or phone hotspot. No internet needed.
      </ScreenTitle>
      <div className="columns">
        <CreatePoolCard inviteCode={inviteCode} waitingCount={state?.pendingDevices.length ?? 0} />
        <JoinPoolCard inviteCode={inviteCode} />
      </div>
      <JoinSteps />
    </AppScreen>
  )
}
