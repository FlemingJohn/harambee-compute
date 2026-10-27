import { createServer } from 'node:http'
import { WebSocketServer, type WebSocket } from 'ws'
import type { ClientCommand } from '../types/ClientCommand.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import { handleClientCommand } from './handleClientCommand.ts'
import { isAllowedOrigin } from './isAllowedOrigin.ts'
import { serveStaticFile } from './serveStaticFile.ts'

const broadcastDelayMs = 60

export async function startWebServer(runtime: CoordinatorRuntime): Promise<void> {
  const { webPort, pagesPath } = runtime.options
  const server = createServer((request, response) => serveStaticFile(pagesPath, request, response))
  const sockets = new WebSocketServer({
    server,
    path: '/live',
    verifyClient: ({ origin }: { origin: string }) => isAllowedOrigin(origin, webPort)
  })
  sockets.on('connection', (socket) => {
    sendState(socket, runtime)
    socket.on('message', (data) => runCommand(runtime, data.toString()))
  })
  broadcastChanges(runtime, sockets)
  await new Promise<void>((resolve) => server.listen(webPort, '127.0.0.1', resolve))
}

function runCommand(runtime: CoordinatorRuntime, text: string): void {
  try {
    void Promise.resolve(handleClientCommand(runtime, JSON.parse(text) as ClientCommand)).catch((error: Error) => console.log(error.message))
  } catch {
    return
  }
}

function broadcastChanges(runtime: CoordinatorRuntime, sockets: WebSocketServer): void {
  let timer: NodeJS.Timeout | null = null
  runtime.store.subscribe(() => {
    timer ??= setTimeout(() => {
      timer = null
      for (const socket of sockets.clients) sendState(socket, runtime)
    }, broadcastDelayMs)
  })
}

function sendState(socket: WebSocket, runtime: CoordinatorRuntime): void {
  if (socket.readyState === socket.OPEN) socket.send(JSON.stringify({ type: 'state', state: runtime.store.get() }))
}
