import { Link } from 'react-router-dom';

/*
 * What we build. Written for a buyer who has been burned by AI vendors:
 * every system says what ships and how you check it yourself. No tool names here;
 * the stack is mapped per client on the call.
 * No numbers here that a client can't verify in their own accounts.
 */
const systems = [
  {
    n: '01',
    name: 'Content',
    ships: 'Posts, newsletters and blog drafts, written from your own calls, docs and product notes.',
    check: 'Every draft links to the call or doc it came from. Nothing publishes until you approve it.'
  },
  {
    n: '02',
    name: 'Ads and UGC',
    ships: 'New hooks, AI UGC clips and ad variants, published and tested on the channels you already run.',
    check: 'Spend and cost per result for every variant, in your own ad account. Losers get turned off.'
  },
  {
    n: '03',
    name: 'Outreach',
    ships: 'First touches triggered by real buying signals, drafted for the account and approved by a person.',
    check: 'Every send, reply and the signal behind it, logged in your own CRM.'
  },
  {
    n: '04',
    name: 'Reports',
    ships: 'A pipeline dashboard that updates itself, and a written report every month on the three numbers you agreed.',
    check: 'Definitions agreed with your finance team. Click any number and trace it to the source rows.'
  }
];

const clients = [
  { name: 'Oakline Coffee', accounts: 4, scheduled: 6, unread: 3 },
  { name: 'Mira Skincare', accounts: 3, scheduled: 9, unread: 1 },
  { name: 'Summit Physio', accounts: 2, scheduled: 2, unread: 0 }
];

const PlatformVisual = () => (
  <div className="f13-pv f13-pv-cobalt" aria-hidden="true">
    <div className="f13-mini-window">
      <div className="f13-mini-bar">
        <span className="f13-mini-url">app.youragency.com</span>
      </div>
      <div className="f13-mini-head"><span>Clients</span><span>3 · 9 accounts</span></div>
      {clients.map((c) => (
        <div className="f13-mini-row" key={c.name}>
          <span className="f13-mini-avatar">{c.name[0]}</span>
          <span className="f13-mini-name">{c.name}<small>{c.accounts} accounts</small></span>
          <span className="f13-mini-stat">{c.scheduled} scheduled</span>
          <span className={`f13-mini-dot${c.unread ? ' is-on' : ''}`}>{c.unread}</span>
        </div>
      ))}
    </div>
  </div>
);

const Products = () => {
  return (
    <section className="f13-sheet f13-sheet-bone f13-products wb" id="systems">
      <div className="f13-wrap">
        <div className="wb-head">
          <div>
            <div className="f13-label">What we build</div>
            <h2 className="f13-h2">
              Four systems that keep shipping.<br /><em>You can check every one yourself.</em>
            </h2>
          </div>
          <p className="f13-lede">
            Start with one. Everything runs inside your own accounts, so you never have to take our word for what it did.
          </p>
        </div>

        <div className="wb-table" role="table" aria-label="What each system ships and how you check it">
          <div className="wb-row wb-row-head" role="row">
            <span role="columnheader">System</span>
            <span role="columnheader">What it ships</span>
            <span role="columnheader">How you check it</span>
          </div>
          {systems.map((s) => (
            <div className="wb-row" role="row" key={s.n}>
              <div className="wb-sys" role="cell">
                <span className="wb-n">{s.n}</span>
                <h3 className="wb-name">{s.name}</h3>
              </div>
              <p className="wb-ships" role="cell">{s.ships}</p>
              <p className="wb-check" role="cell">{s.check}</p>
            </div>
          ))}
        </div>

        <div className="wb-foot">
          <Link to="/ugc" className="f13-textlink">See the UGC studio →</Link>
          <a href="#how" className="f13-textlink f13-textlink-quiet">How we work →</a>
        </div>

        <article className="wb-agency">
          <div className="wb-agency-copy">
            <span className="f13-chip">For agencies</span>
            <h3 className="f13-h3">Sell it to your clients <em>under your own name.</em></h3>
            <p>
              We build your agency its own client platform on your domain, or run these systems for your clients behind your brand.
              You bill them. We stay behind you and never contact them.
            </p>
            <Link to="/agencies" className="f13-textlink">How the partnership works →</Link>
          </div>
          <div className="wb-agency-visual"><PlatformVisual /></div>
        </article>
      </div>
    </section>
  );
};

export default Products;
