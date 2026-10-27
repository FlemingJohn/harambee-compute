import net from 'node:net'
import type { DeviceMemory } from '../src/types/DeviceMemory.ts'
import { rpcCommand } from '../src/pool/rpcCommand.ts'

export async function startFakeRpcServer(devices: DeviceMemory[]): Promise<{ url: string; stop: () => void }> {
  const server = net.createServer((socket) => answerRequests(socket, devices))
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  const address = server.address() as net.AddressInfo
  return { url: `127.0.0.1:${address.port}`, stop: () => server.close() }
}

function answerRequests(socket: net.Socket, devices: DeviceMemory[]): void {
  let received = Buffer.alloc(0)
  socket.on('data', (chunk) => {
    received = Buffer.concat([received, chunk])
    while (received.length >= 9) {
      const payloadLength = Number(received.readBigUInt64LE(1))
      if (received.length < 9 + payloadLength) return
      const command = received.readUInt8(0)
      const payload = received.subarray(9, 9 + payloadLength)
      received = received.subarray(9 + payloadLength)
      socket.write(makeResponse(command, payload, devices))
    }
  })
}

function makeResponse(command: number, payload: Buffer, devices: DeviceMemory[]): Buffer {
  if (command === rpcCommand.hello) return withLength(Buffer.from([111, 0, 0, ...new Array(25).fill(0)]))
  if (command === rpcCommand.getDeviceCount) return withLength(uint32(devices.length))
  const device = devices[payload.readUInt32LE(0)]!
  const body = Buffer.alloc(16)
  body.writeBigUInt64LE(BigInt(device.freeBytes), 0)
  body.writeBigUInt64LE(BigInt(device.totalBytes), 8)
  return withLength(body)
}

function withLength(body: Buffer): Buffer {
  const length = Buffer.alloc(8)
  length.writeBigUInt64LE(BigInt(body.length), 0)
  return Buffer.concat([length, body])
}

function uint32(value: number): Buffer {
  const buffer = Buffer.alloc(4)
  buffer.writeUInt32LE(value, 0)
  return buffer
}
