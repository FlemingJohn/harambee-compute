import bip39 from 'bip39'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

export function loadOrMakeSeed(seedPath: string): string {
  if (existsSync(seedPath)) return readFileSync(seedPath, 'utf8').trim()
  const seed = bip39.generateMnemonic()
  mkdirSync(dirname(seedPath), { recursive: true })
  writeFileSync(seedPath, seed, { mode: 0o600 })
  return seed
}
