import Footer from '../components/layout/Footer';
import PageHero from '../components/f13/PageHero';
import FinalCta from '../components/f13/FinalCta';
import { CAL_LINK } from '../data/site';

// Why it works for an agency: the leverage is the system, not extra people.
const leverage = [
  { name: 'Built once, used by every client', body: 'The platform runs on your domain. Every new client logs into the same system, so client ten costs you far less effort than client one.' },
  { name: 'Nothing to hire', body: "No engineers to recruit or manage. The systems are built, monitored and fixed for you, behind your brand." },
  { name: 'Your price, your margin', body: 'You bill your clients directly and set your own price. We invoice you. We go through the numbers on a partner call.' },
  { name: 'Or just refer', body: "Rather not resell? Introduce a client, we contract with them directly, and you earn a referral fee." }
];

const pack = [
  { name: 'NDA and non-solicit', body: 'Mutual NDA before any client details are shared. We never approach your clients for 12 months after we stop working together.' },
  { name: 'Your brand, everywhere', body: 'Every report, dashboard and walkthrough carries your branding. We only ever speak to your client as part of your team.' },
  { name: 'Written response times', body: 'Response and fix times in writing, with the same monitoring guarantees our direct clients get.' },
  { name: 'Data stays theirs', body: "Accounts stay in your client's name or yours. Client data is never used to train models, and is returned or deleted on exit." }
];

const Agencies = () => {
  return (
    <>
      <PageHero
        tag="Agencies"
        eyebrow="Partner with Field13"
        title={<>Your clients are asking for AI.<br /><em>Sell it under your name. We build it.</em></>}
        lede="Give your clients AI systems under your own brand, without hiring anyone to build them. We build them, run them and stay invisible to your clients."
      >
        <div className="f13-actions">
          <a href={CAL_LINK} className="f13-btn f13-btn-blue" target="_blank" rel="noopener noreferrer">Book a partner call</a>
          <a href="#options" className="f13-btn f13-btn-ghost">See the two options</a>
        </div>
      </PageHero>

      <section className="f13-sheet f13-sheet-bone" id="options">
        <div className="f13-wrap">
          <div className="f13-section-head">
            <div className="f13-label">Two ways to partner</div>
            <h2 className="f13-h2">Give your clients a platform,<br /><em>or give them our systems.</em></h2>
          </div>

          <div className="f13-options">
            <article className="f13-option">
              <span className="f13-chip">Option 01</span>
              <h3 className="f13-h3"><em>White-label client platform</em></h3>
              <p>Your agency's own marketing platform, with your name on it. You give it to your clients as your product.</p>
              <ol className="f13-wl-steps">
                <li><span>1</span><div><strong>We build it on your domain.</strong> Your logo, your colours, app.youragency.com.</div></li>
                <li><span>2</span><div><strong>Your clients log in.</strong> Posting to 16 networks, one inbox for DMs and comments, ads on 9 platforms, branded reports.</div></li>
                <li><span>3</span><div><strong>AI agents do the busywork.</strong> Drafting posts, answering the inbox and writing the monthly report.</div></li>
                <li><span>4</span><div><strong>You bill them, we stay invisible.</strong> We keep it running and never contact your clients.</div></li>
              </ol>
              <div className="f13-option-foot">
                <span>Scoped on a partner call</span>
                <a href={CAL_LINK} className="f13-btn f13-btn-blue f13-btn-sm" target="_blank" rel="noopener noreferrer">Talk to us</a>
              </div>
            </article>

            <article className="f13-option">
              <span className="f13-chip">Option 02</span>
              <h3 className="f13-h3"><em>Resell our systems</em></h3>
              <p>We build and run AI UGC, content, outreach and reporting systems for your clients, under your brand.</p>
              <ol className="f13-wl-steps">
                <li><span>1</span><div><strong>You bring the client.</strong> We scope the system together on a joint call.</div></li>
                <li><span>2</span><div><strong>We build and run it.</strong> Same systems, same checks and the same guarantees our direct clients get.</div></li>
                <li><span>3</span><div><strong>You set the price.</strong> You bill your client directly. We invoice you.</div></li>
              </ol>
              <div className="f13-option-foot">
                <span>Scoped on a partner call</span>
                <a href={CAL_LINK} className="f13-btn f13-btn-blue f13-btn-sm" target="_blank" rel="noopener noreferrer">Talk to us</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="f13-sheet f13-sheet-graphite" id="leverage">
        <div className="f13-wrap">
          <div className="f13-split-head">
            <div>
              <div className="f13-label">Why it scales</div>
              <h2 className="f13-h2">Your margin comes from the system,<br /><em>not from more hours.</em></h2>
            </div>
            <p className="f13-lede">Most agencies grow by hiring. This grows by adding clients to something that already runs.</p>
          </div>
          <div className="f13-cards f13-cards-4">
            {leverage.map((l, i) => (
              <div className="f13-card" key={l.name}>
                <span className="f13-card-n">0{i + 1}</span>
                <h3 className="f13-h3">{l.name}</h3>
                <p>{l.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="f13-sheet f13-sheet-bone">
        <div className="f13-wrap">
          <div className="f13-section-head">
            <div className="f13-label">The partner pack</div>
            <h2 className="f13-h2">Your clients never hear our name.<br /><em>It's in writing.</em></h2>
          </div>
          <div className="f13-cards f13-cards-4">
            {pack.map((p, i) => (
              <div className="f13-card" key={p.name}>
                <span className="f13-card-n">0{i + 1}</span>
                <h3 className="f13-h3">{p.name}</h3>
                <p>{p.body}</p>
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

export default Agencies;
