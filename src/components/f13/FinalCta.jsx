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
              A call with Prajwal or Subhajit. We talk through your workflow, show you our systems running, and if it’s a fit you get a plan and a fixed price in writing.
            </p>
            <div className="f13-actions">
              <a {...calProps} className="f13-btn f13-btn-light">Book a call</a>
            </div>
            <p className="hm-final-note">Bring the person who owns the workflow and a few examples of work you like.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
