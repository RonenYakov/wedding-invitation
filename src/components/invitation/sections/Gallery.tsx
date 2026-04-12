// Gallery.tsx — asymmetric photo grid with lightbox modal
// Images loaded dynamically from src/assets/gallery/ via import.meta.glob
// If folder is empty, shows gold-bordered placeholder grid
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '../../shared/SectionWrapper'

const modules = import.meta.glob<{ default: string }>(
  '../../../assets/gallery/*.{jpg,jpeg,webp,png,JPG,JPEG,WEBP,PNG}',
  { eager: true },
)
const IMAGES = Object.values(modules)
  .map((m) => m.default)
  .sort()

// Asymmetric column spans: 0→2col wide, others 1col
function colSpan(i: number) {
  return i % 5 === 0 ? 2 : 1
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <section style={{
      padding: '5rem 1.5rem',
      background: 'linear-gradient(180deg, hsl(45 35% 92%) 0%, var(--cream) 100%)',
    }}>
      <SectionWrapper>
        <p style={{
          textAlign: 'center',
          color: 'var(--gold)',
          letterSpacing: '0.3em',
          fontSize: '0.75rem',
          fontWeight: 300,
          fontFamily: 'var(--font-body)',
          marginBottom: '0.5rem',
        }}>
          גלריה
        </p>
        <h2 style={{
          textAlign: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
          color: 'var(--ink)',
          fontStyle: 'italic',
          fontWeight: 400,
          marginBottom: '3rem',
        }}>
          הרגעים שלנו
        </h2>

        {IMAGES.length === 0 ? (
          // Empty state — placeholder grid
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{
                gridColumn: colSpan(i) === 2 ? 'span 2' : 'span 1',
                aspectRatio: colSpan(i) === 2 ? '16/9' : '4/5',
                border: '1px dashed var(--mist)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--mist)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-body)',
              }}>
                תמונה
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            maxWidth: '680px',
            margin: '0 auto',
            perspective: '800px',
          }}>
            {IMAGES.map((src, i) => (
              <SectionWrapper key={src} delay={i * 0.06}>
                <motion.div
                  onClick={() => setLightbox(i)}
                  role="button"
                  aria-label={`פתח תמונה מספר ${i + 1}`}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setLightbox(i)}
                  style={{
                    gridColumn: `span ${colSpan(i)}`,
                    aspectRatio: colSpan(i) === 2 ? '16/9' : '4/5',
                    overflow: 'hidden',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    border: '1px solid transparent',
                  }}
                  whileHover={{
                    borderColor: 'var(--gold)',
                    scale: 1.03,
                    rotateZ: 0.6,
                    boxShadow: '0 8px 32px hsl(42 78% 44% / 0.15)',
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <img
                    src={src}
                    alt={`תמונה מספר ${i + 1}`}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </motion.div>
              </SectionWrapper>
            ))}
          </div>
        )}
      </SectionWrapper>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            aria-label="סגור גלריה"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              backgroundColor: 'hsl(30 15% 10% / 0.93)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.img
              key={lightbox}
              src={IMAGES[lightbox]}
              alt={`תמונה מספר ${lightbox + 1}`}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.28 }}
              style={{
                maxWidth: '90vw',
                maxHeight: '88vh',
                objectFit: 'contain',
                borderRadius: '4px',
                boxShadow: '0 24px 80px hsl(0 0% 0% / 0.5)',
              }}
            />

            {/* Prev — right in RTL */}
            {lightbox > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1) }}
                aria-label="תמונה קודמת"
                style={{
                  position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'var(--gold)',
                  fontSize: '2.5rem', cursor: 'pointer', padding: '0.5rem',
                }}
              >›</button>
            )}

            {/* Next — left in RTL */}
            {lightbox < IMAGES.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1) }}
                aria-label="תמונה הבאה"
                style={{
                  position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'var(--gold)',
                  fontSize: '2.5rem', cursor: 'pointer', padding: '0.5rem',
                }}
              >‹</button>
            )}

            {/* Counter */}
            <p style={{
              position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
              color: 'var(--sage-light)', fontFamily: 'var(--font-body)', fontSize: '0.8rem',
            }}>
              {lightbox + 1} / {IMAGES.length}
            </p>

            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              aria-label="סגור"
              style={{
                position: 'absolute', top: '1.25rem', left: '1.25rem',
                background: 'none', border: 'none', color: 'var(--cream)',
                fontSize: '1.5rem', cursor: 'pointer', padding: '0.5rem',
              }}
            >✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
