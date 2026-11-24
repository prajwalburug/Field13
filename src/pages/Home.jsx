import Hero from '../components/f13/Hero';
import Guarantees from '../components/f13/Guarantees';
import Team from '../components/f13/Team';
import FinalCta from '../components/f13/FinalCta';
import Footer from '../components/layout/Footer';

/*
 * The whole site is this one page, with one action: book a call.
 * Positioning: Field13 builds AI marketing systems (not a UGC agency). Each system
 * is made of smaller parts, built around the team's own workflow and trained on
 * its work. It can be run by the client's team (done with you) or by ours (done for you).
 * Copy rules: no prices, no delivery durations, nothing the buyer can't check.
 */

const problems = [
  { name: 'Every idea means more production', body: 'Another brief, another script, another cut, another set of sizes, another upload. The ideas are there. The hours are not.' },
  { name: 'AI tools, one at a time', body: 'Someone prompts, copies, fixes and re-exports, tool by tool. Nothing is connected, so nothing gets faster.' },
  { name: 'Work stops when people are busy', body: 'Posting goes quiet, tests don’t launch, follow-ups slip. The pipeline only moves when someone pushes it.' }
];

const systems = [
  { n: '01', name: 'AI UGC', body: 'UGC-style video ads, written, presented, edited and sized in your brand.', parts: ['Hooks and scripts', 'Presenter', 'Video', 'Editing and captions', 'Variants'] },
  { n: '02', name: 'Content and social', body: 'Posts planned, made, published and managed across your channels.', parts: ['Calendar', 'Writing', 'Design and video', 'Publishing', 'Inbox', 'Analytics'] },
  { n: '03', name: 'Ads', body: 'New creative launched, tested and watched in your own ad accounts.', parts: ['Creative variants', 'Launch and test', 'Fatigue alerts', 'Reporting'] },
  { n: '04', name: 'Outbound', body: 'The right people found, written to and followed up, with every reply tracked.', parts: ['Research', 'Lists', 'Personal messages', 'Follow-ups', 'CRM'] }
];

const steps = [
  { name: 'Map', body: 'We sit with the people who do the work today and map every step: the brief, the draft, the edit, the approval.' },
  { name: 'Build', body: 'Those steps become a system, inside your own tools and accounts.' },
  { name: 'Train', body: 'We tune it on your past work, your brand and your team’s feedback until the output fits how you work.' },
  { name: 'Run', body: 'It goes live, monitored and improved. New parts get added as you need them.' }
];

const runModes = [
  {
    chip: 'Done with you',
    title: 'Your team runs it',
    lede: 'We build the system and train it with your people. Your creative director, strategists, editors and marketers stay in charge, and get more done.',
    steps: [
      ['We train your team on it.', 'It fits the way they already work.'],
      ['We keep it working.', 'Monitored, fixed and improved by us.'],
      ['It grows with you.', 'New parts added when your team needs them.']
    ]
  },
  {
    chip: 'Done for you',
    title: 'Our people run it',
    lede: 'Short on hands? Our own editors, strategists and operators run the system for you, every day. You approve, they deliver.',
    steps: [
      ['Our team runs it daily.', 'Trained on your brand and your system.'],
      ['You approve everything.', 'Nothing goes live without your yes.'],
      ['You see what shipped.', 'A report every month, from your own accounts.']
    ]
  }
];

const needs = [
  'One owner for each workflow: someone who knows how it is done today.',
  'Access to the tools and accounts the system will run in.',
  'Examples of work you like: past ads, posts, brand guides, so we can train on it.',
  'Time for a few feedback rounds while we train it.'
];

const faq = [
  { q: 'Is this an agency or software?', a: 'Neither, exactly. We build a system for your team, in your accounts. Your team can run it, or our people can run it for you.' },
  { q: 'Does it replace our team?', a: 'No. It takes the repetitive steps, so your creative director, strategists, editors and marketers spend their time on the work that needs them.' },
  { q: 'Which tools does it run on?', a: 'What you already use wherever possible: your ad accounts, social accounts, CRM and storage. We map it with you on the call.' },
  { q: 'Who owns it?', a: 'You do. Prompts, workflows, assets, data and dashboards live in your accounts and stay there if you leave.' },
  { q: 'Is AI content allowed on Meta and TikTok?', a: 'Yes. Both platforms require AI-generated content to be labelled, and we label every ad.' },
  { q: 'What happens on the call?', a: 'We talk through how your team works and what you want to move, show you the systems we have built running, and say which one we would start with. If it is a fit, you get a plan and a fixed price in writing.' }
];

