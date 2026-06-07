# FIELD13 v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild field13.com as an AI-native GTM company website with one active product (Signal), new brand positioning, simplified Operators page, and new About page.

**Architecture:** Single-page React app with react-router-dom. All sections are self-contained components. CSS uses CSS custom properties for theming. No external animation or UI libraries.

**Tech Stack:** React 19 + Vite + plain CSS + react-router-dom + Vercel deploy.

---

### Task 1: Update project metadata

**Files:**
- Modify: `E:\Projects\Collab13\package.json`
- Modify: `E:\Projects\Collab13\index.html`

- [ ] **Update package.json name, description, author**

Change:
```json
{
  "name": "trust-engine-landing-page",
  "description": "Trust Engine - Landing page for VC portfolio distribution service",
  "author": "Trust Engine",
  "keywords": ["landing page","VC","operator network","distribution"]
}
```
To:
```json
{
  "name": "field13",
  "description": "FIELD13 — AI-native GTM company",
  "author": "FIELD13",
  "keywords": ["field13","signal","gtm","b2b","go-to-market"]
}
```

- [ ] **Update index.html title**

Change `<title>field13 — Operator Advocacy for B2B Tools</title>` to `<title>FIELD13</title>`.

- [ ] **Verify**

Run `npm run build`. Expected: build succeeds, dist/ folder created.

---

### Task 2: Rewrite navigation

**Files:**
- Modify: `E:\Projects\Collab13\src\components\layout\Nav.jsx`

- [ ] **Replace Nav.jsx with new navigation**

Remove How it works, Who it's for, For operators, Let's talk.
Add: Signal, Insights, About, Book Strategy Call.

```jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);
  const isHome = location.pathname === '/';

  const handleAnchorClick = (e, id) => {
    if (!isHome) return;
    e.preventDefault();
    closeMenu();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav>
      <Link to="/" className="nav-logo" onClick={closeMenu}>
        FIELD13
      </Link>
      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`nav-overlay ${menuOpen ? 'open' : ''}`} onClick={closeMenu}></div>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/signal" className="nav-link" onClick={closeMenu}>Signal</Link>
        <a
          href={isHome ? '#insights' : '/'}
          className="nav-link"
          onClick={(e) => handleAnchorClick(e, 'insights')}
        >
          Insights
        </a>
        <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
        <a
          href={isHome ? '#cta' : '/'}
          className="nav-cta"
          onClick={(e) => handleAnchorClick(e, 'cta')}
        >
          Book Strategy Call
        </a>
      </div>
    </nav>
  );
};

export default Nav;
```

- [ ] **Verify**
Run `npm run dev` and confirm nav renders with FIELD13, Signal, Insights, About, Book Strategy Call.

---

### Task 3: Rewrite footer

**Files:**
- Modify: `E:\Projects\Collab13\src\components\layout\Footer.jsx`

- [ ] **Replace Footer.jsx with simplified layout**

```jsx
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div>
        <Link to="/" className="footer-logo">FIELD13</Link>
        <div className="footer-sub">AI-native GTM company</div>
      </div>
      <div className="footer-links">
        <Link to="/signal">Signal</Link>
        <Link to="/about">About</Link>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
```

---

### Task 4: Create homepage Hero section

**Files:**
- Modify: `E:\Projects\Collab13\src\components\sections\Hero.jsx` (replace)

- [ ] **Replace Hero.jsx**

```jsx
const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero-headline">
          Become the signal your market trusts before they buy.
        </h1>
        <p className="hero-sub">
          FIELD13 builds AI-native GTM systems that combine founder media, narrative strategy and distribution into recurring market trust.
        </p>
        <div className="hero-actions">
          <a href="/signal" className="btn-primary">
            Explore Signal →
          </a>
        </div>
        <div className="hero-number">01</div>
        <div className="hero-watermark">f13</div>
      </div>
    </section>
  );
};

export default Hero;
```

- [ ] **Verify**
Homepage shows new headline "Become the signal your market trusts before they buy."

---

### Task 5: Create Insights section (positioned high on homepage)

