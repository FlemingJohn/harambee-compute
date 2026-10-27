const helpers = [
  { coinX: 64, coinY: 112, box: { x: 34, y: 136, width: 60, height: 30 }, color: 'stroke-sunset' },
  { coinX: 160, coinY: 120, box: { x: 132, y: 142, width: 56, height: 28 }, color: 'stroke-gold' },
  { coinX: 256, coinY: 112, box: { x: 226, y: 136, width: 60, height: 30 }, color: 'stroke-rose' }
]

export function EarnStepIllustration() {
  return (
    <svg viewBox="0 0 320 180" role="img" aria-label="A question answered by the pool, with sats going to each helper" className="step-illustration">
      <rect width="320" height="180" className="fill-raised" />
      <path d="M92 22h136a12 12 0 0 1 12 12v30a12 12 0 0 1-12 12h-90l-18 16v-16H92a12 12 0 0 1-12-12V34a12 12 0 0 1 12-12z" className="fill-text" />
      <rect x="98" y="38" width="110" height="7" rx="3.5" className="fill-ink" />
      <rect x="98" y="52" width="78" height="7" rx="3.5" className="fill-ink" />
      {helpers.map((helper) => (
        <g key={helper.coinX}>
          <circle cx={helper.coinX} cy={helper.coinY} r="11" strokeWidth="2" className="fill-gold stroke-raised" />
          <text x={helper.coinX} y={helper.coinY + 4} textAnchor="middle" fontSize="12" fontWeight="700" className="svg-label fill-ink">s</text>
          <rect {...helper.box} rx="4" strokeWidth="2" className={`fill-dusk ${helper.color}`} />
        </g>
      ))}
    </svg>
  )
}
