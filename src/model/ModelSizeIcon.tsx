const barColors = ['fill-sunset', 'fill-sunset', 'fill-gold', 'fill-rose']

export function ModelSizeIcon({ sizeTier }: { sizeTier: number }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true" className="model-size-icon">
      <rect width="36" height="36" rx="9" className="fill-raised" />
      {barColors.map((color, position) => (
        <rect
          key={position}
          x="7"
          y={25 - position * 7}
          width="22"
          height="5"
          rx="2"
          className={color}
          opacity={position < sizeTier ? 1 : 0.18}
        />
      ))}
    </svg>
  )
}
