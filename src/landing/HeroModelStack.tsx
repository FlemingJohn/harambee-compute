const layerColors = ['fill-sunset', 'fill-sunset', 'fill-sunset', 'fill-gold', 'fill-gold', 'fill-rose']

export function HeroModelStack() {
  return (
    <g>
      <text x="280" y="176" textAnchor="middle" fontSize="15" fontWeight="600" className="svg-number fill-gold">Qwen3 4B</text>
      {layerColors.map((color, position) => (
        <rect key={position} x="202" y={192 + position * 24} width="156" height="20" rx="5" strokeWidth="2" className={`${color} stroke-night`} />
      ))}
      <text x="280" y="356" textAnchor="middle" fontSize="14" className="svg-label fill-muted">one model, 36 layers</text>
    </g>
  )
}
