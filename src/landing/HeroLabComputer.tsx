import { HeroDeviceCaption } from './HeroDeviceCaption.tsx'

export function HeroLabComputer() {
  return (
    <g>
      <rect x="52" y="376" width="104" height="70" rx="8" strokeWidth="2.5" className="fill-raised stroke-gold" />
      <rect x="96" y="446" width="16" height="14" strokeWidth="2.5" className="fill-raised stroke-gold" />
      <path d="M78 462H130" strokeWidth="2.5" strokeLinecap="round" className="stroke-gold" />
      <rect x="164" y="372" width="30" height="90" rx="5" strokeWidth="2.5" className="fill-raised stroke-gold" />
      {[392, 410].map((top) => (
        <rect key={top} x="66" y={top} width="76" height="12" rx="3" className="fill-gold" />
      ))}
      <HeroDeviceCaption x={122} y={488} name="Lab PC" detail="10 layers · CPU" />
    </g>
  )
}
