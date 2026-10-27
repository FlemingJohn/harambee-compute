const layerColors = ['fill-sunset', 'fill-sunset', 'fill-sunset', 'fill-gold', 'fill-gold', 'fill-rose']
const devices = [
  { top: 28, color: 'stroke-sunset', text: 'fill-sunset', label: '3 GB · 20' },
  { top: 76, color: 'stroke-gold', text: 'fill-gold', label: '2 GB · 10' },
  { top: 124, color: 'stroke-rose', text: 'fill-rose', label: '1.5 GB · 6' }
]

export function SplitStepIllustration() {
  return (
    <svg viewBox="0 0 320 180" role="img" aria-label="A model's layers split across three devices by free memory" className="step-illustration">
      <rect width="320" height="180" className="fill-raised" />
      <text x="63" y="30" textAnchor="middle" fontSize="13" className="svg-label fill-muted">one model</text>
      {layerColors.map((color, position) => (
        <rect key={position} x="26" y={40 + position * 20} width="74" height="16" rx="3" strokeWidth="2" className={`${color} stroke-raised`} />
      ))}
      <g className="fill-none stroke-muted" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M112 68H160M152 61l8 7-8 7" /><path d="M112 118H160M152 111l8 7-8 7" />
      </g>
      {devices.map((device) => (
        <g key={device.label}>
          <rect x="178" y={device.top} width="116" height="38" rx="6" strokeWidth="2" className={`fill-dusk ${device.color}`} />
          <text x="192" y={device.top + 24} fontSize="13" fontWeight="600" className={`svg-number ${device.text}`}>{device.label}</text>
        </g>
      ))}
    </svg>
  )
}
