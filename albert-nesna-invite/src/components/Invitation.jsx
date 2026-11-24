import { motion } from 'framer-motion'
import { FadeUp, MaskLine } from './Reveal'
import { RoseCorner } from './Rose'
import { FAMILIES } from '../data'

const COPY =
  'With the blessings of God and the love of our families, we joyfully invite you to share in the celebration of our marriage.'

function InviteText() {
  return (
    <FadeUp as="p" className="max-w-4xl font-display text-[clamp(1.9rem,4.2vw,3.4rem)] font-normal leading-[1.18] tracking-[-0.01em] text-wine">
      {COPY}
    </FadeUp>
  )
}

function Family({ label, name, fam, className = '' }) {
  return (
    <div className={className}>
      <FadeUp>
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.18em] text-rose">{label}</p>
      </FadeUp>
      <h3 className="mt-5 font-display text-[clamp(3rem,6vw,4.6rem)] font-normal italic leading-none text-wine">
        <MaskLine inView delay={0.1}>
          {name}
        </MaskLine>
      </h3>
      <FadeUp delay={0.2} className="mt-6 space-y-1 text-[1.08rem] leading-relaxed text-ink-soft">
        <p>
          {fam.relation} <span className="text-ink">{fam.parents}</span>
        </p>
        <p className="font-display text-xl italic text-ink">{fam.house}</p>
      </FadeUp>
    </div>
  )
}

export default function Invitation() {
  return (
    <section id="invite" className="relative px-6 py-32 md:px-10 md:py-48">
      <RoseCorner
        corner="tl"
        flip
        inView
        parallax={40}
        className="absolute right-0 top-0 w-[42vw] max-w-[300px] opacity-40 md:w-[22vw] md:opacity-100"
      />
      <div className="relative mx-auto max-w-7xl">
        <InviteText />

        <div className="mt-28 grid grid-cols-1 gap-16 md:mt-40 md:grid-cols-12 md:gap-0">
          <Family label="The groom" name="Albert" fam={FAMILIES.groom} className="md:col-span-5" />
          <div className="hidden md:col-span-2 md:flex md:justify-center">
            <motion.span
              className="block h-full w-px origin-top bg-linear-to-b from-transparent via-rose/40 to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
            />
          </div>
          <Family label="The bride" name="Nesna" fam={FAMILIES.bride} className="md:col-span-5 md:pt-32" />
        </div>
      </div>
    </section>
  )
}
