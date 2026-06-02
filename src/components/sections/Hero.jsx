const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-eyebrow">For B2B tools that need to be believed</div>
        <div className="hero-layout">
          <div className="hero-left">
            <h1 className="hero-headline">
              Your buyers don't<br />
              trust your marketing.<br />
              They trust <em>each other.</em>
            </h1>
            <p className="hero-sub">
              We place your product inside the real conversations — through operators who genuinely use it, vouch for it, and have the audience that listens.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn-primary">
                Work with us →
              </a>
              <a href="#how" className="btn-secondary">
                See how it works ↓
              </a>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-stat">
              <span className="hero-stat-num">100%</span>
              <span className="hero-stat-label">Genuine operators only</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">3–6 mo</span>
              <span className="hero-stat-label">Programs that compound</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">8</span>
              <span className="hero-stat-label">Phases, every one with a deliverable</span>
            </div>
          </div>
        </div>
        <div className="hero-grid-line"></div>
        <div className="hero-number">01</div>
        <div className="hero-watermark">f13</div>
        <div className="hero-ticker">B2B · SaaS · GTM · DevTools</div>
      </div>
    </section>
  );
};

export default Hero;
