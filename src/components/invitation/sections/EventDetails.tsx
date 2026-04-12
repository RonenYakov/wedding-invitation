// EventDetails.tsx — RTL vertical timeline, 3 milestones
// Wedding-specific icons: champagne coupe, chuppah arch, dancing couple
// 19:30 קבלת פנים | 20:30 חופה | 21:15 מסיבה
import { motion } from 'framer-motion'
import SectionWrapper from '../../shared/SectionWrapper'
import OrnamentalRule from '../../shared/OrnamentalRule'

const BRAND_EASE: [number, number, number, number] = [0.77, 0, 0.175, 1]

const EVENTS = [
  {
    time: '19:30',
    title: 'קבלת פנים',
    description: 'אורחים מתקבלים, שתיה ומנות פתיחה',
    icon: (
      /* Champagne coupe */
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
        stroke="var(--gold-dark)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 4h14c0 5-3.2 9-7 9S5 9 5 4z" />
        <path d="M12 13v6" />
        <path d="M8 21h8" />
      </svg>
    ),
  },
  {
    time: '20:30',
    title: 'חופה',
    description: 'טקס הנישואין',
    icon: (
      /* Chuppah arch — two pillars, curved draped top, base platform */
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
        stroke="var(--gold-dark)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V9" />
        <path d="M20 20V9" />
        <path d="M4 9 Q12 4 20 9" />
        <path d="M8 20h8" />
        <path d="M12 9v5" />
      </svg>
    ),
  },
  {
    time: '21:15',
    title: 'מסיבה',
    description: 'ארוחה, ריקודים ואירוע',
    icon: (
      /* Dancing couple — two figures, arms raised */
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
        stroke="var(--gold-dark)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7.5" cy="4" r="1.8" />
        <path d="M7.5 6v4.5L5 15M7.5 10.5l2.5 3.5" />
        <path d="M5.5 8.5h4" />
        <circle cx="16.5" cy="4" r="1.8" />
        <path d="M16.5 6v4.5L19 15M16.5 10.5l-2.5 3.5" />
        <path d="M14.5 8.5h4" />
      </svg>
    ),
  },
]

export default function EventDetails() {
  // Icon column width — used for gold line positioning
  const ICON_SIZE = 56
  const ICON_OFFSET = ICON_SIZE / 2  // 28px — center of icon bubble

  return (
    <section style={{
      padding: '5rem 1.5rem',
      backgroundColor: 'var(--cream-deep)',
    }}>
      <SectionWrapper direction="left">
        <p className="shimmer-gold" style={{
          textAlign: 'center',
          letterSpacing: '0.32em',
          fontSize: '0.72rem',
          fontWeight: 300,
          fontFamily: 'var(--font-body)',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
        }}>
          סדר הערב
        </p>
        <h2 style={{
          textAlign: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
          color: 'var(--ink)',
          fontStyle: 'italic',
          fontWeight: 400,
          marginBottom: '1.5rem',
        }}>
          לוח הזמנים
        </h2>
        <OrnamentalRule opacity={0.45} style={{ marginBottom: '3rem' }} />

        <div style={{ maxWidth: '440px', margin: '0 auto', position: 'relative' }}>

          {/* ── Vertical gold line — draws in on scroll ── */}
          <motion.div
            style={{
              position: 'absolute',
              top: `${ICON_OFFSET}px`,
              bottom: `${ICON_OFFSET}px`,
              right: `${ICON_OFFSET - 0.5}px`,   // center on icon bubble
              width: '1px',
              backgroundColor: 'var(--gold)',
              opacity: 0.35,
              transformOrigin: 'top',
              scaleY: 0,
            }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.4, ease: BRAND_EASE }}
          />

          {EVENTS.map((event, i) => (
            <SectionWrapper key={event.time} delay={i * 0.15}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.25rem',
                marginBottom: i < EVENTS.length - 1 ? '2.75rem' : 0,
                position: 'relative',
              }}>
                {/* Icon bubble */}
                <div style={{
                  flexShrink: 0,
                  width: `${ICON_SIZE}px`,
                  height: `${ICON_SIZE}px`,
                  borderRadius: '50%',
                  border: '1.5px solid var(--gold)',
                  backgroundColor: 'var(--cream)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: '0 0 0 4px var(--cream-deep)',  // halo to separate from gold line
                }}>
                  {event.icon}
                </div>

                {/* Content */}
                <div style={{ paddingTop: '0.65rem', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      color: 'var(--gold-dark)',
                      fontWeight: 500,
                    }}>
                      {event.time}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.05rem',
                      color: 'var(--ink)',
                      fontStyle: 'italic',
                      fontWeight: 400,
                    }}>
                      {event.title}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--sage)',
                    fontSize: '0.88rem',
                    fontWeight: 300,
                    lineHeight: 1.55,
                  }}>
                    {event.description}
                  </p>
                </div>
              </div>
            </SectionWrapper>
          ))}
        </div>
      </SectionWrapper>
    </section>
  )
}
