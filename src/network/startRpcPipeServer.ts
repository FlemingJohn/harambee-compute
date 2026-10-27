import HyperDHT from 'hyperdht'
import net from 'node:net'
import { pipeStreams } from './pipeStreams.ts'

export async function startRpcPipeServer(dht: HyperDHT, localRpcUrl: string, identitySeed?: Buffer) {
  const allowedKeys = new Set<string>()
  const [host, port] = splitAddress(localRpcUrl)
  const keyPair = HyperDHT.keyPair(identitySeed)
  const server = dht.createServer(
    { firewall: (remotePublicKey) => !allowedKeys.has(remotePublicKey.toString('hex')) },
    (stream) => pipeStreams(stream, net.connect(port, host))
  )
  await server.listen(keyPair)
  return {
    publicKey: keyPair.publicKey.toString('hex'),
    allow: (publicKey: string) => allowedKeys.add(publicKey),
    disallow: (publicKey: string) => allowedKeys.delete(publicKey),
    close: () => server.close()
  }
}

function splitAddress(address: string): [string, number] {
  const separator = address.lastIndexOf(':')
  return [address.slice(0, separator), Number(address.slice(separator + 1))]
}
