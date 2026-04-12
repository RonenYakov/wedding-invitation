// BackgroundMusic.tsx — fixed bottom-left music toggle button
// Audio: /audio/background.mp3 — muted by default (browser autoplay policy)
// Handles missing file gracefully via try/catch
// Props: triggerPlay — set true to attempt autoplay after user interaction
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function BackgroundMusic({ triggerPlay }: { triggerPlay: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    if (triggerPlay && audioRef.current && !playing) {
      audioRef.current.play()
        .then(() => setPlaying(true))
        .catch(() => {/* autoplay blocked — user must tap button */})
    }
  }, [triggerPlay])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio || !available) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => setAvailable(false))
    }
  }

  if (!available) return null

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/background.mp3"
        loop
        preload="none"
        onError={() => setAvailable(false)}
      />
      <motion.button
        onClick={toggle}
        aria-label={playing ? 'השתק מוסיקה' : 'נגן מוסיקה'}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          left: '1.5rem',
          zIndex: 50,
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: 'var(--gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px hsl(50 85% 50% / 0.35)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={playing ? {
          boxShadow: [
            '0 4px 20px hsl(50 85% 50% / 0.35)',
            '0 4px 36px hsl(50 85% 50% / 0.7)',
            '0 4px 20px hsl(50 85% 50% / 0.35)',
          ]
        } : {}}
        transition={playing ? { duration: 1.8, repeat: Infinity } : {}}
      >
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6Z"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6Z"/>
            <line x1="2" y1="2" x2="22" y2="22"/>
          </svg>
        )}
      </motion.button>
    </>
  )
}
