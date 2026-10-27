import type { Allocation } from './Allocation.ts'
import type { ModelChoice } from './ModelChoice.ts'
import type { PoolDevice } from './PoolDevice.ts'

export interface AdviceInput {
  devices: PoolDevice[]
  model: ModelChoice
  allocation: Allocation
  otherModels: ModelChoice[]
  reserveBytes: number
}
