import { formatGigabytes } from '../lib/formatGigabytes.ts'
import type { Advice } from '../types/Advice.ts'
import type { AdviceInput } from '../types/AdviceInput.ts'

export function getAdvice(input: AdviceInput): Advice[] {
  return [
    adviseAddingDevice(input),
    adviseFewerDevices(input),
    adviseFitsAlone(input),
    adviseBiggerModel(input)
  ].filter((advice): advice is Advice => advice !== undefined)
}

function adviseAddingDevice({ model, allocation }: AdviceInput): Advice | undefined {
  if (allocation.shortfallBytes === 0) return undefined
  return {
    kind: 'add-device',
    title: `Add a device with at least ${formatGigabytes(allocation.shortfallBytes)} free`,
    detail: `${model.name} needs ${formatGigabytes(model.requiredBytes)}. The pool cannot hold it yet.`
  }
}

function adviseFewerDevices({ devices, model, allocation }: AdviceInput): Advice | undefined {
  if (allocation.unusedDeviceIds.length === 0 || allocation.shares.length < 2) return undefined
  const unusedNames = devices.filter((device) => allocation.unusedDeviceIds.includes(device.id)).map((device) => device.name)
  return {
    kind: 'fewer-devices',
    title: `${model.name} fits on ${allocation.shares.length} of ${devices.length} devices`,
    detail: `${unusedNames.join(', ')} can stay out. Fewer devices means fewer network hops and faster answers.`
  }
}

function adviseFitsAlone({ devices, model, allocation }: AdviceInput): Advice | undefined {
  if (allocation.shares.length !== 1 || devices.length < 2) return undefined
  return {
    kind: 'fits-alone',
    title: `${model.name} fits on one device`,
    detail: 'The helpers stay idle. Pick a bigger model to use the whole pool for smarter answers.'
  }
}

function adviseBiggerModel({ devices, model, otherModels, reserveBytes }: AdviceInput): Advice | undefined {
  const poolBytes = devices.reduce((sum, device) => sum + Math.max(0, device.freeBytes - reserveBytes), 0)
  const biggest = otherModels
    .filter((other) => other.requiredBytes > model.requiredBytes && other.requiredBytes <= poolBytes)
    .sort((first, second) => second.requiredBytes - first.requiredBytes)[0]
  if (!biggest) return undefined
  return {
    kind: 'bigger-model',
    title: `${biggest.name} also fits in the pool`,
    detail: `It needs ${formatGigabytes(biggest.requiredBytes)} of the ${formatGigabytes(poolBytes)} the pool can share.`
  }
}
