export function MemoryMeter({ usedShare }: { usedShare: number }) {
  return (
    <span className="meter">
      <span className="meter-fill" style={{ width: `${Math.min(100, Math.round(usedShare * 100))}%` }} />
    </span>
  )
}
