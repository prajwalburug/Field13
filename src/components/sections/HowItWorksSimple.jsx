const steps = [
  { num: "01", label: "Brief", desc: "We learn your product, buyer, and category" },
  { num: "02", label: "Match", desc: "We find 3–5 operators who genuinely fit" },
  { num: "03", label: "Onboard", desc: "Operators use the product, document real experience" },
  { num: "04", label: "Create", desc: "Operators produce content in their own voice" },
  { num: "05", label: "Amplify", desc: "Clipper network distributes across platforms" },
];

const HowItWorksSimple = () => {
  return (
    <section className="process-section">
      <div className="container">
        <div className="how-eyebrow">How it works</div>
        <h2 className="how-intro">
          From first call to your first operator content — a proven system.
        </h2>
        <div className="process-flow">
          {steps.map((s, i) => (
            <div key={s.num} className="process-step">
              <div className="process-step-num">{s.num}</div>
              <div className="process-step-label">{s.label}</div>
              <p className="process-step-desc">{s.desc}</p>
              {i < steps.length - 1 && <div className="process-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSimple;
