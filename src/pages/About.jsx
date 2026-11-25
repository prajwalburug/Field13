import Footer from '../components/layout/Footer';
import PageHero from '../components/f13/PageHero';
import Team from '../components/f13/Team';
import FinalCta from '../components/f13/FinalCta';
import Guarantees from '../components/f13/Guarantees';

const disciplines = [
  { name: 'Creators', body: 'Finding, vetting and briefing creators who fit your brand, with every conversation and deal tracked in one place.', skills: 'Creator search · Outreach · Briefs' },
  { name: 'Production', body: 'Hooks, scripts, UGC-style video, edits, captions and sizes from one pipeline, so editors spend their time on the cuts that need them.', skills: 'Seedance · Nano Banana · ElevenLabs · Remotion' },
  { name: 'Posting and testing', body: 'Organic posts and paid tests on Meta and TikTok, launched as variants so every hook gets a fair test.', skills: 'Meta · TikTok · Zernio' },
  { name: 'Scoreboard', body: 'Every ad tagged and ranked, tired ads flagged, and the next brief written from what won.', skills: 'Your ad accounts · Analytics · Claude' }
];

const About = () => {
  return (
    <>
      <PageHero
        tag="About"
        eyebrow="Who we are"
        title={<>Plenty of teams can make one AI ad.<br /><em>Few ship good ones every week.</em></>}
        lede="Field13 builds the engine that gets you there, then runs it with you. Two founders: one builds the creative systems, the other has spent the ad budgets."
      />

      <Team />

      <Guarantees />

      <section className="f13-sheet f13-sheet-graphite">
        <div className="f13-wrap">
          <div className="f13-split-head">
            <div>
              <div className="f13-label">The system, by layer</div>
              <h2 className="f13-h2">Creators, production, testing, learning.<br /><em>One system on your accounts.</em></h2>
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
