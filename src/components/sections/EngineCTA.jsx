import { Link } from 'react-router-dom';
import { CAL_LINK } from '../../data/site';

const EngineCTA = () => {
  return (
    <section className="cta-section cta-section-dark">
      <div className="container container-narrow">
        <h2 className="cta-headline">
          Tell us the number. <em>We will engineer the system.</em>
        </h2>
        <p className="cta-sub">A 30-minute call with an engineering lead. If it is a fit, a 5-day Discovery gives you an architecture, a fixed price and a go-live date.</p>
        <div className="cta-actions">
          <a href={CAL_LINK} className="btn-primary" target="_blank" rel="noopener noreferrer">
            Book a discovery call →
          </a>
        </div>
        <div className="cta-secondary">
          <Link to="/process-check" className="btn-secondary">
            Or score your AI readiness first →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EngineCTA;
