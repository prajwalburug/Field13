import { modules, standards } from '../../data/site';

const weeks = [12, 15, 14, 19, 22, 21, 27, 31, 30, 36, 41, 44];

const Sparkline = () => {
  const w = 280;
  const h = 80;
  const max = Math.max(...weeks);
  const pts = weeks.map((v, i) => [(i / (weeks.length - 1)) * w, h - (v / max) * (h - 8) - 4]);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="bentoSpark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.32" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${w},${h} L0,${h} Z`} fill="url(#bentoSpark)" />
      <path d={line} fill="none" stroke="var(--accent)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

const FlowViz = () => (
  <div className="viz-flow" aria-hidden="true">
    {['Signal', 'Enrich', 'Score', 'Draft', 'Eval', 'Approve'].map((s, i, a) => (
      <span className="viz-flow-step" key={s}>
        <span className={`viz-chip${i === a.length - 1 ? ' is-pending' : ''}`}>{s}</span>
        {i < a.length - 1 && <span className="viz-arrow">→</span>}
      </span>
    ))}
  </div>
);

const EvalViz = () => (
  <div className="viz-evals" aria-hidden="true">
    {[['Grounded', 0.97], ['Brand voice', 0.93], ['Factual', 0.98]].map(([n, v]) => (
      <div className="eval-row" key={n}>
        <span className="eval-name">{n}</span>
        <span className="eval-track"><span className="eval-fill" style={{ width: `${v * 100}%` }} /></span>
        <span className="eval-num">{v.toFixed(2)}</span>
      </div>
    ))}
  </div>
);

const CreativeViz = () => (
  <div className="creative-grid viz-creative" aria-hidden="true">
    {[['V-14', 'live'], ['V-15', 'live'], ['V-16', 'testing'], ['V-17', 'rendering'], ['V-18', 'review'], ['V-19', 'queued']].map(([id, st]) => (
      <div className="creative-tile" key={id}>
        <span className="creative-id">{id}</span>
        <span className={`creative-state st-${st}`}>{st}</span>
      </div>
    ))}
  </div>
);

const DataViz = () => (
  <div className="viz-data" aria-hidden="true">
    <div className="kpi-row">
      <div className="kpi"><span className="kpi-v">3.7×</span><span className="kpi-l">sourced pipeline</span></div>
      <div className="kpi"><span className="kpi-v">4 min</span><span className="kpi-l">lead to routed</span></div>
      <div className="kpi"><span className="kpi-v">0</span><span className="kpi-l">silent failures</span></div>
    </div>
    <Sparkline />
  </div>
);

const vizFor = [FlowViz, EvalViz, CreativeViz, DataViz];
const spanFor = ['bento-wide', 'bento-narrow', 'bento-narrow', 'bento-wide'];

const EngineModules = () => {
  return (
    <section className="bento-section" id="systems">
      <div className="container">
        <div className="bento-intro">
          <div>
            <div className="section-label">What we engineer</div>
            <h2 className="problem-headline">
              Four systems. <em>One engineering standard.</em>
            </h2>
          </div>
          <ul className="bento-standards">
            {standards.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>

        <div className="bento-grid">
          {modules.map((m, i) => {
            const Viz = vizFor[i];
            return (
              <article className={`bento-cell ${spanFor[i]}`} key={m.name}>
                <div className="bento-viz"><Viz /></div>
                <div className="bento-text">
                  <div className="bento-meta">
                    <span className="bento-num">0{i + 1}</span>
                    <span className="bento-outcome">{m.outcome}</span>
                  </div>
                  <h3 className="bento-name">{m.name}</h3>
                  <p className="bento-line">{m.line}</p>
                  <p className="bento-tools">{m.tools}</p>
                </div>
              </article>
            );
          })}
        </div>
        <p className="showcase-caption">Interfaces are illustrative. Numbers are examples, not client results.</p>
      </div>
    </section>
  );
};

export default EngineModules;
