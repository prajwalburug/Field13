const steps = [
  { num: '01', title: 'Match', desc: 'We pair you with products that fit your actual workflow and audience.' },
  { num: '02', title: 'Create', desc: 'Develop genuine content, demos, and narratives on your terms.' },
  { num: '03', title: 'Distribute', desc: 'Publish through your channels. We amplify.' },
  { num: '04', title: 'Earn', desc: 'Recurring compensation for lasting impact.' },
];

const OperatorsProcess = () => {
  return (
    <section id="how-it-works">
      <div className="container">
        <div className="section-label">The process</div>
        <div className="process-steps">
          {steps.map((s) => (
            <div className="process-step-card" key={s.num}>
              <div className="process-step-num">{s.num}</div>
              <h3 className="process-step-title">{s.title}</h3>
              <p className="process-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperatorsProcess;
