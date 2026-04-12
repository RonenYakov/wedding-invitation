// App.tsx — root router with seamless burst transition between Envelope and Invitation
// Burst overlay lives outside <Routes> so it persists through the route change
import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Envelope from './components/envelope/Envelope'
import Invitation from './components/invitation/Invitation'

// Brand easing — applied to all major transitions for a unified feel
const BRAND_EASE: [number, number, number, number] = [0.77, 0, 0.175, 1]

function AnimatedRoutes() {
  const location = useLocation()
  const navigate  = useNavigate()
  const [transitioning, setTransitioning] = useState(false)

  // Called by Envelope on seal click — starts burst, then navigates
  const handleEnvelopeOpen = () => {
    setTransitioning(true)
    navigate('/invitation')   // navigate immediately; burst (z-index 9999) covers the swap
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"           element={<Envelope onOpen={handleEnvelopeOpen} />} />
          <Route path="/invitation" element={<Invitation />} />
        </Routes>
      </AnimatePresence>

      {/* ── White radial burst — persists across route change ── */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            aria-hidden="true"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'radial-gradient(circle at center, #ffffff 0%, hsl(44 42% 96%) 70%)',
              transformOrigin: 'center',
              pointerEvents: 'none',
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.9, ease: BRAND_EASE }}
            onAnimationComplete={() => setTransitioning(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
