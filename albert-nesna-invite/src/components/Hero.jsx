import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { RoseCorner } from './Rose'
import { MaskLine } from './Reveal'
import { EASE_OUT } from '../lib/motion'

export default function Hero({ ready }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const fadeIn = (delay) => ({
    initial: { opacity: 0, y: 14, filter: 'blur(6px)' },
    animate: ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {},
    transition: { duration: 1, ease: EASE_OUT, delay },
  })

  return (
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden">
      <RoseCorner
        corner="tl"
        play={ready}
        parallax={-40}
        className="absolute left-0 top-0 z-0 w-[46vw] max-w-[400px] md:w-[30vw]"
      />
      <RoseCorner
        corner="br"
        play={ready}
        delay={0.25}
        parallax={50}
        className="absolute bottom-0 right-0 z-0 w-[52vw] max-w-[460px] md:w-[34vw]"
      />

      <div className="relative z-10 mx-auto grid min-h-[100dvh] max-w-7xl grid-cols-1 items-center px-6 pb-[54vw] pt-[60vw] md:grid-cols-12 md:px-10 md:py-28">
        <motion.div style={{ y: textY, opacity: fade }} className="md:col-span-8 md:col-start-4">
          <motion.p {...fadeIn(0.15)} className="mb-8 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-ink-soft">
            Together with their families
          </motion.p>

          <h1 className="font-display text-[clamp(4.2rem,11vw,9.5rem)] font-normal leading-[0.88] tracking-[-0.02em] text-wine">
            <MaskLine play={ready} delay={0.25}>
              Albert
            </MaskLine>
            <MaskLine play={ready} delay={0.4} className="pl-[0.55em]">
              <span className="mr-[0.22em] font-script text-[0.82em] leading-none text-rose">&amp;</span>
              <span className="italic">Nesna</span>
            </MaskLine>
          </h1>

          <motion.p {...fadeIn(0.75)} className="mt-8 max-w-md font-display text-[1.45rem] italic leading-snug text-ink-soft md:text-[1.7rem]">
            are getting married, and it would mean the world to have you there.
          </motion.p>

          <motion.div
            {...fadeIn(0.9)}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-[0.8rem] font-medium uppercase tracking-[0.2em] text-ink"
          >
            <span>Sunday, 24 . 01 . 2027</span>
            <span className="h-px w-10 bg-ink/30" />
            <span className="text-ink-soft">LF Convention Centre, Potta</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
