import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { FadeUp, MaskLine } from './Reveal'
import { EVENTS, VENUE } from '../data'
import { downloadIcs, googleCalendarUrl } from '../lib/calendar'
import { EASE_IN_OUT } from '../lib/motion'

function Numeral({ day }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  // Observe the visible outline, not the clipped fill (a fully clipped element never "intersects").
  const seen = useInView(ref, { once: true, margin: '-100px' })
  return (
    <div ref={ref} className="relative select-none font-display lining-nums text-[clamp(8rem,18vw,15rem)] font-normal leading-[0.8] tracking-[-0.04em]">
      <span className="outline-num block">{day}</span>
      {/* filled copy, revealed bottom-up like ink rising */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 block text-wine"
        initial={{ clipPath: reduce ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)' }}
        animate={seen ? { clipPath: 'inset(0% 0 0 0)' } : undefined}
        transition={{ duration: 1.6, ease: EASE_IN_OUT, delay: 0.2 }}
      >
        {day}
      </motion.span>
    </div>
  )
}

// Even rows: numeral | details | actions. Odd rows mirror it.
const PLACE = [
  { num: 'md:col-start-1', info: 'md:col-start-5', act: 'md:col-start-10 md:items-end' },
  { num: 'md:col-start-9 md:text-right', info: 'md:col-start-1', act: 'md:col-start-6 md:items-start' },
]

function EventRow({ e, index }) {
  const p = PLACE[index % 2]
  return (
    <article className="grid grid-cols-1 gap-8 border-t border-ink/12 py-14 md:grid-cols-12 md:items-end md:gap-6 md:py-20">
      <div className={`md:col-span-4 md:row-start-1 ${p.num}`}>
        <Numeral day={e.day} />
      </div>

      <div className={`md:col-span-5 md:row-start-1 ${p.info}`}>
        <h3 className="font-display text-[clamp(2.6rem,5vw,4rem)] font-normal italic leading-none text-wine">
          <MaskLine inView>{e.title}</MaskLine>
        </h3>
        <FadeUp delay={0.15} className="mt-6 space-y-2">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.2em] text-ink">
            {e.weekday}, {e.day} {e.monthYear}
          </p>
          <p className="font-display text-4xl font-medium lining-nums text-rose">{e.time}</p>
          <p className="pt-1 text-[1.08rem] text-ink">
            {VENUE.name}, {VENUE.place}
          </p>
          <p className="font-display text-lg italic text-ink-soft">{e.note}</p>
        </FadeUp>
      </div>

      <FadeUp delay={0.25} className={`flex flex-wrap gap-3 md:col-span-3 md:row-start-1 md:flex-col ${p.act}`}>
        <a
          href={googleCalendarUrl(e)}
          target="_blank"
          rel="noreferrer"
          className="press btn-line inline-flex items-center gap-2 rounded-full border border-ink/25 px-5 py-3 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-ink"
        >
          <CalendarIcon /> Google Calendar
        </a>
        <button
          type="button"
          onClick={() => downloadIcs(e)}
          className="press btn-line inline-flex items-center gap-2 rounded-full border border-ink/25 px-5 py-3 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-ink"
        >
          <CalendarIcon /> Apple / Outlook
        </button>
      </FadeUp>
    </article>
  )
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  )
}

export default function Events() {
  return (
    <section id="events" className="relative px-6 pb-32 md:px-10 md:pb-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[clamp(3rem,7vw,6rem)] font-normal leading-[0.9] tracking-[-0.02em] text-wine">
            <MaskLine inView>Two days</MaskLine>
            <MaskLine inView delay={0.1} innerClassName="italic text-rose">
              to remember
            </MaskLine>
          </h2>
          <FadeUp delay={0.2} className="max-w-xs text-[1.08rem] text-ink-soft md:text-right">
            Both celebrations are held at {VENUE.name}, Potta. Save the dates to your calendar below.
          </FadeUp>
        </div>
        {EVENTS.map((e, i) => (
          <EventRow key={e.key} e={e} index={i} />
        ))}
        <div className="border-t border-ink/12" />
      </div>
    </section>
  )
}
