const DifferenceSection = () => {
  return (
    <section className="diff-section">
      <div className="container">
        <div className="diff-header">
          <h2 className="diff-headline">
            Not a UGC platform.<br />Not an agency.<br /><em>A different kind of bet.</em>
          </h2>
          <p className="diff-sub">
            UGC platforms sell content at scale. We build long-term advocacy with operators who have real skin in the game. That difference changes the buyer, the price point, and the result.
          </p>
        </div>
        <div className="diff-table">
          <div className="diff-row header">
            <div className="diff-cell"></div>
            <div className="diff-cell">UGC Platforms</div>
            <div className="diff-cell">field13</div>
          </div>
          <div className="diff-row">
            <div className="diff-cell label">Operator requirement</div>
            <div className="diff-cell them">No product use required</div>
            <div className="diff-cell us">Must genuinely use or evaluate</div>
          </div>
          <div className="diff-row">
            <div className="diff-cell label">Engagement model</div>
            <div className="diff-cell them">Per piece, per creator</div>
            <div className="diff-cell us">Monthly retainer, 3–6 months</div>
          </div>
          <div className="diff-row">
            <div className="diff-cell label">Relationship</div>
            <div className="diff-cell them">Ends with the campaign</div>
            <div className="diff-cell us">Deepens over time</div>
          </div>
          <div className="diff-row">
            <div className="diff-cell label">Success metric</div>
            <div className="diff-cell them">Views, engagement, impressions</div>
            <div className="diff-cell us">Inbound, recommendations, trust signals</div>
          </div>
          <div className="diff-row">
            <div className="diff-cell label">Voice ownership</div>
            <div className="diff-cell them">Brand controls the message</div>
            <div className="diff-cell us">Operator's authentic voice, always</div>
          </div>
          <div className="diff-row">
            <div className="diff-cell label">Result</div>
            <div className="diff-cell them">Awareness (maybe)</div>
            <div className="diff-cell us">Trust that compounds</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;
