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
              Become the voice your market trusts. Signal combines market intelligence, narrative strategy, founder media and distribution into one recurring positioning system. Built to compound trust over time.
            </div>
            <div className="panel-cta">Explore Signal ?</div>
          </Link>
          <div className="panel panel-soon">
            <div className="panel-status">Coming Soon</div>
            <div className="panel-name">Systems</div>
            <div className="panel-desc">
              Build GTM infrastructure that scales. Research. Outbound. Automation. Operations. The systems behind modern growth.
            </div>
          </div>
          <div className="panel panel-soon">
            <div className="panel-status">Coming Soon</div>
            <div className="panel-name">Operators</div>
            <div className="panel-desc">
              Build trust through the people your buyers already trust. A network of practitioners and operators who shape market perception through real experience.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PanelsSection;
