import { hostname } from 'node:os'
import { parseArgs } from 'node:util'
import type { CoordinatorOptions } from '../types/CoordinatorOptions.ts'

export function readCoordinatorOptions(argumentList: string[]): CoordinatorOptions {
  const { values } = parseArgs({
    args: argumentList,
    options: {
      host: { type: 'string', default: '127.0.0.1' },
      'dht-port': { type: 'string', default: '49737' },
      port: { type: 'string', default: '8080' },
      name: { type: 'string', default: hostname() },
      gpu: { type: 'boolean', default: false },
      spread: { type: 'boolean', default: false },
      data: { type: 'string', default: '.harambee/coordinator' },
      pages: { type: 'string', default: 'dist' }
    }
  })
  return {
    bootstrapHost: values.host,
    bootstrapPort: Number(values['dht-port']),
    webPort: Number(values.port),
    name: values.name,
    isGpu: values.gpu,
    useEveryDevice: values.spread,
    dataPath: values.data,
    pagesPath: values.pages
  }
}
