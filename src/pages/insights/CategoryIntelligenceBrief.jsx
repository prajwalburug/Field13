import { Link } from 'react-router-dom';
import Footer from '../../components/layout/Footer';

const CategoryIntelligenceBrief = () => {
  return (
    <>
      <article className="article-page">
        <div className="container container-narrow">
          <div className="article-meta">
            <span className="article-tag">Signal Strategy</span>
            <span className="article-topic">Market Intelligence</span>
          </div>
            <h1 className="article-title">
              How to Map Your Competitive Narrative
            </h1>
            <div className="article-byline">FIELD13 — Framework</div>
          <div className="article-body">
            <h2 className="article-section-head">Observation</h2>
            <p>
              Most B2B companies think they are losing because of product differentiation.
            </p>
            <p>
              They are actually losing because someone else owns the narrative.
            </p>
            <p>
              Every B2B category has a narrative landscape. Some companies own parts of it. Most are invisible within it. The difference is rarely product quality. It is almost always narrative clarity.
            </p>
            <p>
              This framework maps competitive narratives and finds whitespace in any B2B category.
            </p>

            <h2 className="article-section-head">Framework</h2>

            <h3>Define</h3>
            <p>
              Most founders define their category by what their product does. This is the wrong starting point. Define the category by what your buyer is trying to accomplish.
            </p>
            <p>
              A security company might say they compete in "cloud security." But the buyer is trying to "ship code without getting hacked." Those are different categories. One is feature-defined. The other is outcome-defined.
            </p>
            <p>
              Write a one-sentence category definition that starts with: "We help [buyer] achieve [outcome]."
            </p>

            <h3>Map</h3>
            <p>
              Every competitor in your category has a narrative position. Some are explicit. Most are accidental. Map them by answering three questions per competitor:
            </p>
            <p>
              — What problem do they claim is the most important in the category?
            </p>
            <p>
              — What solution do they claim is the only real answer?
            </p>
            <p>
              — What evidence do they use to prove it?
            </p>
            <p>
              Most competitors cluster around the same problem and the same solution. This is the cluster.
            </p>
            <div className="article-standout">
              Companies inside the cluster<br />
              compete on features and price.
            </div>
            <div className="article-standout">
              Companies outside the cluster<br />
              compete on narrative.
            </div>

            <h3>Find</h3>
            <p>
              Whitespace is a narrative position that no competitor is defending. It is not a feature gap. It is a story gap. A belief that nobody else is articulating. An opinion that would differentiate your founder if they were the one saying it.
            </p>
            <p>
              Narrative whitespace is rarely discovered by looking at competitors.
            </p>
            <p>
              It is discovered by listening to customers.
            </p>
            <p>
              The market often tells you what it wishes existed before a company ever builds it.
            </p>
            <p>
              Whitespace appears in three forms:
            </p>
            <p>
              — A problem that competitors are ignoring.
            </p>
            <p>
              — A solution that contradicts the category consensus.
            </p>
            <p>
              — A buyer that competitors are under-serving.
            </p>

            <h3>Own</h3>
            <p>
              Once you have the category definition, competitor map, and whitespace, build a single narrative position. It should fit in one sentence:
            </p>
            <p>
              "Unlike [competitor cluster], we believe [whitespace opinion], which is why we [differentiated approach]."
            </p>
            <p>
              This sentence becomes the anchor for every piece of founder media. Every LinkedIn post. Every newsletter. Every podcast. Every essay. It is the position the founder will repeat until the market associates it with their name.
            </p>

            <h2 className="article-section-head">Application</h2>
            <p>
              Map three competitors this week using the three questions above. Identify one whitespace opinion that none of them are articulating. Write your narrative position sentence.
            </p>
            <p>
              That sentence is your starting point. Everything else is repetition and distribution.
            </p>

            <h2 className="article-section-head">FIELD13 Perspective</h2>
            <p>
              The market does not remember hundreds of posts.
            </p>
            <p>
              It remembers one repeated idea.
            </p>
            <p>
              Your job is not to publish more.
            </p>
            <p>
              Your job is to own one narrative so completely that buyers repeat it for you.
            </p>
            <p>
              The companies that own the narrative rarely have the best product. They have the clearest point of view.
            </p>
            <p>
              At FIELD13 RevArc, we apply this framework at depth: competitor narrative audits, conversation analysis, and positioning that defines how you show up. Same structured thinking, applied to revenue systems.
            </p>
            <p>
              If you want this done for your business.
            </p>
          </div>
        </div>
      </article>
      <section className="cta-section">
        <div className="container container-narrow">
          <h2 className="cta-headline">Book your <em>free Process Check</em></h2>
          <p className="cta-sub">30 minutes. 3 fixes guaranteed. No pitch, no commitment.</p>
          <div className="cta-actions">
            <a href="https://cal.com/field13-r657gn/45min" className="btn-primary" target="_blank" rel="noopener noreferrer">Book your free Process Check →</a>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="more-essays">
            <div className="section-label">More Resources</div>
            <div className="more-essays-list">
              <Link to="/insights/narrative-architecture-framework" className="more-essays-item">
                <div className="more-essays-topic">Framework</div>
                <div className="more-essays-title">The System Behind Repeatable Ideas</div>
              </Link>
              <Link to="/insights/distribution-map-template" className="more-essays-item">
                <div className="more-essays-topic">Blueprint</div>
                <div className="more-essays-title">Where Your Ideas Belong</div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CategoryIntelligenceBrief;
