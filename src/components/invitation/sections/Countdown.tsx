// Countdown.tsx — full-photo editorial countdown
// Photo: /photos/clock.jpeg — fills section at full brightness
// Style: typographic units separated by gold lines, no rings
import { motion } from 'framer-motion'
import { useCountdown } from '../../../hooks/useCountdown'

const WEDDING_DATE = new Date('2026-06-03T19:30:00+03:00')
const BG_IMAGE = '/photos/clock.jpeg'

const UNITS = [
  { key: 'days' as const, label: 'ימים' },
  { key: 'hours' as const, label: 'שעות' },
  { key: 'minutes' as const, label: 'דקות' },
  { key: 'seconds' as const, label: 'שניות' },
]

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

      {/* ── Full photo — shifted down so the couple is visible ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${BG_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 50%',
        filter: 'brightness(0.65) saturate(0.95)',
      }} />

      {/* ── Top-only gradient — darkens behind the text, photo open below ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, hsl(205 30% 6% / 0.78) 0%, hsl(205 25% 6% / 0.35) 38%, transparent 60%)',
      }} />

      {/* ── Thin gold top border ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, hsl(42 78% 52% / 0.5), transparent)',
      }} />

      {/* ── Countdown block — sits at the top over the dark gradient ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%',
        padding: '3.5rem 2rem 2rem',
        textAlign: 'center',
      }}>

        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{
            fontFamily: 'var(--font-body)',
            color: 'hsl(42 70% 65%)',
            letterSpacing: '0.42em',
            fontSize: '0.62rem',
            fontWeight: 300,
            textTransform: 'uppercase',
            marginBottom: '0.4rem',
          }}
        >
          ✦ &nbsp; נותרו עד לחתונה &nbsp; ✦
        </motion.p>

        {/* Date line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          style={{
            fontFamily: 'var(--font-body)',
            color: 'hsl(42 50% 70% / 0.55)',
            fontSize: '0.58rem',
            letterSpacing: '0.2em',
            fontWeight: 300,
            marginBottom: '2.2rem',
          }}
        >
          3.6.2026 &nbsp;·&nbsp; 19:30
        </motion.p>

        {/* ── Gold rule above numbers ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '1px',
            maxWidth: '560px',
            margin: '0 auto 2.4rem',
            background: 'linear-gradient(90deg, transparent, hsl(42 78% 44% / 0.55), transparent)',
          }}
        />

        {/* ── Four units in a row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'center',
            maxWidth: '640px',
            margin: '0 auto',
          }}
        >
          {UNITS.map(({ key, label }, i) => (
            <div key={key} style={{ display: 'flex', alignItems: 'stretch' }}>

              {/* Vertical separator between units */}
              {i > 0 && (
                <div style={{
                  width: '1px',
                  alignSelf: 'center',
                  height: '3.5rem',
                  background: 'hsl(42 78% 44% / 0.30)',
                  margin: '0 2rem',
                  flexShrink: 0,
                }} />
              )}

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.55rem',
                minWidth: '88px',
              }}>
                {/* Number */}
                <motion.span
                  key={countdown[key]}
                  animate={{ y: [-6, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 100,
                    fontSize: 'clamp(3.2rem, 7vw, 5rem)',
                    color: 'hsl(44 38% 97%)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    textShadow: '0 2px 28px hsl(205 40% 10% / 0.60)',
                  }}
                >
                  {String(countdown[key]).padStart(2, '0')}
                </motion.span>

                {/* Label */}
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.54rem',
                  color: 'hsl(42 65% 62% / 0.80)',
                  fontWeight: 300,
                  letterSpacing: '0.34em',
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
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '1px',
            maxWidth: '560px',
            margin: '2.4rem auto 0',
            background: 'linear-gradient(90deg, transparent, hsl(42 78% 44% / 0.55), transparent)',
          }}
        />

      </div>
    </section>
  )
}
