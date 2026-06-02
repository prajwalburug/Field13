const FunnelSection = () => {
  return (
    <section id="how" className="funnel-section">
      <div className="container">
        <div className="how-eyebrow">How it works</div>
        <h2 className="how-intro" style={{margin: '0 auto 5rem', textAlign: 'center'}}>One path to <br /><em>trusted advocacy.</em></h2>
        <p className="funnel-intro" style={{margin: '0 auto 3rem', textAlign: 'center'}}>
          Every engagement starts with a fit conversation. If there's alignment, you enter the DFY program — the only path that gets operators your buyers already trust, advocating for your product.
        </p>
        <div className="funnel" style={{margin: '0 auto'}}>

          <div className="funnel-step">
            <div className="funnel-left">
              <div className="funnel-num">Step 0</div>
              <span className="funnel-tier tier-free">Free</span>
            </div>
            <div className="funnel-right">
              <h3>Fit conversation</h3>
              <p>A 15–20 minute call. We learn your product, your buyer, and your category. We tell you honestly whether we can move the needle. No pitch.</p>
              <span className="funnel-price">Free call · leads to sprint or a clear no</span>
            </div>
          </div>

          <div className="funnel-arrow">↓ if there's a fit</div>

          <div className="funnel-step">
            <div className="funnel-left">
              <div className="funnel-num">Step 1</div>
              <span className="funnel-tier tier-paid">Entry offer</span>
            </div>
            <div className="funnel-right">
              <h3>Strategy sprint</h3>
              <p>A paid 90-minute session. We produce a written brief — trust landscape, 2–3 narrative angles, operator shortlist, 90-day roadmap. You leave with value whether or not you proceed.</p>
            </div>
          </div>

          <div className="funnel-arrow">↓ sprint output defines the program</div>

          <div className="funnel-step">
            <div className="funnel-left">
              <div className="funnel-num">Step 2</div>
              <span className="funnel-tier tier-dfy">Done for you</span>
            </div>
            <div className="funnel-right">
              <h3>DFY retainer — the full program</h3>
              <p>We run everything. Sourcing, vetting, narrative strategy, content guidance, targeted distribution, monthly reports. You approve operators and review results.</p>
              <span className="funnel-price">3–6 month minimum · monthly retainer</span>
            </div>
          </div>

          <div className="funnel-arrow">↓ month 5</div>

          <div className="funnel-step">
            <div className="funnel-left">
              <div className="funnel-num">Step 3</div>
              <span className="funnel-tier tier-renew">Renewal</span>
            </div>
            <div className="funnel-right">
              <h3>Renewal + expansion</h3>
              <p>Strategic review at month 5. Trust signals report presented. Proposal for next 6 months: deepen with more operators, or broaden to a new persona or geography.</p>
              <span className="funnel-price">Ongoing · not a re-sell</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default FunnelSection;
