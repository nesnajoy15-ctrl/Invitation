import { useMemo } from 'react'

// Slow drifting petals behind the content. Deterministic so it never reshuffles.
export default function Petals({ count = 11 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const seed = (i * 7919) % 100
        return {
          left: `${(i * 97) % 100}%`,
          size: 10 + (seed % 9),
          dur: `${16 + (seed % 12)}s`,
          delay: `${-((i * 3.7) % 24)}s`,
          drift: `${(seed % 2 ? 1 : -1) * (30 + (seed % 60))}px`,
          opacity: 0.35 + (seed % 40) / 100,
        }
      }),
    [count],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {petals.map((p, i) => (
        <svg
          key={i}
          className="petal"
          viewBox="0 0 20 24"
          width={p.size}
          height={p.size * 1.2}
          style={{ left: p.left, opacity: p.opacity, '--dur': p.dur, '--delay': p.delay, '--drift': p.drift }}
        >
          <path d="M10 1 C17 5 19 15 10 23 C1 15 3 5 10 1Z" fill="url(#lg-petal)" />
          <path d="M10 4 Q11 13 10 21" stroke="#a65468" strokeOpacity="0.25" strokeWidth="0.6" fill="none" />
        </svg>
      ))}
    </div>
  )
}
