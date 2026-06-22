import { Link } from 'react-router-dom';

const CRMCTA = () => {
  return (
    <section className="cta-section cta-section-dark">
      <div className="container container-narrow">
        <h2 className="cta-headline">
          Book your <em>free Process Check</em>
        </h2>
        <p className="cta-sub">3 fixes or it is on us. No pitch, no commitment.</p>
        <div className="cta-actions">
          <a href="https://cal.com/field13-r657gn/45min" className="btn-primary" target="_blank" rel="noopener noreferrer">
            Book your free Process Check →
          </a>
        </div>
        <div className="cta-secondary">
          <Link to="/process-check" className="btn-secondary">
            Or run it yourself →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CRMCTA;