**Files:**
- Create: `E:\Projects\Collab13\src\components\sections\InsightsSection.jsx`

- [ ] **Create InsightsSection.jsx**

```jsx
const insights = [
  { label: 'Essay', title: 'The End of Brand Marketing', topic: 'Future of B2B Buying' },
  { label: 'Essay', title: 'Why Communities Beat Campaigns', topic: 'Dark Funnel' },
  { label: 'Essay', title: 'Founder Media Is the New ABM', topic: 'Founder Media' },
  { label: 'Essay', title: 'Signal in a Noisy Market', topic: 'Future of GTM' },
];

const InsightsSection = () => {
  return (
    <section id="insights">
      <div className="container">
        <div className="section-label">Insights</div>
        <div className="insights-grid">
          {insights.map((item, i) => (
            <article className="insight-card" key={i}>
              <div className="insight-meta">
                <span className="insight-tag">{item.label}</span>
                <span className="insight-topic">{item.topic}</span>
              </div>
              <h3 className="insight-title">{item.title}</h3>
            </article>
          ))}
        </div>
        <div className="insights-cta">
          Get the newsletter <span className="arrow">→</span>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
```

---

### Task 6: Create Market Changed section

**Files:**
- Create: `E:\Projects\Collab13\src\components\sections\MarketChanged.jsx`

- [ ] **Create MarketChanged.jsx**

```jsx
const MarketChanged = () => {
  return (
    <section className="market-section">
      <div className="container">
        <div className="section-label">The market changed</div>
        <p className="market-text">
          The buying decision happens long before your website gets visited.
        </p>
        <div className="market-sources">
          <span>Communities.</span>
          <span>Founders.</span>
          <span>Operators.</span>
          <span>Private conversations.</span>
        </div>
        <p className="market-text">
          That's where trust is built. FIELD13 exists for that reality.
        </p>
      </div>
    </section>
  );
};

export default MarketChanged;
```

---

### Task 7: Create Panels section (Signal 2x, Systems/Operators Coming Soon)

**Files:**
- Create: `E:\Projects\Collab13\src\components\sections\PanelsSection.jsx`

- [ ] **Create PanelsSection.jsx**

```jsx
import { Link } from 'react-router-dom';

const PanelsSection = () => {
  return (
    <section className="panels-section">
      <div className="container">
        <div className="section-label">What we build</div>
        <div className="panels-grid">
          <Link to="/signal" className="panel panel-active">
            <div className="panel-status">Available Today</div>
            <div className="panel-name">Signal</div>
            <div className="panel-desc">
              Signal turns your market presence into a recurring pipeline. Research, narrative, content, distribution — one system.
            </div>
          </Link>
          <div className="panel panel-soon">
            <div className="panel-status">Coming Soon</div>
            <div className="panel-name">Systems</div>
            <div className="panel-desc">
              Scalable GTM infrastructure for companies that need process, not tactics.
            </div>
          </div>
          <div className="panel panel-soon">
            <div className="panel-status">Coming Soon</div>
            <div className="panel-name">Operators</div>
            <div className="panel-desc">
              A network of practitioners who build market trust through authentic advocacy.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PanelsSection;
```

---

### Task 8: Create Signal Diagram section

**Files:**
- Create: `E:\Projects\Collab13\src\components\sections\SignalDiagram.jsx`

- [ ] **Create SignalDiagram.jsx**

```jsx
const steps = ['Research', 'Position', 'Narrative', 'Content', 'Distribution', 'Trust', 'Pipeline'];

const SignalDiagram = () => {
  return (
    <section className="diagram-section">
      <div className="container">
        <div className="section-label">How Signal works</div>
        <div className="diagram-flow">
          {steps.map((step, i) => (
            <span key={step} className="diagram-step">
              {step}
              {i < steps.length - 1 && <span className="diagram-arrow">↓</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignalDiagram;
```

---

### Task 9: Create homepage CTA section

**Files:**
- Modify: `E:\Projects\Collab13\src\components\sections\CTASection.jsx` (replace)

- [ ] **Replace CTASection.jsx**

