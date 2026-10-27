import type { HelperHello } from './HelperHello.ts'

export type PeerMessage = HelperHello | { type: 'approved' } | { type: 'rejected' } | { type: 'removed' }
