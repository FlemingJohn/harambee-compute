export interface PoolSession {
  hasCoordinator(): boolean
  leave(): Promise<void>
}
