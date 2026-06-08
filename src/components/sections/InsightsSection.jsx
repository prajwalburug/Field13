import { Link } from 'react-router-dom';

const insights = [
  {
    title: 'The End of Brand Marketing',
    topic: 'Future of B2B Buying',
    summary: 'How trust became the new acquisition channel.'
  },
  {
    title: 'Why Communities Beat Campaigns',
    topic: 'Dark Funnel',
    summary: 'The most effective GTM happens in places you cannot track.'
  },
  {
    title: 'Founder Media Is the New ABM',
    topic: 'Founder Media',
    summary: 'One founder post can generate more pipeline than an entire quarter of ABM.'
  },
  {
    title: 'Signal in a Noisy Market',
    topic: 'Future of GTM',
    summary: 'In a market where everyone shouts, the winning strategy is to become the signal.'
  },
];

const InsightsSection = () => {
  return (
    <section id="insights">
      <div className="container">
        <div className="section-label">Field Notes</div>
        <div className="insights-grid">
          {insights.map((item, i) => (
            <Link to={`/insights/${item.title.toLowerCase().replace(/\s+/g, '-')}`} className="insight-card insight-link" key={i}>
              <div className="insight-topic">{item.topic}</div>
              <h3 className="insight-title">{item.title}</h3>
              <p className="insight-summary">{item.summary}</p>
              <div className="insight-read">Read →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
