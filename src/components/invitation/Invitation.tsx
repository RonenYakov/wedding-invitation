// Invitation.tsx — main invitation page shell
// Assembles all sections, sets RTL direction on root
import { motion, useScroll } from 'framer-motion'
import Hero from './sections/Hero'
import Countdown from './sections/Countdown'
import EventDetails from './sections/EventDetails'
import Venue from './sections/Venue'
import Gallery from './sections/Gallery'
import ParentsFooter from './sections/ParentsFooter'
import BackgroundMusic from '../shared/BackgroundMusic'

export default function Invitation() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      dir="rtl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: 'var(--cream)', color: 'var(--ink)' }}
    >
      {/* Gold scroll progress bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'var(--gold)',
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
      <BackgroundMusic triggerPlay={true} />
    </motion.div>
  )
}
