import { close as closeQvac } from '@qvac/sdk'
import HyperDHT from 'hyperdht'
import Hyperswarm from 'hyperswarm'
import { randomBytes } from 'node:crypto'
import { join } from 'node:path'
import { openLedger } from '../ledger/openLedger.ts'
import { formatInviteCode } from '../network/formatInviteCode.ts'
import { getPoolTopic } from '../network/getPoolTopic.ts'
import { loadOrMakeInviteSecret } from '../network/loadOrMakeInviteSecret.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import { loadOrMakeSeed } from '../wallet/loadOrMakeSeed.ts'
import { acceptHelper } from './acceptHelper.ts'
import { keepWalletFresh } from './keepWalletFresh.ts'
import { makeInitialState } from './makeInitialState.ts'
import { makeStateStore } from './makeStateStore.ts'
import { openApprovedList } from './openApprovedList.ts'
import { openHelperWallets } from './openHelperWallets.ts'
import { readCoordinatorOptions } from './readCoordinatorOptions.ts'
import { refreshEarnings } from './refreshEarnings.ts'
import { startSelfHelper } from './startSelfHelper.ts'
import { startWebServer } from './startWebServer.ts'

const walletCheckIntervalMs = 20000
const options = readCoordinatorOptions(process.argv.slice(2))
const bootstrapAddress = `${options.bootstrapHost}:${options.bootstrapPort}`
const invite = { secret: loadOrMakeInviteSecret(join(options.dataPath, 'invite-secret.txt')), bootstrapAddress }
const inviteCode = formatInviteCode(invite)

const bootstrapNode = HyperDHT.bootstrapper(options.bootstrapPort, options.bootstrapHost)
await bootstrapNode.ready()
const swarm = new Hyperswarm({ bootstrap: [bootstrapAddress] })

const runtime: CoordinatorRuntime = {
  options,
  store: makeStateStore(makeInitialState(inviteCode, options.useEveryDevice)),
  swarm,
  ledger: await openLedger(join(options.dataPath, 'ledger')),
  seed: loadOrMakeSeed(join(options.dataPath, 'seed.txt')),
  selfToken: randomBytes(16).toString('hex'),
  selfDeviceId: '',
  approved: openApprovedList(join(options.dataPath, 'approved-devices.json')),
  helperWallets: openHelperWallets(join(options.dataPath, 'helper-wallets.json')),
  helpers: new Map(),
  waiting: new Map(),
  modelId: null,
  wallet: null,
  walletOpening: null
}

swarm.on('connection', (connection) => acceptHelper(runtime, connection))
await swarm.join(getPoolTopic(invite.secret), { server: true, client: false }).flushed()
await startWebServer(runtime)
const selfHelper = startSelfHelper(options, inviteCode, runtime.selfToken)
refreshEarnings(runtime)
const stopWalletChecks = keepWalletFresh(runtime, walletCheckIntervalMs)

console.log(`Pool ready. Invite code: ${inviteCode}`)
console.log(`Screens: http://127.0.0.1:${options.webPort}`)
console.log(`Helpers join with: npm run helper -- --code ${inviteCode}`)

process.once('SIGINT', stopCoordinator)
process.once('SIGTERM', stopCoordinator)

async function stopCoordinator(): Promise<void> {
  selfHelper.kill('SIGTERM')
  stopWalletChecks()
  runtime.wallet?.dispose()
  await swarm.destroy()
  await bootstrapNode.destroy()
  await runtime.ledger.close()
  await closeQvac()
  process.exit(0)
}
