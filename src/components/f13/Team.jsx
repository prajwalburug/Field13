const founders = [
  {
    name: 'Prajwal',
    role: 'Founder',
    title: 'Builds the systems',
    photo: '/media/prajwal.jpg',
    alt: 'Portrait of Prajwal against a blue background',
    lead: 'Engineer by background. Designs each system around how your team works, builds it in your accounts and trains it with your people.',
    points: [
      { text: 'Finalist, AI Marketing Kombat (Season 1)', note: 'A UK competition where marketers solve brand briefs with AI. Final entry: a creative-performance dashboard whose AI summary checks every number it writes.' }
    ]
  },
  {
    name: 'Subhajit Dutta',
    role: 'Co-founder',
    title: 'Runs paid acquisition and funnels',
    photo: '/media/subhajit.jpg',
    alt: 'Subhajit Dutta speaking at a desk during an event',
    lead: 'In performance marketing since 2018. Builds what sits behind the ads: landing pages, Meta campaigns, WhatsApp and email follow-up. Knows which creative pays back, because the spend was his to answer for.',
    points: [
      { text: '7-figure Meta ad spend managed since 2023' },
      { text: '15,000+ leads generated for clients' },
      { text: 'FlexiFunnels Achievers Award' }
    ]
  }
];

const Team = () => {
  return (
    <section className="f13-sheet f13-sheet-graphite f13-team" id="founders">
      <div className="f13-wrap">
        <div className="f13-team-head">
          <div className="f13-label">Founders</div>
          <h2 className="f13-h2">Who we are</h2>
        </div>

        <div className="f13-team-grid">
          {founders.map((f) => (
            <article className="f13-person" key={f.name}>
              <div className="f13-person-photo">
                <img src={f.photo} alt={f.alt} loading="lazy" width="640" height="800" />
              </div>
              <div className="f13-person-body">
                <div className="f13-person-head">
                  <h3 className="f13-h3">{f.name}</h3>
                  <span className="f13-chip">{f.role}</span>
                </div>
                <div className="f13-person-title">{f.title}{f.subtitle && <span className="f13-person-subtitle">{f.subtitle}</span>}</div>
                <p className="f13-person-lead">{f.lead}</p>
                <ul className="f13-person-points">
                  {f.points.map((p) => (
                    <li key={p.text}>
                      <span>{p.text}</span>
                      {p.note && <small>{p.note}</small>}
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

export default Team;
