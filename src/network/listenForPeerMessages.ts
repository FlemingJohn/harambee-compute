import type { Duplex } from 'node:stream'
import type { PeerMessage } from '../types/PeerMessage.ts'

const largestMessageLength = 4096

export function listenForPeerMessages(stream: Duplex, onMessage: (message: PeerMessage) => void): void {
  let pending = ''
  stream.on('data', (chunk: Buffer) => {
    pending += chunk.toString('utf8')
    if (pending.length > largestMessageLength) {
      stream.destroy(new Error('Peer message too long'))
      return
    }
    const lines = pending.split('\n')
    pending = lines.pop() ?? ''
    for (const line of lines) handleLine(line, onMessage)
  })
}

function handleLine(line: string, onMessage: (message: PeerMessage) => void): void {
  if (line.trim() === '') return
  try {
    onMessage(JSON.parse(line) as PeerMessage)
  } catch {
    return
  }
}
