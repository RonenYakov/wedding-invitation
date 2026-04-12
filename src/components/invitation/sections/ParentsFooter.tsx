// ParentsFooter.tsx — parents section + footer
// ⚠️  Update GROOM_FAMILY and BRIDE_FAMILY with actual names
import SectionWrapper from '../../shared/SectionWrapper'

const GROOM_FAMILY = 'משפחת [שם חתן]'
const BRIDE_FAMILY  = 'משפחת [שם כלה]'

export default function ParentsFooter() {
  return (
    <section style={{
      padding: '5rem 1.5rem 4rem',
      background: 'linear-gradient(180deg, var(--cream) 0%, hsl(45 35% 90%) 100%)',
    }}>
      <SectionWrapper>
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

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
          color: 'var(--sage)',
          fontSize: '0.8rem',
          letterSpacing: '0.2em',
        }}>
          נוצר באהבה ✦
        </p>
      </SectionWrapper>
    </section>
  )
}
