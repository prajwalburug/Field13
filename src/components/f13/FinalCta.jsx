import { Link } from 'react-router-dom';
import { CAL_LINK } from '../../data/site';

const FinalCta = () => {
  return (
    <section className="f13-sheet f13-sheet-black f13-final">
      <div className="f13-wrap">
        <div className="f13-final-card f13-final-card-solo">
          <div className="f13-final-copy">
            <div className="f13-label">Start with one call</div>
            <h2 className="f13-h2">Tell us the number you need to move.<br /><em>We'll engineer the system.</em></h2>
            <p className="f13-lede">
              Thirty minutes with Prajwal or Subhajit. If it's a fit, Discovery gets you the plan, a fixed price and a go-live date, all in writing.
            </p>
            <div className="f13-actions">
              <a href={CAL_LINK} className="f13-btn f13-btn-light" target="_blank" rel="noopener noreferrer">Book a discovery call</a>
              <Link to="/requests" className="f13-btn f13-btn-ghost"><span className="f13-nav-live" aria-hidden="true" />Vote on what we build next</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
