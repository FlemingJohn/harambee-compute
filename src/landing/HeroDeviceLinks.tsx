const links = [
  { path: 'M178 120C216 150 222 196 202 214', color: 'stroke-sunset' },
  { path: 'M156 384C200 360 210 320 204 300', color: 'stroke-gold' },
  { path: 'M404 392C368 368 360 338 358 322', color: 'stroke-rose' }
]

export function HeroDeviceLinks() {
  return (
    <g className="fill-none" strokeLinecap="round">
      {links.map((link) => (
        <g key={link.path} className={link.color}>
          <path d={link.path} strokeWidth="9" opacity="0.18" />
          <path d={link.path} strokeWidth="2.5" strokeDasharray="2 9" />
        </g>
      ))}
      <path d="M420 150C392 170 374 186 360 204" className="stroke-muted" strokeWidth="2.5" strokeDasharray="2 9" />
    </g>
  )
}
