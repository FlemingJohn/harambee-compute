import { startRpcServer, stopRpcServer } from '@qvac/sdk'

export async function startLocalRpcServer(): Promise<{ url: string; stop: () => Promise<void> }> {
  const server = await startRpcServer({ host: '127.0.0.1', cache: true })
  return { url: server.url, stop: () => stopRpcServer({ serverId: server.serverId }) }
}
