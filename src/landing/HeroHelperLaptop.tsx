import { HeroDeviceCaption } from './HeroDeviceCaption.tsx'

export function HeroHelperLaptop() {
  return (
    <g>
      <rect x="378" y="384" width="112" height="70" rx="8" strokeWidth="2.5" className="fill-raised stroke-rose" />
      <path d="M366 460H502L494 470H374Z" strokeWidth="2.5" strokeLinejoin="round" className="fill-raised stroke-rose" />
      <rect x="394" y="400" width="80" height="12" rx="3" className="fill-rose" />
      <HeroDeviceCaption x={434} y={494} name="Helper's laptop" detail="6 layers · CPU" />
    </g>
  )
}
