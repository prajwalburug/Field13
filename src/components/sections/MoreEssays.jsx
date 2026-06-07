import { Link } from 'react-router-dom';

const allArticles = [
  { slug: 'the-end-of-brand-marketing', title: 'The End of Brand Marketing', topic: 'Future of B2B Buying' },
  { slug: 'why-communities-beat-campaigns', title: 'Why Communities Beat Campaigns', topic: 'Dark Funnel' },
  { slug: 'founder-media-is-the-new-abm', title: 'Founder Media Is the New ABM', topic: 'Founder Media' },
  { slug: 'signal-in-a-noisy-market', title: 'Signal in a Noisy Market', topic: 'Future of GTM' },
];

const MoreEssays = ({ currentSlug }) => {
  const others = allArticles.filter((a) => a.slug !== currentSlug);

  return (
    <section className="more-essays">
      <div className="container container-narrow">
        <div className="section-label">More essays</div>
        <div className="more-essays-list">
          {others.map((a) => (
            <Link to={`/insights/${a.slug}`} className="more-essays-item" key={a.slug}>
              <div className="more-essays-topic">{a.topic}</div>
              <div className="more-essays-title">{a.title}</div>
            </Link>
          ))}
        </div>
        <div className="more-essays-cta">
          <Link to="/insights">View all essays →</Link>
        </div>
      </div>
    </section>
  );
};

export default MoreEssays;
