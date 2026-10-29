import { existsSync, readdirSync } from 'node:fs'
import { getModelFileName } from './getModelFileName.ts'
import { modelCatalog } from './modelCatalog.ts'
import { qvacModelsFolder } from './qvacModelsFolder.ts'

export function listDownloadedModels(folder = qvacModelsFolder): string[] {
  const files = existsSync(folder) ? readdirSync(folder) : []
  return modelCatalog
    .filter((model) => {
      const fileName = getModelFileName(model.registryName)
      return fileName !== '' && files.some((file) => file === fileName || file.endsWith(`_${fileName}`))
    })
    .map((model) => model.name)
}
