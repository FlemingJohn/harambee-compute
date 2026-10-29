import WalletManagerSpark from '@tetherto/wdk-wallet-spark'
import { join } from 'node:path'
import { parseArgs } from 'node:util'
import { loadOrMakeSeed } from './loadOrMakeSeed.ts'

const faucetUrl = 'https://app.lightspark.com/regtest-faucet'
const { values } = parseArgs({ options: { claim: { type: 'string' }, data: { type: 'string', default: '.harambee/coordinator' } } })
const manager = new WalletManagerSpark(loadOrMakeSeed(join(values.data, 'seed.txt')), { network: 'REGTEST', syncAndRetry: true })

try {
  const account = await manager.getAccount(0)
  const depositAddress = await account.getStaticDepositAddress()
  const waitingIds = values.claim ? [values.claim] : await findUnclaimedDeposits(account, depositAddress)
  for (const transactionId of waitingIds) {
    await account.claimStaticDeposit(transactionId)
    console.log(`Claimed the faucet deposit ${transactionId}`)
  }
  if (waitingIds.length === 0) {
    console.log(`Deposit address: ${depositAddress}`)
    console.log(`No faucet deposit is waiting. Open ${faucetUrl}, paste the address, press Send Funds, then run npm run fund again.`)
  }
  console.log(`The wallet has ${await account.getBalance()} sats.`)
} catch (error) {
  console.log(`Funding failed: ${(error as Error).message}`)
  console.log('Check the internet connection. A fresh faucet deposit can take a minute before it can be claimed.')
  process.exitCode = 1
} finally {
  manager.dispose()
}

async function findUnclaimedDeposits(account: Awaited<ReturnType<typeof manager.getAccount>>, depositAddress: string): Promise<string[]> {
  const { utxos } = await account.getUtxosForDepositAddress({ depositAddress, excludeClaimed: true })
  return [...new Set(utxos.map((utxo) => utxo.txid))]
}
