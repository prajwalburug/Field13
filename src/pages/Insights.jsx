import { useState } from 'react';
import { Link } from 'react-router-dom';
import { allContent, allTags, scorecardContent } from '../data/content';
import Footer from '../components/layout/Footer';

const Insights = () => {
  const [activeTag, setActiveTag] = useState(null);

  const filtered = activeTag
    ? allContent.filter((c) => c.tags.includes(activeTag))
    : allContent;

  return (
    <>
      <section className="hero insights-hero">
        <div className="container">
          <div className="section-label">Resources</div>
          <h1 className="hero-headline">
            Free resources for the problems <em>we see every week.</em>
          </h1>
          <p className="hero-sub">
            Organized by the pain point, not the feature. Pick what is actually slowing you down.
          </p>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="tags-bar">
            <button
              className={`tag-pill${activeTag === null ? ' active' : ''}`}
              onClick={() => setActiveTag(null)}
            >All</button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`tag-pill${activeTag === tag ? ' active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >{tag}</button>
            ))}
          </div>
          <div className="insights-grid insights-grid-2col">
            {filtered.map((a) => (
              <Link to={`/insights/${a.slug}`} className="insight-card insight-link" key={a.slug}>
                <div className="insight-topic">{a.tags[0]}</div>
                <h3 className="insight-title">{a.title}</h3>
                <p className="insight-summary">{a.summary}</p>
                <div className="insight-read">{a.readTime || '5 min read'} →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="scorecard-section">
        <div className="container container-narrow">
          <div className="section-label">Or skip the reading</div>
          <h2 className="cta-headline">
            Get the <em>5-dimension scorecard</em>
          </h2>
          <p className="cta-sub">
            The same scorecard we use on every client, as a free self-assessment you can run today.
          </p>
          <div className="cta-actions">
            <a href="https://cal.com/field13-r657gn/45min" className="btn-primary" target="_blank" rel="noopener noreferrer">
              Book your free Process Check →
            </a>
          </div>
        </div>
      </section>
      <section className="cta-section cta-section-dark">
        <div className="container container-narrow">
          <h2 className="cta-headline">Book your <em>free Process Check</em></h2>
          <p className="cta-sub">3 fixes or it is on us. No pitch, no commitment.</p>
          <div className="cta-actions">
            <a href="https://cal.com/field13-r657gn/45min" className="btn-primary" target="_blank" rel="noopener noreferrer">
              Book your free Process Check →
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Insights;
