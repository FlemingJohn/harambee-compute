declare module 'corestore' {
  import type Hypercore from 'hypercore'

  export default class Corestore {
    constructor(storagePath: string)
    get(options: { name: string; valueEncoding: 'json' }): Hypercore
    ready(): Promise<void>
    close(): Promise<void>
  }
}