```jsx
const CTASection = () => {
  return (
    <section id="cta" className="cta-section">
      <div className="container">
        <div className="section-label">Next step</div>
        <h2 className="cta-headline">
          Ready to become the signal?
        </h2>
        <p className="cta-sub">
          Book a strategy call. No pitch. No pricing sheet. Just a conversation about your market position.
        </p>
        <div className="cta-actions">
          <a href="mailto:hello@field13.com" className="btn-primary">
            Book Strategy Call →
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
```

---

### Task 10: Rewrite App.jsx with new routing

**Files:**
- Modify: `E:\Projects\Collab13\src\App.jsx`

- [ ] **Replace App.jsx with new routes**

```jsx
import './styles/globals.css';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import InsightsSection from './components/sections/InsightsSection';
import MarketChanged from './components/sections/MarketChanged';
import PanelsSection from './components/sections/PanelsSection';
import SignalDiagram from './components/sections/SignalDiagram';
import CTASection from './components/sections/CTASection';
import Signal from './pages/Signal';
import Operators from './pages/Operators';
import About from './pages/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <>
        <Nav />
        <Routes>
          <Route path="/" element={
            <div>
              <Hero />
              <InsightsSection />
              <MarketChanged />
              <PanelsSection />
              <SignalDiagram />
              <CTASection />
              <Footer />
            </div>
          } />
          <Route path="/signal" element={<Signal />} />
          <Route path="/operators" element={<Operators />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
```

---

### Task 11: Create Signal page

**Files:**
- Create: `E:\Projects\Collab13\src\pages\Signal.jsx`

- [ ] **Create Signal.jsx**

```jsx
import SignalDiagram from '../components/sections/SignalDiagram';
import Footer from '../components/layout/Footer';

const included = [
  'Founder positioning', 'LinkedIn strategy', 'Newsletter program',
  'Content engineering', 'AI research briefs', 'Long-form narrative',
  'Content repurposing', 'Distribution system', 'Monthly analytics',
  'Quarterly strategy review'
];

const Signal = () => {
  return (
    <>
      <section className="hero signal-hero">
        <div className="container">
          <div className="section-label">FIELD13 Signal</div>
          <h1 className="hero-headline">
            A GTM system that makes you the obvious choice.
          </h1>
          <p className="hero-sub">
            Signal combines research, narrative, content, and distribution into one recurring program. No campaigns. No ads. No agency overhead.
          </p>
          <div className="hero-actions">
            <a href="#apply" className="btn-primary">
              Apply for Signal →
            </a>
          </div>
        </div>
      </section>
      <SignalDiagram />
      <section className="include-section">
        <div className="container container-narrow">
          <div className="section-label">What's included</div>
          <div className="include-list">
            {included.map((item) => (
              <div className="include-item" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </section>
      <section id="apply" className="cta-section">
        <div className="container container-narrow">
          <div className="section-label">Apply</div>
          <h2 className="cta-headline">
            Signal is application only.
          </h2>
          <p className="cta-sub">
            We work with a small number of companies at a time. Tell us about your market position and we'll let you know if there's a fit.
          </p>
          <div className="cta-actions">
            <a href="mailto:hello@field13.com?subject=Signal%20Application" className="btn-primary">
              Apply Now →
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Signal;
```

---

### Task 12: Simplify Operators page

**Files:**
- Modify: `E:\Projects\Collab13\src\pages\Operators.jsx`
- Keep: `E:\Projects\Collab13\src\components\sections\OneRuleBand.jsx` (reuse as-is)
- Create: `E:\Projects\Collab13\src\components\sections\operators\OperatorsSimpleHero.jsx`
- Create: `E:\Projects\Collab13\src\components\sections\operators\OperatorsProblem.jsx`
- Create: `E:\Projects\Collab13\src\components\sections\operators\OperatorsProcess.jsx`

The existing operators components under `src/components/sections/operators/` will remain in the directory but become unused — they can be cleaned up later but are not imported anywhere now.

- [ ] **Create OperatorsSimpleHero.jsx**

