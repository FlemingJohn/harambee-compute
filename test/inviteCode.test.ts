import assert from 'node:assert/strict'
import { test } from 'node:test'
import { formatInviteCode } from '../src/network/formatInviteCode.ts'
import { getPoolTopic } from '../src/network/getPoolTopic.ts'
import { makeInviteSecret } from '../src/network/makeInviteSecret.ts'
import { parseInviteCode } from '../src/network/parseInviteCode.ts'

test('a formatted invite code parses back to the same secret and address', () => {
  const invite = { secret: makeInviteSecret(), bootstrapAddress: '192.168.43.10:49737' }
  assert.deepEqual(parseInviteCode(formatInviteCode(invite)), invite)
})

test('accepts lower case and spaces around the address', () => {
  assert.deepEqual(parseInviteCode(' harambee-7f3k-92qx @ 127.0.0.1:49737 '), { secret: '7F3K-92QX', bootstrapAddress: '127.0.0.1:49737' })
})

test('rejects a code with no address', () => {
  assert.throws(() => parseInviteCode('HARAMBEE-7F3K-92QX'))
})

test('the same secret always gives the same 32 byte topic', () => {
  assert.equal(getPoolTopic('7F3K-92QX').length, 32)
  assert.deepEqual(getPoolTopic('7F3K-92QX'), getPoolTopic('7F3K-92QX'))
  assert.notDeepEqual(getPoolTopic('7F3K-92QX'), getPoolTopic('7F3K-92QY'))
})
