# FIELD13 v2 Website Redesign

Date: 2026-06-02
Status: Approved

## Positioning

FIELD13 is an AI-native GTM company. The primary offer is FIELD13 Signal. The hero does not lead with AI — it leads with trust and market understanding. Visitors should think "these people understand how modern B2B buying works," not "this is another AI agency."

## Tech Stack

React 19 + Vite + plain CSS + react-router-dom + Vercel.
No Next.js, Tailwind, Framer Motion, GSAP, component libraries, or any dependencies beyond what exists.
No floating cards, shadows, glassmorphism, illustrations, or icons.

## Brand Voice

- Research publication / investment memo / strategy firm tone
- Short, direct, minimal sentences
- Every sentence reads like a strategy memo
- Never: AI-powered, cutting-edge, unlock, leverage, revolutionary, 10x, growth hack, world-class, next-generation
- No em dashes, no en dashes, no emojis, no exclamation marks
- Periods and commas only
- Never over-explain
- Never sound excited

## Design Tokens

- `--bg: #0D0D0D`
- `--ink: #F4F1EB`
- `--accent: #1A4A3A`
- `--accent-warm: #B8935A`
- Fonts: Instrument Serif (headlines, italic only) + DM Mono (UI/body/labels)
- Border-radius: 3px
- Animations: CSS fadeUp only — slow, nearly invisible
- No gradients, no shadows, no glassmorphism, no floating cards
- No illustrations, stock imagery, 3D, or fake people
- No icons unless functional
- No colored buttons
- No oversized CTA sections
- Everything should feel quiet

## Pages

| Route | Page | Status |
|---|---|---|
| `/` | Homepage | Rebuild |
| `/signal` | Signal | New (this is the sales page) |
| `/operators` | Operators | Simplify |
| `/about` | About | New |
| `/systems` | — | Not built |

Coming Soon items do not appear in navigation. Only active products have pages.

## Navigation

`FIELD13` | `Signal` | `Insights` | `About` | `[Book Strategy Call]`

No Services, Pricing, Systems, or Operators in nav.

## Homepage (top to bottom)

1. **Hero** — "Become the signal your market trusts before they buy."
   Subheadline: "FIELD13 builds AI-native GTM systems that combine founder media, narrative strategy and distribution into recurring market trust."
   Empty background, typography only.

2. **Insights** — Positioned high. FIELD13 should feel like a research company. Latest essays, latest research, newsletter signup. Topics: Future of GTM, Future of B2B Buying, Dark Funnel, Founder Media.

3. **The Market Changed** — "The buying decision happens long before your website gets visited. Communities. Founders. Operators. Private conversations. That's where trust is built. FIELD13 exists for that reality."
   No AI Search references.

4. **FIELD13 Panels** — 3 editorial panels. Signal (Available Today, 2x larger) | Systems (Coming Soon) | Operators (Coming Soon). 1px border, no icons, no hover beyond subtle border transition.

5. **Signal Overview** — Deeper Signal section with diagram.
   Typography-only flow, DM Mono, center aligned:
   `Research ↓ Position ↓ Narrative ↓ Content ↓ Distribution ↓ Trust ↓ Pipeline`
   No graphics, no SVG, no icons, no animation.

6. **CTA** — Book Strategy Call.

## Signal Page (`/signal`) — primary sales page

- Hero → Diagram → What's Included → How We Work → Apply
- No pricing, no packages, no tiers. Application only.
- Signal accounts for approximately 80% of site attention.

## Operators Page (`/operators`) — simplified

- Hero → The Problem → The Process → **The One Rule** (full-width band) → Coming Soon → Apply Interest
- Copy reduced ~40%. Less explanation, more whitespace.
- The One Rule kept exactly as-is from current version.

## About Page (`/about`)

- Mission only. No founder story, no timeline, no "our journey."
- "FIELD13 exists because B2B buying changed. People trust practitioners more than brands. Communities more than campaigns. Narratives more than ads. We build GTM systems for that future."

## Systems

No dedicated page. Just a Coming Soon section on the homepage.

## Future Roadmap

- Current: Signal
- Future: Systems, Operators, Media, Academy, Capital
- Do not expose all of these today. The website should feel like a focused company with a long-term vision, not a startup trying to do everything.
- Signal accounts for ~80% of site attention. Everything else reinforces the future without distracting from today's offer.

## Copy Rules

- Every sentence should feel like a sentence from a strategy memo
- Short, direct, minimal
- Never over-explain
- Never sound excited
- No AI references in hero — let visitors discover that through content
- The homepage should sell trust and market perception, not AI
