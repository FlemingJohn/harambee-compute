import type { LedgerEntry } from '../types/LedgerEntry.ts'

export const sampleLedger: LedgerEntry[] = [
  { sequence: 42, time: '21:14:07', deviceName: 'Lab-PC-07', tokens: 46, layers: 10 },
  { sequence: 41, time: '21:14:07', deviceName: 'Amina-laptop', tokens: 46, layers: 6 },
  { sequence: 40, time: '21:12:51', deviceName: 'Lab-PC-07', tokens: 138, layers: 10 }
]
