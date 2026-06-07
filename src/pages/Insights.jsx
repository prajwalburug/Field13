import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';

const articles = [
  {
    slug: 'the-end-of-brand-marketing',
    title: 'The End of Brand Marketing',
    topic: 'Future of B2B Buying',
    summary: 'How trust became the new acquisition channel.'
  },
  {
    slug: 'why-communities-beat-campaigns',
    title: 'Why Communities Beat Campaigns',
    topic: 'Dark Funnel',
    summary: 'The most effective GTM happens in places you cannot track.'
  },
  {
    slug: 'founder-media-is-the-new-abm',
    title: 'Founder Media Is the New ABM',
    topic: 'Founder Media',
    summary: 'One founder post can generate more pipeline than an entire quarter of ABM.'
  },
  {
    slug: 'signal-in-a-noisy-market',
    title: 'Signal in a Noisy Market',
    topic: 'Future of GTM',
    summary: 'In a market where everyone shouts, the winning strategy is to become the signal.'
  },
];

const Insights = () => {
  return (
    <>
      <section className="hero insights-hero">
        <div className="container">
          <div className="section-label">Latest research</div>
          <h1 className="hero-headline">
            Research on the future of B2B GTM.
          </h1>
          <p className="hero-sub">
            Essays on founder media, dark funnel, community GTM, and the signals that build market trust.
          </p>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="insights-grid">
            {articles.map((a) => (
              <Link to={`/insights/${a.slug}`} className="insight-card insight-link" key={a.slug}>
                <div className="insight-topic">{a.topic}</div>
                <h3 className="insight-title">{a.title}</h3>
                <p className="insight-summary">{a.summary}</p>
                <div className="insight-read">Read →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="cta-section">
        <div className="container container-narrow">
          <div className="section-label">Newsletter</div>
          <h2 className="cta-headline">Get the latest research.</h2>
          <p className="cta-sub">Essays on the future of B2B GTM delivered to your inbox.</p>
          <div className="cta-actions">
            <a href="https://cal.com/field13-r657gn/45min" className="btn-primary" target="_blank" rel="noopener noreferrer">Subscribe →</a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Insights;
