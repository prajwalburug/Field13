const OperatorTeaser = () => {
  return (
    <section className="operator-teaser">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', paddingTop: 0, paddingBottom: 0 }}>
        <div className="operator-teaser-text">
          <div className="operator-eyebrow">For operators</div>
          <h2 className="operator-headline">You've built real expertise.<br />It should pay.</h2>
          <p className="operator-sub">
            If you're an operator with a genuine opinion about the tools you use — and an audience that listens — we want to talk. Paid, long-term advocacy programs with brands that actually match your workflow. No fakery. No scripts.
          </p>
        </div>
        <a href="/operators" className="btn-light">
          Apply to be an early operator →
        </a>
      </div>
    </section>
  );
};

export default OperatorTeaser;
