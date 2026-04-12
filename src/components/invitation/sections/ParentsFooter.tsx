// ParentsFooter.tsx — parents section + footer
import SectionWrapper from '../../shared/SectionWrapper'
import OrnamentalRule from '../../shared/OrnamentalRule'

const GROOM_FAMILY = "משפחת משה"
const BRIDE_FAMILY = "משפחת בסה"

// ── Botanical ornament — echoes the lemon motif from the envelope seal ──
function BotanicalOrnament() {
  return (
    <svg
      width="90" height="56" viewBox="0 0 90 56"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block', margin: '0 auto', opacity: 0.52 }}
    >
      <path d="M45 52 Q45 36 45 22" stroke="var(--gold-dark)" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M45 40 Q33 32 22 34" stroke="var(--gold-dark)" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M45 40 Q57 32 68 34" stroke="var(--gold-dark)" strokeWidth="0.8" strokeLinecap="round" />
      <ellipse cx="19" cy="33" rx="9" ry="5" fill="var(--sage)" opacity="0.5" transform="rotate(-18 19 33)" />
      <ellipse cx="71" cy="33" rx="9" ry="5" fill="var(--sage)" opacity="0.5" transform="rotate(18 71 33)" />
      <path d="M45 32 Q38 26 36 21 Q42 24 45 32Z" fill="var(--sage)" opacity="0.38" />
      <path d="M45 32 Q52 26 54 21 Q48 24 45 32Z" fill="var(--sage)" opacity="0.38" />
      <ellipse cx="45" cy="17" rx="6" ry="4" fill="var(--lemon)" opacity="0.65" />
      <ellipse cx="43" cy="15.5" rx="2.5" ry="1.5" fill="white" opacity="0.28" />
      <circle cx="45" cy="52" r="1.5" fill="var(--gold-dark)" opacity="0.4" />
    </svg>
  )
}

export default function ParentsFooter() {
  return (
    <section style={{
      padding: '5rem 1.5rem 4rem',
      background: 'linear-gradient(180deg, var(--cream) 0%, hsl(45 35% 90%) 100%)',
    }}>
      <SectionWrapper>
        {/* נשמח לראותכם */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
            color: 'var(--ink)',
            fontStyle: 'italic',
            fontWeight: 400,
            marginBottom: '1.25rem',
          }}>
            נשמח לראותכם
          </p>
          <OrnamentalRule opacity={0.45} width={160} />
        </div>

        {/* Top ornamental rule */}
        <OrnamentalRule opacity={0.38} style={{ marginBottom: '3.5rem' }} />

        {/* Botanical ornament above family names */}
        <div style={{ marginBottom: '2rem' }}>
          <BotanicalOrnament />
        </div>

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

          <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--mist)', flexShrink: 0 }} />

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

        {/* Bottom ornamental rule */}
        <OrnamentalRule opacity={0.38} />
      </SectionWrapper>
    </section>
  )
}