```jsx
const OperatorsSimpleHero = () => {
  return (
    <section className="hero operators-hero">
      <div className="container">
        <div className="hero-eyebrow">For operators</div>
        <h1 className="hero-headline">
          Your expertise is <em>marketable.</em>
        </h1>
        <p className="hero-sub">
          Paid, long-term B2B advocacy programs matched to your actual workflow and audience. Your voice, your standards. No scripts. No fake enthusiasm.
        </p>
        <div className="hero-actions">
          <a href="#apply-interest" className="btn-primary">Apply Interest →</a>
        </div>
        <div className="hero-grid-line"></div>
        <div className="hero-watermark">f13</div>
        <div className="hero-ticker">B2B · SaaS · GTM · DevTools</div>
      </div>
    </section>
  );
};

export default OperatorsSimpleHero;
```

- [ ] **Create OperatorsProblem.jsx**

```jsx
const OperatorsProblem = () => {
  return (
    <section>
      <div className="container container-narrow">
        <div className="section-label">The problem</div>
        <p className="problem-text">
          B2B companies spend millions on campaigns that nobody trusts. Operators already have the audience and the credibility — but no way to monetize it without selling out.
        </p>
        <p className="problem-text">
          FIELD13 bridges that gap. You keep your voice. We handle the structure.
        </p>
      </div>
    </section>
  );
};

export default OperatorsProblem;
```

- [ ] **Create OperatorsProcess.jsx**

```jsx
const steps = [
  { num: '01', title: 'Match', desc: 'We pair you with products that fit your actual workflow and audience.' },
  { num: '02', title: 'Create', desc: 'Develop genuine content, demos, and narratives on your terms.' },
  { num: '03', title: 'Distribute', desc: 'Publish through your channels. We amplify.' },
  { num: '04', title: 'Earn', desc: 'Recurring compensation for lasting impact.' },
];

const OperatorsProcess = () => {
  return (
    <section id="how-it-works">
      <div className="container">
        <div className="section-label">The process</div>
        <div className="process-steps">
          {steps.map((s) => (
            <div className="process-step-card" key={s.num}>
              <div className="process-step-num">{s.num}</div>
              <h3 className="process-step-title">{s.title}</h3>
              <p className="process-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperatorsProcess;
```

- [ ] **Rewrite Operators.jsx**

```jsx
import OperatorsSimpleHero from '../components/sections/operators/OperatorsSimpleHero';
import OperatorsProblem from '../components/sections/operators/OperatorsProblem';
import OperatorsProcess from '../components/sections/operators/OperatorsProcess';
import OneRuleBand from '../components/sections/OneRuleBand';
import Footer from '../components/layout/Footer';

const Operators = () => {
  return (
    <>
      <OperatorsSimpleHero />
      <OperatorsProblem />
      <OperatorsProcess />
      <OneRuleBand />
      <section className="coming-soon-section">
        <div className="container">
          <div className="section-label">Coming Soon</div>
          <p className="coming-soon-text">
            The Operators network is currently in private beta. We'll open applications when the infrastructure is ready.
          </p>
        </div>
      </section>
      <section id="apply-interest" className="cta-section">
        <div className="container container-narrow">
          <div className="section-label">Apply Interest</div>
          <h2 className="cta-headline">Want to be an early operator?</h2>
          <p className="cta-sub">Drop us a note. We'll reach out when we're ready for you.</p>
          <div className="cta-actions">
            <a href="mailto:hello@field13.com?subject=Operator%20Interest" className="btn-primary">Apply Interest →</a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Operators;
```

---

### Task 13: Create About page

**Files:**
- Create: `E:\Projects\Collab13\src\pages\About.jsx`

- [ ] **Create About.jsx**

```jsx
import Footer from '../components/layout/Footer';

const About = () => {
  return (
    <>
      <section className="hero about-hero">
        <div className="container container-narrow">
          <div className="section-label">About</div>
          <h1 className="hero-headline mission-headline">
            FIELD13 exists because B2B buying changed.
          </h1>
        </div>
      </section>
      <section>
        <div className="container container-narrow">
          <p className="mission-text">
            People trust practitioners more than brands. Communities more than campaigns. Narratives more than ads.
          </p>
          <p className="mission-text">
            We build GTM systems for that future.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
```

