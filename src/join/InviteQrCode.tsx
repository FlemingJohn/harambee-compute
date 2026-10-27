import QRCode from 'qrcode'
import { useMemo } from 'react'

export function InviteQrCode({ text }: { text: string }) {
  const { size, modulePath } = useMemo(() => drawModules(text), [text])
  return (
    <svg width="176" height="176" viewBox={`-2 -2 ${size + 4} ${size + 4}`} role="img" aria-label={`QR code of the invite ${text}`} shapeRendering="crispEdges" className="qr-code">
      <rect x="-2" y="-2" width={size + 4} height={size + 4} className="fill-text" />
      <path d={modulePath} className="fill-night" />
    </svg>
  )
}

function drawModules(text: string): { size: number; modulePath: string } {
  const { modules } = QRCode.create(text, { errorCorrectionLevel: 'M' })
  const parts: string[] = []
  for (let row = 0; row < modules.size; row++) {
    for (let column = 0; column < modules.size; column++) {
      if (modules.get(row, column)) parts.push(`M${column} ${row}h1v1h-1z`)
    }
  }
  return { size: modules.size, modulePath: parts.join('') }
}
