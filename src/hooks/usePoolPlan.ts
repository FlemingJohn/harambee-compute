import { useMemo } from 'react'
import { makePoolPlan } from '../pool/makePoolPlan.ts'
import type { ModelChoice } from '../types/ModelChoice.ts'
import type { PoolDevice } from '../types/PoolDevice.ts'
import type { PoolPlan } from '../types/PoolPlan.ts'

export function usePoolPlan(devices: PoolDevice[], model: ModelChoice, catalog: ModelChoice[]): PoolPlan {
  return useMemo(() => makePoolPlan(devices, model, catalog), [devices, model, catalog])
}
