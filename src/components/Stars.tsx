/**
 * Accessible star rating. Renders five glyphs that fill to the nearest half,
 * but exposes a single text label to assistive tech so screen-reader users
 * hear "Rated 4.8 out of 5" instead of five meaningless bullet characters.
 */
export default function Stars({
  value,
  count = 5,
  className = '',
}: {
  value: number
  count?: number
  className?: string
}) {
  const rounded = Math.round(value * 2) / 2
  return (
    <span
      role="img"
      aria-label={`Rated ${value} out of ${count}`}
      className={`inline-flex items-center ${className}`}
    >
      {Array.from({ length: count }, (_, i) => {
        const fill = Math.max(0, Math.min(1, rounded - i))
        return (
          <span key={i} aria-hidden className="relative text-base leading-none">
            <span className="text-forest/20">★</span>
            <span
              className="absolute inset-0 overflow-hidden text-clay-soft"
              style={{ width: `${fill * 100}%` }}
            >
              ★
            </span>
          </span>
        )
      })}
    </span>
  )
}
