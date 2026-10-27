import { spawn, type ChildProcess } from 'node:child_process'
import { join } from 'node:path'
import type { CoordinatorOptions } from '../types/CoordinatorOptions.ts'

export function startSelfHelper(options: CoordinatorOptions, inviteCode: string, selfToken: string): ChildProcess {
  const helperArguments = [
    join('src', 'helper', 'startHelper.ts'),
    '--code',
    inviteCode,
    '--name',
    options.name,
    '--data',
    join(options.dataPath, 'self-helper'),
    ...(options.isGpu ? ['--gpu'] : [])
  ]
  return spawn(process.execPath, helperArguments, {
    env: { ...process.env, HARAMBEE_SELF_TOKEN: selfToken },
    stdio: 'inherit'
  })
}
