import { Link } from 'react-router-dom';

const PanelsSection = () => {
  return (
    <section className="panels-section">
      <div className="container">
        <div className="section-label">What we build</div>
        <div className="panels-grid">
          <Link to="/signal" className="panel panel-signal">
            <div className="panel-status">Available Today</div>
            <div className="panel-name">Signal</div>
            <div className="panel-desc">
              Founder positioning. Narrative strategy. Founder media. Content systems. Distribution. One recurring GTM engine for companies that need to become the obvious choice.
            </div>
            <div className="panel-cta">Explore Signal →</div>
          </Link>
          <div className="panel panel-soon">
            <div className="panel-status">Coming Soon</div>
            <div className="panel-name">Systems</div>
            <div className="panel-desc">
              AI-native GTM infrastructure for companies that need process, not tactics.
            </div>
          </div>
          <div className="panel panel-soon">
            <div className="panel-status">Coming Soon</div>
            <div className="panel-name">Operators</div>
            <div className="panel-desc">
              Trusted practitioners building market credibility through authentic advocacy.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PanelsSection;
