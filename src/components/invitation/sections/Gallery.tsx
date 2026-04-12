// Gallery.tsx — editorial asymmetric gallery with mask-reveal animations
// Layout: 12-column grid, first 3 images editorially placed, rest 2-per-row
// Hebrew poetic quotes (Song of Songs) interspersed between image rows
// Lightbox: cinematic dark backdrop, gold SVG chevrons, gold close button
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '../../shared/SectionWrapper'
import OrnamentalRule from '../../shared/OrnamentalRule'

const BRAND_EASE: [number, number, number, number] = [0.77, 0, 0.175, 1]

const modules = import.meta.glob<{ default: string }>(
  '../../../assets/gallery/*.{jpg,jpeg,webp,png,JPG,JPEG,WEBP,PNG}',
  { eager: true },
)
const IMAGES = Object.values(modules).map((m) => m.default).sort()

const QUOTES = [
  { text: 'אֲנִי לְדוֹדִי וְדוֹדִי לִי', source: 'שיר השירים ו׳, ג׳' },
  { text: 'כִּי אֲנִי חוֹלַת אַהֲבָה',    source: 'שיר השירים ב׳, ה׳' },
  { text: 'מָצָאתִי אֵת שֶׁאָהֲבָה נַפְשִׁי', source: 'שיר השירים ג׳, ד׳' },
]

// ── Single image with clip-path mask reveal + zoom-out ──
function GalleryImage({
  src, alt, style = {}, delay = 0, onClick,
}: {
  src: string
  alt: string
  style?: React.CSSProperties
  delay?: number
  onClick: () => void
}) {
  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={alt}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      style={{ overflow: 'hidden', cursor: 'pointer', ...style }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: BRAND_EASE, delay }}
      viewport={{ once: true, amount: 0.05, margin: '0px 0px -60px 0px' }}
      whileHover={{ scale: 1.015 }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1.0 }}
        transition={{ duration: 1.4, ease: BRAND_EASE, delay }}
        viewport={{ once: true, amount: 0.05 }}
      />
    </motion.div>
  )
}

