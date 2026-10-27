import { setTimeout as wait } from 'node:timers/promises'
import { readRpcInventory } from '../pool/readRpcInventory.ts'
import type { RpcInventory } from '../types/RpcInventory.ts'

export async function readInventoryWithRetry(url: string, attempts = 6): Promise<RpcInventory> {
  let lastError: unknown
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      return await readRpcInventory(url, 5000)
    } catch (error) {
      lastError = error
      await wait(1000)
    }
  }
  throw lastError
}
