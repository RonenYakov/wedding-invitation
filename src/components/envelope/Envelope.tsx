// Envelope.tsx — full-screen wedding envelope
// Wax seal: real PNG stamp rendered with mix-blend-mode:multiply so white bg disappears
// onOpen prop: called after seal click; App.tsx handles burst overlay + navigation
import { useState } from 'react'
import { motion } from 'framer-motion'
import BackgroundMusic from '../shared/BackgroundMusic'

const sealBreath = {
  scale: [1, 1.020, 1] as number[],
  transition: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' as const },
}

interface Props {
  onOpen: () => void
}

export default function Envelope({ onOpen }: Props) {
  const [clicked, setClicked]           = useState(false)
  const [triggerMusic, setTriggerMusic] = useState(false)

  const handleOpen = () => {
    if (clicked) return
    setClicked(true)
    setTriggerMusic(true)
    setTimeout(() => onOpen(), 300)
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

          {/* Envelope ambient shadow */}
          <filter id="env-shadow" x="-4%" y="-4%" width="108%" height="116%">
            <feDropShadow dx="0" dy="10" stdDeviation="18" floodColor="#2A1400" floodOpacity="0.13" />
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

      </motion.svg>

      {/* ══════════ Wax seal — HTML overlay, circular via border-radius ══════════ */}
      {/* Positioned at SVG center (200/400=50%, 140/280=50%) — always correct with xMidYMid */}
      {/* Size: max(31vw, 44vh) matches SVG seal diameter across all viewport aspect ratios */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 1,
      }}>
        <motion.div
          animate={clicked
            ? { scale: 1.13, opacity: 0 }
            : { scale: [1, 1.02, 1] }
          }
          transition={clicked
            ? { duration: 0.55, ease: [0.4, 0, 1, 1] }
            : { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }
          }
          style={{
            width:  'max(31vw, 44vh)',
            height: 'max(31vw, 44vh)',
            borderRadius: '50%',
            overflow: 'hidden',
            filter: 'drop-shadow(0 6px 10px rgba(90,56,0,0.22)) drop-shadow(0 2px 3px rgba(90,56,0,0.12))',
          }}
        >
          <img
            src="/seal.png"
            alt=""
            aria-hidden="true"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </motion.div>
      </div>

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

      <BackgroundMusic triggerPlay={triggerMusic} />
    </motion.div>
  )
}
