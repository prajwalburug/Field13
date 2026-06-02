const phases = [
  { num: 'P0', name: 'Strategy brief', desc: 'We learn your product, buyer profile, and category trust landscape. Defines the entire program.', output: 'Written brief — buyer profile, trust landscape, 90-day roadmap' },
  { num: 'P1', name: 'Source + vet', desc: 'We find 3–5 operators who genuinely use or seriously evaluate your product category. Practitioners with credibility.', output: 'Operator shortlist with rationale. Client approves before onboarding.' },
  { num: 'P2', name: 'Structured evaluation', desc: 'Operators use the product in their real workflow for 2–3 weeks. Real wins. Honest friction.', output: 'Documented eval — use cases, genuine wins, honest friction points.' },
  { num: 'P3', name: 'Narrative strategy', desc: 'Before any content is produced, we identify the 2–3 strongest angles from the evaluation.', output: 'Narrative brief per operator, agreed before content creation.' },
  { num: 'P4', name: 'Advocacy content', desc: 'Weekly cadence — LinkedIn, video, newsletter. Operator\'s authentic voice. We guide angles. Never scripted.', output: 'Monthly content calendar. 60% workflow, 30% opinion, 10% product.' },
  { num: 'P5', name: 'Targeted distribution', desc: 'Content placed inside the specific communities and threads where your buyers make decisions. Not broadcast — precision.', output: 'Placement log — communities reached, content placed, engagement.' },
  { num: 'P6', name: 'Trust signals report', desc: 'Monthly report. Inbound attribution, pipeline influence, unprompted mentions, operator satisfaction.', output: 'Monthly report. The document that justifies renewal.' },
  { num: 'P7', name: 'Renewal + expansion', desc: 'Month 5 strategic review. Present what compounded. Proposal for next 6 months.', output: 'Expansion proposal. Two paths: deepen or broaden.' },
];

const ProgramPhases = () => {
  return (
    <section id="what" className="phases-section">
      <div className="container">
        <div className="how-eyebrow">The program</div>
        <h2 className="how-intro">What happens inside <br /><em>a DFY engagement.</em></h2>
        <p className="phases-intro">Eight phases. Every one has a deliverable.</p>
        <div className="phases">
          {phases.map((p) => (
            <div key={p.num} className="phase">
              <div className="phase-n">{p.num}</div>
              <div>
                <div className="phase-name">{p.name}</div>
                <div className="phase-desc">{p.desc}</div>
              </div>
              <div className="phase-out">
                <span className="phase-out-label">Deliverable</span>
                <span>{p.output}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ProgramPhases;
