import * as qvac from '@qvac/sdk'

type RegistryModel = typeof qvac.QWEN3_600M_INST_Q4

export async function loadPoolModel(registryName: string, endpoints: { url: string; layerCount: number }[]): Promise<string> {
  const modelSource = (qvac as unknown as Record<string, RegistryModel | undefined>)[registryName]
  if (!modelSource) throw new Error(`QVAC has no model called ${registryName}`)
  return qvac.loadModel({
    modelSrc: modelSource,
    modelConfig: {
      device: 'gpu',
      'rpc-servers': endpoints.map((endpoint) => endpoint.url).join(','),
      devices: endpoints.map((_, position) => `RPC${position}`).join(','),
      'split-mode': 'layer',
      'tensor-split': endpoints.map((endpoint) => String(endpoint.layerCount)).join(',')
    }
  })
}
