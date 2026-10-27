import type { CoordinatorState } from '../types/CoordinatorState.ts'
import type { StateStore } from '../types/StateStore.ts'

export function makeStateStore(initialState: CoordinatorState): StateStore {
  let state = initialState
  const listeners = new Set<(state: CoordinatorState) => void>()
  return {
    get: () => state,
    update: (change) => {
      state = { ...state, ...change }
      for (const listener of listeners) listener(state)
    },
    subscribe: (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    }
  }
}
