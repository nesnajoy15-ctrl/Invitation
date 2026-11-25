import { motion, useReducedMotion } from 'framer-motion'
import { FadeUp, MaskLine } from './Reveal'
import { RoseCorner } from './Rose'
import { VENUE } from '../data'
import { EASE_IN_OUT } from '../lib/motion'

function Arch() {
  const reduce = useReducedMotion()
  const draw = {
    initial: { pathLength: reduce ? 1 : 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, margin: '-100px' },
  }
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[380px]">
      <div
        className="absolute inset-[6%] rounded-t-full"
        style={{ background: 'linear-gradient(180deg, rgb(232 188 196 / 0.55), rgb(241 232 220 / 0.6) 70%, transparent)' }}
      />
      <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <motion.path
          d="M20 400 V150 A130 130 0 0 1 280 150 V400"
          stroke="#b0526a"
          strokeOpacity="0.55"
          strokeWidth="1"
          {...draw}
          transition={{ duration: 2.2, ease: EASE_IN_OUT }}
        />
        <motion.path
          d="M34 400 V152 A116 116 0 0 1 266 152 V400"
          stroke="#a8895c"
          strokeOpacity="0.45"
          strokeWidth="0.75"
          {...draw}
          transition={{ duration: 2.2, ease: EASE_IN_OUT, delay: 0.25 }}
        />
      </svg>
      <RoseCorner corner="tl" fadeEdges inView delay={0.6} className="absolute -left-[10%] -top-[6%] w-[60%]" />
      <RoseCorner corner="br" fadeEdges inView delay={0.9} className="absolute -bottom-[4%] -right-[10%] w-[64%]" />
      <div className="absolute inset-x-0 top-[42%] text-center">
        <p className="font-script text-5xl text-rose">Potta</p>
        <p className="mt-2 text-[0.8rem] uppercase tracking-[0.18em] text-ink-soft">Chalakudy, Kerala</p>
      </div>
    </div>
  )
}

export default function Venue() {
  return (
    <section id="venue" className="relative overflow-x-clip px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6 md:col-start-1">
          <FadeUp>
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.18em] text-rose">The venue</p>
          </FadeUp>
          <h2 className="mt-6 font-display text-[clamp(3.2rem,7vw,6.2rem)] font-normal leading-[0.9] tracking-[-0.02em] text-wine">
            <MaskLine inView>LF Convention</MaskLine>
            <MaskLine inView delay={0.1} innerClassName="italic">
              Centre
            </MaskLine>
          </h2>
          <FadeUp delay={0.2} className="mt-8 max-w-md text-[1.1rem] leading-relaxed text-ink-soft">
            The betrothal and the wedding both take place here, in {VENUE.place}. Tap below for directions straight to the door.
          </FadeUp>
          <FadeUp delay={0.3} className="mt-10 flex flex-wrap gap-3">
            <a
              href={VENUE.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="press btn-solid inline-flex items-center gap-3 rounded-full bg-wine px-7 py-4 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-paper"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              Get directions
            </a>
          </FadeUp>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <Arch />
        </div>
      </div>
    </section>
  )
}
