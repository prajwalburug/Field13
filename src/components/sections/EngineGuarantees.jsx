import { guarantees } from '../../data/site';

const EngineGuarantees = () => {
  return (
    <section className="guarantee-section">
      <div className="container">
        <div className="section-label">What we guarantee</div>
        <h2 className="guarantee-headline">
          We guarantee how the system runs. <em>Not a meeting count.</em>
        </h2>
        <p className="guarantee-text">
          Meeting guarantees reward volume. What actually kills AI systems is a silent failure three weeks after launch. So that is what we put money on.
        </p>
        <div className="what-this-grid">
          {guarantees.map((g, i) => (
            <div className="what-this-card" key={g.name}>
              <div className="what-this-num">0{i + 1}</div>
              <div className="what-this-title">{g.name}</div>
              <p className="what-this-body">{g.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngineGuarantees;
