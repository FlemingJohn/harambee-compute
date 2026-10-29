import * as qvac from '@qvac/sdk'

export function getModelFileName(registryName: string): string {
  const model = (qvac as unknown as Record<string, { registryPath?: string } | undefined>)[registryName]
  return model?.registryPath?.split('/').pop() ?? ''
}
