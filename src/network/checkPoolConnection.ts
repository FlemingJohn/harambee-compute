import HyperDHT from 'hyperdht'
import { parseArgs } from 'node:util'
import { withTimeout } from '../lib/withTimeout.ts'
import { getPoolTopic } from './getPoolTopic.ts'
import { parseInviteCode } from './parseInviteCode.ts'

const { values } = parseArgs({ options: { code: { type: 'string' } } })
if (!values.code) {
  console.log('Run: npm run check -- --code HARAMBEE-XXXX-XXXX@host:port')
  process.exit(1)
}
const invite = parseInviteCode(values.code)
const dht = new HyperDHT({ bootstrap: [invite.bootstrapAddress] })

try {
  await withTimeout(dht.ready(), 15000, `no answer from the bootstrap at ${invite.bootstrapAddress}`)
  if (dht.toArray().length === 0) throw new Error(`could not reach the bootstrap at ${invite.bootstrapAddress}. Check the address and the coordinator`)
  console.log(`1. Bootstrap ${invite.bootstrapAddress}: reached`)
  const coordinators = await withTimeout(findCoordinators(getPoolTopic(invite.secret)), 20000, 'looking up the pool took too long')
  if (coordinators.length === 0) throw new Error('no coordinator is announcing this invite code. Check the code and that the coordinator is running')
  console.log(`2. Pool: ${coordinators.length} coordinator found for this invite code`)
  await withTimeout(connectOnce(coordinators[0]!), 20000, 'the encrypted connection did not open in 20 s')
  console.log('3. Encrypted connection to the coordinator: open. This laptop can join the pool.')
} catch (error) {
  console.log(`Stopped: ${(error as Error).message}`)
  process.exitCode = 1
} finally {
  await dht.destroy()
}

async function findCoordinators(topic: Buffer): Promise<Buffer[]> {
  const keys = new Map<string, Buffer>()
  for await (const result of dht.lookup(topic)) {
    for (const peer of result.peers) keys.set(peer.publicKey.toString('hex'), peer.publicKey)
  }
  return [...keys.values()]
}

function connectOnce(publicKey: Buffer): Promise<void> {
  return new Promise((resolve, reject) => {
    const socket = dht.connect(publicKey)
    socket.once('open', () => {
      socket.destroy()
      resolve()
    })
    socket.once('error', reject)
  })
}
