// Hero.tsx — editorial full-screen video hero
// Asymmetric layout: couple name large + left-staged, Hebrew eyebrow vertical right edge,
// date bottom-left detached, horizontal gold rule above name, scroll label rotated right
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const BRAND_EASE: [number, number, number, number] = [0.77, 0, 0.175, 1]

const VIDEO_SRC   = '/videos/hero-video.MOV'
const FALLBACK_SRC = '/photos/hero-fallback.jpg'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <div ref={ref} style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* ── Parallax video background ── */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: 0, willChange: 'transform' }}>
        <video
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          autoPlay loop muted playsInline preload="metadata"
          poster={FALLBACK_SRC}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        <img
          src={FALLBACK_SRC} alt="" aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
        />
      </motion.div>

      {/* ── Overlay gradient ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, hsl(30 15% 10% / 0.45) 0%, hsl(30 15% 12% / 0.55) 55%, hsl(30 15% 10% / 0.82) 100%)',
      }} />

      {/* ── Editorial content — absolute positioning ── */}
      <motion.div style={{ y: contentY, position: 'absolute', inset: 0, zIndex: 10, willChange: 'transform' }}>

        {/* Hebrew eyebrow — top-center */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: BRAND_EASE }}
          style={{
            position: 'absolute',
            top: '2.5rem',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: 'var(--font-body)',
            color: 'var(--gold)',
            fontSize: '0.62rem',
            letterSpacing: '0.55em',
            fontWeight: 300,
            textTransform: 'uppercase',
          }}
        >
          החתונה של
        </motion.p>

        {/* Horizontal gold rule — extends from left edge to 55% width, above couple name */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: BRAND_EASE }}
          style={{
            position: 'absolute',
            bottom: '37%',
            left: 0,
            width: '52%',
            height: '2px',
            backgroundColor: 'var(--gold)',
            transformOrigin: 'left',
            opacity: 0.85,
          }}
        />

        {/* Couple name — editorial large, left-staged */}
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: '7%',
          right: '14%',
        }}>
          <h1
            dir="ltr"
            style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'normal',
              fontWeight: 300,
              fontSize: 'clamp(3.6rem, 13vw, 7rem)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--cream)',
              lineHeight: 0.95,
              display: 'inline-flex',
              flexWrap: 'wrap',
              gap: '0.06em',
            }}
          >
            {'TAL & BAR'.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.5 + i * 0.06, ease: BRAND_EASE }}
                style={{ display: 'inline-block', whiteSpace: 'pre' }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Date & time — bottom-left, detached from name */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: BRAND_EASE }}
          style={{ position: 'absolute', bottom: '9%', left: '7%' }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--sage-light)',
            fontWeight: 300,
            fontSize: '0.72rem',
            letterSpacing: '0.48em',
            textTransform: 'uppercase',
            marginBottom: '0.28rem',
          }}>
            יום רביעי &nbsp;·&nbsp; ג׳ בסיוון תשפ״ו
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--cream)',
            fontWeight: 300,
            fontSize: '0.88rem',
            letterSpacing: '0.28em',
            opacity: 0.9,
          }}>
            3.6.2026 &nbsp;|&nbsp; 19:30
          </p>
        </motion.div>

        {/* Scroll indicator — off-center right, with rotated label */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            right: '7%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.58rem',
              letterSpacing: '0.4em',
              color: 'var(--gold)',
              fontWeight: 300,
              writingMode: 'vertical-rl',
              opacity: 0.75,
              marginBottom: '0.2rem',
            }}
          >
            גלול
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>

      </motion.div>
    </div>
  )
}
