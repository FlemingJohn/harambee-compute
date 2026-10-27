import type { ReactNode } from 'react'
import type { RouteName } from '../types/RouteName.ts'
import { AppHeader } from './AppHeader.tsx'

export function AppScreen({ route, children }: { route: RouteName; children: ReactNode }) {
  return (
    <>
      <AppHeader currentRoute={route} />
      <main className="page">{children}</main>
    </>
  )
}
