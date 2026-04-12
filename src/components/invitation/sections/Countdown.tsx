// Countdown.tsx — typographic countdown, editorial scale
// Numbers fill the section at display size; ornamental diamond separators between units
// Eyebrow uses shimmer-gold; photo backdrop at full drama
import { motion } from 'framer-motion'
import { useCountdown } from '../../../hooks/useCountdown'

const BRAND_EASE: [number, number, number, number] = [0.77, 0, 0.175, 1]
const WEDDING_DATE = new Date('2026-06-03T19:30:00+03:00')
const BG_IMAGE     = '/photos/clock.jpeg'

const UNITS = [
  { key: 'days'    as const, label: 'ימים'  },
  { key: 'hours'   as const, label: 'שעות'  },
  { key: 'minutes' as const, label: 'דקות'  },
  { key: 'seconds' as const, label: 'שניות' },
]

// ── Diamond ornament separator between units ──
function DiamondSep() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '6px',
      margin: '0 clamp(1rem, 3vw, 2.2rem)',
      flexShrink: 0,
      alignSelf: 'center',
    }}>
      <div style={{ width: '1px', height: '28px', background: 'hsl(42 78% 44% / 0.28)' }} />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="var(--gold)" opacity="0.55" />
      </svg>
      <div style={{ width: '1px', height: '28px', background: 'hsl(42 78% 44% / 0.28)' }} />
    </div>
  )
}

export default function Countdown() {
  const countdown = useCountdown(WEDDING_DATE)

  return (
    <section style={{
      position: 'relative',
      minHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      overflow: 'hidden',
    }}>

      {/* ── Full photo ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${BG_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 50%',
        filter: 'brightness(0.60) saturate(0.9)',
      }} />

      {/* ── Top gradient — darkens behind text ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, hsl(205 30% 6% / 0.82) 0%, hsl(205 25% 6% / 0.38) 42%, transparent 65%)',
      }} />

      {/* ── Thin gold top border ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, hsl(42 78% 52% / 0.55), transparent)',
      }} />

      {/* ── Countdown block ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%',
        padding: '3.5rem 2rem 2rem',
        textAlign: 'center',
      }}>

        {/* Eyebrow — shimmer gold */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: BRAND_EASE }}
          className="shimmer-gold"
          style={{
            letterSpacing: '0.44em',
            fontSize: '0.6rem',
            fontWeight: 300,
            fontFamily: 'var(--font-body)',
            textTransform: 'uppercase',
            marginBottom: '0.4rem',
          }}
        >
          נותרו עד לחתונה
        </motion.p>

        {/* Date line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          style={{
            fontFamily: 'var(--font-body)',
            color: 'hsl(42 50% 70% / 0.5)',
            fontSize: '0.56rem',
            letterSpacing: '0.22em',
            fontWeight: 300,
            marginBottom: '2.5rem',
          }}
        >
          3.6.2026 &nbsp;·&nbsp; 19:30
        </motion.p>

        {/* ── Gold rule above numbers ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: BRAND_EASE }}
          style={{
            height: '1px',
            maxWidth: '580px',
            margin: '0 auto 2.8rem',
            background: 'linear-gradient(90deg, transparent, hsl(42 78% 44% / 0.5), transparent)',
          }}
        />

        {/* ── Four units ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: BRAND_EASE }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {UNITS.map(({ key, label }, i) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && <DiamondSep />}

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                minWidth: 'clamp(72px, 14vw, 120px)',
              }}>
                {/* Number */}
                <motion.span
                  key={countdown[key]}
                  animate={{ y: [-8, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 100,
                    fontSize: 'clamp(3.8rem, 10vw, 7.5rem)',
                    color: 'hsl(44 38% 97%)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    textShadow: '0 2px 40px hsl(205 40% 10% / 0.55)',
                  }}
                >
                  {String(countdown[key]).padStart(2, '0')}
                </motion.span>

                {/* Label */}
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.52rem',
                  color: 'hsl(42 65% 62% / 0.75)',
                  fontWeight: 300,
                  letterSpacing: '0.38em',
                  textTransform: 'uppercase',
                }}>
                  {label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Gold rule below numbers ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: BRAND_EASE }}
          style={{
            height: '1px',
            maxWidth: '580px',
            margin: '2.8rem auto 0',
            background: 'linear-gradient(90deg, transparent, hsl(42 78% 44% / 0.5), transparent)',
          }}
        />

      </div>
    </section>
  )
}
