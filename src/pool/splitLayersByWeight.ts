export function splitLayersByWeight(weights: number[], layerCount: number): number[] {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
  const exactShares = weights.map((weight) => (weight / totalWeight) * layerCount)
  const counts = exactShares.map((share) => Math.max(1, Math.floor(share)))
  handOutRemainingLayers(counts, exactShares, layerCount)
  return counts
}

function handOutRemainingLayers(counts: number[], exactShares: number[], layerCount: number): void {
  const byLargestRemainder = exactShares
    .map((share, index) => ({ index, remainder: share - Math.floor(share) }))
    .sort((first, second) => second.remainder - first.remainder)
  let assigned = counts.reduce((sum, count) => sum + count, 0)
  for (let step = 0; assigned < layerCount; step++) {
    const target = byLargestRemainder[step % byLargestRemainder.length]!
    counts[target.index]! += 1
    assigned += 1
  }
  for (let index = indexOfLargest(counts); assigned > layerCount; index = indexOfLargest(counts)) {
    counts[index]! -= 1
    assigned -= 1
  }
}

function indexOfLargest(values: number[]): number {
  return values.indexOf(Math.max(...values))
}
