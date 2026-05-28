const problems = [
  {
    name: "Ads build skepticism",
    line: "Technical buyers have seen every claim. They filter it all out.",
    outcome: "Trust that can't be bought",
  },
  {
    name: "UGC reads as sponsored",
    line: "Operators can tell when someone hasn't used the product.",
    outcome: "Credibility that converts",
  },
  {
    name: "Operator advocacy compounds",
    line: "One practitioner's genuine recommendation becomes the default in their network.",
    outcome: "Word-of-mouth at scale",
  },
];

const ProblemSection = () => {
  return (
    <section className="problem-section">
      <div className="container">
        <p className="problem-headline">
          The buying decision was made<br />
          before they visited <em>your website.</em>
        </p>
        <div className="problem-grid">
          {problems.map((p) => (
            <div key={p.name} className="problem-item">
              <div className="problem-num">{p.name}</div>
              <p>{p.line}</p>
              <div className="problem-outcome">Outcome: {p.outcome}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
