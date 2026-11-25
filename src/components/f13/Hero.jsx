import { calProps } from '../../data/site';
import HeroCanvas from '../three/HeroCanvas';
import AgentTrace from '../ui/AgentTrace';

// The creative tools and ad platforms buyers recognise. The engineering stack (agents, tracing, infra)
// stays off the homepage: it reads as a dev shop to a creative buyer. Only tools we actually use.
const stack = [
  { name: 'Claude', layer: 'writing' },
  { name: 'Seedance', layer: 'video' },
  { name: 'Nano Banana', layer: 'image' },
  { name: 'ElevenLabs', layer: 'voice' },
  { name: 'Meta', layer: 'ads' },
  { name: 'GPT Image', layer: 'image' },
  { name: 'Remotion', layer: 'editing' },
  { name: 'TikTok', layer: 'ads' },
  { name: 'Gemini', layer: 'writing' },
  { name: 'Fish Audio', layer: 'voice' },
  { name: 'Zernio', layer: 'posting' },
  { name: 'OpenAI', layer: 'writing' }
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
          <div className="f13-badge f13-hero-badge">
            <span className="f13-badge-tag"><span className="f13-hero-dot" aria-hidden="true" />For marketing teams and agencies</span>
          </div>
          <h1 className="f13-display f13-hero-title">
            We build <em>AI marketing systems.</em>
          </h1>
          <p className="f13-lede f13-hero-lede">
            <span className="hm-only-wide">Systems for UGC, content, ads and outbound, built around how your team already works and trained on its own work.</span>
            <span className="hm-only-phone">For UGC, content, ads and outbound. Built around your team.</span>
          </p>
          <div className="f13-actions">
            <a {...calProps} className="f13-btn f13-btn-blue">See the system we’d build</a>
          </div>
          <p className="f13-cta-note">A 30-min call with Prajwal or Subhajit. Walk us through how your team makes ads and content today.</p>
        </div>

        <div className="f13-hero-panel">
          <HeroCanvas />
          <div className="f13-hero-panel-card">
            <AgentTrace />
          </div>
        </div>
      </div>

      <div className="f13-wrap f13-builton">
        <div className="f13-label">Works with</div>
        <div className="f13-marquee" aria-label="Creative tools and ad platforms we work with" tabIndex={0}>
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
