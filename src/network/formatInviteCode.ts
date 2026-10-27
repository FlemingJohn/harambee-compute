import type { InviteCode } from '../types/InviteCode.ts'

export function formatInviteCode(invite: InviteCode): string {
  return `HARAMBEE-${invite.secret}@${invite.bootstrapAddress}`
}
