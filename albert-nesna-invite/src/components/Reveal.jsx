import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { EASE_OUT } from '../lib/motion'

export function FadeUp({ children, delay = 0, className = '', as = 'div', y = 22 }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y, filter: reduce ? 'blur(0px)' : 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
    >
      {children}
    </Tag>
  )
}

/* Line of type rising out of a mask. */
// The observer watches the outer mask, since the inner line starts clipped out of view.
export function MaskLine({ children, play = true, inView = false, delay = 0, className = '', innerClassName = '' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, margin: '-60px' })
  const active = inView ? seen : play
  const hidden = { y: reduce ? '0%' : '112%', opacity: reduce ? 0 : 1 }
  const shown = { y: '0%', opacity: 1 }
  return (
    <span ref={ref} className={`block overflow-hidden pb-[0.12em] -mb-[0.12em] ${className}`}>
      <motion.span
        className={`block ${innerClassName}`}
        initial={hidden}
        animate={active ? shown : hidden}
        transition={{ duration: 1.15, ease: EASE_OUT, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}
