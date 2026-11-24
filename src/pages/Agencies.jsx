import Footer from '../components/layout/Footer';
import PageHero from '../components/f13/PageHero';
import FinalCta from '../components/f13/FinalCta';
import { CAL_LINK } from '../data/site';

const options = [
  {
    chip: 'Option 01',
    title: 'Run our systems under your brand',
    lede: 'We build and run AI UGC and content systems for your clients. Everything they see carries your name.',
    steps: [
      ['Start with one pilot client.', 'We scope the system together on a joint call.'],
      ['We build and run it on our side.', 'Same systems and the same checks our direct clients get.'],
      ['Your clients see your brand.', 'Approvals, assets and reports sit in a client portal with your name on it.'],
      ['You set the price.', 'You bill your client directly. We invoice you.']
    ],
    foot: 'Opens after a pilot client'
  },
  {
    chip: 'Option 02',
    title: 'Bring us in as your AI partner',
    lede: 'You keep the client and the strategy. We join as your named AI specialist, powered by Field13.',
    steps: [
      ['You own the account.', 'The relationship, strategy and billing stay with you.'],
      ['We run the system.', 'UGC, content, creator outreach or reporting, built and run by us.'],
      ['You earn while it runs.', 'A recurring share for as long as you manage the account.']
    ],
    foot: 'Scoped on a partner call'
  },
  {
    chip: 'Option 03',
    title: 'Refer a client',
    lede: "Rather not resell? Introduce a client and we take it from there.",
    steps: [
      ['You make the introduction.', 'A short note or a joint call is enough.'],
      ['We contract with them directly.', 'Scoping, delivery and support are on us.'],
      ['You earn a referral fee.', 'Terms are agreed before the first introduction.']
    ],
    foot: 'Terms on a partner call'
  }
];

// Why it works for an agency: the leverage is the system, not extra people.
const leverage = [
  { name: 'Built once, used by every client', body: 'The systems already run. Each new client plugs into the same engine, so client ten takes far less effort than client one.' },
  { name: 'Nothing to hire', body: "No engineers to recruit or manage. The systems are built, monitored and fixed for you, on our side." },
  { name: 'Your price, your margin', body: 'On white-label you bill your clients directly and set your own price. We go through the numbers on a partner call.' },
  { name: 'Your team stays on strategy', body: 'Your people keep the client relationship and the thinking. The production work runs in our systems.' }
];

const pack = [
  { name: 'NDA and non-solicit', body: "Mutual NDA before any client details are shared. We don't approach your clients during the partnership or after it, as set out in the agreement." },
  { name: 'Your brand, everywhere', body: 'On white-label, every report, portal and walkthrough carries your branding. We only speak to your client as part of your team.' },
  { name: 'Written response times', body: 'Response and fix times are written into the partner agreement, so you know what to promise your clients.' },
  { name: 'Clear ownership', body: "Your clients own their accounts, data, assets and reports. Client data is never used to train models, and is returned or deleted on exit. The systems that produce the work stay with us." }
];

const Agencies = () => {
  return (
    <>
      <PageHero
        tag="Agencies"
        eyebrow="Partner with Field13"
        title={<>Your clients are asking for AI.<br /><em>Sell it under your name. We build it.</em></>}
        lede="Give your clients AI systems without hiring anyone to build them. Run them under your brand, bring us in as your AI partner, or refer a client. We build and run the systems either way."
      >
        <div className="f13-actions">
          <a href={CAL_LINK} className="f13-btn f13-btn-blue" target="_blank" rel="noopener noreferrer">Book a partner call</a>
          <a href="#options" className="f13-btn f13-btn-ghost">See the three options</a>
        </div>
      </PageHero>

      <section className="f13-sheet f13-sheet-bone" id="options">
        <div className="f13-wrap">
          <div className="f13-section-head">
            <div className="f13-label">Three ways to partner</div>
            <h2 className="f13-h2">Put our systems under your brand,<br /><em>bring us in, or refer a client.</em></h2>
          </div>

          <div className="f13-options f13-options-3">
            {options.map((o) => (
              <article className="f13-option" key={o.chip}>
                <span className="f13-chip">{o.chip}</span>
                <h3 className="f13-h3"><em>{o.title}</em></h3>
                <p>{o.lede}</p>
                <ol className="f13-wl-steps">
                  {o.steps.map(([strong, rest], i) => (
                    <li key={strong}><span>{i + 1}</span><div><strong>{strong}</strong> {rest}</div></li>
                  ))}
                </ol>
                <div className="f13-option-foot">
                  <span>{o.foot}</span>
                  <a href={CAL_LINK} className="f13-btn f13-btn-blue f13-btn-sm" target="_blank" rel="noopener noreferrer">Talk to us</a>
                </div>
              </article>
            ))}
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
            <h2 className="f13-h2">Your clients stay yours.<br /><em>It's in writing.</em></h2>
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
