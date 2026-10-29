declare module 'hyperdht' {
  import type { Duplex } from 'node:stream'

  interface KeyPair {
    publicKey: Buffer
    secretKey: Buffer
  }

  interface EncryptedStream extends Duplex {
    remotePublicKey: Buffer
  }

  interface DhtServer {
    listen(keyPair: KeyPair): Promise<void>
    close(): Promise<void>
  }

  interface ServerOptions {
    firewall?: (remotePublicKey: Buffer) => boolean
  }

  export default class HyperDHT {
    constructor(options?: { bootstrap?: string[]; keyPair?: KeyPair })
    static keyPair(seed?: Buffer): KeyPair
    static bootstrapper(port: number, host: string): HyperDHT
    ready(): Promise<void>
    toArray(): { host: string; port: number }[]
    lookup(target: Buffer): AsyncIterable<{ from: { host: string; port: number }; peers: { publicKey: Buffer }[] }>
    connect(publicKey: Buffer, options?: { keyPair?: KeyPair }): EncryptedStream
    createServer(options: ServerOptions, onConnection: (stream: EncryptedStream) => void): DhtServer
    destroy(): Promise<void>
  }
}
