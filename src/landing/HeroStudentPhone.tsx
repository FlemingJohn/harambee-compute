import { HeroDeviceCaption } from './HeroDeviceCaption.tsx'

export function HeroStudentPhone() {
  return (
    <g>
      <rect x="432" y="40" width="74" height="132" rx="14" strokeWidth="2.5" className="fill-raised stroke-text" />
      <rect x="458" y="48" width="22" height="4" rx="2" className="fill-line-strong" />
      <rect x="442" y="64" width="54" height="24" rx="8" className="fill-line-strong" />
      <rect x="442" y="96" width="54" height="56" rx="8" className="fill-text" />
      {[38, 30, 34].map((width, position) => (
        <rect key={position} x="450" y={106 + position * 11} width={width} height="5" rx="2.5" className="fill-ink" />
      ))}
      <rect x="450" y="139" width="18" height="5" rx="2.5" className="fill-sunset" />
      <HeroDeviceCaption x={469} y={196} name="Student's phone" detail="browser, no app" />
    </g>
  )
}
