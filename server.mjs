// Usage: node server.mjs <private-ipv4> <topic> [seconds] [port]
// Starts one QVAC RPC server, advertises it on <topic>, stops after [seconds] (default 900).
// Pass a fixed [port] when the server is reached through a tunnel (e.g. a forwarded Codespaces port).
import { startRpcServer, stopRpcServer, close } from '@qvac/sdk'

const [host = '127.0.0.1', topic = 'harambee-test', seconds = '900', port] = process.argv.slice(2)
let server
try {
  const loopback = host === '127.0.0.1'
  // Discovery only advertises private-network IPv4 endpoints, so skip it on loopback.
  // cache: keep received tensors on this server so a reload doesn't re-upload the layers.
  const base = { host, cache: true, ...(port ? { port: Number(port) } : {}) }
  server = await startRpcServer(loopback ? base : { ...base, allowNonLoopbackHost: true, discoveryTopic: topic })
  console.log(`SERVING ${server.url} id=${server.serverId} rdma=${server.rdmaCapable}`)
  await new Promise((resolve) => {
    const t = setTimeout(resolve, Number(seconds) * 1000)
    process.once('SIGINT', () => { clearTimeout(t); resolve() })
  })
} catch (err) {
  console.error('SERVER FAILED', err)
  process.exitCode = 1
} finally {
  if (server) await stopRpcServer({ serverId: server.serverId }).catch((e) => console.error('stop failed', e))
  await close()
}
