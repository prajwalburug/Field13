const CTASection = () => {
  return (
    <section className="cta-section" id="contact">
      <div className="container-narrow">
        <div className="cta-eyebrow">Ready to start</div>
        <h2 className="cta-headline">Let's find out<br /><em>if we're a fit.</em></h2>
        <p className="cta-sub">
          We work with a small number of clients at a time. Tell us about your product — we'll tell you honestly if we can move the needle.
        </p>
        <div className="hero-actions" style={{justifyContent: 'center'}}>
          <a href="https://tally.so/r/gDkVdN" target="_blank" rel="noopener noreferrer" className="btn-primary">
            See if you're a fit →
          </a>
          <a href="/operators" className="btn-secondary">
            For operators →
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
