import { Link } from 'react-router-dom';
import { CAL_LINK } from '../../data/site';
import HeroCanvas from '../three/HeroCanvas';
import AgentTrace from '../ui/AgentTrace';

const EngineHero = () => {
  return (
    <section className="hero hero-premium">
      <div className="hero-glow" aria-hidden="true" />
      <HeroCanvas />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow">Senior AI engineering partner for SaaS teams and agencies</div>
          <h1 className="hero-headline">
            We engineer the AI systems <em>behind modern marketing.</em>
          </h1>
          <p className="hero-sub">
            Outbound agents, AI UGC studios, grounded content engines and revenue dashboards, built by senior engineers to production standard and run for you every month. Shipped in weeks. Owned by you.
          </p>
          <div className="hero-actions">
            <a href={CAL_LINK} className="btn-primary" target="_blank" rel="noopener noreferrer">
              Book a discovery call →
            </a>
            <Link to="/pricing" className="btn-secondary">
              See engagements →
            </Link>
          </div>
          <div className="hero-code">
            LangGraph · Claude · RAG · evals · MCP
          </div>
        </div>
        <div className="hero-visual">
          <AgentTrace />
        </div>
      </div>
    </section>
  );
};

export default EngineHero;
