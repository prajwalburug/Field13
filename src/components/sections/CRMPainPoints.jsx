const pains = [
  "The team stops logging deals. Fields go blank, stages get skipped, the CRM becomes where deals go to die.",
  "Leadership stops trusting the report. Monday's pipeline number does not match reality, so everyone quietly goes back to gut feel.",
  "The CRM becomes a sunk cost. Still paying for it. Nobody is using it right."
];

const CRMPainPoints = () => {
  return (
    <section className="problem-section">
      <div className="container">
        <div className="problem-grid-simple">
          {pains.map((p, i) => (
            <div className="problem-block" key={i}>
              <div className="problem-block-num">0{i + 1}</div>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CRMPainPoints;
