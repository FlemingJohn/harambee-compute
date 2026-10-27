import type { InviteCode } from './InviteCode.ts'

export interface HelperOptions {
  invite: InviteCode
  name: string
  isGpu: boolean
  dataPath: string
  selfToken: string
}
