import WalletManagerSpark from '@tetherto/wdk-wallet-spark'
import type { SparkWallet } from '../types/SparkWallet.ts'
import type { TransferFinality } from '../types/TransferFinality.ts'

const transferHistoryLength = 50

export async function openSparkWallet(seed: string): Promise<SparkWallet> {
  const manager = new WalletManagerSpark(seed, { network: 'REGTEST', syncAndRetry: true })
  const account = await manager.getAccount(0)
  return {
    getAddress: () => account.getAddress(),
    getBalanceSats: async () => Number(await account.getBalance()),
    sendSats: async (to, sats) => (await account.sendTransaction({ to, value: sats })).hash,
    listOutgoingTransfers: async () => {
      const transfers = await account.getTransfers({ direction: 'outgoing', limit: transferHistoryLength })
      return transfers.map((transfer) => ({ id: transfer.id, sats: Number(transfer.totalValue) }))
    },
    getFinality: async (transferId) => (await account.getTransaction(transferId)).finality as TransferFinality,
    dispose: () => manager.dispose()
  }
}
