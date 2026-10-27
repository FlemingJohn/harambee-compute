import type { ReactElement } from 'react'
import { useRoute } from '../hooks/useRoute.ts'
import { ChatScreen } from '../screens/ChatScreen.tsx'
import { DevicesScreen } from '../screens/DevicesScreen.tsx'
import { EarningsScreen } from '../screens/EarningsScreen.tsx'
import { JoinScreen } from '../screens/JoinScreen.tsx'
import { LandingScreen } from '../screens/LandingScreen.tsx'
import { ModelScreen } from '../screens/ModelScreen.tsx'
import type { RouteName } from '../types/RouteName.ts'

const screens: Record<RouteName, () => ReactElement> = {
  landing: LandingScreen,
  join: JoinScreen,
  devices: DevicesScreen,
  model: ModelScreen,
  chat: ChatScreen,
  earnings: EarningsScreen
}

export function App() {
  const Screen = screens[useRoute()]
  return <Screen />
}
