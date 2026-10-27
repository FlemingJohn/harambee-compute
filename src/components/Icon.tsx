import type { ReactElement } from 'react'
import type { IconName } from '../types/IconName.ts'

const shapes: Record<IconName, ReactElement> = {
  advice: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chart:<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  chat: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9.5h8M8 12.5h5" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  cpu: <><rect x="7" y="7" width="10" height="10" rx="1.5" /><rect x="10" y="10" width="4" height="4" /><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" /></>,
  devices: <><rect x="2" y="4" width="14" height="10" rx="1.5" /><path d="M1 17h16" /><rect x="18" y="8" width="5" height="11" rx="1.5" /></>,
  gpu: <><rect x="2" y="7" width="20" height="10" rx="1.5" /><circle cx="9" cy="12" r="2.5" /><circle cx="16" cy="12" r="2.5" /><path d="M6 17v3h4v-3" /></>,
  hotspot: <><circle cx="12" cy="18" r="1.5" /><path d="M8.5 14.5a5 5 0 0 1 7 0M5.5 11.5a9 9 0 0 1 13 0M2.5 8.5a13 13 0 0 1 19 0" /></>,
  laptop: <><rect x="4" y="5" width="16" height="11" rx="1.5" /><path d="M2 19h20" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
  link: <><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" /><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" /></>,
  offline: <><path d="M7 18h10a4 4 0 0 0 .8-7.9A6 6 0 0 0 6.3 9.2 4.5 4.5 0 0 0 7 18z" /><path d="M3 3l18 18" /></>,
  people: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5" /><circle cx="17" cy="9" r="2.5" /><path d="M16 14.6c2.6.1 4.6 1.8 5.3 4.6" /></>,
  qr: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><path d="M14 14h3v3h-3zM18 18h3v3h-3z" /></>,
  sats: <><circle cx="12" cy="12" r="9" /><path d="M9.5 8h3.5a2 2 0 0 1 0 4H9.5h4a2 2 0 0 1 0 4h-4zM11 6.5V8M11 16v1.5" /></>,
  shield: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><rect x="9" y="11" width="6" height="5" rx="1" /><path d="M10 11V9.5a2 2 0 0 1 4 0V11" /></>,
  speed: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  wallet: <><path d="M6 6V4.5h11V6" /><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M16 14.5h2" /></>,
  warning: <><path d="M12 3l10 18H2z" /><path d="M12 10v5M12 18h.01" /></>
}

export function Icon({ name, size = 24, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {shapes[name]}
    </svg>
  )
}
