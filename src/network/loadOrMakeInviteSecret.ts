import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { makeInviteSecret } from './makeInviteSecret.ts'

export function loadOrMakeInviteSecret(secretPath: string): string {
  if (existsSync(secretPath)) return readFileSync(secretPath, 'utf8').trim()
  const secret = makeInviteSecret()
  mkdirSync(dirname(secretPath), { recursive: true })
  writeFileSync(secretPath, secret)
  return secret
}
