import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import { refreshWallet } from './refreshWallet.ts'

export function keepWalletFresh(runtime: CoordinatorRuntime, intervalMs: number): () => void {
  let isRunning = true
  let timer: ReturnType<typeof setTimeout> | undefined
  const check = async () => {
    if (!runtime.store.get().isPaying) await refreshWallet(runtime)
    if (isRunning) timer = setTimeout(() => void check(), intervalMs)
  }
  void check()
  return () => {
    isRunning = false
    clearTimeout(timer)
  }
}
