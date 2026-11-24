import { useState } from 'react';
import { Link } from 'react-router-dom';
import { allContent, allTags } from '../data/content';
import Footer from '../components/layout/Footer';
import PageHero from '../components/f13/PageHero';

const Insights = () => {
  const [activeTag, setActiveTag] = useState(null);
  const filtered = activeTag ? allContent.filter((c) => c.tags.includes(activeTag)) : allContent;

  return (
    <>
      <PageHero
        tag="Insights"
        eyebrow="Notes from the work"
        title={<>Field notes on growth,<br /><em>systems and distribution.</em></>}
        lede="Short essays and frameworks from the problems we see every week. Pick the one that's slowing you down."
      />

      <section className="f13-sheet f13-sheet-bone">
        <div className="f13-wrap">
          <div className="f13-filters" role="group" aria-label="Filter by topic">
            <button type="button" className={`f13-filter${activeTag === null ? ' is-active' : ''}`} onClick={() => setActiveTag(null)}>All</button>
            {allTags.map((tag) => (
              <button type="button" key={tag} className={`f13-filter${activeTag === tag ? ' is-active' : ''}`} onClick={() => setActiveTag(tag)}>{tag}</button>
            ))}
          </div>

          <div className="f13-posts">
            {filtered.map((a, i) => (
              <Link to={`/insights/${a.slug}`} className="f13-post" key={a.slug}>
                <div className="f13-post-top">
                  <span className="f13-post-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="f13-chip">{a.tags[0]}</span>
                </div>
                <h3 className="f13-h3">{a.title}</h3>
                <p>{a.summary}</p>
                <span className="f13-post-read">{a.readTime || '5 min read'} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="f13-sheet f13-sheet-graphite">
        <div className="f13-wrap f13-split-head" style={{ marginBottom: 0 }}>
          <div>
            <div className="f13-label">Or skip the reading</div>
            <h2 className="f13-h2">Score your AI readiness<br /><em>in five minutes.</em></h2>
          </div>
          <div>
            <p className="f13-lede">The same scorecard we start every Discovery with, as a free self-assessment. Your score and three fixes go straight to your inbox.</p>
            <div className="f13-actions"><Link to="/process-check" className="f13-btn f13-btn-light">Take the assessment</Link></div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Insights;
