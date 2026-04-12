// ParentsFooter.tsx — parents section + footer

import SectionWrapper from '../../shared/SectionWrapper'

const GROOM_FAMILY = "משפחת משה"
const BRIDE_FAMILY = "משפחת בסה"

export default function ParentsFooter() {
  return (
    <section style={{
      padding: '5rem 1.5rem 4rem',
      background: 'linear-gradient(180deg, var(--cream) 0%, hsl(45 35% 90%) 100%)',
    }}>
      <SectionWrapper>
        {/* נשמח לראותכם - כותרת פתיחה */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
            color: 'var(--ink)',
            fontStyle: 'italic',
            fontWeight: 400,
            marginBottom: '1rem',
          }}>
            נשמח לראותכם
          </p>
          <div style={{
            width: '40px',
            height: '1px',
            backgroundColor: 'var(--gold)',
            margin: '0 auto',
            opacity: 0.6
          }} />
        </div>

        {/* Top gold rule */}
        <div style={{ height: '1px', backgroundColor: 'var(--gold)', opacity: 0.35, marginBottom: '3.5rem' }} />

        {/* Parents names */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2.5rem',
          flexWrap: 'wrap',
          marginBottom: '3.5rem',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)',
            color: 'var(--ink)',
            fontStyle: 'italic',
            fontWeight: 400,
          }}>
            {GROOM_FAMILY}
          </p>

          {/* Vertical separator */}
          <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--mist)' }} />

          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)',
            color: 'var(--ink)',
            fontStyle: 'italic',
            fontWeight: 400,
          }}>
            {BRIDE_FAMILY}
          </p>
        </div>

        {/* Bottom gold rule */}
        <div style={{ height: '1px', backgroundColor: 'var(--gold)', opacity: 0.35, marginBottom: '2.5rem' }} />

        {/* כאן היה הטקסט "נוצר באהבה" והוא הוסר בהצלחה */}
      </SectionWrapper>
    </section>
  )
}
