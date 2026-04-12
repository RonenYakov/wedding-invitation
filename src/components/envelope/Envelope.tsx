// Envelope.tsx — full-screen wedding envelope
// Wax seal: golden amber wax + watercolor lemon illustration — Amalfi old-money style
// Font: Cormorant Garamond italic
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import BackgroundMusic from '../shared/BackgroundMusic'

const CX = 200   // seal center x — crease intersection
const CY = 140   // seal center y

const sealBreath = {
  scale: [1, 1.020, 1] as number[],
  transition: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' as const },
}

export default function Envelope() {
  const navigate  = useNavigate()
  const [clicked, setClicked]       = useState(false)
  const [burst,   setBurst]         = useState(false)
  const [triggerMusic, setTriggerMusic] = useState(false)

  const handleOpen = () => {
    if (clicked) return
    setClicked(true)
    setTriggerMusic(true)
    setTimeout(() => {
      setBurst(true)
      setTimeout(() => navigate('/invitation'), 750)
    }, 550)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      style={{ position: 'fixed', inset: 0, overflow: 'hidden', cursor: clicked ? 'default' : 'pointer' }}
      onClick={handleOpen}
      onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
      role="button"
      aria-label="לחץ לפתיחת ההזמנה"
      tabIndex={0}
    >
      {/* ══════════ Full-screen SVG envelope ══════════ */}
      <motion.svg
        width="100%" height="100%"
        viewBox="0 0 400 280"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ scale: 0.97, opacity: 0 }}
        animate={clicked ? { scale: 1.13, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={clicked
          ? { duration: 0.55, ease: [0.4, 0, 1, 1] }
          : { duration: 1.5,  ease: [0.16, 1, 0.3, 1] }
        }
      >
        <defs>
          {/* Paper grain */}
          <filter id="grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" seed="11" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>

          {/* Organic wax edge — subtle displacement */}
          <filter id="wax-shape" x="-18%" y="-18%" width="136%" height="136%">
            <feTurbulence type="turbulence" baseFrequency="0.038" numOctaves="4" seed="6" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* Soft blur for watercolor illustration elements */}
          <filter id="soft">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>

          {/* Envelope body — warm parchment */}
          <radialGradient id="env-body" cx="28%" cy="20%" r="84%">
            <stop offset="0%"   stopColor="#FEFBF3" />
            <stop offset="38%"  stopColor="#F6EDD9" />
            <stop offset="100%" stopColor="#EAD9C0" />
          </radialGradient>

          {/* Flap shading */}
          <linearGradient id="ft" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FEFCF5" /><stop offset="100%" stopColor="#EEDDCA" />
          </linearGradient>
          <linearGradient id="fb" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#E4D4BC" /><stop offset="100%" stopColor="#EFE4D0" />
          </linearGradient>
          <linearGradient id="fl" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#EBDFC9" /><stop offset="100%" stopColor="#F6EDD9" />
          </linearGradient>
          <linearGradient id="fr" x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#DFCFB7" /><stop offset="100%" stopColor="#E9DECB" />
          </linearGradient>

          {/* Gold foil border */}
          <linearGradient id="gold-border" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#D5AC32" />
            <stop offset="24%"  stopColor="#A87A1A" />
            <stop offset="50%"  stopColor="#EECC44" />
            <stop offset="76%"  stopColor="#B49232" />
            <stop offset="100%" stopColor="#D5AC32" />
          </linearGradient>

          {/* ── Golden amber wax seal ── */}
          <radialGradient id="wax" cx="32%" cy="26%" r="74%">
            <stop offset="0%"   stopColor="#F8D858" />  {/* warm bright highlight */}
            <stop offset="16%"  stopColor="#DCA018" />  {/* rich amber */}
            <stop offset="44%"  stopColor="#A87010" />  {/* deep amber */}
            <stop offset="74%"  stopColor="#6A4206" />  {/* dark brown */}
            <stop offset="100%" stopColor="#2C1A00" />  {/* near-black edge */}
          </radialGradient>
          <radialGradient id="wax-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#DCA018" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#DCA018" stopOpacity="0"    />
          </radialGradient>
          <radialGradient id="wax-spec" cx="30%" cy="24%" r="50%">
            <stop offset="0%"   stopColor="#FFFBF0" stopOpacity="0.45" />
            <stop offset="55%"  stopColor="#FFFBF0" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFFBF0" stopOpacity="0"    />
          </radialGradient>

          {/* Lemon gradients */}
          <radialGradient id="lem1" cx="35%" cy="30%" r="70%">
            <stop offset="0%"   stopColor="#F8E040" />
            <stop offset="55%"  stopColor="#E0A810" />
            <stop offset="100%" stopColor="#C08808" />
          </radialGradient>
          <radialGradient id="lem2" cx="38%" cy="28%" r="70%">
            <stop offset="0%"   stopColor="#FAE848" />
            <stop offset="55%"  stopColor="#DCAA14" />
            <stop offset="100%" stopColor="#B88408" />
          </radialGradient>

          {/* Shadow beneath seal */}
          <filter id="seal-shadow" x="-30%" y="-30%" width="160%" height="180%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#5A3800" floodOpacity="0.22" />
            <feDropShadow dx="0" dy="2" stdDeviation="3"  floodColor="#5A3800" floodOpacity="0.12" />
          </filter>

          {/* Envelope ambient shadow */}
          <filter id="env-shadow" x="-4%" y="-4%" width="108%" height="116%">
            <feDropShadow dx="0" dy="10" stdDeviation="18" floodColor="#2A1400" floodOpacity="0.13" />
          </filter>
        </defs>

        {/* ── Envelope body ── */}
        <rect x="0" y="0" width="400" height="280" fill="url(#env-body)" filter="url(#env-shadow)" />

        {/* ── Four flap triangles ── */}
        <path d="M0 0 L400 0 L200 140 Z"    fill="url(#ft)" opacity="0.34" />
        <path d="M0 280 L400 280 L200 140 Z" fill="url(#fb)" opacity="0.44" />
        <path d="M0 0 L0 280 L200 140 Z"     fill="url(#fl)" opacity="0.26" />
        <path d="M400 0 L400 280 L200 140 Z" fill="url(#fr)" opacity="0.38" />

        {/* ── Fold crease lines ── */}
        <line x1="0"   y1="0"   x2="200" y2="140" stroke="#9C7A22" strokeWidth="0.5"  opacity="0.40" />
        <line x1="400" y1="0"   x2="200" y2="140" stroke="#9C7A22" strokeWidth="0.5"  opacity="0.34" />
        <line x1="0"   y1="280" x2="200" y2="140" stroke="#8C6A14" strokeWidth="0.42" opacity="0.28" />
        <line x1="400" y1="280" x2="200" y2="140" stroke="#8C6A14" strokeWidth="0.42" opacity="0.24" />
        <line x1="1"   y1="0"   x2="201" y2="140" stroke="#FFF8E8" strokeWidth="0.45" opacity="0.48" />
        <line x1="399" y1="0"   x2="199" y2="140" stroke="#FFF8E8" strokeWidth="0.38" opacity="0.28" />
        <line x1="1"   y1="280" x2="201" y2="140" stroke="#FFF8E8" strokeWidth="0.32" opacity="0.18" />
        <line x1="399" y1="280" x2="199" y2="140" stroke="#FFF8E8" strokeWidth="0.28" opacity="0.14" />

        {/* ── Paper grain ── */}
        <rect x="0" y="0" width="400" height="280" fill="white" filter="url(#grain)" opacity="0.048" />

        {/* ── Gold foil border ── */}
        <rect x="0" y="0" width="400" height="280" fill="none" stroke="url(#gold-border)" strokeWidth="1.1" />
        <rect x="7" y="7" width="386" height="266" fill="none" stroke="#C8A025" strokeWidth="0.26" opacity="0.26" />

        {/* ── Corner ornaments ── */}
        {([
          [12,  12,   1,  1],
          [388, 12,  -1,  1],
          [12,  268,  1, -1],
          [388, 268, -1, -1],
        ] as [number, number, number, number][]).map(([x, y, dx, dy], i) => (
          <g key={i} opacity="0.28">
            <line x1={x} y1={y} x2={x+dx*26} y2={y}        stroke="#C8A025" strokeWidth="0.9" strokeLinecap="round" />
            <line x1={x} y1={y} x2={x}        y2={y+dy*26} stroke="#C8A025" strokeWidth="0.9" strokeLinecap="round" />
            <circle cx={x} cy={y} r="1.4" fill="#C8A025" />
          </g>
        ))}

        {/* ══════════ Wax seal — golden amber + lemon illustration ══════════ */}

        {/* Ambient glow under seal */}
        <circle cx={CX} cy={CY} r="76" fill="url(#wax-glow)" />

        {/* Outer gold ring */}
        <circle cx={CX} cy={CY} r="60" fill="none" stroke="#C8960A" strokeWidth="1.2" opacity="0.55" />
        <circle cx={CX} cy={CY} r="57" fill="none" stroke="#E8C840" strokeWidth="0.4" opacity="0.28" />

        {/* Wax body with organic displacement edge */}
        <motion.g
          style={{ transformOrigin: `${CX}px ${CY}px` }}
          animate={!clicked ? sealBreath : {}}
          filter="url(#seal-shadow)"
        >
          {/* Displaced wax circle for organic edge */}
          <circle cx={CX} cy={CY} r="52" fill="url(#wax)" filter="url(#wax-shape)" />

          {/* ── Lemon illustration (inside seal, above wax layer) ── */}

          {/* Back-left leaf */}
          <path
            d="M 198 132 C 191 127 179 119 173 117 C 168 115 170 123 198 132 Z"
            fill="#4A7820" opacity="0.88" filter="url(#soft)"
          />
          {/* Back-right leaf */}
          <path
            d="M 202 130 C 209 125 221 117 227 114 C 232 112 230 120 202 130 Z"
            fill="#5A8A28" opacity="0.82" filter="url(#soft)"
          />
          {/* Center upright leaf */}
          <path
            d="M 198 131 C 194 123 193 113 197 110 C 203 110 207 120 202 131 Z"
            fill="#3E6818" opacity="0.85" filter="url(#soft)"
          />
          {/* Vein on center leaf */}
          <line x1="200" y1="131" x2="200" y2="112" stroke="#2A5010" strokeWidth="0.55" opacity="0.45" />

          {/* Thin stem connecting base of leaves */}
          <path
            d="M 178 124 Q 200 130 222 121"
            stroke="#4A5E18" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.65"
          />

          {/* Left lemon (slightly behind, rotated -15°) */}
          <g filter="url(#soft)">
            <g transform="rotate(-15, 191, 147)">
              <ellipse cx="191" cy="147" rx="16" ry="10.5" fill="url(#lem1)" />
              {/* Left nipple */}
              <ellipse cx="175" cy="147" rx="3" ry="2.5" fill="#C08808" />
              {/* Right nipple */}
              <ellipse cx="207" cy="147" rx="2.5" ry="2" fill="#C08808" />
            </g>
          </g>

          {/* Right lemon (front, rotated +10°) */}
          <g filter="url(#soft)">
            <g transform="rotate(10, 211, 139)">
              <ellipse cx="211" cy="139" rx="15" ry="9.5" fill="url(#lem2)" />
              <ellipse cx="196" cy="139" rx="2.5" ry="2"   fill="#B88408" />
              <ellipse cx="226" cy="139" rx="2"   ry="1.8" fill="#B88408" />
            </g>
          </g>

          {/* Lemon highlights — soft white gloss */}
          <g transform="rotate(-15, 186, 142)">
            <ellipse cx="186" cy="142" rx="5.5" ry="3.5" fill="white" opacity="0.30" />
          </g>
          <g transform="rotate(10, 206, 134)">
            <ellipse cx="206" cy="134" rx="4.5" ry="3"   fill="white" opacity="0.30" />
          </g>

          {/* ── Monogram — Cormorant Garamond, pressed into wax ── */}
          <text
            x={CX} y={CY + 26}
            textAnchor="middle"
            fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif"
            fontSize="9"
            fontStyle="italic"
            fontWeight="300"
            letterSpacing="2.5"
            fill="#2C1A00"
            opacity="0.62"
          >
            T &amp; B
          </text>

          {/* Thin rule above monogram */}
          <line
            x1={CX - 12} y1={CY + 18} x2={CX + 12} y2={CY + 18}
            stroke="#2C1A00" strokeWidth="0.5" opacity="0.35"
          />

          {/* Subtle specular — matte not glassy */}
          <circle cx={CX} cy={CY} r="52" fill="url(#wax-spec)" filter="url(#wax-shape)" />

          {/* Shadow crescent for lift */}
          <path
            d={`M ${CX+34} ${CY+26} A 52 52 0 0 0 ${CX-34} ${CY+26}`}
            fill="#1A0A00" opacity="0.14"
          />
        </motion.g>
      </motion.svg>

      {/* ── Prompt — Cormorant Garamond ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={clicked ? { opacity: 0 } : { opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '7%',
          left: 0, right: 0,
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <p style={{
          fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'hsl(30 35% 30%)',
          letterSpacing: '0.32em',
          fontSize: '1rem',
        }}>
          לחצו לפתיחה
        </p>
        <motion.div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, hsl(38 65% 40%), transparent)',
            width: '56px',
            margin: '0.55rem auto 0',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.9, duration: 0.8 }}
        />
      </motion.div>

      {/* ── Burst ── */}
      <AnimatePresence>
        {burst && (
          <motion.div
            style={{
              position: 'fixed', inset: 0,
              background: 'radial-gradient(circle at center, hsl(44 60% 98%) 0%, hsl(42 38% 95%) 60%)',
              pointerEvents: 'none',
              zIndex: 100,
            }}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 5,   opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeIn' }}
          />
        )}
      </AnimatePresence>

      <BackgroundMusic triggerPlay={triggerMusic} />
    </motion.div>
  )
}
