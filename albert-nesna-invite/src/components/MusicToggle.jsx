import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE_OUT } from '../lib/motion'

// Plays /music.mp3 from the public folder. Hidden if the file is missing.
export default function MusicToggle({ visible }) {
  const audio = useRef(null)
  const [available, setAvailable] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const a = new Audio('/music.mp3')
    a.loop = true
    a.volume = 0.5
    a.preload = 'metadata'
    const ok = () => setAvailable(true)
    const bad = () => setAvailable(false)
    a.addEventListener('loadedmetadata', ok)
    a.addEventListener('error', bad)
    audio.current = a
    return () => {
      a.pause()
      a.removeEventListener('loadedmetadata', ok)
      a.removeEventListener('error', bad)
    }
  }, [])

  const toggle = async () => {
    const a = audio.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      try {
        await a.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    }
  }

  return (
    <AnimatePresence>
      {visible && available && (
        <motion.button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause music' : 'Play music'}
          aria-pressed={playing}
          className="press fixed bottom-5 right-5 z-40 flex h-12 items-center gap-3 rounded-full border border-ink/15 bg-paper/80 pl-4 pr-5 text-[0.8rem] font-medium uppercase tracking-[0.2em] text-ink shadow-[0_10px_30px_-12px_rgb(86_28_44/0.35)] backdrop-blur-md md:bottom-8 md:right-8"
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 1.2 }}
        >
          <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
            {[0.55, 1, 0.7, 0.85].map((h, i) => (
              <motion.span
                key={i}
                className="w-[2px] rounded-full bg-rose"
                style={{ height: '100%', originY: 1 }}
                animate={playing ? { scaleY: [h * 0.4, h, h * 0.5, h * 0.9, h * 0.4] } : { scaleY: 0.25 }}
                transition={playing ? { duration: 1.1 + i * 0.15, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
              />
            ))}
          </span>
          {playing ? 'Music on' : 'Music'}
        </motion.button>
      )}
    </AnimatePresence>
  )
}
