import type { ModelChoice } from '../types/ModelChoice.ts'
import type { PoolDevice } from '../types/PoolDevice.ts'
import type { PoolPlan } from '../types/PoolPlan.ts'
import { allocateLayers } from './allocateLayers.ts'
import { getAdvice } from './getAdvice.ts'
import { reservedBytesPerDevice } from './reservedBytesPerDevice.ts'

export function makePoolPlan(devices: PoolDevice[], model: ModelChoice, catalog: ModelChoice[], useEveryDevice: boolean): PoolPlan {
  const allocation = allocateLayers(devices, model, reservedBytesPerDevice, useEveryDevice)
  const otherModels = catalog.filter((other) => other.name !== model.name)
  const advice = getAdvice({ devices, model, allocation, otherModels, reserveBytes: reservedBytesPerDevice })
  return { allocation, advice }
}
