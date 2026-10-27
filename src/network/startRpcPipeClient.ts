import type HyperDHT from 'hyperdht'
import net from 'node:net'
import { pipeStreams } from './pipeStreams.ts'

export async function startRpcPipeClient(
  dht: HyperDHT,
  keyPair: { publicKey: Buffer; secretKey: Buffer },
  remotePublicKey: string
): Promise<{ url: string; close: () => void }> {
  const remoteKey = Buffer.from(remotePublicKey, 'hex')
  const server = net.createServer((socket) => pipeStreams(socket, dht.connect(remoteKey, { keyPair })))
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  const address = server.address() as net.AddressInfo
  return { url: `127.0.0.1:${address.port}`, close: () => server.close() }
}
