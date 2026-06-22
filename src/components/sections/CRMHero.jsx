import { Link } from 'react-router-dom';

const CRMHero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-eyebrow">Revenue architecture, not CRM configuration</div>
        <h1 className="hero-headline">
          Your HubSpot is not broken. <em>Your process map is missing.</em>
        </h1>
        <p className="hero-sub">
          We will show you exactly where deals are leaking — in 30 minutes, with a written score, guaranteed.
        </p>
        <div className="hero-actions">
          <a href="https://cal.com/field13-r657gn/45min" className="btn-primary" target="_blank" rel="noopener noreferrer">
            Book your free Process Check →
          </a>
          <Link to="/process-check" className="btn-secondary">
            Take the self-assessment →
          </Link>
        </div>
        <div className="hero-guarantee-line">3 fixes or it is on us. No pitch, no commitment.</div>
      </div>
    </section>
  );
};

export default CRMHero;
