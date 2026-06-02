const ProblemSection = () => {
  return (
    <section className="problem-section" id="why">
      <div className="container">
        <div className="how-eyebrow">The problem</div>
        <p className="problem-headline">
          The buying decision was made<br />
          before they visited <em>your website.</em>
        </p>
        <p className="problem-intro">
          Your buyer's decision starts in the community channels, Slack groups, and LinkedIn DMs where practitioners talk to each other. If you're not part of those conversations, the decision is made before you get a chance.
        </p>
        <div className="problem-grid">
          <div className="problem-item">
            <div className="problem-num">Paid ads</div>
            <p>Technical buyers have seen every claim. They filter it all out.</p>
            <div className="problem-outcome">→ Trust that can't be bought</div>
          </div>
          <div className="problem-item">
            <div className="problem-num">Sponsored UGC</div>
            <p>Operators can smell when someone hasn't used the product.</p>
            <div className="problem-outcome">→ Credibility that converts</div>
          </div>
          <div className="problem-item">
            <div className="problem-num">This approach</div>
            <p>One practitioner's genuine recommendation becomes the default in their network.</p>
            <div className="problem-outcome">→ Word-of-mouth at scale</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