// ── Hebrew poetic quote block ──
function Quote({ text, source, delay = 0 }: { text: string; source: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: BRAND_EASE, delay }}
      viewport={{ once: true, amount: 0.3 }}
      style={{ textAlign: 'center', padding: '3.5rem 2rem' }}
    >
      <OrnamentalRule opacity={0.35} width={120} style={{ marginBottom: '1.5rem' }} />
      <p style={{
        fontFamily: 'var(--font-accent)',
        fontSize: 'clamp(1.05rem, 2.5vw, 1.45rem)',
        fontStyle: 'italic',
        fontWeight: 300,
        color: 'var(--gold-dark)',
        letterSpacing: '0.05em',
        lineHeight: 1.7,
        marginBottom: '0.6rem',
      }}>
        {text}
      </p>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.68rem',
        color: 'var(--sage)',
        letterSpacing: '0.22em',
        fontWeight: 300,
      }}>
        — {source}
      </p>
      <OrnamentalRule opacity={0.35} width={120} style={{ marginTop: '1.5rem' }} />
    </motion.div>
  )
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const open  = (i: number) => setLightbox(i)
  const close = ()           => setLightbox(null)
  const prev  = (e: React.MouseEvent) => { e.stopPropagation(); setLightbox((l) => (l !== null && l > 0 ? l - 1 : l)) }
  const next  = (e: React.MouseEvent) => { e.stopPropagation(); setLightbox((l) => (l !== null && l < IMAGES.length - 1 ? l + 1 : l)) }

  return (
    <section style={{
      padding: '5rem 0 6rem',
      background: 'linear-gradient(180deg, hsl(45 35% 92%) 0%, var(--cream) 100%)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <SectionWrapper>
        <p className="shimmer-gold" style={{
          textAlign: 'center',
          letterSpacing: '0.35em',
          fontSize: '0.72rem',
          fontWeight: 300,
          fontFamily: 'var(--font-body)',
          marginBottom: '0.6rem',
          textTransform: 'uppercase',
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
          marginBottom: '1.75rem',
        }}>
          הרגעים שלנו
        </h2>
        <OrnamentalRule opacity={0.5} />
      </SectionWrapper>

      <div style={{ maxWidth: '920px', margin: '3rem auto 0', padding: '0 1.5rem' }}>

        {IMAGES.length === 0 ? (
          /* ── Empty state ── */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '0.75rem',
          }}>
            {[
              { cols: '1 / 8', aspect: '1/1' },
              { cols: '8 / 13', aspect: '4/5' },
              { cols: '3 / 11', aspect: '16/9' },
            ].map(({ cols, aspect }, i) => (
              <div key={i} style={{
                gridColumn: cols,
                aspectRatio: aspect,
                border: '1px dashed var(--mist)',
                borderRadius: '2px',
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
          <>
            {/* ── Row 1: Image 0 (7 cols) + Image 1 (5 cols, offset) ── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '0.75rem',
            }}>
              {IMAGES[0] && (
                <div style={{ gridColumn: '1 / 8' }}>
                  <GalleryImage
                    src={IMAGES[0]} alt="תמונה 1"
                    style={{ aspectRatio: '1/1' }}
                    onClick={() => open(0)}
                  />
                </div>
              )}
              {IMAGES[1] && (
                <div style={{ gridColumn: '8 / 13', marginTop: '4rem' }}>
                  <GalleryImage
                    src={IMAGES[1]} alt="תמונה 2"
                    style={{ aspectRatio: '4/5' }}
                    delay={0.15}
                    onClick={() => open(1)}
                  />
                </div>
              )}
            </div>

            {/* Quote 1 */}
            {QUOTES[0] && <Quote text={QUOTES[0].text} source={QUOTES[0].source} />}

            {/* ── Row 2: Image 2 (8 cols, centered) ── */}
            {IMAGES[2] && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '0.75rem',
              }}>
                <div style={{ gridColumn: '3 / 11' }}>
                  <GalleryImage
                    src={IMAGES[2]} alt="תמונה 3"
                    style={{ aspectRatio: '16/9' }}
                    onClick={() => open(2)}
                  />
                </div>
              </div>
            )}

            {/* Quote 2 */}
            {QUOTES[1] && <Quote text={QUOTES[1].text} source={QUOTES[1].source} delay={0.1} />}

            {/* ── Remaining images: 2 per row (6 cols each) ── */}
            {IMAGES.length > 3 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '0.75rem',
                rowGap: '0.75rem',
              }}>
                {IMAGES.slice(3).map((src, i) => (
                  <div key={src} style={{ gridColumn: i % 2 === 0 ? '1 / 7' : '7 / 13' }}>
                    <GalleryImage
                      src={src} alt={`תמונה ${i + 4}`}
                      style={{ aspectRatio: '4/5' }}
                      delay={i * 0.08}
                      onClick={() => open(3 + i)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Quote 3 */}
            {QUOTES[2] && <Quote text={QUOTES[2].text} source={QUOTES[2].source} delay={0.1} />}
          </>
        )}
      </div>

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
              animate={{ scale: 1,    opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: BRAND_EASE }}
              style={{
                maxWidth: '90vw', maxHeight: '88vh',
                objectFit: 'contain',
                boxShadow: '0 32px 100px hsl(0 0% 0% / 0.6)',
              }}
            />

            {/* Prev — right side in RTL */}
            {lightbox > 0 && (
              <button onClick={prev} aria-label="תמונה קודמת" style={navBtnStyle}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M5.5 2.5l5 5-5 5" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {/* Next — left side in RTL */}
            {lightbox < IMAGES.length - 1 && (
              <button onClick={next} aria-label="תמונה הבאה" style={{ ...navBtnStyle, right: 'auto', left: '1.5rem' }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M9.5 2.5l-5 5 5 5" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {/* Counter */}
            <p style={{
              position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
              color: 'var(--gold)', fontFamily: 'var(--font-body)', fontSize: '0.72rem',
              letterSpacing: '0.35em', opacity: 0.8,
            }}>
              {lightbox + 1} &nbsp;/&nbsp; {IMAGES.length}
            </p>

            {/* Close */}
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

// ── Shared lightbox button styles ──
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
