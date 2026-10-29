import type { Earning } from '../types/Earning.ts'
import type { LedgerRecord } from '../types/LedgerRecord.ts'
import type { PayingDevice } from '../types/PayingDevice.ts'
import { findUnfinishedPayouts } from './findUnfinishedPayouts.ts'
import { tokenLayersPerSat } from './tokenLayersPerSat.ts'

export function summarizeEarnings(records: LedgerRecord[], devices: PayingDevice[]): Earning[] {
  const unfinished = findUnfinishedPayouts(records)
  return devices.map((device) => {
    const tokenLayers = sumWork(records, device.id)
    const paidSats = sumPaid(records, device.id)
    const unconfirmedSats = unfinished.filter((started) => started.deviceId === device.id).reduce((sum, started) => sum + started.sats, 0)
    const earnedSats = device.isCoordinator ? 0 : Math.floor(tokenLayers / tokenLayersPerSat)
    return {
      deviceId: device.id,
      deviceName: device.name,
      tokenLayers,
      sats: Math.max(0, earnedSats - paidSats - unconfirmedSats),
      paidSats,
      unconfirmedSats,
      walletAddress: device.walletAddress,
      isCoordinator: device.isCoordinator
    }
  })
}

function sumWork(records: LedgerRecord[], deviceId: string): number {
  return records.reduce((sum, record) => (record.kind === 'work' && record.deviceId === deviceId ? sum + record.tokens * record.layers : sum), 0)
}

function sumPaid(records: LedgerRecord[], deviceId: string): number {
  return records.reduce((sum, record) => (record.kind === 'payout' && record.deviceId === deviceId ? sum + record.sats : sum), 0)
}
