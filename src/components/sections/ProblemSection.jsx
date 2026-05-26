const ProblemSection = () => {
  return (
    <section className="problem-section">
      <div className="container">
        <div className="problem-label">The real problem</div>
        <p className="problem-headline">
          The buying decision was made<br />
          before they visited <em>your website.</em>
        </p>
        <p style={{ color: 'var(--ink-3)', fontSize: '13px', maxWidth: '560px', lineHeight: '1.75' }}>
          In B2B, trust is built in private Slack channels, community threads, and peer DMs — not on landing pages. By the time someone visits your site, they've already asked a colleague what tool they use. The question isn't how you reach more people. It's whether you're the answer when the question gets asked.
        </p>
        <div className="problem-grid">
          <div className="problem-item">
            <div className="problem-num">01</div>
            <p>Ads build skepticism, not trust. Technical buyers have seen every claim. They've learned to filter all of it out.</p>
          </div>
          <div className="problem-item">
            <div className="problem-num">02</div>
            <p>UGC platforms sell content volume. But operators can tell when someone hasn't actually used the product. It reads as sponsored — because it is.</p>
          </div>
          <div className="problem-item">
            <div className="problem-num">03</div>
            <p>Real operator advocacy compounds. When a practitioner publicly stands behind a tool, it becomes the default recommendation in their network. That's not distribution. That's credibility.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
