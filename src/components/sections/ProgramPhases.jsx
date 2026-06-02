const phases = [
  { num: 'P0', name: 'Strategy brief', desc: 'We learn your product, buyer profile, and category trust landscape before anything starts.' },
  { num: 'P1', name: 'Source + vet', desc: 'Find 3–5 operators in your category who actually use tools like yours.' },
  { num: 'P2', name: 'Structured evaluation', desc: 'Operators use your product in their real workflow. Real wins. Honest friction.' },
  { num: 'P3', name: 'Narrative strategy', desc: 'Identify the 2–3 strongest angles from the evaluation. No content without strategy.' },
  { num: 'P4', name: 'Advocacy content', desc: 'Weekly cadence — LinkedIn, video, newsletter. Operator\'s voice, never scripted.' },
  { num: 'P5', name: 'Targeted distribution', desc: 'Place content where your buyers decide. Not broadcast — precision.' },
  { num: 'P6', name: 'Trust signals report', desc: 'Monthly report. Inbound attribution, pipeline influence, community mentions.' },
  { num: 'P7', name: 'Renewal + expansion', desc: 'Month 5 review. What compounded. What\'s next.' },
];

const ProgramPhases = () => {
  return (
    <section id="what" className="phases-section">
      <div className="container">
        <div className="how-eyebrow">The program</div>
        <h2 className="how-intro">What happens inside <br /><em>a DFY engagement.</em></h2>
        <p className="phases-intro">Eight phases — clear step, clear goal.</p>
        <div className="phases">
          {phases.map((p) => (
            <div key={p.num} className="phase" style={{gridTemplateColumns: '50px 1fr'}}>
              <div className="phase-n">{p.num}</div>
              <div>
                <div className="phase-name">{p.name}</div>
                <div className="phase-desc">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ProgramPhases;
