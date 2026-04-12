// Hero.tsx — full-screen cinematic video hero with parallax content
// Video: /videos/hero-video.MOV (user-provided, auto-detected)
// Fallback image: /photos/hero-fallback.jpg
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const VIDEO_SRC = '/videos/hero-video.MOV'
const FALLBACK_SRC = '/photos/hero-fallback.jpg'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <div ref={ref} style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Parallax video background */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: 0 }}>
        <video
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={FALLBACK_SRC}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        {/* Fallback image shown if video fails */}
        <img
          src={FALLBACK_SRC}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        />
      </motion.div>

      {/* Overlay gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, hsl(30 15% 18% / 0.3) 0%, hsl(30 15% 18% / 0.55) 60%, hsl(30 15% 18% / 0.7) 100%)',
      }} />

      {/* Parallax content */}
      <motion.div
        style={{
          y: contentY,
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 1.5rem',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--gold)',
            letterSpacing: '0.4em',
            fontWeight: 300,
            fontSize: '0.8rem',
            marginBottom: '1.25rem',
            textTransform: 'uppercase',
          }}
        >
          החתונה של
        </motion.p>

        <h1
          dir="ltr"
          style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'normal',
            fontWeight: 300,
            fontSize: 'clamp(3rem, 12vw, 5.5rem)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--cream)',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
            display: 'inline-flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.08em',
          }}
        >
          {'TAL & BAR'.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '1px',
            width: '100px',
            backgroundColor: 'var(--gold)',
            marginBottom: '1.5rem',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          style={{ textAlign: 'center' }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--sage-light)',
            fontWeight: 300,
            fontSize: '1rem',
            marginBottom: '0.4rem',
          }}>
            יום רביעי, ג׳ בסיוון תשפ״ו
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--cream)',
            fontWeight: 300,
            fontSize: '1.1rem',
            letterSpacing: '0.1em',
          }}>
            3.6.2026 &nbsp;|&nbsp; 19:30
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </div>
  )
}