const Home = () => (
  <div>
    <Hero />

    <section className="f13-sheet f13-sheet-bone hm-problem">
      <div className="f13-wrap">
        <div className="sp-head">
          <div>
            <div className="f13-label">The problem</div>
            <h2 className="f13-h2">Your team has the ideas. <em>The repetitive work eats the week.</em></h2>
          </div>
        </div>
        <div className="f13-cards hm-cards-3">
          {problems.map((p, i) => (
            <div className="f13-card" key={p.name}>
              <span className="f13-card-n">0{i + 1}</span>
              <h3 className="f13-h3">{p.name}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="f13-sheet f13-sheet-graphite" id="systems">
      <div className="f13-wrap">
        <div className="sp-head">
          <div>
            <div className="f13-label">What we build</div>
            <h2 className="f13-h2">Four systems. <em>Each built from smaller parts.</em></h2>
          </div>
          <p className="f13-lede">Start with one system, or one part of one. Add the rest when it is working.</p>
        </div>
        <div className="f13-cards f13-cards-4">
          {systems.map((s) => (
            <div className="f13-card hm-system" key={s.name}>
              <span className="f13-card-n">{s.n}</span>
              <h3 className="f13-h3">{s.name}</h3>
              <p>{s.body}</p>
              <ul className="hm-parts">
                {s.parts.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="hm-note">Need something else? We build custom systems too. Bring it to the call.</p>
      </div>
    </section>

    <section className="f13-sheet f13-sheet-bone" id="how">
      <div className="f13-wrap">
        <div className="sp-head">
          <div>
            <div className="f13-label">How we build</div>
            <h2 className="f13-h2">Built around your team. <em>Trained on its work.</em></h2>
          </div>
          <p className="f13-lede">No generic tool to learn. The system follows the way your people already work.</p>
        </div>
        <ol className="sp-steps hm-steps">
          {steps.map((st, i) => (
            <li key={st.name}>
              <span className="sp-step-n">0{i + 1}</span>
              <strong>{st.name}</strong>
              <span>{st.body}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="f13-sheet f13-sheet-graphite" id="run">
      <div className="f13-wrap">
        <div className="sp-head">
          <div>
            <div className="f13-label">Who runs it</div>
            <h2 className="f13-h2">Your team runs it, <em>or ours does.</em></h2>
          </div>
          <p className="f13-lede">Same system either way. Choose for each system, and switch later if you need to.</p>
        </div>
        <div className="f13-options">
          {runModes.map((o) => (
            <article className="f13-option" key={o.chip}>
              <span className="f13-chip">{o.chip}</span>
              <h3 className="f13-h3"><em>{o.title}</em></h3>
              <p>{o.lede}</p>
              <ol className="f13-wl-steps">
                {o.steps.map(([strong, rest], i) => (
                  <li key={strong}><span>{i + 1}</span><div><strong>{strong}</strong> {rest}</div></li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="f13-sheet f13-sheet-black" id="need">
      <div className="f13-wrap">
        <div className="sp-check-grid">
          <div>
            <div className="f13-label">What we need from you</div>
            <h2 className="f13-h2">Four things <em>to get started.</em></h2>
            <p className="f13-lede">Everything we build lives in your accounts, so it stays yours.</p>
          </div>
          <ul className="sp-checks">
            {needs.map((n) => <li key={n}>{n}</li>)}
          </ul>
        </div>
      </div>
    </section>

    <Guarantees />
    <Team />

    <section className="f13-sheet f13-sheet-black hm-agencies" id="agencies">
      <div className="f13-wrap f13-split-head">
        <div>
          <div className="f13-label">For agencies</div>
          <h2 className="f13-h2">Run an agency? <em>Offer this to your clients.</em></h2>
        </div>
        <p className="f13-lede">Under your own brand, with us as your named AI partner, or by referring a client. We will walk you through it on the call.</p>
      </div>
    </section>

    <section className="f13-sheet f13-sheet-bone" id="faq">
      <div className="f13-wrap sp-faq-grid">
        <div>
          <div className="f13-label">Questions</div>
          <h2 className="f13-h2">What people <em>ask first.</em></h2>
        </div>
        <div className="sp-faq-list">
          {faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    <FinalCta />
    <Footer />
  </div>
);

export default Home;
