import { useContext } from 'react'
import { coordinatorContext } from '../lib/coordinatorContext.ts'
import type { CoordinatorConnection } from '../types/CoordinatorConnection.ts'

export function useCoordinator(): CoordinatorConnection {
  return useContext(coordinatorContext)
}
