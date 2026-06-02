const PricingSection = () => {
  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <div className="how-eyebrow">Pricing</div>
        <h2 className="how-intro">One program. <br /><em>Two entry points.</em></h2>
        <p className="pricing-intro">Every engagement starts with a fit conversation. The strategy sprint is your low-risk way in — credited if you proceed.</p>
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-label">Entry point</div>
            <div className="pricing-name">Strategy sprint</div>
            <div className="pricing-amt">$1,500 – $2,500</div>
            <div className="pricing-term">One-time · 90 min + written brief</div>
            <p className="pricing-desc">The thinking that makes any retainer work. You leave with a written strategy brief and operator shortlist — whether or not you continue.</p>
            <ul className="pricing-items">
              <li>Buyer profile + trust landscape</li>
              <li>2–3 narrative angles with rationale</li>
              <li>Operator shortlist (5–8 candidates)</li>
              <li>90-day program roadmap</li>
              <li>Honest fit assessment</li>
            </ul>
            <div className="pricing-credit">Credited toward month 1 of DFY retainer</div>
            <a href="https://tally.so/r/gDkVdN" target="_blank" rel="noopener noreferrer" className="pricing-cta">Start here →</a>
          </div>

          <div className="pricing-card pricing-featured">
            <div className="pricing-label">Flagship program</div>
            <div className="pricing-name">Done for you</div>
            <div className="pricing-amt">$3,000 – $5,000 / mo</div>
            <div className="pricing-term">3–6 month minimum · monthly retainer</div>
            <p className="pricing-desc">We run the full program. You approve operators and review results. Everything below is included at no extra cost.</p>
            <ul className="pricing-items">
              <li>Operator sourcing, vetting + onboarding</li>
              <li>Narrative strategy before content begins</li>
              <li>Weekly content guidance (operator's voice)</li>
              <li>Targeted distribution — named communities</li>
              <li>Monthly trust signals report</li>
              <li>Month 5 renewal + expansion review</li>
            </ul>
            <div className="pricing-stack-note">Perceived value of components: $15,000+</div>
            <a href="https://tally.so/r/gDkVdN" target="_blank" rel="noopener noreferrer" className="pricing-cta">See if you're a fit →</a>
          </div>
        </div>
        <p className="pricing-note">We take on 2–3 new clients per quarter. If we can't move the needle, we'll tell you why. <a href="https://tally.so/r/gDkVdN" style={{color: 'var(--ink)'}}>Fill in the fit form →</a></p>
      </div>
    </section>
  );
};
export default PricingSection;
