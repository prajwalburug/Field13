/*
 * Risk reversal, built so trying Field13 is a no-brainer: start with one small part,
 * pay the rest of the build only when it passes the agreed checks and is handed over,
 * pay to run it only once it's live, and own everything so leaving is never a trap.
 * Never promise free work: no "free month", no "we keep working at our cost".
 * No prices and no go-live dates: timelines depend on data access and client decisions.
 */
const items = [
  {
    n: '01',
    name: 'Try one part first',
    promise:
      'No need to sign up for a whole system. Start with one part of one, like hooks and scripts or publishing, on your own brand and accounts. See it work before you add more.',
    penaltyLabel: 'If it isn’t for you',
    penalty: 'Stop there. You keep what was built and owe nothing more.'
  },
  {
    n: '02',
    name: 'Handed over, or you don’t pay',
    promise:
      'Before we start, we write down with you what the system must do: what it makes, how good it has to be and where it runs. The build is done when it passes and is handed over to you.',
    penaltyLabel: 'Until it’s handed over',
    penalty: 'You don’t pay the rest of the build.'
  },
  {
    n: '03',
    name: 'No run fee until it’s live',
    promise:
      'The monthly fee starts only when the system is live in your accounts and passing the agreed checks. Your contract lists what it delivers each month, like the number of new ads made.',
    penaltyLabel: 'Until it’s live',
    penalty: 'No run fee. You only pay to run a system that is working.'
  },
  {
    n: '04',
    name: 'You own everything',
    promise:
      'Prompts, workflows, footage, data and dashboards live in your accounts, not ours. Nothing runs on our side that you cannot take with you.',
    penaltyLabel: 'If you leave or go in-house',
    penalty: 'You keep all of it, with a full handover and runbooks so your team can run it.'
  }
];

const Guarantees = () => {
  return (
    <section className="f13-sheet f13-sheet-bone f13-guarantees" id="guarantees">
      <div className="f13-wrap">
        <div className="f13-gx-head">
          <div>
            <div className="f13-label">What we guarantee</div>
            <h2 className="f13-h2">
              Start small.<br />
              <em>Pay only for what works.</em>
            </h2>
          </div>
          <p className="f13-lede f13-gx-lede">
            Four promises, written into your contract. Trying us is low risk, and the system stays yours whatever happens.
          </p>
        </div>

        <div className="f13-gx-grid f13-gx-grid-4">
          {items.map((g) => (
            <article className="f13-gx" key={g.n}>
              <span className="f13-gx-n">{g.n}</span>
              <h3 className="f13-gx-title">{g.name}</h3>
              <p className="f13-body f13-gx-promise">{g.promise}</p>
              <div className="f13-gx-penalty">
                <span className="f13-gx-penalty-l">{g.penaltyLabel}</span>
                <p>{g.penalty}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="f13-gx-support">
          Everything we run is monitored. If something breaks, we alert you within 4 business hours and fix it within 1 business day.
        </p>
      </div>
    </section>
  );
};

export default Guarantees;
