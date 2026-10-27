import net from 'node:net'
import type { RpcConnection } from '../types/RpcConnection.ts'
import { makeRpcFrame } from './makeRpcFrame.ts'
import { readRpcResponse } from './readRpcResponse.ts'

export function openRpcConnection(host: string, port: number, timeoutMs: number): Promise<RpcConnection> {
  return new Promise((resolve, reject) => {
    const socket = net.connect({ host, port })
    socket.setTimeout(timeoutMs, () => socket.destroy(new Error(`RPC server ${host}:${port} did not answer in time`)))
    socket.once('error', reject)
    socket.once('connect', () => {
      socket.off('error', reject)
      resolve(makeConnection(socket))
    })
  })
}

function makeConnection(socket: net.Socket): RpcConnection {
  return {
    request: (command, payload, responseSize) => {
      const response = readRpcResponse(socket, responseSize)
      socket.write(makeRpcFrame(command, payload))
      return response
    },
    close: () => socket.destroy()
  }
}
