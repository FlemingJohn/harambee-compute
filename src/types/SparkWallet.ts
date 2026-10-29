import type { OutgoingTransfer } from './OutgoingTransfer.ts'
import type { TransferFinality } from './TransferFinality.ts'

export interface SparkWallet {
  getAddress(): Promise<string>
  getBalanceSats(): Promise<number>
  sendSats(to: string, sats: number): Promise<string>
  listOutgoingTransfers(): Promise<OutgoingTransfer[]>
  getFinality(transferId: string): Promise<TransferFinality>
  dispose(): void
}
