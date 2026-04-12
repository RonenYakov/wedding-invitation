// OrnamentalRule.tsx — luxury SVG ornamental divider
// Renders: ────── ◆ ──────
// Usage: <OrnamentalRule /> between sections or as section punctuation

interface Props {
  opacity?: number
  color?: string
  width?: number
  style?: React.CSSProperties
}

export default function OrnamentalRule({
  opacity = 0.65,
  color = 'var(--gold)',
  width = 200,
  style,
}: Props) {
  const cx = width / 2
  return (
    <svg
      width={width}
      height="16"
      viewBox={`0 0 ${width} 16`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block', margin: '0 auto', opacity, flexShrink: 0, ...style }}
    >
      {/* Left line */}
      <line x1="0" y1="8" x2={cx - 13} y2="8" stroke={color} strokeWidth="0.75" />
      {/* Left small dot */}
      <circle cx={cx - 9} cy="8" r="1.5" fill={color} />
      {/* Center diamond lozenge */}
      <path d={`M ${cx} 1 L ${cx + 7} 8 L ${cx} 15 L ${cx - 7} 8 Z`} fill={color} />
      {/* Right small dot */}
      <circle cx={cx + 9} cy="8" r="1.5" fill={color} />
      {/* Right line */}
      <line x1={cx + 13} y1="8" x2={width} y2="8" stroke={color} strokeWidth="0.75" />
    </svg>
  )
}
