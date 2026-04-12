// EventDetails.tsx — RTL vertical timeline, 3 milestones
// 19:30 קבלת פנים | 20:30 חופה | 21:15 מסיבה
import { motion } from 'framer-motion'
import SectionWrapper from '../../shared/SectionWrapper'

const EVENTS = [
  {
    time: '19:30',
    title: 'קבלת פנים',
    description: 'אורחים מתקבלים, שתיה ומנות פתיחה',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
        stroke="var(--gold-dark)" strokeWidth="1.5" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    time: '20:30',
    title: 'חופה',
    description: 'טקס הנישואין',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
        stroke="var(--gold-dark)" strokeWidth="1.5" strokeLinecap="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    time: '21:15',
    title: 'מסיבה',
    description: 'ארוחה, ריקודים ואירוע',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
        stroke="var(--gold-dark)" strokeWidth="1.5" strokeLinecap="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
]

export default function EventDetails() {
  return (
    <section style={{
      padding: '5rem 1.5rem',
      backgroundColor: 'var(--cream-deep)',
    }}>
      <SectionWrapper direction="left">
        <p style={{
          textAlign: 'center',
          color: 'var(--gold)',
          letterSpacing: '0.3em',
          fontSize: '0.75rem',
          fontWeight: 300,
          fontFamily: 'var(--font-body)',
          marginBottom: '0.5rem',
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
          marginBottom: '3.5rem',
        }}>
          לוח הזמנים
        </h2>

        <div style={{ maxWidth: '420px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical gold line — draws in on scroll */}
          <motion.div
            style={{
              position: 'absolute',
              top: '28px',
              bottom: '28px',
              right: '27px',
              width: '1px',
              backgroundColor: 'var(--gold)',
              opacity: 0.4,
              transformOrigin: 'top',
              scaleY: 0,
            }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {EVENTS.map((event, i) => (
            <SectionWrapper key={event.time} delay={i * 0.15}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.25rem',
                marginBottom: i < EVENTS.length - 1 ? '2.5rem' : 0,
                position: 'relative',
              }}>
                {/* Icon bubble */}
                <div style={{
                  flexShrink: 0,
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  border: '1.5px solid var(--gold)',
                  backgroundColor: 'var(--cream)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  {event.icon}
                </div>

                {/* Content */}
                <div style={{ paddingTop: '0.6rem', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.3rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.4rem',
                      color: 'var(--gold-dark)',
                      fontWeight: 500,
                    }}>
                      {event.time}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
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
                    fontSize: '0.9rem',
                    fontWeight: 300,
                    lineHeight: 1.5,
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
