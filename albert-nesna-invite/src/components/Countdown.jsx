import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FadeUp, MaskLine } from './Reveal'
import { RoseCorner } from './Rose'
import { WEDDING_AT } from '../data'
import { EASE_OUT } from '../lib/motion'

function remaining() {
  const diff = Math.max(0, WEDDING_AT.getTime() - Date.now())
  return {
    done: diff === 0,
    units: [
      { label: 'Days', value: Math.floor(diff / 86400000) },
      { label: 'Hours', value: Math.floor(diff / 3600000) % 24 },
      { label: 'Minutes', value: Math.floor(diff / 60000) % 60 },
      { label: 'Seconds', value: Math.floor(diff / 1000) % 60 },
    ],
  }
}

function Digit({ d }) {
  const reduce = useReducedMotion()
  return (
    <span className="relative inline-block w-[0.56em] overflow-hidden text-center">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={d}
          className="inline-block"
          initial={reduce ? { opacity: 0 } : { y: '-60%', opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={reduce ? { opacity: 0 } : { y: '60%', opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.38, ease: EASE_OUT }}
        >
          {d}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Countdown() {
  const [t, setT] = useState(remaining)

  useEffect(() => {
    const id = setInterval(() => setT(remaining()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative overflow-hidden bg-wine px-6 py-28 text-paper md:px-10 md:py-40">
      <RoseCorner corner="tl" inView className="absolute left-0 top-0 w-[40vw] max-w-[300px] opacity-45 md:w-[20vw]" />
      <RoseCorner corner="br" inView delay={0.2} className="absolute bottom-0 right-0 w-[44vw] max-w-[340px] opacity-45 md:w-[24vw]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <FadeUp>
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.18em] text-rose-soft">24 January 2027, 12:05 PM</p>
            </FadeUp>
            <h2 className="mt-6 font-display text-[clamp(3rem,6.5vw,5.5rem)] font-normal leading-[0.92] tracking-[-0.02em]">
              <MaskLine inView>{t.done ? 'Just' : 'Until we'}</MaskLine>
              <MaskLine inView delay={0.1} innerClassName="italic text-rose-soft">
                {t.done ? 'married' : 'say I do'}
              </MaskLine>
            </h2>
          </div>

          <FadeUp delay={0.15} className="md:col-span-7">
            <dl className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
              {t.units.map((u, i) => {
                const str = u.label === 'Days' ? String(u.value) : String(u.value).padStart(2, '0')
                return (
                  <div key={u.label} className={`border-paper/15 pl-5 ${i ? 'sm:border-l' : ''} ${i % 2 ? 'border-l' : ''}`}>
                    <dd className="font-display text-[clamp(3.4rem,6vw,5.2rem)] font-normal leading-none lining-nums tabular-nums" aria-live={u.label === 'Days' ? 'polite' : 'off'}>
                      {str.split('').map((d, k) => (
                        <Digit key={`${str.length}-${k}`} d={d} />
                      ))}
                    </dd>
                    <dt className="mt-3 text-[0.8rem] font-medium uppercase tracking-[0.24em] text-paper/60">{u.label}</dt>
                  </div>
                )
              })}
            </dl>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
