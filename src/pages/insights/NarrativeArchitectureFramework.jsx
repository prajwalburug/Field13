import { Link } from 'react-router-dom';
import Footer from '../../components/layout/Footer';

const NarrativeArchitectureFramework = () => {
  return (
    <>
      <article className="article-page">
        <div className="container container-narrow">
          <div className="article-meta">
            <span className="article-tag">Signal Strategy</span>
            <span className="article-topic">Narrative</span>
          </div>
            <h1 className="article-title">
              The System Behind Repeatable Ideas
            </h1>
            <div className="article-byline">FIELD13 — Framework</div>
          <div className="article-body">
            <h2 className="article-section-head">Observation</h2>
            <p>
              Most founders believe they need to publish more.
            </p>
            <p>
              They do not. They need to be associated with fewer, stronger ideas.
            </p>
            <p>
              This framework builds the structural layer between market intelligence and execution. It is how you ensure every piece reinforces the same position.
            </p>

            <h2 className="article-section-head">Framework</h2>

            <h3>Core Opinions</h3>
            <p>
              A core opinion is a belief about the market that your founder owns. It is not a feature. It is not a product announcement. It is a point of view that separates the founder from the category consensus.
            </p>
            <p>
              Strong core opinions share three properties:
            </p>
            <p>
              — They are arguable. Someone in the category would disagree.
            </p>
            <p>
              — They are specific. They apply to a defined set of buyers in a defined context.
            </p>
            <p>
              — They are ownable. No competitor is articulating the same opinion with the same conviction.
            </p>
            <p>
              Most founders have 1-2 core opinions already. They just have not extracted them. The exercise is surfacing what the founder already believes but has not said publicly.
            </p>

            <h3>The Story Bank</h3>
            <p>
              Each core opinion needs stories that prove it. A story bank is a living document of 10-12 narratives that the founder can deploy across any medium.
            </p>
            <p>
              Each story should have:
            </p>
            <p>
              — A specific situation (real customer, real moment).
            </p>
            <p>
              — A tension (something was broken, something was inefficient).
            </p>
            <p>
              — A resolution (how the situation changed).
            </p>
            <p>
              — A lesson (what this proves about the market).
            </p>
            <p>
              Stories are the proof layer of narrative architecture. Opinions establish the position. Stories make it believable.
            </p>

            <h3>The Message Map</h3>
            <p>
              Once the core opinions and story bank exist, build a message map. For each core opinion, define:
            </p>
            <p>
              — The LinkedIn version (one provocative sentence).
            </p>
            <p>
              — The newsletter version (200-300 words with a specific example).
            </p>
            <p>
              — The essay version (800-1200 words with full argument).
            </p>
            <p>
              — The podcast version (45-90 second oral version).
            </p>
            <p>
              — The sales version (how it comes up in a buyer conversation).
            </p>
            <p>
              One opinion. Five formats. The same narrative across every surface the founder touches.
            </p>

            <h2 className="article-section-head">Application</h2>
            <p>
              Extract one core opinion this week. Ask the founder what they believe about the market that competitors would disagree with. Write it as a single sentence. Then build the five-format message map for that one opinion.
            </p>
            <p>
              Repeat next week with the next opinion. Three opinions in three weeks is a narrative architecture.
            </p>

            <h2 className="article-section-head">FIELD13 Perspective</h2>
            <p>
              Most B2B companies spend months building content calendars.
            </p>
            <p>
              They should spend weeks building narrative architecture instead.
            </p>
            <p>
              A content calendar tells you what to publish. Narrative architecture tells you what to be known for. The first is logistics. The second is strategy. Markets reward strategy.
            </p>
            <p>
              At FIELD13 RevArc, we build full narrative architecture documents: positioning memo, core opinions, story banks, and message maps. Same structured approach we apply to revenue systems.
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
              <Link to="/insights/category-intelligence-brief" className="more-essays-item">
                <div className="more-essays-topic">Framework</div>
                <div className="more-essays-title">How to Map Your Competitive Narrative</div>
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

export default NarrativeArchitectureFramework;
