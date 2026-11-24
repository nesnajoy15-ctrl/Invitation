import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { motion, useScroll, useSpring } from 'framer-motion'
import { RoseDefs } from './components/Rose'
import Petals from './components/Petals'
import Envelope from './components/Envelope'
import Hero from './components/Hero'
import Invitation from './components/Invitation'
import Events from './components/Events'
import Countdown from './components/Countdown'
import Venue from './components/Venue'
import Footer from './components/Footer'
import MusicToggle from './components/MusicToggle'
import { lenisRef } from './lib/lenis'

function ProgressLine() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-rose/70" style={{ scaleX }} />
}

export default function App() {
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09, smoothWheel: true })
    lenisRef.current = lenis
    lenis.stop()
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = opened ? '' : 'hidden'
    if (opened) lenisRef.current?.start()
  }, [opened])

  return (
    <>
      <RoseDefs />
      <div className="paper-glow fixed inset-0 z-0" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Envelope onOpened={() => setOpened(true)} />
      {opened && <Petals />}
      <ProgressLine />
      <main className="relative z-10">
        <Hero ready={opened} />
        <Invitation />
        <Events />
        <Countdown />
        <Venue />
        <Footer />
      </main>
      <MusicToggle visible={opened} />
    </>
  )
}
