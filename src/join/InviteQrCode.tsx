const finderCorners = [[0, 0], [14, 0], [0, 14]]
const modules =
  'M8 0h1v1h-1zM10 0h1v1h-1zM12 1h1v1h-1zM9 2h1v1h-1zM11 2h1v1h-1zM8 3h1v1h-1zM12 3h1v1h-1zM10 4h1v1h-1zM9 5h1v1h-1zM11 6h1v1h-1zM8 6h1v1h-1zM12 6h1v1h-1zM0 8h1v1h-1zM2 8h1v1h-1zM4 9h1v1h-1zM6 8h1v1h-1zM1 10h1v1h-1zM3 11h1v1h-1zM5 10h1v1h-1zM0 12h1v1h-1zM2 12h1v1h-1zM6 12h1v1h-1zM8 8h1v1h-1zM9 9h1v1h-1zM11 8h1v1h-1zM13 9h1v1h-1zM15 8h1v1h-1zM17 9h1v1h-1zM19 8h1v1h-1zM20 10h1v1h-1zM14 10h1v1h-1zM10 10h1v1h-1zM12 11h1v1h-1zM16 11h1v1h-1zM18 12h1v1h-1zM8 12h1v1h-1zM10 13h1v1h-1zM14 13h1v1h-1zM20 13h1v1h-1zM8 14h1v1h-1zM9 16h1v1h-1zM11 15h1v1h-1zM13 17h1v1h-1zM15 14h1v1h-1zM17 15h1v1h-1zM19 16h1v1h-1zM16 18h1v1h-1zM18 19h1v1h-1zM20 20h1v1h-1zM14 20h1v1h-1zM12 19h1v1h-1zM10 18h1v1h-1zM8 20h1v1h-1zM9 19h1v1h-1zM11 20h1v1h-1z'

export function InviteQrCode() {
  return (
    <svg width="168" height="168" viewBox="-1 -1 23 23" role="img" aria-label="QR code of the invite code" shapeRendering="crispEdges" className="qr-code">
      <rect x="-1" y="-1" width="23" height="23" className="fill-text" />
      {finderCorners.map(([left, top]) => (
        <g key={`${left}-${top}`}>
          <rect x={left} y={top} width="7" height="7" className="fill-night" />
          <rect x={left! + 1} y={top! + 1} width="5" height="5" className="fill-text" />
          <rect x={left! + 2} y={top! + 2} width="3" height="3" className="fill-night" />
        </g>
      ))}
      <path d={modules} className="fill-night" />
    </svg>
  )
}
