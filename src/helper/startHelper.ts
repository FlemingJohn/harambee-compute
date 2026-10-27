import { join } from 'node:path'
import { loadOrMakeSeed } from '../wallet/loadOrMakeSeed.ts'
import { readWalletAddress } from '../wallet/readWalletAddress.ts'
import { readHelperOptions } from './readHelperOptions.ts'
import { startLocalRpcServer } from './startLocalRpcServer.ts'
import { stayInPool } from './stayInPool.ts'

const options = readHelperOptions(process.argv.slice(2))
const rpcServer = await startLocalRpcServer()
console.log(`QVAC RPC server ready on ${rpcServer.url}, reachable only through the encrypted pipe`)

const walletAddress = await readWalletAddress(loadOrMakeSeed(join(options.dataPath, 'seed.txt')), join(options.dataPath, 'address.txt'))
console.log(walletAddress ? `Wallet ${walletAddress}` : 'Wallet address not known yet. It is fetched the first time this laptop is online.')

const leavePool = await stayInPool(options, rpcServer.url, walletAddress)

process.once('SIGINT', stopHelper)
process.once('SIGTERM', stopHelper)

async function stopHelper(): Promise<void> {
  await leavePool()
  await rpcServer.stop()
  process.exit(0)
}
