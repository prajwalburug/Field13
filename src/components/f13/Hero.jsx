import { CAL_LINK } from '../../data/site';
import HeroCanvas from '../three/HeroCanvas';
import AgentTrace from '../ui/AgentTrace';

// The engineering stack, by layer. Business tools are mapped per client on the call.
const stack = [
  { name: 'Claude', layer: 'models' },
  { name: 'OpenAI', layer: 'models' },
  { name: 'Gemini', layer: 'models' },
  { name: 'LangGraph', layer: 'agents' },
  { name: 'Pydantic AI', layer: 'agents' },
  { name: 'LlamaIndex', layer: 'retrieval' },
  { name: 'pgvector', layer: 'retrieval' },
  { name: 'Langfuse', layer: 'tracing' },
  { name: 'LangSmith', layer: 'evals' },
  { name: 'Postgres', layer: 'data' },
  { name: 'Redis', layer: 'data' },
  { name: 'Python', layer: 'runtime' },
  { name: 'TypeScript', layer: 'runtime' },
  { name: 'FastAPI', layer: 'services' },
  { name: 'Docker', layer: 'infra' },
  { name: 'Terraform', layer: 'infra' },
  { name: 'AWS', layer: 'cloud' },
  { name: 'Cloudflare', layer: 'edge' }
];

const StackRow = ({ hidden }) => (
  <ul className="f13-marquee-row" aria-hidden={hidden || undefined}>
    {stack.map((t) => (
      <li key={t.name}>
        <span className="f13-marquee-name">{t.name}</span>
        <span className="f13-marquee-layer">{t.layer}</span>
      </li>
    ))}
  </ul>
);

const Hero = () => {
  return (
    <section className="f13-sheet f13-sheet-black f13-hero">
      <div className="f13-wrap f13-hero-grid">
        <div className="f13-hero-copy">
          <div className="f13-hero-eyebrow">
            <span className="f13-hero-dot" aria-hidden="true" />
            AI marketing systems for SaaS teams and agencies
          </div>
          <h1 className="f13-display f13-hero-title">
            AI that ships your marketing. <em>Every week.</em>
          </h1>
          <p className="f13-lede f13-hero-lede">
            Content, ads, outreach and reports, built inside your own accounts and run by us every month.
            You own all of it. No tool to learn, no team to hire.
          </p>
          <div className="f13-actions">
            <a href={CAL_LINK} className="f13-btn f13-btn-blue" target="_blank" rel="noopener noreferrer">Book a discovery call</a>
            <a href="#systems" className="f13-btn f13-btn-ghost">See what we build</a>
          </div>
        </div>

        <div className="f13-hero-panel">
          <HeroCanvas />
          <div className="f13-hero-panel-card">
            <AgentTrace />
          </div>
        </div>
      </div>

      <div className="f13-wrap f13-builton">
        <div className="f13-label">Engineered with</div>
        <div className="f13-marquee" aria-label="Engineering stack">
          <div className="f13-marquee-track">
            <StackRow />
            <StackRow hidden />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
