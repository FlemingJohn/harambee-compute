import type { Earning } from '../types/Earning.ts'

export function pickPayable(owed: Earning[], balanceSats: number): { payable: Earning[]; waitingSats: number } {
  const payable: Earning[] = []
  let remainingSats = balanceSats
  let waitingSats = 0
  for (const earning of owed) {
    if (earning.sats <= remainingSats) {
      payable.push(earning)
      remainingSats -= earning.sats
    } else {
      waitingSats += earning.sats
    }
  }
  return { payable, waitingSats }
}
