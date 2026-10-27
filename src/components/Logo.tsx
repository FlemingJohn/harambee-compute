export function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="logo">
      <path className="logo-links" d="M29 17.5L15.5 41.5M35 17.5L48.5 41.5M19.5 48H44.5" strokeWidth="3" strokeLinecap="round" />
      <circle className="logo-first" cx="32" cy="12" r="7" strokeWidth="3.5" />
      <circle className="logo-second" cx="12" cy="48" r="7" strokeWidth="3.5" />
      <circle className="logo-third" cx="52" cy="48" r="7" strokeWidth="3.5" />
      <circle className="logo-center" cx="32" cy="35" r="5" />
    </svg>
  )
}
