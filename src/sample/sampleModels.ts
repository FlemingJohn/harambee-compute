import type { ModelChoice } from '../types/ModelChoice.ts'

const gigabyte = 1024 ** 3

export const sampleModels: ModelChoice[] = [
  { name: 'Qwen3 0.6B', layerCount: 28, requiredBytes: 0.8 * gigabyte },
  { name: 'Qwen3 1.7B', layerCount: 28, requiredBytes: 1.6 * gigabyte },
  { name: 'Qwen3 4B', layerCount: 36, requiredBytes: 3.1 * gigabyte },
  { name: 'Qwen3 8B', layerCount: 36, requiredBytes: 5.9 * gigabyte }
]
