import type { ReactNode } from 'react'
import type { RouteName } from '../types/RouteName.ts'
import { AppHeader } from './AppHeader.tsx'
import { ConnectionNotice } from './ConnectionNotice.tsx'

export function AppScreen({ route, children }: { route: RouteName; children: ReactNode }) {
  return (
    <>
      <AppHeader currentRoute={route} />
      <main className="page">
        <ConnectionNotice />
        {children}
      </main>
    </>
  )
}
