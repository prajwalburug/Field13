import Footer from '../components/layout/Footer';
import PageHero from '../components/f13/PageHero';
import Team from '../components/f13/Team';
import FinalCta from '../components/f13/FinalCta';
import Guarantees from '../components/f13/Guarantees';

const disciplines = [
  { name: 'AI engineering', body: 'Agent orchestration, retrieval, checks and guardrails. Sets the architecture on every engagement.', skills: 'LangGraph · LangChain · RAG · Evals' },
  { name: 'GTM and data', body: 'Signals, enrichment, CRM and ad-platform integrations, scraping pipelines and the revenue model behind every dashboard.', skills: 'HubSpot · Clay · treg · Postgres' },
  { name: 'Creative engineering', body: 'UGC and ad creative made by pipeline, so variants, captions and formats come from one system instead of an editing queue.', skills: 'Seedance · Remotion · Zernio' },
  { name: 'Platform and product', body: 'Infrastructure, monitoring and cost controls in your cloud, plus the dashboards and tools your team actually uses.', skills: 'FastAPI · Next.js · Docker' }
];

const About = () => {
  return (
    <>
      <PageHero
        tag="About"
        eyebrow="Who we are"
        title={<>Plenty of teams have an AI demo.<br /><em>Few have one that runs every Monday.</em></>}
        lede="Field13 gets it there and keeps it running. Two founders: one builds the systems, the other has spent the ad budgets."
      />

      <Team />

      <Guarantees />

      <section className="f13-sheet f13-sheet-graphite">
        <div className="f13-wrap">
          <div className="f13-split-head">
            <div>
              <div className="f13-label">The system, by layer</div>
              <h2 className="f13-h2">Agents, data, creative, infrastructure.<br /><em>One system on your account.</em></h2>
            </div>
            <p className="f13-lede">Four layers, built to work together inside your accounts. When your scope grows, we extend the system instead of adding people you have to manage.</p>
          </div>
          <div className="f13-cards f13-cards-4">
            {disciplines.map((d, i) => (
              <div className="f13-card" key={d.name}>
                <span className="f13-card-n">0{i + 1}</span>
                <h3 className="f13-h3">{d.name}</h3>
                <p>{d.body}</p>
                <div className="f13-card-skills">{d.skills}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
      <Footer />
    </>
  );
};

export default About;
