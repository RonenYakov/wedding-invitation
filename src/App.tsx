// App.tsx — root router with AnimatePresence for seamless page transitions
// Routes: / → Envelope, /invitation → Invitation
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Envelope from './components/envelope/Envelope'
import Invitation from './components/invitation/Invitation'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Envelope />} />
        <Route path="/invitation" element={<Invitation />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
