import { CAL_LINK } from '../../data/site';
import HeroCanvas from '../three/HeroCanvas';
import AgentTrace from '../ui/AgentTrace';

// What we build with: engineering plus the creative models marketers already know.
// Only tools we actually use; the rest of the stack is mapped per client on the call.
// Interleaved so creative names show up early in the loop.
const stack = [
  { name: 'Claude', layer: 'models' },
  { name: 'Seedance', layer: 'video' },
  { name: 'LangGraph', layer: 'agents' },
  { name: 'Nano Banana', layer: 'image' },
  { name: 'OpenAI', layer: 'models' },
  { name: 'ElevenLabs', layer: 'voice' },
  { name: 'Pydantic AI', layer: 'agents' },
  { name: 'GPT Image', layer: 'image' },
  { name: 'Gemini', layer: 'models' },
  { name: 'Remotion', layer: 'video editing' },
  { name: 'LlamaIndex', layer: 'retrieval' },
  { name: 'Fish Audio', layer: 'voice' },
  { name: 'pgvector', layer: 'retrieval' },
  { name: 'Langfuse', layer: 'tracing' },
  { name: 'LangSmith', layer: 'evals' },
  { name: 'Postgres', layer: 'data' },
  { name: 'Python', layer: 'runtime' },
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
        <div className="f13-label">Built with</div>
        <div className="f13-marquee" aria-label="Models and tools we build with" tabIndex={0}>
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
