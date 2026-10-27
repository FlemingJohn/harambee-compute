import { hostname } from 'node:os'
import { join } from 'node:path'
import { parseArgs } from 'node:util'
import { parseInviteCode } from '../network/parseInviteCode.ts'
import type { HelperOptions } from '../types/HelperOptions.ts'

export function readHelperOptions(argumentList: string[]): HelperOptions {
  const { values } = parseArgs({
    args: argumentList,
    options: {
      code: { type: 'string' },
      name: { type: 'string', default: hostname() },
      gpu: { type: 'boolean', default: false },
      data: { type: 'string' }
    }
  })
  if (!values.code) throw new Error('Start the helper with --code HARAMBEE-XXXX-XXXX@host:port')
  return {
    invite: parseInviteCode(values.code),
    name: values.name,
    isGpu: values.gpu,
    dataPath: values.data ?? join('.harambee', `helper-${values.name}`),
    selfToken: process.env.HARAMBEE_SELF_TOKEN ?? ''
  }
}
