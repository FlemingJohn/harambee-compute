import type { ScreenStep } from '../types/ScreenStep.ts'

export const screenSteps: ScreenStep[] = [
  { route: 'join', label: 'Pool setup', icon: 'link' },
  { route: 'devices', label: 'Devices', icon: 'devices' },
  { route: 'model', label: 'Model', icon: 'layers' },
  { route: 'chat', label: 'Chat', icon: 'chat' },
  { route: 'earnings', label: 'Earnings', icon: 'sats' }
]
