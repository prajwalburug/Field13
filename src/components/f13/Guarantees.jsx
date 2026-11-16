const items = [
  {
    n: '01',
    name: 'Live by the date',
    body: 'You get the go-live date before you sign. If the system is not live and passing its checks by then, we keep working for free until it is, and refund 20% of the build.'
  },
  {
    n: '02',
    name: 'You hear it from us first',
    body: 'Everything we run is monitored. If something fails, we alert you within 4 business hours and fix it within 1 business day. Spot it before we do and that month is 25% off.'
  },
  {
    n: '03',
    name: 'You own everything',
    body: 'Code, prompts, data and dashboards live in your accounts. If you leave, you get the full handover with runbooks within 5 business days.'
  }
];

const Guarantees = () => {
  return (
    <section className="f13-sheet f13-sheet-bone f13-guarantees">
      <div className="f13-wrap">
        <div className="f13-section-head">
          <div className="f13-label">What we guarantee</div>
          <h2 className="f13-h2">If it's late or it breaks,<br /><em>you pay less.</em></h2>
        </div>
        <div className="f13-g-grid">
          {items.map((g) => (
            <div className="f13-g" key={g.n}>
              <h3 className="f13-h3">{g.name}</h3>
              <p className="f13-body">{g.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guarantees;
