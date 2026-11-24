import { stack, comparison } from '../../data/site';

const EngineStack = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="section-label">The stack</div>
          <h2 className="problem-headline">
            Production frameworks, <em>chosen per problem.</em>
          </h2>
          <p className="pricing-intro">
            We pick models and frameworks for each use case, on enterprise endpoints that never train on your data. GTM tools connect through official MCP servers and APIs, so agents act across your stack instead of adding another seat.
          </p>
          <div className="stack-layers">
            {stack.map((l) => (
              <div className="stack-layer" key={l.layer}>
                <div className="stack-layer-name">{l.layer}</div>
                <div className="stack-layer-items">
                  {l.items.map((t) => <span className="tag-pill" key={t}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="comp-section">
        <div className="container">
          <div className="section-label">Why engineers, not automators</div>
          <h2 className="problem-headline">
            The difference shows up <em>in month three.</em>
          </h2>
          <div className="comp-table">
            <div className="comp-row comp-header">
              <div className="comp-cell comp-label"></div>
              <div className="comp-cell comp-them-h">Typical AI automation agency</div>
              <div className="comp-cell comp-us-h">Field13</div>
            </div>
            {comparison.map((r) => (
              <div className="comp-row" key={r.topic}>
                <div className="comp-cell comp-label">{r.topic}</div>
                <div className="comp-cell comp-them">{r.them}</div>
                <div className="comp-cell comp-us">{r.us}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default EngineStack;
