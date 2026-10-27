import type { DeviceMemory } from '../types/DeviceMemory.ts'
import type { RpcConnection } from '../types/RpcConnection.ts'
import type { RpcInventory } from '../types/RpcInventory.ts'
import { openRpcConnection } from './openRpcConnection.ts'
import { rpcCommand } from './rpcCommand.ts'

const helloRequestSize = 24
const helloResponseSize = 28
const deviceCountSize = 4
const deviceMemorySize = 16

export async function readRpcInventory(url: string, timeoutMs = 3000): Promise<RpcInventory> {
  const { host, port } = splitHostAndPort(url)
  const connection = await openRpcConnection(host, port, timeoutMs)
  try {
    const protocolVersion = await readProtocolVersion(connection)
    const deviceCount = await readDeviceCount(connection)
    const devices = await readEachDeviceMemory(connection, deviceCount)
    return { protocolVersion, devices }
  } finally {
    connection.close()
  }
}

async function readProtocolVersion(connection: RpcConnection): Promise<string> {
  const hello = await connection.request(rpcCommand.hello, Buffer.alloc(helloRequestSize), helloResponseSize)
  return `${hello[0]}.${hello[1]}.${hello[2]}`
}

async function readDeviceCount(connection: RpcConnection): Promise<number> {
  const response = await connection.request(rpcCommand.getDeviceCount, Buffer.alloc(0), deviceCountSize)
  return response.readUInt32LE(0)
}

async function readEachDeviceMemory(connection: RpcConnection, deviceCount: number): Promise<DeviceMemory[]> {
  const devices: DeviceMemory[] = []
  for (let index = 0; index < deviceCount; index++) {
    const payload = Buffer.alloc(4)
    payload.writeUInt32LE(index, 0)
    const response = await connection.request(rpcCommand.getDeviceMemory, payload, deviceMemorySize)
    devices.push({
      index,
      freeBytes: Number(response.readBigUInt64LE(0)),
      totalBytes: Number(response.readBigUInt64LE(8))
    })
  }
  return devices
}

function splitHostAndPort(url: string): { host: string; port: number } {
  const separator = url.lastIndexOf(':')
  return { host: url.slice(0, separator), port: Number(url.slice(separator + 1)) }
}
