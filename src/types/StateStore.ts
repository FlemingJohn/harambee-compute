import type { CoordinatorState } from './CoordinatorState.ts'

export interface StateStore {
  get(): CoordinatorState
  update(change: Partial<CoordinatorState>): void
  subscribe(listener: (state: CoordinatorState) => void): () => void
}
