import type { IconName } from './IconName.ts'
import type { RouteName } from './RouteName.ts'

export interface ScreenStep {
  route: RouteName
  label: string
  icon: IconName
}
