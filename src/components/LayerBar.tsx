import { getDeviceClass } from '../lib/getDeviceClass.ts'

export function LayerBar({ segments }: { segments: { label: string; layerCount: number; devicePosition: number }[] }) {
  return (
    <div className="layer-bar">
      {segments.map((segment) => (
        <div
          key={segment.label}
          className={`layer-segment ${getDeviceClass(segment.devicePosition)}`}
          style={{ flex: segment.layerCount }}
        >
          {segment.label} · {segment.layerCount}
        </div>
      ))}
    </div>
  )
}
