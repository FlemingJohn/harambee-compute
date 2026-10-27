import { randomBytes } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

export function loadOrMakeIdentitySeed(seedPath: string): Buffer {
  if (existsSync(seedPath)) return Buffer.from(readFileSync(seedPath, 'utf8').trim(), 'hex')
  const seed = randomBytes(32)
  mkdirSync(dirname(seedPath), { recursive: true })
  writeFileSync(seedPath, seed.toString('hex'), { mode: 0o600 })
  return seed
}
