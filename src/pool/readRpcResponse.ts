import type { Socket } from 'node:net'

export function readRpcResponse(socket: Socket, responseSize: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    let received = Buffer.alloc(0)

    const handleData = (chunk: Buffer) => {
      received = Buffer.concat([received, chunk])
      if (received.length >= 8 && received.readBigUInt64LE(0) !== BigInt(responseSize)) {
        return finish(new Error(`RPC server sent ${received.readBigUInt64LE(0)} bytes, expected ${responseSize}`))
      }
      if (received.length >= 8 + responseSize) finish()
    }
    const handleClose = () => finish(new Error('RPC server closed the connection'))
    const finish = (error?: Error) => {
      socket.off('data', handleData)
      socket.off('error', finish)
      socket.off('close', handleClose)
      if (error) reject(error)
      else resolve(received.subarray(8, 8 + responseSize))
    }

    socket.on('data', handleData)
    socket.once('error', finish)
    socket.once('close', handleClose)
  })
}
