import { Link, Navigate, useParams } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import PageHero from '../components/f13/PageHero';
import Ugc from '../components/f13/Ugc';
import FinalCta from '../components/f13/FinalCta';
import SystemLoop from '../components/f13/SystemLoop';
import { CAL_LINK } from '../data/site';
import { getSystem } from '../data/systems';

/* One template for every system page, so the four read as one product family. */
const SystemPage = () => {
  const { slug } = useParams();
  const s = getSystem(slug);
  if (!s) return <Navigate to="/" replace />;

  return (
    <>
      <PageHero tag={s.name} eyebrow={s.hero.eyebrow} title={s.hero.title} lede={s.hero.lede}>
        <div className="f13-actions">
          <a href={CAL_LINK} className="f13-btn f13-btn-blue" target="_blank" rel="noopener noreferrer">Talk to the founders</a>
          <a href="#ships" className="f13-btn f13-btn-ghost">See what ships</a>
        </div>
      </PageHero>

      {/* The pain, as the buyer lives it today vs with the engine */}
      <section className="f13-sheet f13-sheet-bone sp-problem">
        <div className="f13-wrap">
          <div className="sp-head">
            <div>
              <div className="f13-label">The problem</div>
              <h2 className="f13-h2">{s.problem.title}</h2>
            </div>
            <p className="f13-lede">{s.problem.lede}</p>
          </div>
          <div className="sp-compare" role="table" aria-label={`Without Field13 vs with the ${s.name} system`}>
            <div className="sp-compare-row sp-compare-headrow" role="row">
              <span role="columnheader" />
              <span role="columnheader">Today</span>
              <span role="columnheader">With the engine</span>
            </div>
            {s.problem.rows.map((r) => (
              <div className="sp-compare-row" role="row" key={r.topic}>
                <span className="sp-topic" role="rowheader">{r.topic}</span>
                <span className="sp-before" role="cell">{r.before}</span>
                <span className="sp-after" role="cell">{r.after}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What ships */}
      <section className="f13-sheet f13-sheet-black sp-ships" id="ships">
        <div className="f13-wrap">
          <div className="sp-head">
            <div>
              <div className="f13-label">What ships</div>
              <h2 className="f13-h2">Finished work, <em>not a tool to learn.</em></h2>
            </div>
            <p className="f13-lede">Built inside your own accounts and run by us every month. You approve. We do the rest.</p>
          </div>
          <div className="sp-ship-grid">
            {s.deliverables.map((d, i) => (
              <article className="sp-ship" key={d.name}>
                <span className="sp-ship-n">0{i + 1}</span>
                <h3 className="f13-h3">{d.name}</h3>
                <p className="f13-body">{d.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      {s.showUgc ? (
        <Ugc />
      ) : (
        <section className="f13-sheet f13-sheet-bone sp-how">
          <div className="f13-wrap">
            <div className="sp-head">
              <div>
                <div className="f13-label">How it runs</div>
                <h2 className="f13-h2">One pipeline. <em>Nothing ships without your yes.</em></h2>
              </div>
            </div>
            <ol className="sp-steps">
              {s.steps.map((st, i) => (
                <li key={st.name}>
                  <span className="sp-step-n">0{i + 1}</span>
                  <strong>{st.name}</strong>
                  <span>{st.body}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Proof the buyer can check + where it sits in the loop */}
      <section className="f13-sheet f13-sheet-black sp-check">
        <div className="f13-wrap">
          <div className="sp-check-grid">
            <div>
              <div className="f13-label">How you check it</div>
              <h2 className="f13-h2">Don’t take our word for it. <em>Look in your own accounts.</em></h2>
              <a href="/#guarantees" className="f13-textlink sp-guar-link">Plus our three guarantees →</a>
            </div>
            <ul className="sp-checks">
              {s.checks.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>

          <div className="sp-loop">
            <div className="f13-label">Where it fits</div>
            <SystemLoop current={s.slug} tone="black" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="f13-sheet f13-sheet-bone sp-faq">
        <div className="f13-wrap sp-faq-grid">
          <div>
            <div className="f13-label">Questions</div>
            <h2 className="f13-h2">What people <em>ask first.</em></h2>
          </div>
          <div className="sp-faq-list">
            {s.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>
                  {f.a}
                  {f.link && <> <Link to={f.link.to} className="f13-textlink">{f.link.label} →</Link></>}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
      <Footer />
    </>
  );
};

export default SystemPage;
