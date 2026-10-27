export interface RpcConnection {
  request(command: number, payload: Buffer, responseSize: number): Promise<Buffer>
  close(): void
}
