const steps = ['Market Intelligence', 'Narrative', 'Media', 'Distribution', 'Trust', 'Demand'];

const SignalDiagram = () => {
  return (
    <section className="diagram-section">
      <div className="container">
        <div className="section-label">Signal Architecture</div>
        <div className="diagram-flow">
          {steps.map((step, i) => (
            <span key={step} className="diagram-step">
              <span className="diagram-dot"></span>
              {step}
              {i < steps.length - 1 && <span className="diagram-arrow">?</span>}
            </span>
          ))}
          <span className="diagram-return">? Market Intelligence</span>
        </div>
        <p className="diagram-caption">Every cycle strengthens the next.</p>
      </div>
    </section>
  );
};

export default SignalDiagram;
