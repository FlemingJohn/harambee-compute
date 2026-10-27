import { useCallback, useEffect, useRef, useState } from 'react'
import { connectToCoordinator } from '../lib/connectToCoordinator.ts'
import type { ClientCommand } from '../types/ClientCommand.ts'
import type { CoordinatorConnection } from '../types/CoordinatorConnection.ts'
import type { CoordinatorState } from '../types/CoordinatorState.ts'

export function useCoordinatorConnection(): CoordinatorConnection {
  const [state, setState] = useState<CoordinatorState | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => connectToCoordinator(setState, setIsConnected, (socket) => (socketRef.current = socket)), [])

  const send = useCallback((command: ClientCommand) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) socketRef.current.send(JSON.stringify(command))
  }, [])

  return { state, isConnected, send }
}
