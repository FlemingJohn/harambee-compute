import type { InviteCode } from '../types/InviteCode.ts'

const invitePattern = /^HARAMBEE-([2-9A-Z]{4}-[2-9A-Z]{4})\s*@\s*([^\s:]+:\d+)$/

export function parseInviteCode(text: string): InviteCode {
  const match = invitePattern.exec(text.trim().toUpperCase())
  if (!match) throw new Error('The invite code should look like HARAMBEE-XXXX-XXXX@192.168.x.x:49737')
  return { secret: match[1]!, bootstrapAddress: match[2]!.toLowerCase() }
}
