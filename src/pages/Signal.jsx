import Footer from '../components/layout/Footer';

const systems = [
  {
    title: 'Signal Intelligence',
    desc: 'Category intelligence reports. Competitor narrative analysis. Emerging conversation tracking. Market signal dashboard. Audience sentiment scans.'
  },
  {
    title: 'Signal Narrative',
    desc: 'Founder positioning memo. Narrative architecture. Story bank. Category POV. Messaging framework.'
  },
  {
    title: 'Signal Media',
    desc: 'LinkedIn thought leadership. Founder newsletter. Long-form essays. Founder knowledge base. Content repository.'
  },
  {
    title: 'Signal Distribution',
    desc: 'Community mapping. Strategic engagement. Podcast opportunities. Newsletter partnerships. Amplification strategy. Distribution reporting.'
  },
  {
    title: 'Signal Enablement',
    desc: 'Monthly founder sessions. AMAs. Market breakdowns. GTM clinics. Product teardowns. Industry roundtables.'
  },
];

const Signal = () => {
  return (
    <>
      <section className="hero signal-hero">
        <div className="container">
          <div className="section-label">FIELD13 Signal</div>
          <h1 className="hero-headline">
            Become the voice your market trusts.
          </h1>
          <p className="hero-sub">
            Signal is FIELD13's market positioning infrastructure for B2B founders. Intelligence. Narrative. Media. Distribution. One system designed to compound category authority over time.
          </p>
          <div className="hero-actions">
            <a href="https://cal.com/field13-r657gn/45min" className="btn-primary" target="_blank" rel="noopener noreferrer">
              Apply for Signal →
            </a>
          </div>
        </div>
      </section>
      <section className="include-section">
        <div className="container container-narrow">
          <div className="section-label">The systems</div>
          <div className="include-list-signal">
            {systems.map((item) => (
              <div className="include-item-signal" key={item.title}>
                <div className="include-item-title">{item.title}</div>
                <div className="include-item-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="outcome-section">
        <div className="container container-narrow">
          <div className="outcome-text">
            Own a category narrative. Generate inbound trust. Become the answer when your category comes up.
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
            <a href="https://cal.com/field13-r657gn/45min" className="btn-primary" target="_blank" rel="noopener noreferrer">
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
