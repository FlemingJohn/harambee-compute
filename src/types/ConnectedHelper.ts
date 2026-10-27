import type { SwarmConnection } from 'hyperswarm'
import type { HelperHello } from './HelperHello.ts'

export interface ConnectedHelper {
  hello: HelperHello
  connection: SwarmConnection
  pipeUrl: string
  closePipe: () => void
}
