import Footer from '../components/layout/Footer';

const included = [
  {
    title: 'Founder Positioning',
    desc: 'Develop a clear market narrative that separates you from competitors.'
  },
  {
    title: 'Narrative Strategy',
    desc: 'Build repeatable ideas your market begins to associate with your company.'
  },
  {
    title: 'Founder Media',
    desc: 'LinkedIn, newsletter and long-form content designed around authority rather than engagement.'
  },
  {
    title: 'Content System',
    desc: 'A structured publishing engine that compounds over time.'
  },
  {
    title: 'Distribution Strategy',
    desc: 'Make sure the right people repeatedly encounter your ideas where buying decisions actually happen.'
  },
  {
    title: 'Market Intelligence',
    desc: 'Monthly research into conversations, competitors and category shifts that influence your positioning.'
  },
  {
    title: 'Performance Review',
    desc: 'Monthly review of narrative performance and strategic adjustments.'
  },
];

const Signal = () => {
  return (
    <>
      <section className="hero signal-hero">
        <div className="container">
          <div className="section-label">FIELD13 Signal</div>
          <h1 className="hero-headline">
            Become the company buyers already trust.
          </h1>
          <p className="hero-sub">
            Signal is FIELD13's executive positioning system for B2B founders.
          </p>
          <p className="hero-sub">
            We help founders become the voice their market listens to through strategic narrative, consistent media and intelligent distribution.
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
          <div className="section-label">Included</div>
          <div className="include-list-signal">
            {included.map((item) => (
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
            More trust. More inbound. More category authority. Less dependence on paid acquisition.
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
