const problems = [
  'The pilot worked in the demo, then broke on real data.',
  'Content drifts off-brand and nobody trusts what the agents send.',
  'An AI hire takes six months and still cannot cover agents, data, creative and ads.',
  'The dashboard does not match HubSpot, so everyone goes back to doing it by hand.'
];

const solutions = [
  'We build the system in your stack, against a test set you sign off.',
  'Guardrails and human approval wherever a customer sees the output.',
  'A senior team across AI, data, creative and paid media from day one.',
  'One source-to-revenue number, monitored every day and reported every month.'
];

/** Problem-solution statement. Keeps the old file name so App.jsx stays stable. */
const EnginePains = () => {
  return (
    <section className="ps-section">
      <div className="container">
        <p className="ps-statement">
          Most marketing teams do not have an AI problem. <em>They have a production problem.</em>
        </p>
        <div className="ps-grid">
          <div className="ps-col ps-problem">
            <div className="section-label">The problem</div>
            <ul>
              {problems.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <div className="ps-col ps-solution">
            <div className="section-label">What we do instead</div>
            <ul>
              {solutions.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnginePains;
