import type { SwarmConnection } from 'hyperswarm'
import { listenForPeerMessages } from '../network/listenForPeerMessages.ts'
import { sendPeerMessage } from '../network/sendPeerMessage.ts'
import type { HelperHello } from '../types/HelperHello.ts'

export function answerCoordinator(
  connection: SwarmConnection,
  hello: HelperHello,
  pipe: { allow: (publicKey: string) => void; disallow: (publicKey: string) => void }
): void {
  const coordinatorKey = connection.remotePublicKey.toString('hex')
  connection.on('error', () => pipe.disallow(coordinatorKey))
  connection.on('close', () => pipe.disallow(coordinatorKey))
  listenForPeerMessages(connection, (message) => {
    if (message.type === 'approved') {
      pipe.allow(coordinatorKey)
      console.log('Approved by the coordinator. Lending memory now.')
    }
    if (message.type === 'rejected' || message.type === 'removed') {
      pipe.disallow(coordinatorKey)
      console.log(message.type === 'rejected' ? 'The coordinator rejected this device.' : 'The coordinator removed this device.')
    }
  })
  sendPeerMessage(connection, hello)
}
