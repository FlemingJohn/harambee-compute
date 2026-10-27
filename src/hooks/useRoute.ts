import { useEffect, useState } from 'react'
import { isRouteName } from '../lib/isRouteName.ts'
import type { RouteName } from '../types/RouteName.ts'

export function useRoute(): RouteName {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(readRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return route
}

function readRoute(): RouteName {
  const hash = window.location.hash
  if (!hash.startsWith('#/')) return 'landing'
  const name = hash.slice(2)
  return isRouteName(name) ? name : 'landing'
}
