import type { RouteName } from '../types/RouteName.ts'
import { routeNames } from './routeNames.ts'

export function isRouteName(value: string): value is RouteName {
  return (routeNames as string[]).includes(value)
}
