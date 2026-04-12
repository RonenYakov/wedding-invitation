# Project: Luxury Wedding Invitation — Amalfi Style

## Quick Start

```bash
npm install
npm run dev      # Dev server → http://localhost:5173
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

---

## Project Overview

A high-end, cinematic wedding invitation web app. Envelope bursts open into a parallax-driven single-page invitation. Every detail — typography, motion, color — must feel intentional, custom, and editorial. **No generic AI aesthetics. No default fonts. No cookie-cutter layouts.**

---

## Tech Stack

| Tool | Notes |
|---|---|
| Framework | React + Vite (TypeScript) |
| Styling | Tailwind CSS v4 (Vite plugin) |
| Animations | Framer Motion — required for all transitions |
| Routing | React Router v6 |
| Backend | Supabase (RSVP storage) |
| Direction | RTL (Hebrew, `dir="rtl"` on invitation root) |

---

## Wedding Date & Time — Source of Truth

| Field | Value |
|---|---|
| Date | Wednesday, 3 June 2026 |
| Time | 19:30 (7:30 PM) |
| Timezone | `Asia/Jerusalem` |
| JS Date literal | `new Date('2026-06-03T19:30:00+03:00')` |

### Event Timeline
| Time | Hebrew Label | Description |
|---|---|---|
| 19:30 | קבלת פנים | אורחים מתקבלים, שתיה ומנות פתיחה |
| 20:30 | חופה | טקס הנישואין |
| 21:15 | מסיבה | ארוחה, ריקודים ואירוע |

---

## Design System — Active Tokens

Defined in `src/index.css`. **Never hardcode hex/hsl inline — always use `var(--token-name)`.**

| Token | Value | Usage |
|---|---|---|
| `--cream` | `hsl(44 42% 96%)` | Page background |
| `--gold` | `hsl(42 78% 44%)` | Primary accent, borders, CTAs |
| `--gold-light` | `hsl(46 80% 62%)` | Gradient highlights |
| `--gold-dark` | `hsl(38 88% 32%)` | Hover states |
| `--cream-deep` | `hsl(40 32% 91%)` | Alternate section backgrounds |
| `--sage` | `hsl(155 28% 37%)` | Secondary accent, timeline |
| `--sage-light` | `hsl(160 30% 72%)` | Subtle tints |
| `--ink` | `hsl(28 18% 16%)` | Body text |
| `--mist` | `hsl(45 20% 85%)` | Dividers, input borders |

### Fonts (all imported in `index.css`)
- `--font-display`: `'Playfair Display'` — headings
- `--font-body`: `'Lato'` — UI, labels
- `--font-accent`: `'Cormorant Garamond'` — romantic accents, couple name, envelope prompt

---

## What's Built

All core components are implemented and rendering:

- ✅ `Envelope.tsx` — full-screen SVG, golden watercolor lemon wax seal, old money aesthetic
- ✅ `Hero.tsx` — video background (`/videos/hero-video.MOV`), parallax, Hebrew date
- ✅ `Countdown.tsx` — typographic style on Dead Sea photo (`/photos/clock.jpeg`)
- ✅ `EventDetails.tsx` — RTL vertical timeline, animated gold line
- ✅ `Venue.tsx` — `venue.jpeg` background, Waze + Google Maps buttons
- ✅ `Gallery.tsx` — dynamic `import.meta.glob`, lightbox, 3D tilt hover
- ✅ `ParentsFooter.tsx` — two-column parents section
- ✅ `SectionWrapper.tsx` — `direction` prop (`up` | `left` | `right`)
- ✅ `BackgroundMusic.tsx` — fixed bottom-left, pulse when playing
- ✅ `useCountdown.ts` — recalculates every second against `2026-06-03T19:30:00+03:00`
- ⏸ `RSVP.tsx` — exists but removed from render (awaiting Supabase credentials)

---

## Pending: RSVP + Supabase

When ready to enable RSVP:

1. Add credentials to `.env.local`:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
2. Create `rsvp` table in Supabase:
   - Columns: `id` (uuid, pk), `name` (text), `guests` (int), `attending` (bool), `dietary` (text), `created_at` (timestamp)
3. Re-add `<RSVP />` to `Invitation.tsx`

---

## Technical Rules

1. **All colors via CSS variables** — `var(--gold)`, never inline hex/hsl.
2. **RTL everywhere** — `dir="rtl"` on `<Invitation>` root, all copy in Hebrew.
3. **No `<form>` elements** — `div` + `onClick` for RSVP.
4. **`AnimatePresence` in `App.tsx`** — wraps `<Routes>`.
5. **Fallbacks required** — every `<video>` has an `<img>` fallback; music button handles missing file gracefully.
6. **Accessibility** — all interactive elements have `aria-label` in Hebrew.
7. **Performance** — `loading="lazy"` on gallery images, `preload="metadata"` on video.

---

## Asset Locations

| Asset | Path |
|---|---|
| Hero video | `/videos/hero-video.MOV` |
| Countdown bg | `/photos/clock.jpeg` |
| Venue bg | `/venue.jpeg` |
| Gallery photos | `/photos/gallery/` (any filename, read dynamically) |
| Background music | `/audio/background.mp3` |
| Hero fallback | `/photos/hero-fallback.jpg` |

*Last updated: April 2026*
