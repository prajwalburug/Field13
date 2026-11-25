const founders = [
  {
    name: 'Prajwal',
    role: 'Founder',
    title: 'Builds AI growth systems',
    photo: '/media/prajwal.jpg',
    alt: 'Portrait of Prajwal against a blue background',
    lead: 'Works where marketing, sales and engineering usually hand off, and builds the system so they never have to.',
    points: [
      {
        text: 'Finalist, AI Marketing Kombat (Season 1)',
        note: 'A UK competition where marketers solve brand briefs with AI, judged round by round. His final entry: a creative-performance dashboard whose AI summary checks every number it writes.'
      },
      { text: 'Ships outbound, lead-gen and AI UGC pipelines in Claude Code, Clay, HubSpot and treg' },
      { text: 'Electronics engineer by training. Reads the API docs before the landing page.' }
    ]
  },
  {
    name: 'Subhajit Dutta',
    role: 'Co-founder',
    title: 'Runs paid acquisition and funnels',
    photo: '/media/subhajit.jpg',
    alt: 'Subhajit Dutta speaking at a desk during an event',
    lead: 'Seven figures of Meta spend since 2023. Knows which creative pays back and which only collects likes.',
    points: [
      { text: '7-figure Meta ad spend managed since 2023' },
      { text: 'FlexiFunnels Achievers Award' }
    ]
  }
];

const Founders = () => {
  return (
    <section className="founders-section" id="founders">
      <div className="container">
        <div className="founders-intro">
          <div>
            <div className="section-label">Who you work with</div>
            <h2 className="problem-headline">
              Two founders. <em>Both sides of growth.</em>
            </h2>
          </div>
          <p className="founders-lede">
            One of us builds the systems. The other makes ad spend pay back. You get engineering and media buying in the same room, with senior AI engineers behind both.
          </p>
        </div>

        <div className="founders-grid">
          {founders.map((f) => (
            <article className="founder" key={f.name}>
              <div className="founder-photo">
                <img src={f.photo} alt={f.alt} loading="lazy" width="640" height="800" />
              </div>
              <div className="founder-body">
                <div className="founder-head">
                  <h3 className="founder-name">{f.name}</h3>
                  <span className="founder-role">{f.role}</span>
                </div>
                <div className="founder-title">{f.title}</div>
                <p className="founder-lead">{f.lead}</p>
                <ul className="founder-points">
                  {f.points.map((p) => (
                    <li key={p.text}>
                      <span>{p.text}</span>
                      {p.note && <span className="founder-note">{p.note}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;
