// Invitation.tsx — main invitation page shell
// Assembles all sections, sets RTL direction on root
// Entry: opacity 1 (no fade-in — burst transition in App.tsx handles the reveal)
// Fixed: gold scroll progress bar + T&B monogram watermark (bottom-right)
import { motion, useScroll } from 'framer-motion'
import Hero from './sections/Hero'
import Countdown from './sections/Countdown'
import EventDetails from './sections/EventDetails'
import Venue from './sections/Venue'
import Gallery from './sections/Gallery'
import ParentsFooter from './sections/ParentsFooter'
import BackgroundMusic from '../shared/BackgroundMusic'

// ── T&B monogram watermark — very low opacity, persistent brand mark ──
function MonogramWatermark() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, delay: 2.5 }}
      style={{
        position: 'fixed',
        bottom: '1.75rem',
        right: '1.75rem',
        zIndex: 5,
        pointerEvents: 'none',
        opacity: 0.07,
      }}
      aria-hidden="true"
    >
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="28" r="26" stroke="var(--gold)" strokeWidth="0.6" />
        <text
          x="28" y="33"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="15"
          fontStyle="italic"
          fontWeight="300"
          fill="var(--gold)"
          letterSpacing="3"
        >
          T&amp;B
        </text>
      </svg>
    </motion.div>
  )
}

export default function Invitation() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      dir="rtl"
      initial={{ opacity: 1 }}   // burst in App.tsx handles the cinematic reveal
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: 'var(--cream)', color: 'var(--ink)' }}
    >
      {/* Gold scroll progress bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, var(--gold-dark), var(--gold-light))',
          transformOrigin: 'left',
          scaleX: scrollYProgress,
          zIndex: 999,
        }}
      />

      <Hero />
      <Countdown />
      <EventDetails />
      <Venue />
      <Gallery />
      <ParentsFooter />

      <MonogramWatermark />
      <BackgroundMusic triggerPlay={true} />
    </motion.div>
  )
}
