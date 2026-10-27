import WalletManagerSpark from '@tetherto/wdk-wallet-spark'

export async function openSparkWallet(seed: string) {
  const manager = new WalletManagerSpark(seed, { network: 'REGTEST' })
  const account = await manager.getAccount(0)
  return {
    getAddress: () => account.getAddress(),
    getBalanceSats: async () => Number(await account.getBalance()),
    sendSats: async (to: string, sats: number) => (await account.sendTransaction({ to, value: sats })).hash,
    dispose: () => manager.dispose()
  }
}
