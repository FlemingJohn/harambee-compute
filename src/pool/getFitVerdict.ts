import { formatGigabytes } from '../lib/formatGigabytes.ts'
import type { Allocation } from '../types/Allocation.ts'
import type { FitVerdict } from '../types/FitVerdict.ts'

export function getFitVerdict(allocation: Allocation): FitVerdict {
  if (allocation.shortfallBytes > 0) {
    return { tone: 'warning', label: `Needs ${formatGigabytes(allocation.shortfallBytes)} more` }
  }
  if (allocation.shares.length === 1) {
    return { tone: 'ready', label: 'Fits on 1 device' }
  }
  return { tone: 'waiting', label: `Uses ${allocation.shares.length} devices` }
}
