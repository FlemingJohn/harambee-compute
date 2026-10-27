import { createHash } from 'node:crypto'

export function getPoolTopic(secret: string): Buffer {
  return createHash('sha256').update(`harambee-pool:${secret}`).digest()
}
