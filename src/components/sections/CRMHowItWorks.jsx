const steps = [
  {
    step: 'Book',
    body: '30 minutes, no prep needed on your end.'
  },
  {
    step: 'We map',
    body: '7 questions about how you actually sell, scored across 5 dimensions.'
  },
  {
    step: 'You get a number',
    body: 'A 2-page written report in your inbox within 24 hours. 3 fixes, guaranteed.'
  }
];

const CRMHowItWorks = () => {
  return (
    <section>
      <div className="container">
        <div className="section-label">How it works</div>
        <h2 className="problem-headline">
          30 minutes. <em>2-page report.</em> 3 fixes guaranteed.
        </h2>
        <div className="how-steps-horizontal">
          {steps.map((s, i) => (
            <div className="how-step-h" key={s.step}>
              <div className="how-step-h-num">Step 0{i + 1}</div>
              <div className="how-step-h-title">{s.step}</div>
              <div className="how-step-h-body">{s.body}</div>
              {i < steps.length - 1 && <div className="how-step-h-line"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CRMHowItWorks;