---

### Task 14: Update globals.css — add new section styles, remove unused styles

**Files:**
- Modify: `E:\Projects\Collab13\src\styles\globals.css`

This is the largest change. The strategy: keep all design tokens, nav, hamburger, footer, fadeUp animations, and general layout. Remove pricing, funnel, phases, comparison, earn, disclosure, application-form, who-split, what-this sections. Keep hero styles but simplify them. Add new section styles.

- [ ] **Remove unused CSS sections**

Delete these entire blocks from globals.css:

1. Pricing section (`.pricing-section` through `.pricing-note`, lines 695-807)
2. Funnel section (`.funnel-section` through `.funnel-arrow`, lines 511-585)
3. Program phases (`.phases-section` through `.phase-desc`, lines 587-624)
4. Comparison table (`.comp-table` through `.comp-us`, lines 626-662)
5. What this is (`.what-this-grid` through `.what-this-body`, lines 926-949)
6. Who split (`.who-split` through `.callout-box p`, lines 951-1012)
7. What you earn (`.earn-section` through `.earn-fine`, lines 1014-1052)
8. FTC disclosure (`.disclosure-section` through `.disclosure-text`, lines 1054-1066)
9. Application form (`.application-form-section` through `.btn-primary.btn-lg`, lines 1068-1140)
10. Operator teaser (`.operator-teaser` through `.btn-light:hover`, lines 384-419)
11. Problem intro (`.problem-intro`, lines 472-481)
12. How intro (`.how-intro`, line 252-259, if not used elsewhere)
13. Problem section (`.problem-section` through `.problem-outcome`, lines 201-241)
14. Who section (`.who-grid` through `.who-desc`, lines 356-382)
15. Offer section (`.offer-section` through `.offer-outcome`, lines 287-319)
16. Process flow (`.process-flow` through `.process-arrow`, lines 322-353)

