const devices = [
  { x: 30, y: 70, radius: 14, color: 'stroke-sunset', path: 'M30 70C70 70 100 48 130 48' },
  { x: 130, y: 86, radius: 8, color: 'stroke-gold', path: 'M130 86C130 74 130 64 130 56' },
  { x: 230, y: 70, radius: 14, color: 'stroke-rose', path: 'M230 70C190 70 160 48 130 48' }
]

export function ClosingIllustration() {
  return (
    <svg width="260" height="96" viewBox="0 0 260 96" aria-hidden="true">
      {devices.map((device) => (
        <g key={device.x}>
          <path d={device.path} strokeWidth="2.5" strokeDasharray="2 8" strokeLinecap="round" className={`fill-none ${device.color}`} />
          <circle cx={device.x} cy={device.y} r={device.radius} strokeWidth="3" className={`fill-raised ${device.color}`} />
        </g>
      ))}
      <circle cx="130" cy="38" r="26" className="fill-gold" />
      <circle cx="130" cy="38" r="36" strokeWidth="2" opacity="0.35" className="fill-none stroke-gold" />
    </svg>
  )
}
