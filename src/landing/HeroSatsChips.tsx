const chips = [
  { x: 196, y: 440, width: 96, amount: '+184' },
  { x: 300, y: 470, width: 88, amount: '+110' }
]

export function HeroSatsChips() {
  return (
    <g>
      {chips.map((chip) => (
        <g key={chip.amount}>
          <rect x={chip.x} y={chip.y} width={chip.width} height="30" rx="15" className="fill-sunset-tint" />
          <circle cx={chip.x + 18} cy={chip.y + 15} r="9" className="fill-gold" />
          <text x={chip.x + 18} y={chip.y + 19} textAnchor="middle" fontSize="11" fontWeight="700" className="svg-label fill-ink">s</text>
          <text x={chip.x + 34} y={chip.y + 20} fontSize="13" fontWeight="600" className="svg-number fill-gold">{chip.amount}</text>
        </g>
      ))}
    </g>
  )
}
