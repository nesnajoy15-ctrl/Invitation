import { FadeUp, MaskLine } from './Reveal'
import { RoseCorner } from './Rose'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/10 px-6 pb-16 pt-32 md:px-10 md:pt-44">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <FadeUp>
              <p className="font-display text-2xl italic text-ink-soft md:text-3xl">Your presence is the only gift we ask for.</p>
            </FadeUp>
            <h2 className="mt-8 font-display text-[clamp(4.5rem,13vw,11rem)] font-normal leading-[0.85] tracking-[-0.03em] text-wine">
              <MaskLine inView>
                A<span className="mx-[0.12em] font-script text-[0.8em] leading-none text-rose">&amp;</span>N
              </MaskLine>
            </h2>
          </div>
          <FadeUp delay={0.2} className="space-y-1 text-ink-soft md:col-span-4 md:text-right">
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.18em] text-ink">With love and prayers</p>
            <p className="font-display text-xl italic">The Manjaly family</p>
            <p className="font-display text-xl italic">The Thakkolkkaran family</p>
          </FadeUp>
        </div>
        <div className="mt-20 flex flex-col gap-2 border-t border-ink/10 pt-6 text-[0.8rem] uppercase tracking-[0.24em] text-ink-soft sm:flex-row sm:justify-between">
          <span>Albert &amp; Nesna</span>
          <span>20 . 01 . 2027 and 24 . 01 . 2027</span>
        </div>
      </div>
      <RoseCorner corner="tl" flip inView className="absolute right-0 top-0 w-[40vw] max-w-[280px] md:w-[20vw]" />
    </footer>
  )
}
