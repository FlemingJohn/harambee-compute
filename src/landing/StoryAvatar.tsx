const looks = {
  teacher: { background: 'fill-sunset-tint', clothes: 'fill-sunset', skin: 'fill-skin-warm', hair: 'M40 46c2-16 14-22 22-22 12 0 20 8 20 20-8-2-18-6-24-12-4 8-10 12-18 14z' },
  student: { background: 'fill-gold-tint', clothes: 'fill-gold', skin: 'fill-skin-deep', hair: 'M42 42c2-12 10-18 18-18s16 6 18 18c-6-4-12-5-18-5s-12 1-18 5z' },
  helper: { background: 'fill-rose-tint', clothes: 'fill-rose', skin: 'fill-skin-brown', hair: 'M38 52c-2-18 10-28 22-28s24 10 22 28c-4-10-12-14-22-14s-18 4-22 14z' }
}

export function StoryAvatar({ person, label }: { person: keyof typeof looks; label: string }) {
  const look = looks[person]
  return (
    <svg width="96" height="96" viewBox="0 0 120 120" role="img" aria-label={label}>
      <circle cx="60" cy="60" r="60" className={look.background} />
      <path d="M22 120c4-26 18-40 38-40s34 14 38 40z" className={look.clothes} />
      <circle cx="60" cy="50" r="20" className={look.skin} />
      <path d={look.hair} className="fill-ink" />
      {person === 'teacher' && <rect x="36" y="88" width="48" height="26" rx="3" strokeWidth="2" className="fill-ink stroke-gold-light" />}
      {person === 'student' && <rect x="72" y="80" width="18" height="30" rx="4" strokeWidth="2" className="fill-ink stroke-text" />}
      {person === 'helper' && <circle cx="92" cy="30" r="10" strokeWidth="2" className="fill-gold stroke-ink" />}
      {person === 'helper' && <circle cx="102" cy="48" r="7" strokeWidth="2" className="fill-gold stroke-ink" />}
    </svg>
  )
}
