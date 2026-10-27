import type { Advice } from './Advice.ts'
import type { Allocation } from './Allocation.ts'

export interface PoolPlan {
  allocation: Allocation
  advice: Advice[]
}
