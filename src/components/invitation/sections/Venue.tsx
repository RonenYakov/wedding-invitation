// Venue.tsx — venue info with Waze + Google Maps navigation buttons
// ⚠️  Update VENUE_NAME, VENUE_ADDRESS, WAZE_LINK, MAPS_LINK with real venue details
import { motion } from 'framer-motion'
import SectionWrapper from '../../shared/SectionWrapper'

const VENUE_NAME = 'LAGO VENUES'
const VENUE_ADDRESS = 'המאה ועשרים 6, ראשון לציון'
const WAZE_LINK = `https://waze.com/ul?q=${encodeURIComponent('המאה ועשרים, 6, ראשון לציון, Israel')}`
const MAPS_LINK = 'https://maps.app.goo.gl/aQLjEm7wyWWESRcG7'

const NAV_BUTTONS = [
  { href: WAZE_LINK, label: 'Waze', emoji: '🚗', aria: 'נווט עם Waze' },
  { href: MAPS_LINK, label: 'Google Maps', emoji: '📍', aria: 'פתח ב-Google Maps' },
]

export default function Venue() {
  return (
    <section style={{
      padding: '6rem 2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Venue background image with overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/venue.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.80)',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, hsl(30 25% 8% / 0.20) 0%, hsl(30 20% 6% / 0.35) 100%)',
        zIndex: 1,
      }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <SectionWrapper direction="right">
          <p style={{
            textAlign: 'center',
            color: 'var(--gold)',
            letterSpacing: '0.3em',
            fontSize: '0.75rem',
            fontWeight: 300,
            fontFamily: 'var(--font-body)',
            marginBottom: '0.5rem',
          }}>
            מיקום
          </p>

          <h2 style={{
            textAlign: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.4rem, 4vw, 1.9rem)',
            color: 'var(--cream)',
            fontStyle: 'normal',
            fontWeight: 300,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            marginBottom: '0.6rem',
          }}>
            {VENUE_NAME}
          </h2>

          <p style={{
            textAlign: 'center',
            fontFamily: 'var(--font-body)',
            color: 'var(--sage-light)',
            fontSize: '0.95rem',
            fontWeight: 300,
            marginBottom: '2.5rem',
          }}>
            {VENUE_ADDRESS}
          </p>

          {/* Decorative divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '2.5rem',
          }}>
            <div style={{ height: '1px', width: '56px', backgroundColor: 'hsl(42 78% 44% / 0.5)' }} />
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--gold)' }} />
            <div style={{ height: '1px', width: '56px', backgroundColor: 'hsl(42 78% 44% / 0.5)' }} />
          </div>

          {/* Navigation buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {NAV_BUTTONS.map(({ href, label, emoji, aria }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={aria}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.75rem',
                  border: '1.5px solid var(--gold)',
                  borderRadius: '4px',
                  color: 'var(--gold)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: 400,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                }}
                whileHover={{
                  backgroundColor: 'var(--gold)',
                  color: 'white',
                  scale: 1.03,
                  boxShadow: '0 0 22px hsl(42 78% 44% / 0.35)',
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                <span>{emoji}</span>
                <span>{label}</span>
              </motion.a>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
