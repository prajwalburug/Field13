const offers = [
  {
    name: "Source + Vet",
    line: "3–5 operators who genuinely use your category",
    outcome: "Right people",
  },
  {
    name: "Onboard",
    line: "2–3 week eval documented in their real workflow",
    outcome: "Real proof",
  },
  {
    name: "Create",
    line: "Weekly content — LinkedIn, YouTube, newsletter",
    outcome: "Trust that converts",
  },
  {
    name: "Amplify",
    line: "Clipper network across LinkedIn, X, YouTube Shorts",
    outcome: "Reach where it matters",
  },
];

const WhatWeDo = () => {
  return (
    <section className="offer-section">
      <div className="container">
        <div className="how-eyebrow">What we do</div>
        <h2 className="how-intro">
          We turn operator expertise into assets that work across your entire funnel.
        </h2>
        <div className="offer-grid">
          {offers.map((o) => (
            <div key={o.name} className="offer-card">
              <div className="offer-name">{o.name}</div>
              <p className="offer-line">{o.line}</p>
              <div className="offer-outcome">
                <span className="offer-outcome-label">Outcome</span>
                <span>{o.outcome}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
