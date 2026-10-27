import { HeroDeviceLinks } from './HeroDeviceLinks.tsx'
import { HeroHelperLaptop } from './HeroHelperLaptop.tsx'
import { HeroHotspot } from './HeroHotspot.tsx'
import { HeroLabComputer } from './HeroLabComputer.tsx'
import { HeroModelStack } from './HeroModelStack.tsx'
import { HeroSatsChips } from './HeroSatsChips.tsx'
import { HeroStudentPhone } from './HeroStudentPhone.tsx'
import { HeroTeacherLaptop } from './HeroTeacherLaptop.tsx'

export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 560 520"
      role="img"
      aria-label="Three devices each hold part of one AI model. A student asks from a phone, and each device earns sats."
      className="hero-illustration"
    >
      <circle cx="280" cy="262" r="186" className="fill-dusk" />
      <circle cx="280" cy="262" r="230" className="fill-none stroke-line" strokeWidth="1.5" strokeDasharray="4 10" />
      <HeroDeviceLinks />
      <HeroModelStack />
      <HeroTeacherLaptop />
      <HeroLabComputer />
      <HeroHelperLaptop />
      <HeroStudentPhone />
      <HeroSatsChips />
      <HeroHotspot />
    </svg>
  )
}
