import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import { recordWork } from './recordWork.ts'

export async function recordWorkOrWarn(runtime: CoordinatorRuntime, tokenCount: number): Promise<void> {
  try {
    await recordWork(runtime, tokenCount)
  } catch (error) {
    const text = `The last answer's work could not be written to the ledger: ${(error as Error).message}`
    console.log(text)
    runtime.store.update({ payoutNotice: { text, isError: true } })
  }
}
