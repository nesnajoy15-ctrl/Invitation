import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { RoseCorner } from './Rose'
import { EASE_IN_OUT, EASE_OUT } from '../lib/motion'

export default function Envelope({ onOpened }) {
  // 0 sealed, 1 flap opening, 2 letter rising, 3 gone
  const [stage, setStage] = useState(0)
  const reduce = useReducedMotion()
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const open = () => {
    if (stage) return
    setStage(1)
    const [toLetter, toDone] = reduce ? [60, 500] : [460, 2150]
    timers.current.push(setTimeout(() => setStage(2), toLetter))
    timers.current.push(
      setTimeout(() => {
        setStage(3)
        onOpened?.()
      }, toDone),
    )
  }

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          key="envelope"
          className="paper-glow fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6"
          exit={{ opacity: 0, filter: reduce ? 'blur(0px)' : 'blur(10px)', scale: reduce ? 1 : 1.04 }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
        >
          <RoseCorner corner="tl" play delay={0.1} className="absolute left-0 top-0 w-[56vw] max-w-[420px] md:w-[30vw]" />
          <RoseCorner corner="br" play delay={0.3} className="absolute bottom-0 right-0 w-[60vw] max-w-[460px] md:w-[32vw]" />

          <motion.p
            className="mb-14 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-ink-soft md:mb-20"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: stage ? 0 : 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: stage ? 0 : 0.3 }}
          >
            You have a letter
          </motion.p>

          <motion.button
            type="button"
            onClick={open}
            aria-label="Open the invitation"
            className="relative block cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-rose/50 focus-visible:ring-offset-8 focus-visible:ring-offset-paper"
            style={{ width: 'min(84vw, 440px)', aspectRatio: '1.45', perspective: 1200 }}
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            animate={{ opacity: 1, y: stage >= 2 ? 40 : 0, rotate: stage ? 0 : -2 }}
            transition={{ duration: 1, ease: EASE_OUT }}
            whileTap={stage ? undefined : { scale: 0.98 }}
          >
            {/* back */}
            <div className="absolute inset-0 z-0 rounded-[6px] bg-[#e7d8c6] shadow-[0_30px_60px_-30px_rgb(86_28_44/0.45),0_12px_24px_-16px_rgb(86_28_44/0.25)]" />

            {/* letter */}
            <motion.div
              className="absolute inset-x-[6%] bottom-[4%] top-[6%] z-[2] flex flex-col items-center justify-start rounded-[3px] border border-[#eadfce] bg-paper pt-[9%]"
              animate={{ y: stage >= 2 ? '-56%' : '0%' }}
              transition={{ duration: reduce ? 0 : 1.05, ease: EASE_OUT, delay: 0.1 }}
            >
              <span className="font-display text-[clamp(1.4rem,5vw,2rem)] italic leading-none text-wine">
                Albert <span className="font-script not-italic text-rose">&amp;</span> Nesna
              </span>
              <span className="mt-3 text-[0.8rem] uppercase tracking-[0.18em] text-ink-soft">24 . 01 . 2027</span>
            </motion.div>

            {/* front pocket */}
            <svg viewBox="0 0 145 100" preserveAspectRatio="none" className="absolute inset-0 z-[3] h-full w-full" aria-hidden="true">
              <polygon points="0,0 74,55 0,100" fill="#efe3d3" />
              <polygon points="145,0 71,55 145,100" fill="#ecdfce" />
              <polygon points="0,100 72.5,47 145,100" fill="#f4eadc" />
              <path d="M0 100 L72.5 47 L145 100" fill="none" stroke="#d9c6ae" strokeWidth="0.35" />
            </svg>

            {/* flap */}
            <motion.div
              className="absolute inset-x-0 top-0 h-[58%]"
              style={{ transformOrigin: 'top center', zIndex: stage >= 2 ? 1 : 4, transformStyle: 'preserve-3d' }}
              animate={{ rotateX: stage >= 1 ? 180 : 0 }}
              transition={{ duration: reduce ? 0 : 0.75, ease: EASE_IN_OUT }}
            >
              <svg viewBox="0 0 145 58" preserveAspectRatio="none" className="h-full w-full drop-shadow-[0_6px_6px_rgb(86_28_44/0.12)]" aria-hidden="true">
                <polygon points="0,0 145,0 72.5,58" fill="#f6ede1" />
                <path d="M0 0 L72.5 58 L145 0" fill="none" stroke="#d9c6ae" strokeWidth="0.35" />
              </svg>
            </motion.div>

            {/* wax seal */}
            <motion.div
              className="absolute left-1/2 top-[58%] z-[5] grid aspect-square w-[19%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
              style={{
                background: 'radial-gradient(circle at 35% 30%, #9b3a52 0%, #6a2033 45%, #45111f 100%)',
                boxShadow: 'inset 0 2px 3px rgb(255 255 255 / 0.18), inset 0 -3px 6px rgb(0 0 0 / 0.35), 0 6px 14px -4px rgb(63 18 32 / 0.55)',
              }}
              animate={stage >= 1 ? { opacity: 0, scale: 1.18, filter: 'blur(4px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.32, ease: EASE_OUT }}
            >
              <span className="absolute inset-[9%] rounded-full border border-[#c97b8d]/35" />
              <span className="font-display text-[clamp(0.95rem,3.4vw,1.35rem)] italic leading-none text-[#f3d9dd]">
                A<span className="font-script not-italic">&amp;</span>N
              </span>
            </motion.div>
          </motion.button>

          <motion.p
            className="mt-14 font-display text-xl italic text-ink-soft md:mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage ? 0 : 1 }}
            transition={{ duration: 0.6, delay: stage ? 0 : 0.8 }}
          >
            <span className="hint inline-block">Tap the seal to open</span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
