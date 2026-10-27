import type { ClientCommand } from './ClientCommand.ts'
import type { CoordinatorState } from './CoordinatorState.ts'

export interface CoordinatorConnection {
  state: CoordinatorState | null
  isConnected: boolean
  send(command: ClientCommand): void
}
