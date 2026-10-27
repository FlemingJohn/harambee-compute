import type { Duplex } from 'node:stream'
import type { PeerMessage } from '../types/PeerMessage.ts'

export function sendPeerMessage(stream: Duplex, message: PeerMessage): void {
  stream.write(`${JSON.stringify(message)}\n`)
}
