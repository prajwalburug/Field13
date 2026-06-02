const FunnelSection = () => {
  return (
    <section id="how" className="funnel-section">
      <div className="container">
        <div className="how-eyebrow">How it works</div>
        <h2 className="how-intro">Three ways in.<br /><em>One destination.</em></h2>
        <p className="funnel-intro">
          Every engagement starts with a fit conversation. From there, we find the right entry point — and every path leads to the same outcome: operators your buyers already trust, advocating for your product.
        </p>
        <div className="funnel">

          <div className="funnel-step">
            <div className="funnel-left">
              <div className="funnel-num">Step 0</div>
              <span className="funnel-tier tier-free">Free</span>
            </div>
            <div className="funnel-right">
              <h3>Fit conversation</h3>
              <p>A 15–20 minute call. We learn your product, your buyer, and your category. We tell you honestly whether we can move the needle. No pitch.</p>
              <span className="funnel-price">Free → leads to strategy sprint or a clear no</span>
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
              <p>A paid 90-minute session that produces a written brief — buyer trust landscape, 2–3 narrative angles, operator shortlist, 90-day roadmap. You leave with value whether or not you proceed.</p>
              <span className="funnel-price">$1,500–$2,500 · one-time · credited toward month 1 of retainer</span>
            </div>
          </div>

          <div className="funnel-arrow">↓ sprint output determines the path</div>

          <div className="funnel-step">
            <div className="funnel-left">
              <div className="funnel-num">Step 2A</div>
              <span className="funnel-tier tier-dwy">Done with you</span>
            </div>
            <div className="funnel-right">
              <h3>DWY retainer</h3>
              <p>You have operators. We provide the framework, narrative strategy, playbook, and reporting. You manage day-to-day relationships.</p>
              <span className="funnel-price">$1,500–$2,500 / mo · 3-month minimum</span>
            </div>
          </div>

          <div className="funnel-step">
            <div className="funnel-left">
              <div className="funnel-num">Step 2B</div>
              <span className="funnel-tier tier-dfy">Done for you</span>
            </div>
            <div className="funnel-right">
              <h3>DFY retainer — the full program</h3>
              <p>We run everything. Sourcing, vetting, evaluation, narrative strategy, content guidance, targeted distribution, monthly trust signals report. You approve operators and review results.</p>
              <span className="funnel-price">$3,000–$5,000 / mo · 3–6 month minimum</span>
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
              <span className="funnel-price">Ongoing retainer · not a re-sell</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default FunnelSection;
