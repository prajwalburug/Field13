import { CAL_LINK } from '../../data/site';

/*
 * Explains the public vote: how it works, what a voter gets, and why we run it.
 * Sits between the race and "Build with us" on /requests.
 * Copy rules: no prices, no delivery durations, nothing a voter can't see happen on this page.
 */
// The next pick is the 1st of next month (UTC), same rule as the board's clock.
const nextPick = () => {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1))
    .toLocaleDateString(undefined, { day: 'numeric', month: 'long', timeZone: 'UTC' });
};

/* Each step carries a small preview of what it looks like on the board. */
const Preview = ({ kind }) => {
  if (kind === 'vote') {
    return (
      <div className="vx-pv vx-pv-vote" aria-hidden="true">
        <span className="vx-pv-title">Weekly competitor ad tracker</span>
        <span className="vx-pv-box"><i>▲</i><b>35</b><em>Vote</em></span>
      </div>
    );
  }
  if (kind === 'intent') {
    return (
      <div className="vx-pv vx-pv-intent" aria-hidden="true">
        <span>Just curious</span><span className="is-on">We'd pilot it</span><span>We'd pay</span>
      </div>
    );
  }
  if (kind === 'pick') {
    return (
      <div className="vx-pv vx-pv-pick" aria-hidden="true">
        <span className="vx-pv-label">Next pick</span>
        <span className="vx-pv-date">{nextPick()}</span>
        <span className="vx-pv-stage"><i className="is-done" /><i className="is-on" /><i /></span>
      </div>
    );
  }
  return (
    <div className="vx-pv vx-pv-mail" aria-hidden="true">
      <span className="vx-pv-dot" />
      <span><b>It's in build.</b> The system you voted for is next.</span>
    </div>
  );
};

const steps = [
  { n: '01', kind: 'vote', name: 'Vote', body: 'Pick the system you want your team to have. One click, no sign-up.' },
  { n: '02', kind: 'intent', name: 'Say how much', body: 'Just curious, would pilot, or would pay. It tells us who needs it now.' },
  { n: '03', kind: 'pick', name: 'The leader gets built', body: 'On the 1st of every month, the most wanted system moves to Building, right here.' },
  { n: '04', kind: 'mail', name: 'You hear first', body: 'Leave your email and we tell you when it goes into build and when it ships.' }
];

const value = [
  {
    name: 'Get the system you need',
    body: 'Not a roadmap we guessed in a meeting. If enough teams want it, it gets built.'
  },
  {
    name: 'Be first in line',
    body: 'Teams that say they would pilot are the first we call when the system is ready to try.'
  },
  {
    name: 'Watch it happen',
    body: 'Every pick moves from the race to Building to Shipped on this page. Nothing happens behind a curtain.'
  }
];

const faq = [
  { q: 'Does voting cost anything or commit me to anything?', a: 'No. A vote is just a vote. Saying you would pilot or pay only tells us how urgent it is for you.' },
  { q: 'Do I need an account?', a: 'No. One click counts your vote. Each person gets one vote per system.' },
  { q: 'What do you do with my email?', a: 'If you leave it, we only use it to tell you when your system goes into build and when it ships. Nothing else.' },
  { q: 'Who gets the system once it ships?', a: 'Teams that work with us get it set up inside their own accounts, and they own everything we build there.' },
  { q: 'Can I add my own idea?', a: 'Yes. Use "Don’t see yours?" next to the race. We read each one before it joins the vote.' }
];

const VoteExplainer = () => (
  <section className="f13-sheet f13-sheet-bone vx" id="how-voting-works">
    <div className="f13-wrap">
      <div className="vx-head">
        <div className="f13-label">How the vote works</div>
        <h2 className="f13-h2">One click from you. <em>A working system from us.</em></h2>
        <p className="f13-lede">
          We build the AI systems teams actually ask for. This board is how we find out which one, out in the open.
        </p>
      </div>

      <ol className="vx-steps">
        {steps.map((s) => (
          <li key={s.n}>
            <Preview kind={s.kind} />
            <span className="vx-step-n">{s.n}</span>
            <strong>{s.name}</strong>
            <span className="vx-step-body">{s.body}</span>
          </li>
        ))}
      </ol>

      <div className="vx-value">
        <div className="vx-value-head">
          <div className="f13-label">Why vote</div>
          <p className="vx-why">
            Building the wrong system is the most expensive mistake an AI studio can make. Your vote tells us what is worth
            building next, and who to build it with.
          </p>
        </div>
        <div className="vx-cards">
          {value.map((v) => (
            <article className="vx-card" key={v.name}>
              <h3>{v.name}</h3>
              <p>{v.body}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="vx-faq">
        <div className="vx-faq-side">
          <div className="f13-label">Questions</div>
          <h3 className="vx-faq-title">What people ask <em>before they vote.</em></h3>
          <p className="vx-faq-more">Something else on your mind? <a href={CAL_LINK} className="f13-textlink" target="_blank" rel="noopener noreferrer">Ask us on a call →</a></p>
        </div>
        <div className="vx-faq-list">
          {faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default VoteExplainer;