Actually wait — some of these may be referenced by the existing Operators page sections. Let me keep them for now since the old Operators sections still exist in the folder (they're just not imported). Since we're replacing the Operators page with new components, the old CSS can be removed. But to be safe, I'll keep the globals.css cleanup focused on what's definitely unused: the pricing section, and add new section styles.

Actually, let me be more surgical. The old component files will remain on disk but won't be imported anywhere. So their CSS classes will be dead code. I'll remove them to keep the CSS clean. Since I'm the one writing all the code, I know for certain nothing imports those old components anymore.

Let me reconsider - this CSS file is 1147 lines and I need to make surgical edits. Rather than removing large blocks (which could break things if I miss an import), I'll:

1. Keep all existing CSS (it won't break anything — unused CSS just adds file size)
2. Add new section styles at the bottom
3. Update hero styles to match the new design (simpler hero)

This is safer and faster. Unused CSS can be cleaned up later.

Actually, the hero styles have references to `.hero-eyebrow`, `.hero-number`, `.hero-watermark`, `.hero-ticker`, `.hero-grid-line` and the new hero doesn't use most of those. They'll just render nothing — the elements don't exist in the new Hero component. That's fine. The CSS just won't match anything. No harm.

Let me update the approach: just add new CSS at the end of globals.css and keep everything else.

But wait, the old Hero component is being replaced. The old CSS has `.hero-eyebrow`, `.hero-headline`, `.hero-sub`, `.hero-actions` - these are shared class names that the new Hero component also uses. So the old CSS for hero section (lines 99-198) will work with the new hero component. The new hero just uses a subset of those classes. That's fine.

New CSS I need to add:
- `.section-label` - shared label style for all sections
- `.insights-grid`, `.insight-card`, `.insight-meta`, `.insight-tag`, `.insight-topic`, `.insight-title`, `.insights-cta`
- `.market-section`, `.market-text`, `.market-sources`, `.market-sources span`
- `.panels-section`, `.panels-grid`, `.panel`, `.panel-active`, `.panel-soon`, `.panel-status`, `.panel-name`, `.panel-desc`
- `.diagram-section`, `.diagram-flow`, `.diagram-step`, `.diagram-arrow`
- `.cta-actions`
- `.signal-hero`
- `.include-section`, `.include-list`, `.include-item`
- `.mission-headline`, `.mission-text`
- `.problem-text`
- `.process-steps`, `.process-step-card`
- `.coming-soon-section`, `.coming-soon-text`
- `.about-hero`

- [ ] **Add new CSS section styles at the end of globals.css**

```css
/* SHARED SECTION LABEL */
.section-label {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 10px;
}
.section-label::before {
  content: '';
  display: inline-block;
  width: 32px;
  height: 0.5px;
  background: var(--ink-3);
}

/* INSIGHTS */
#insights { background: var(--bg-2); }
.insights-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--border);
  border: 0.5px solid var(--border);
  border-radius: 3px;
  overflow: hidden;
}
.insight-card {
  background: var(--bg-card);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.insight-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.insight-tag {
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent);
}
.insight-topic {
  font-size: 10px;
  letter-spacing: 0.04em;
  color: var(--ink-3);
}
.insight-title {
  font-family: 'Instrument Serif', serif;
  font-size: 20px;
  letter-spacing: -0.01em;
  line-height: 1.3;
  color: var(--ink-2);
}
.insights-cta {
  margin-top: 2rem;
  font-size: 12px;
  color: var(--ink-3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: default;
}
.insights-cta .arrow { color: var(--accent); margin-left: 4px; }

/* MARKET CHANGED */
.market-section { }
.market-text {
  font-family: 'Instrument Serif', serif;
  font-size: clamp(22px, 4vw, 42px);
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--ink);
  max-width: 720px;
  margin-bottom: 2rem;
}
.market-sources {
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  padding: 2rem 0;
  border-top: 0.5px solid var(--border);
  border-bottom: 0.5px solid var(--border);
}
.market-sources span {
  font-family: 'Instrument Serif', serif;
  font-size: clamp(18px, 3vw, 32px);
  font-style: italic;
  color: var(--accent);
  letter-spacing: -0.02em;
}

/* PANELS */
.panels-section { background: var(--bg-2); }
.panels-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1px;
  background: var(--border);
  border: 0.5px solid var(--border);
  border-radius: 3px;
  overflow: hidden;
}
.panel {
  background: var(--bg-card);
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
  transition: background 0.2s;
}
.panel:hover { background: #1E1E1E; }
.panel-active {
  padding: 4rem 3rem;
}
.panel-active .panel-name {
  font-size: 32px;
}
.panel-active .panel-desc {
  font-size: 14px;
}
.panel-status {
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.panel-active .panel-status { color: var(--accent); }
.panel-soon .panel-status { color: var(--ink-3); }
.panel-name {
  font-family: 'Instrument Serif', serif;
  font-size: 24px;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
.panel-desc {
  font-size: 13px;
  color: var(--ink-3);
  line-height: 1.6;
}

/* DIAGRAM */
.diagram-section { text-align: center; }
.diagram-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-family: 'DM Mono', monospace;
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--ink-2);
  line-height: 1;
}
.diagram-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.diagram-arrow {
  color: var(--ink-3);
  font-size: 11px;
  line-height: 1;
}

/* CTA ACTIONS */
.cta-actions { margin-top: 2rem; }

/* SIGNAL HERO */
.signal-hero {
  min-height: 70vh;
  padding-top: 10rem;
}
.signal-hero .section-label { color: var(--accent); }

/* INCLUDE SECTION */
.include-section { background: var(--bg-2); }
.include-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem 2rem;
}
.include-item {
  font-size: 13px;
  color: var(--ink-2);
  padding: 0.5rem 0;
  border-bottom: 0.5px solid var(--border);
  line-height: 1.5;
}

/* ABOUT */
.about-hero {
  min-height: auto;
  padding-top: 10rem;
  padding-bottom: 3rem;
}
.mission-headline {
  max-width: 640px;
}
.mission-text {
  font-size: 14px;
  color: var(--ink-3);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  max-width: 600px;
}

/* OPERATORS SIMPLIFIED */
.problem-text {
  font-size: 14px;
  color: var(--ink-3);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  max-width: 600px;
}
.process-steps {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--border);
  border: 0.5px solid var(--border);
  border-radius: 3px;
  overflow: hidden;
}
.process-step-card {
  background: var(--bg-card);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.process-step-num {
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--accent);
  margin-bottom: 0.25rem;
}
.process-step-title {
  font-family: 'Instrument Serif', serif;
  font-size: 20px;
  letter-spacing: -0.01em;
  line-height: 1.2;
}
.process-step-desc {
  font-size: 13px;
  color: var(--ink-3);
  line-height: 1.6;
}

/* COMING SOON */
.coming-soon-section { background: var(--bg-2); }
.coming-soon-text {
  font-size: 14px;
  color: var(--ink-3);
  line-height: 1.7;
  max-width: 560px;
}

/* RESPONSIVE — new section overrides */
@media (max-width: 768px) {
  .panels-grid { grid-template-columns: 1fr; }
  .panel-active { padding: 2.5rem 2rem; }
  .include-list { grid-template-columns: 1fr; }
  .market-sources { gap: 1.5rem; }
  .process-steps { grid-template-columns: 1fr; }
}
```

- [ ] **Update hero animations to match new component**

Keep existing animation keyframes. Add `.section-label` to the fadeUp sequence:
```css
.section-label { animation: fadeUp 0.6s ease both; }
#insights .section-label { animation: none; }
```

Actually, let me just keep the existing animations and not add animation to section-label. The hero elements still use `.hero-eyebrow`, `.hero-headline`, `.hero-sub`, `.hero-actions` classes.

---

### Task 15: Build verification

- [ ] **Run build to verify no errors**

```bash
npm run build
```

Expected: build succeeds with no errors.

- [ ] **Run dev server and visually inspect**

```bash
npm run dev
```

Check:
1. Nav renders FIELD13, Signal, Insights, About, Book Strategy Call
2. Homepage: Hero → Insights → Market Changed → Panels → Diagram → CTA → Footer
3. Signal page: hero with diagram, included list, apply CTA
4. About page: mission statement
5. Operators page: hero → problem → process → one rule → coming soon → apply
6. No dead navigation items
7. "Coming Soon" panels are not clickable
8. Signal panel is 2x larger and links to /signal

---

### Task 16: Clean up unused files (optional)

**Files to delete (imported by nothing after all tasks above):**
- `src/components/sections/ProblemSection.jsx`
- `src/components/sections/Marquee.jsx`
- `src/components/sections/WhoSection.jsx`
- `src/components/sections/FunnelSection.jsx`
- `src/components/sections/ProgramPhases.jsx`
- `src/components/sections/ComparisonSection.jsx`
- `src/components/sections/DifferenceSection.jsx`
- `src/components/sections/HowItWorksSimple.jsx`
- `src/components/sections/HowWeWork.jsx`
- `src/components/sections/OperatorTeaser.jsx`
- `src/components/sections/PricingSection.jsx`
- `src/components/sections/UseCasesSection.jsx`
- `src/components/sections/WhatWeDo.jsx`
- `src/components/sections/operators/OperatorsApplicationForm.jsx`
- `src/components/sections/operators/OperatorsDifference.jsx`
- `src/components/sections/operators/OperatorsDisclosure.jsx`
- `src/components/sections/operators/OperatorsFinalCTA.jsx`
- `src/components/sections/operators/OperatorsHero.jsx`
- `src/components/sections/operators/OperatorsHowItWorks.jsx`
- `src/components/sections/operators/OperatorsWhatYouGet.jsx`
- `src/components/sections/operators/OperatorsWhoFits.jsx`

- [ ] **Remove unused components**

```bash
Remove-Item "E:\Projects\Collab13\src\components\sections\ProblemSection.jsx"
Remove-Item "E:\Projects\Collab13\src\components\sections\Marquee.jsx"
# ... etc
```

- [ ] **Run build again**

```bash
npm run build
```
Expected: succeeds, no import errors.

- [ ] **Clean up unused CSS from globals.css** (optional, defer to later cleanup)
