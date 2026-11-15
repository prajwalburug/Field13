import { useEffect, useRef } from 'react';
import { CAL_LINK } from '../../data/site';

const pipeline = [
  { name: 'Trend pull', body: 'Top videos, transcripts and the ads brands are scaling in your niche.' },
  { name: 'Presenter', body: 'An AI presenter, or a real person who has licensed their likeness, locked for consistency.' },
  { name: 'Hooks', body: 'Ten hooks drafted, the best four generated as lip-synced takes.' },
  { name: 'Demo and voice-over', body: 'Recorded once, narrated in the matched voice, captioned under every hook.' },
  { name: 'Ship and test', body: 'Published and tested on Meta and TikTok. Winners scaled, losers retired.' }
];

const stats = [
  { v: '$4–5', l: 'per finished clip, after setup' },
  { v: '$100–200', l: 'creator fee per video' },
  { v: '4+', l: 'hook variants per run' }
];

const PhoneVideo = () => {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="f13-phone">
      <div className="f13-phone-frame">
        <video
          ref={ref}
          src="/media/ugc-example.mp4"
          poster="/media/ugc-example-poster.jpg"
          muted
          loop
          playsInline
          controls
          preload="none"
          aria-label="AI-generated UGC example: a presenter delivers a recruiting hook to camera"
        />
      </div>
      <figcaption>AI-generated example. The presenter is not a real person.</figcaption>
    </figure>
  );
};

const Ugc = () => {
  return (
    <section className="f13-sheet f13-sheet-bone f13-ugc" id="ugc-studio">
      <div className="f13-wrap f13-ugc-grid">
        <PhoneVideo />

        <div className="f13-ugc-copy">
          <div className="f13-label">AI UGC Studio</div>
          <h2 className="f13-h2">
            UGC ads for $4–5 a clip.<br /><em>Not $100–200 a creator.</em>
          </h2>
          <p className="f13-lede">
            A creator usually sends one video, a week later. One run of our pipeline gives you four hooks to test the same day. It's built in your accounts, under your brand, and the per-clip cost starts once your presenter is set up.
          </p>

          <ol className="f13-pipeline">
            {pipeline.map((p, i) => (
              <li key={p.name}>
                <span className="f13-pipeline-n">0{i + 1}</span>
                <div>
                  <strong>{p.name}</strong>
                  <span>{p.body}</span>
                </div>
              </li>
            ))}
          </ol>

          <div className="f13-ugc-stats">
            {stats.map((s) => (
              <div key={s.l}>
                <span className="f13-ugc-stat-v">{s.v}</span>
                <span className="f13-ugc-stat-l">{s.l}</span>
              </div>
            ))}
          </div>

          <p className="f13-ugc-note">
            Every ad carries the AI-content label Meta and TikTok require. Licensed likeness only, no invented customer testimonials.
          </p>

          <div className="f13-actions">
            <a href={CAL_LINK} className="f13-btn f13-btn-blue" target="_blank" rel="noopener noreferrer">Build your UGC studio</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ugc;
