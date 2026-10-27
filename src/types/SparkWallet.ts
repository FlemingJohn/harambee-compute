export interface SparkWallet {
  getAddress(): Promise<string>
  getBalanceSats(): Promise<number>
  sendSats(to: string, sats: number): Promise<string>
  dispose(): void
}
