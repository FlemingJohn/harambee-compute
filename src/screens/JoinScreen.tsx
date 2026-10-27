import { AppScreen } from '../components/AppScreen.tsx'
import { ScreenTitle } from '../components/ScreenTitle.tsx'
import { CreatePoolCard } from '../join/CreatePoolCard.tsx'
import { JoinPoolCard } from '../join/JoinPoolCard.tsx'
import { JoinSteps } from '../join/JoinSteps.tsx'

export function JoinScreen() {
  return (
    <AppScreen route="join">
      <ScreenTitle icon="link" title="Start or join a pool">
        Every device must be on the same Wi-Fi or phone hotspot. No internet needed.
      </ScreenTitle>
      <div className="columns">
        <CreatePoolCard />
        <JoinPoolCard />
      </div>
      <JoinSteps />
    </AppScreen>
  )
}
