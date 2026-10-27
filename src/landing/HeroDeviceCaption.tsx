export function HeroDeviceCaption({ x, y, name, detail }: { x: number; y: number; name: string; detail: string }) {
  return (
    <>
      <text x={x} y={y} textAnchor="middle" fontSize="14" fontWeight="600" className="svg-label fill-text">{name}</text>
      <text x={x} y={y + 18} textAnchor="middle" fontSize="12" className="svg-number fill-muted">{detail}</text>
    </>
  )
}
