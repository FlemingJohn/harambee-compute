import type { AdviceKind } from './AdviceKind.ts'

export interface Advice {
  kind: AdviceKind
  title: string
  detail: string
}
