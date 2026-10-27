import type { UsableDevice } from '../types/UsableDevice.ts'

export function pickFewestThatFit(ranked: UsableDevice[], requiredBytes: number): UsableDevice[] {
  const chosen: UsableDevice[] = []
  let chosenBytes = 0
  for (const entry of ranked) {
    if (chosenBytes >= requiredBytes) break
    chosen.push(entry)
    chosenBytes += entry.usableBytes
  }
  return chosen
}
