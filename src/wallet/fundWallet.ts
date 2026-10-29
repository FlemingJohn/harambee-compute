import WalletManagerSpark from '@tetherto/wdk-wallet-spark'
import { join } from 'node:path'
import { parseArgs } from 'node:util'
import { loadOrMakeSeed } from './loadOrMakeSeed.ts'

const faucetUrl = 'https://app.lightspark.com/regtest-faucet'
const { values } = parseArgs({ options: { claim: { type: 'string' }, data: { type: 'string', default: '.harambee/coordinator' } } })
const manager = new WalletManagerSpark(loadOrMakeSeed(join(values.data, 'seed.txt')), { network: 'REGTEST', syncAndRetry: true })

try {
  const account = await manager.getAccount(0)
  if (values.claim) {
    await account.claimStaticDeposit(values.claim)
    console.log(`Claimed. The wallet now has ${await account.getBalance()} sats.`)
  } else {
    console.log(`Deposit address: ${await account.getStaticDepositAddress()}`)
    console.log(`1. Open ${faucetUrl}, paste the address and press Send Funds.`)
    console.log('2. Then run: npm run fund -- --claim <transaction hash>')
  }
} catch (error) {
  console.log(`Funding failed: ${(error as Error).message}`)
  console.log('Check the internet connection. A fresh faucet deposit can take a minute before it can be claimed.')
  process.exitCode = 1
} finally {
  manager.dispose()
}
