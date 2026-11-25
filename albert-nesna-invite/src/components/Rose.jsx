import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { EASE_OUT } from '../lib/motion'

/* Gradient for the falling petals. Rendered once in App. */
export function RoseDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="lg-petal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b8323f" />
          <stop offset="1" stopColor="#5c0f1c" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const SRC = { tl: '/img/roses-tl.webp?v=2', br: '/img/roses-br.webp?v=2' }
// Which corner of the box the roses grow from, after an optional mirror.
const ORIGIN = { tl: ['0%', '0%'], br: ['100%', '100%'] }

/**
 * Corner bouquet from the photo artwork.
 * corner: 'tl' | 'br'   flip: mirror horizontally (tl -> top-right, br -> bottom-left)
 * play: animate in when true   inView: animate in when scrolled into view
 * parallax: px of drift across the element's scroll range
 */
// Softens the two edges where the artwork was cropped, for bouquets that float mid-layout.
const FADE = {
  tl: 'linear-gradient(to right, transparent, #000 24%), linear-gradient(to bottom, transparent, #000 24%)',
  br: 'linear-gradient(to left, transparent, #000 24%), linear-gradient(to top, transparent, #000 24%)',
}

export function RoseCorner({ corner = 'tl', flip = false, fadeEdges = false, play, inView = false, delay = 0, parallax = 0, className = '', imgClassName = '' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-parallax, parallax])

  let [ox, oy] = ORIGIN[corner]
  if (flip) ox = ox === '0%' ? '100%' : '0%'

  const hidden = { opacity: 0, scale: reduce ? 1 : 1.06, filter: reduce ? 'blur(0px)' : 'blur(8px)' }
  const shown = { opacity: 1, scale: 1, filter: 'blur(0px)' }
  const transition = { duration: 1.6, ease: EASE_OUT, delay }
  const anim = inView
    ? { initial: hidden, whileInView: shown, viewport: { once: true, margin: '-40px' }, transition }
    : { initial: hidden, animate: play ? shown : hidden, transition }

  return (
    <motion.div ref={ref} style={{ y }} className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      {/* slow breeze sway, pivoting on the corner the bouquet grows from */}
 <div className="sway" style={{ transformOrigin: `${ox} ${oy}` }}>
{/* Mirror on its own wrapper so it pivots on the centre and stays in place. */}
<div className={flip ? '-scale-x-100' : undefined}>
<motion.img
src={SRC[corner]}
{...anim}
style={{
transformOrigin: ORIGIN[corner].join(' '), // was: `${ox} ${oy}`
...(fadeEdges && { maskImage: FADE[corner], /* … */ }),
}}
className={`block h-auto w-full ${imgClassName}`} // flip class removed from here
/>
</div>
</div>
    </motion.div>
  )
}
