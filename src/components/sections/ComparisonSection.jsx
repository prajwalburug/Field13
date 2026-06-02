const rows = [
  { label: 'Who advocates', them: 'Creators paid to promote products they\'ve never used', us: 'Operators who genuinely use or evaluate your category' },
  { label: 'Program length', them: 'One-off campaigns', us: '3–6 month programs built to compound' },
  { label: 'What we measure', them: 'Impressions, reach, views', us: 'Inbound attribution, pipeline influence, community mentions' },
  { label: 'The message', them: 'Brand-controlled scripts', us: 'Operator\'s authentic voice, always' },
  { label: 'The result', them: 'Awareness (maybe)', us: 'Trust that compounds in peer networks' },
];

const ComparisonSection = () => {
  return (
    <section id="compare">
      <div className="container">
        <div className="how-eyebrow">Why field13</div>
        <h2 className="how-intro">What makes this <br /><em>different from everything else.</em></h2>
        <div className="comp-table">
          <div className="comp-row comp-header">
            <div className="comp-cell"></div>
            <div className="comp-cell comp-them-h">Everyone else</div>
            <div className="comp-cell comp-us-h">field13</div>
          </div>
          {rows.map((r) => (
            <div key={r.label} className="comp-row">
              <div className="comp-cell comp-label">{r.label}</div>
              <div className="comp-cell comp-them">{r.them}</div>
              <div className="comp-cell comp-us">{r.us}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ComparisonSection;
