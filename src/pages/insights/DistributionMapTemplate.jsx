import { Link } from 'react-router-dom';
import Footer from '../../components/layout/Footer';

const DistributionMapTemplate = () => {
  return (
    <>
      <article className="article-page">
        <div className="container container-narrow">
          <div className="article-meta">
            <span className="article-tag">Signal Blueprint</span>
            <span className="article-topic">Distribution</span>
          </div>
            <h1 className="article-title">
              Where Your Ideas Belong
            </h1>
            <div className="article-byline">FIELD13 — Framework</div>
          <div className="article-body">
            <h2 className="article-section-head">Observation</h2>
            <p>
              Most founder media fails at distribution.
            </p>
            <p>
              The content is good. The audience is relevant. But the ideas never leave LinkedIn.
            </p>
            <p>
              Distribution is not promotion. It is placement. The question is not "how do I get more views." It is "where does my ICP already trust voices other than mine?"
            </p>

            <h2 className="article-section-head">Framework</h2>

            <h3>The Distribution Matrix</h3>
            <p>
              Every channel where your ICP spends time fits into a 2x2 matrix:
            </p>
            <p>
              — High reach, high trust: Communities (Slack, Discord), podcasts, newsletters.
            </p>
            <p>
              — High reach, low trust: Ad networks, sponsored content, most media.
            </p>
            <p>
              — Low reach, high trust: Private DMs, executive networks, invite-only groups.
            </p>
            <p>
              — Low reach, low trust: Aggregators, untargeted directories.
            </p>
            <p>
              The FIELD13 approach focuses on the top-left quadrant: high trust channels where your ICP already listens. These channels are harder to access but structurally more valuable.
            </p>

            <h3>Community Distribution</h3>
            <p>
              Identify the 5-10 communities where your ICP asks for advice. Not where they broadcast. Where they ask.
            </p>
            <p>
              For each community, define:
            </p>
            <p>
              — What topics are discussed most frequently.
            </p>
            <p>
              — What questions go unanswered.
            </p>
            <p>
              — What kind of content gets the strongest engagement.
            </p>
            <p>
              — Who the trusted voices are.
            </p>
            <p>
              The goal is not to post your content in these communities. The goal is to become a trusted voice in them. That happens through contributions, not links.
            </p>

            <h3>Podcast Distribution</h3>
            <p>
              Podcasts are the highest-leverage distribution channel for founder narrative. A 30-minute conversation communicates more narrative depth than 30 LinkedIn posts.
            </p>
            <p>
              Build a target list of 10-15 podcasts in your category. Prioritize by:
            </p>
            <p>
              — Host credibility with your ICP.
            </p>
            <p>
              — Episode format (interview format over monologue).
            </p>
            <p>
              — Audience size and engagement.
            </p>
            <p>
              — Guest history (do they host competitors?).
            </p>
            <p>
              Pitch with a narrative angle, not a product pitch. "I believe [core opinion about the category]" is a stronger pitch than "I'm the CEO of [company] and we do [feature]."
            </p>

            <h2 className="article-section-head">Application</h2>
            <p>
              This week, identify three communities where your ICP asks for advice. Spend 15 minutes per day reading the conversations. Do not post. Just listen.
            </p>
            <p>
              Next week, answer one question in each community with genuine insight. No link to your product. No signature. Just a helpful response from a practitioner.
            </p>
            <p>
              Distribution starts with contribution. The link comes later.
            </p>

            <h2 className="article-section-head">FIELD13 Perspective</h2>
            <p>
              Most companies treat distribution as a growth channel.
            </p>
            <p>
              It is not. Distribution is a credibility channel.
            </p>
            <p>
              Every time your founder shows up in a community and adds value, they earn a unit of trust. That trust converts to pipeline eventually. But if you optimize for pipeline, you will optimize away the trust. Show up to contribute. The pipeline is a side effect.
            </p>
            <p>
              At FIELD13 RevArc, we build full distribution maps: channel matrices, community engagement schedules, newsletter partnerships, and weekly execution plans. Same structured approach, applied to revenue systems.
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
              <Link to="/insights/narrative-architecture-framework" className="more-essays-item">
                <div className="more-essays-topic">Framework</div>
                <div className="more-essays-title">The System Behind Repeatable Ideas</div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DistributionMapTemplate;
