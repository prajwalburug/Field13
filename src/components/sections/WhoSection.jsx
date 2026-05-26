const WhoSection = () => {
  return (
    <section id="who">
      <div className="container">
        <div className="how-eyebrow">Who it's for</div>
        <h2 className="how-intro">Built for B2B companies where the buying decision hinges on whether someone credible has said it works.</h2>
        <div className="who-grid">
          <div className="who-card">
            <div className="who-tag">Primary</div>
            <div className="who-title">GTM · RevOps · Sales tech</div>
            <p className="who-desc">
              The most crowded, most skeptical category in B2B. Your buyers — ops leads, revenue operators — have been burned by overpromised tools. They don't read your blog. They ask their peers.
            </p>
          </div>
          <div className="who-card">
            <div className="who-tag">Primary</div>
            <div className="who-title">AI-native B2B tools</div>
            <p className="who-desc">
              Hundreds of tools, identical claims. Operator validation is the only signal that actually cuts through. One credible practitioner saying your tool changed their workflow outweighs every piece of content you could produce.
            </p>
          </div>
          <div className="who-card">
            <div className="who-tag">Strong fit</div>
            <div className="who-title">Developer tools · Infra</div>
            <p className="who-desc">
              Developers ignore traditional marketing on principle. A real builder publicly advocating for your tool in their community is worth more than any campaign you could run.
            </p>
          </div>
          <div className="who-card">
            <div className="who-tag">Strong fit</div>
            <div className="who-title">Workflow · Productivity SaaS</div>
            <p className="who-desc">
              Operator walkthroughs drive more adoption in this category than anything else. The market is noisy, and seeing a genuine workflow transformation is the only content that actually converts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoSection;
