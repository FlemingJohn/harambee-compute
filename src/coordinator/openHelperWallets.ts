import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import type { HelperWallet } from '../types/HelperWallet.ts'
import type { HelperWallets } from '../types/HelperWallets.ts'

export function openHelperWallets(listPath: string): HelperWallets {
  const saved = existsSync(listPath) ? (JSON.parse(readFileSync(listPath, 'utf8')) as Record<string, HelperWallet>) : {}
  const wallets = new Map(Object.entries(saved))
  const save = () => {
    mkdirSync(dirname(listPath), { recursive: true })
    writeFileSync(listPath, JSON.stringify(Object.fromEntries(wallets), null, 2))
  }
  return {
    get: (deviceId) => wallets.get(deviceId),
    set: (deviceId, wallet) => {
      wallets.set(deviceId, wallet)
      save()
    },
    entries: () => [...wallets.entries()]
  }
}
