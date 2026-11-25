const evals = [
  { name: 'Grounded in sources', v: 0.97 },
  { name: 'Brand voice', v: 0.93 },
  { name: 'Factual accuracy', v: 0.98 },
  { name: 'Policy and claims', v: 1.0 }
];

const weeks = [12, 15, 14, 19, 22, 21, 27, 31, 30, 36, 41, 44];

const creatives = [
  { id: 'V-14', fmt: '9:16', state: 'live' },
  { id: 'V-15', fmt: '1:1', state: 'live' },
  { id: 'V-16', fmt: '9:16', state: 'testing' },
  { id: 'V-17', fmt: '4:5', state: 'rendering' },
  { id: 'V-18', fmt: '16:9', state: 'review' },
  { id: 'V-19', fmt: '9:16', state: 'queued' }
];

const Sparkline = () => {
  const w = 280;
  const h = 90;
  const max = Math.max(...weeks);
  const pts = weeks.map((v, i) => [(i / (weeks.length - 1)) * w, h - (v / max) * (h - 8) - 4]);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${w},${h} L0,${h} Z`;
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sparkFill)" />
      <path d={line} fill="none" stroke="var(--accent)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

const SystemShowcase = () => {
  return (
    <section className="showcase-section">
      <div className="container">
        <div className="section-label">Inside a Field13 system</div>
        <h2 className="problem-headline">
          Built like software. <em>Run like infrastructure.</em>
        </h2>
        <p className="pricing-intro">
          Every system we ship comes with the views your team actually needs: what the agents did, whether the output passed, and what it did to pipeline.
        </p>

        <div className="showcase-grid">
          <div className="ui-panel">
            <div className="ui-panel-bar">
              <span className="ui-dots"><i /><i /><i /></span>
              <span className="ui-panel-title">eval suite · content-engine</span>
              <span className="ui-badge">passed</span>
            </div>
            <div className="ui-panel-body">
              {evals.map((e) => (
                <div className="eval-row" key={e.name}>
                  <span className="eval-name">{e.name}</span>
                  <span className="eval-track"><span className="eval-fill" style={{ width: `${e.v * 100}%` }} /></span>
                  <span className="eval-num">{e.v.toFixed(2)}</span>
                </div>
              ))}
              <div className="ui-note">Release blocked automatically if any score drops below its threshold.</div>
            </div>
          </div>

          <div className="ui-panel">
            <div className="ui-panel-bar">
              <span className="ui-dots"><i /><i /><i /></span>
              <span className="ui-panel-title">pipeline · sourced by system</span>
              <span className="ui-badge">12 wks</span>
            </div>
            <div className="ui-panel-body">
              <div className="kpi-row">
                <div className="kpi"><span className="kpi-v">3.7×</span><span className="kpi-l">sourced pipeline</span></div>
                <div className="kpi"><span className="kpi-v">4 min</span><span className="kpi-l">lead to routed</span></div>
                <div className="kpi"><span className="kpi-v">0</span><span className="kpi-l">silent failures</span></div>
              </div>
              <Sparkline />
            </div>
          </div>

          <div className="ui-panel">
            <div className="ui-panel-bar">
              <span className="ui-dots"><i /><i /><i /></span>
              <span className="ui-panel-title">creative pipeline · week 46</span>
              <span className="ui-badge">6 variants</span>
            </div>
            <div className="ui-panel-body">
              <div className="creative-grid">
                {creatives.map((c) => (
                  <div className={`creative-tile fmt-${c.fmt.replace(':', '-')}`} key={c.id}>
                    <span className="creative-id">{c.id}</span>
                    <span className="creative-fmt">{c.fmt}</span>
                    <span className={`creative-state st-${c.state}`}>{c.state}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="showcase-caption">Illustrative interfaces. Numbers are examples, not client results.</p>
      </div>
    </section>
  );
};

export default SystemShowcase;
