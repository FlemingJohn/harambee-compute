import { HeroDeviceCaption } from './HeroDeviceCaption.tsx'

export function HeroTeacherLaptop() {
  return (
    <g>
      <rect x="60" y="54" width="128" height="80" rx="8" strokeWidth="2.5" className="fill-raised stroke-sunset" />
      <path d="M46 140H202L192 152H56Z" strokeWidth="2.5" strokeLinejoin="round" className="fill-raised stroke-sunset" />
      {[70, 88, 106].map((top) => (
        <rect key={top} x="76" y={top} width="96" height="12" rx="3" className="fill-sunset" />
      ))}
      <HeroDeviceCaption x={124} y={176} name="Teacher's laptop" detail="20 layers · GPU" />
    </g>
  )
}
