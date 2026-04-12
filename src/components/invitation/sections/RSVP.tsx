// RSVP.tsx — Hebrew RSVP form → Supabase insert
// No <form> elements — all div + onClick
// Collects: name, attending (yes/no), guest count, dietary notes
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitRSVP } from '../../../lib/supabase'
import SectionWrapper from '../../shared/SectionWrapper'

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.8rem 1rem',
  border: '1px solid var(--mist)',
  borderRadius: '4px',
  fontFamily: 'var(--font-body)',
  fontSize: '1rem',
  color: 'var(--ink)',
  backgroundColor: 'transparent',
  outline: 'none',
  textAlign: 'right',
  direction: 'rtl',
  transition: 'border-color 0.15s',
}

export default function RSVP() {
  const [name, setName] = useState('')
  const [attending, setAttending] = useState<boolean | null>(null)
  const [guests, setGuests] = useState(1)
  const [dietary, setDietary] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const canSubmit = name.trim().length > 0 && attending !== null && status !== 'loading'

  const handleSubmit = async () => {
    if (!canSubmit) return
    setStatus('loading')
    try {
      await submitRSVP({ name: name.trim(), guests, attending: attending!, dietary: dietary.trim() })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--cream)' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: '380px', margin: '0 auto', textAlign: 'center' }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>💛</div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.9rem',
            fontStyle: 'italic',
            color: 'var(--ink)',
            marginBottom: '0.75rem',
          }}>
            תודה, {name}!
          </h3>
          <p style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--sage)',
            fontWeight: 300,
            lineHeight: 1.6,
          }}>
            {attending
              ? 'אישרת הגעה! נשמח לראותך בחתונה 🎉'
              : 'קיבלנו את תגובתך. מצטערים שלא תוכל להגיע.'}
          </p>
          <div style={{ height: '1px', backgroundColor: 'var(--mist)', margin: '2rem auto', width: '80px' }} />
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--gold-dark)', fontSize: '0.85rem', fontWeight: 300 }}>
            3.6.2026 &nbsp;|&nbsp; 19:30
          </p>
        </motion.div>
      </section>
    )
  }

  return (
    <section style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--cream)' }}>
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
          אישור הגעה
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
          מגיעים?
        </h2>

        <div style={{ maxWidth: '380px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Name */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', color: 'var(--sage)', fontWeight: 300 }}>
              שם מלא
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="הכנס את שמך"
              aria-label="שם מלא"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--gold)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--mist)')}
            />
          </div>

          {/* Attending toggle */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.8rem', color: 'var(--sage)', fontWeight: 300 }}>
              האם תגיעו?
            </label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {([true, false] as const).map((val) => (
                <motion.div
                  key={String(val)}
                  onClick={() => setAttending(val)}
                  aria-label={val ? 'מגיע/ה' : 'לא מגיע/ה'}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setAttending(val)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    textAlign: 'center',
                    border: `1.5px solid ${attending === val ? 'var(--gold)' : 'var(--mist)'}`,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    backgroundColor: attending === val ? 'var(--gold)' : 'transparent',
                    color: attending === val ? 'white' : 'var(--ink)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: attending === val ? 400 : 300,
                    userSelect: 'none',
                    transition: 'background-color 0.15s, border-color 0.15s',
                  }}
                >
                  {val ? 'מגיע/ה 🎉' : 'לא מגיע/ה'}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Guest count — visible only when attending */}
          <AnimatePresence>
            {attending === true && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.8rem', color: 'var(--sage)', fontWeight: 300 }}>
                  מספר מגיעים
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <motion.div
                      key={n}
                      onClick={() => setGuests(n)}
                      role="button"
                      aria-label={`${n} אורחים`}
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setGuests(n)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.93 }}
                      style={{
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1.5px solid ${guests === n ? 'var(--gold)' : 'var(--mist)'}`,
                        borderRadius: '4px',
                        cursor: 'pointer',
                        backgroundColor: guests === n ? 'var(--gold)' : 'transparent',
                        color: guests === n ? 'white' : 'var(--ink)',
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.1rem',
                        userSelect: 'none',
                        transition: 'background-color 0.15s, border-color 0.15s',
                      }}
                    >
                      {n}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dietary notes */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', color: 'var(--sage)', fontWeight: 300 }}>
              הערות תזונתיות <span style={{ opacity: 0.6 }}>(אופציונלי)</span>
            </label>
            <input
              type="text"
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              placeholder="טבעוני, ללא גלוטן..."
              aria-label="הערות תזונתיות"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--gold)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--mist)')}
            />
          </div>

          {/* Submit */}
          <motion.div
            onClick={handleSubmit}
            role="button"
            aria-label="שלח אישור הגעה"
            aria-disabled={!canSubmit}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            whileHover={canSubmit ? { scale: 1.02 } : {}}
            whileTap={canSubmit ? { scale: 0.98 } : {}}
            style={{
              padding: '1rem',
              textAlign: 'center',
              backgroundColor: canSubmit ? 'var(--gold)' : 'var(--mist)',
              color: canSubmit ? 'white' : 'var(--sage)',
              borderRadius: '4px',
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.12em',
              fontSize: '0.9rem',
              fontWeight: 400,
              userSelect: 'none',
              opacity: status === 'loading' ? 0.65 : 1,
              transition: 'background-color 0.2s',
            }}
          >
            {status === 'loading' ? 'שולח...' : 'אישור הגעה'}
          </motion.div>

          {/* Error message */}
          <AnimatePresence>
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  textAlign: 'center',
                  color: 'hsl(0 60% 50%)',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                }}
              >
                שגיאה בשליחה. אנא נסה שוב.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </SectionWrapper>
    </section>
  )
}
