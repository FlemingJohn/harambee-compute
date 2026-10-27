import { createContext } from 'react'
import type { CoordinatorConnection } from '../types/CoordinatorConnection.ts'

export const coordinatorContext = createContext<CoordinatorConnection>({ state: null, isConnected: false, send: () => undefined })
