import type { CatalogModel } from '../types/CatalogModel.ts'

const megabyte = 1000 ** 2
const runtimeOverhead = 1.25

export const modelCatalog: CatalogModel[] = [
  { name: 'Qwen3 0.6B', registryName: 'QWEN3_600M_INST_Q4', layerCount: 28, requiredBytes: 382 * megabyte * runtimeOverhead },
  { name: 'Qwen3 1.7B', registryName: 'QWEN3_1_7B_INST_Q4', layerCount: 28, requiredBytes: 1057 * megabyte * runtimeOverhead },
  { name: 'Qwen3 4B', registryName: 'QWEN3_4B_INST_Q4_K_M', layerCount: 36, requiredBytes: 2497 * megabyte * runtimeOverhead },
  { name: 'Qwen3 8B', registryName: 'QWEN3_8B_INST_Q4_K_M', layerCount: 36, requiredBytes: 5028 * megabyte * runtimeOverhead }
]
