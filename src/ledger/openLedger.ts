import Corestore from 'corestore'
import type { LedgerRecord } from '../types/LedgerRecord.ts'

export async function openLedger(storagePath: string) {
  const store = new Corestore(storagePath)
  const core = store.get({ name: 'work-ledger', valueEncoding: 'json' })
  await core.ready()
  const records: LedgerRecord[] = []
  for (let index = 0; index < core.length; index++) {
    records.push((await core.get(index)) as LedgerRecord)
  }
  return {
    publicKey: core.key.toString('hex'),
    getRecords: () => records,
    append: async (record: LedgerRecord) => {
      await core.append(record)
      records.push(record)
    },
    close: () => store.close()
  }
}
