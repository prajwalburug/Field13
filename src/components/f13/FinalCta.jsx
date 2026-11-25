import { calProps } from '../../data/site';

const FinalCta = () => {
  return (
    <section className="f13-sheet f13-sheet-black f13-final">
      <div className="f13-wrap">
        <div className="f13-final-card f13-final-card-solo">
          <div className="f13-final-copy">
            <div className="f13-label">Start with one call</div>
            <h2 className="f13-h2">Show us how your team works.<br /><em>We’ll show you the system we’d build.</em></h2>
            <p className="f13-lede">
              A 30-min call with Prajwal or Subhajit. Walk us through how your team makes ads and content today. We show you what we’d build, and if it’s a fit you get a plan and a fixed price in writing.
            </p>
            <div className="f13-actions">
              <a {...calProps} className="f13-btn f13-btn-light">See the system we’d build</a>
            </div>
            <p className="hm-final-note">Bring whoever runs this work day to day, and a few ads or posts you like.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
