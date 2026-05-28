const useCases = [
  {
    label: "01 — Content library",
    title: "Expert-generated content that stays yours",
    body: "Long-form thought leadership, detailed workflow guides, and honest product breakdowns from operators who genuinely use your tool. This content lives on your site, builds SEO authority, and converts readers who are past the awareness stage.",
  },
  {
    label: "02 — Paid ads",
    title: "Social proof that actually performs",
    body: "Real operator testimonials and use-case snippets cut through ad blindness. No studio production, no scripted actors — just credible practitioner voices. These outperform traditional ad creative across Meta, LinkedIn, and programmatic.",
  },
  {
    label: "03 — Sales materials",
    title: "Case studies buyers actually read",
    body: "Your sales team gets battle cards, comparison perspectives, and narrative frameworks built from real operator experience. Not another PDF — content that gives your reps credible third-party proof to share mid-deal.",
  },
  {
    label: "04 — Social distribution",
    title: "Clips that compound across channels",
    body: "Long-form operator content gets clipped into short-form posts for LinkedIn, X, and YouTube Shorts via our vetted clipper network. One deep-drive becomes a month of distribution — without your team lifting a finger.",
  },
  {
    label: "05 — Community presence",
    title: "The voice in the room when it matters",
    body: "Your operators show up naturally in the Slack groups, LinkedIn threads, and subreddits where your buyers ask for recommendations. Not pushing your product — being the credible answer when the question gets asked.",
  },
  {
    label: "06 — Product education",
    title: "Adoption paths that feel human",
    body: "Walkthroughs, migration stories, and workflow comparisons from operators who actually onboarded. This is the content that gets shared internally when a team is evaluating — because it answers the real questions your docs don't.",
  },
];

const UseCasesSection = () => {
  return (
    <section className="use-cases-section">
      <div className="container">
        <div className="how-eyebrow">What operator content unlocks</div>
        <h2 className="how-intro">
          Every piece of operator content does double duty — it builds your library, feeds your channels, and arms your sales team. All from one honest voice.
        </h2>
        <div className="use-cases-grid">
          {useCases.map((item) => (
            <div key={item.label} className="use-case-card">
              <div className="use-case-label">{item.label}</div>
              <div className="use-case-title">{item.title}</div>
              <p className="use-case-body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
