import type { CoordinatorState } from '../types/CoordinatorState.ts'

const reconnectDelayMs = 2000

export function connectToCoordinator(
  onState: (state: CoordinatorState) => void,
  onConnectedChange: (isConnected: boolean) => void,
  onSocket: (socket: WebSocket) => void
): () => void {
  let isStopped = false
  let retryTimer: ReturnType<typeof setTimeout> | undefined
  let socket: WebSocket | null = null
  const connect = () => {
    socket = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/live`)
    onSocket(socket)
    socket.onopen = () => onConnectedChange(true)
    socket.onmessage = (event) => onState(JSON.parse(String(event.data)).state as CoordinatorState)
    socket.onclose = () => {
      onConnectedChange(false)
      if (!isStopped) retryTimer = setTimeout(connect, reconnectDelayMs)
    }
  }
  connect()
  return () => {
    isStopped = true
    clearTimeout(retryTimer)
    socket?.close()
  }
}
