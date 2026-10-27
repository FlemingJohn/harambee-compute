declare module 'hyperswarm' {
  import type HyperDHT from 'hyperdht'
  import type { Duplex } from 'node:stream'

  interface SwarmConnection extends Duplex {
    remotePublicKey: Buffer
  }

  interface Discovery {
    flushed(): Promise<void>
  }

  export default class Hyperswarm {
    constructor(options?: { bootstrap?: string[] })
    dht: HyperDHT
    keyPair: { publicKey: Buffer; secretKey: Buffer }
    join(topic: Buffer, options: { server: boolean; client: boolean }): Discovery
    flush(): Promise<void>
    on(event: 'connection', listener: (connection: SwarmConnection) => void): this
    destroy(): Promise<void>
  }
}
