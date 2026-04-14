// Gallery.tsx — sticky-stack fullscreen gallery (maisonboursier.com technique)
// Each photo panel is position:sticky + 100vh, stacking as user scrolls
// Parallax scale driven by Framer Motion useScroll on each panel
// Lightbox: cinematic backdrop, gold chevrons, gold close button
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import OrnamentalRule from '../../shared/OrnamentalRule'

const BRAND_EASE: [number, number, number, number] = [0.77, 0, 0.175, 1]

const modules = import.meta.glob<{ default: string }>(
  '../../../assets/gallery/*.{jpg,jpeg,webp,png,JPG,JPEG,WEBP,PNG}',
  { eager: true },
)
const IMAGES = Object.values(modules).map((m) => m.default).sort()

// ── Single sticky photo panel ──
function StickyPanel({
  src, index, align, onClick,
}: {
  src: string
  index: number
  align: 'left' | 'right'
  onClick: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Zoom-out as photo comes into view
  const scale = useTransform(scrollYProgress, [0, 0.55], [1.12, 1.0])

  return (
    <div
      ref={ref}
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        zIndex: index + 1,
      }}
    >
      {/* Photo half — 50% wide on desktop, full width on mobile */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`תמונה ${index + 1}`}
        onClick={onClick}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        style={{
          position: 'relative',
          width: 'min(50%, 100%)',
          height: '100%',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <motion.img
          src={src}
          alt={`תמונה ${index + 1}`}
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            willChange: 'transform',
            scale,
          }}
        />
        {/* Subtle gold index */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: align === 'left' ? 'auto' : '2rem',
          right: align === 'left' ? '2rem' : 'auto',
          fontFamily: 'var(--font-body)',
          fontSize: '0.62rem',
          letterSpacing: '0.4em',
          color: 'var(--gold-light)',
          opacity: 0.7,
          pointerEvents: 'none',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const close = () => setLightbox(null)
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setLightbox((l) => (l !== null && l > 0 ? l - 1 : l)) }
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setLightbox((l) => (l !== null && l < IMAGES.length - 1 ? l + 1 : l)) }

  return (
    <section style={{ background: 'var(--cream)' }}>

      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.1, ease: BRAND_EASE }}
        style={{ padding: '5.5rem 2rem 4rem', textAlign: 'center' }}
      >
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.68rem',
          letterSpacing: '0.42em',
          fontWeight: 300,
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '0.75rem',
        }}>
          Gallery
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
          fontSize: 'clamp(2.4rem, 6vw, 3.5rem)',
          color: 'var(--ink)',
          fontStyle: 'italic',
          fontWeight: 300,
          letterSpacing: '0.04em',
          marginBottom: '1.5rem',
          lineHeight: 1.15,
        }}>
          Our Moments
        </h2>
        <OrnamentalRule opacity={0.45} width={100} />
      </motion.div>

      {/* ── Sticky gallery stack — NO overflow:hidden on this container ── */}
      {IMAGES.length === 0 ? (
        <div style={{
          padding: '6rem 2rem',
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
          color: 'var(--mist)',
          fontSize: '0.8rem',
          letterSpacing: '0.3em',
        }}>
          PHOTOS COMING SOON
        </div>
      ) : (
        <div>
          {IMAGES.map((src, i) => (
            <StickyPanel
              key={src}
              src={src}
              index={i}
              align={i % 2 === 0 ? 'left' : 'right'}
              onClick={() => setLightbox(i)}
            />
          ))}
        </div>
      )}

      {/* ── Closing ornament ── */}
      {IMAGES.length > 0 && (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--cream)' }}>
          <OrnamentalRule opacity={0.35} width={80} />
        </div>
      )}

      {/* ══════════ Lightbox ══════════ */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            aria-label="סגור גלריה"
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              backgroundColor: 'hsl(30 15% 8% / 0.97)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <motion.img
              key={lightbox}
              src={IMAGES[lightbox]}
              alt={`תמונה ${lightbox + 1}`}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: BRAND_EASE }}
              style={{
                maxWidth: '90vw', maxHeight: '88vh',
                objectFit: 'contain',
                boxShadow: '0 32px 100px hsl(0 0% 0% / 0.6)',
              }}
            />

            {lightbox > 0 && (
              <button onClick={prev} aria-label="תמונה קודמת" style={navBtnStyle}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M5.5 2.5l5 5-5 5" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {lightbox < IMAGES.length - 1 && (
              <button onClick={next} aria-label="תמונה הבאה" style={{ ...navBtnStyle, right: 'auto', left: '1.5rem' }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M9.5 2.5l-5 5 5 5" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            <p style={{
              position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
              color: 'var(--gold)', fontFamily: 'var(--font-body)', fontSize: '0.72rem',
              letterSpacing: '0.35em', opacity: 0.8,
            }}>
              {lightbox + 1} &nbsp;/&nbsp; {IMAGES.length}
            </p>

            <button onClick={(e) => { e.stopPropagation(); close() }} aria-label="סגור" style={closeBtnStyle}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 1l11 11M12 1L1 12" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

const navBtnStyle: React.CSSProperties = {
  position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
  background: 'hsl(42 78% 44% / 0.10)',
  border: '1px solid hsl(42 78% 44% / 0.35)',
  borderRadius: '50%', width: '2.75rem', height: '2.75rem',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', padding: 0,
}

const closeBtnStyle: React.CSSProperties = {
  position: 'absolute', top: '1.25rem', left: '1.25rem',
  background: 'hsl(42 78% 44% / 0.10)',
  border: '1px solid hsl(42 78% 44% / 0.35)',
  borderRadius: '50%', width: '2.75rem', height: '2.75rem',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', padding: 0,
}
