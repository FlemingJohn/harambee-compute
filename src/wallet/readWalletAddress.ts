import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { withTimeout } from '../lib/withTimeout.ts'
import { openSparkWallet } from './openSparkWallet.ts'

export async function readWalletAddress(seed: string, addressPath: string): Promise<string> {
  if (existsSync(addressPath)) return readFileSync(addressPath, 'utf8').trim()
  try {
    const wallet = await withTimeout(openSparkWallet(seed), 30000, 'Spark did not answer')
    const address = await wallet.getAddress()
    wallet.dispose()
    writeFileSync(addressPath, address)
    return address
  } catch {
    return ''
  }
}
