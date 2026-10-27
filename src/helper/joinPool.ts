import Hyperswarm from 'hyperswarm'
import { join } from 'node:path'
import { getPoolTopic } from '../network/getPoolTopic.ts'
import { loadOrMakeIdentitySeed } from '../network/loadOrMakeIdentitySeed.ts'
import { startRpcPipeServer } from '../network/startRpcPipeServer.ts'
import type { HelperOptions } from '../types/HelperOptions.ts'
import type { PoolSession } from '../types/PoolSession.ts'
import { answerCoordinator } from './answerCoordinator.ts'

export async function joinPool(options: HelperOptions, rpcUrl: string, walletAddress: string): Promise<PoolSession> {
  const swarm = new Hyperswarm({ bootstrap: [options.invite.bootstrapAddress] })
  const pipe = await startRpcPipeServer(swarm.dht, rpcUrl, loadOrMakeIdentitySeed(join(options.dataPath, 'identity.key')))
  const hello = { type: 'hello' as const, name: options.name, pipePublicKey: pipe.publicKey, walletAddress, isGpu: options.isGpu, selfToken: options.selfToken }
  let coordinatorCount = 0
  swarm.on('connection', (connection) => {
    coordinatorCount += 1
    connection.on('close', () => (coordinatorCount -= 1))
    answerCoordinator(connection, hello, pipe)
  })
  await swarm.join(getPoolTopic(options.invite.secret), { server: false, client: true }).flushed()
  console.log(`Looking for the pool through ${options.invite.bootstrapAddress}`)
  return {
    hasCoordinator: () => coordinatorCount > 0,
    leave: async () => {
      await swarm.destroy()
      await pipe.close()
    }
  }
}
