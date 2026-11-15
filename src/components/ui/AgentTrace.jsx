const steps = [
  { t: '00.42s', label: 'Signal', detail: 'Head of Growth at target account engaged with a competitor post', tag: 'treg' },
  { t: '01.87s', label: 'Enrich', detail: 'Firmographics, tech stack and open roles pulled', tag: 'clay' },
  { t: '03.10s', label: 'Score', detail: 'ICP fit 0.86 · intent high', tag: 'langgraph' },
  { t: '05.64s', label: 'Draft', detail: 'Personalised first touch, grounded in 3 sources', tag: 'claude' },
  { t: '06.02s', label: 'Evaluate', detail: '18 / 18 checks passed · no PII · on-brand', tag: 'evals' },
  { t: '06.05s', label: 'Approve', detail: 'Waiting for a human in HubSpot', tag: 'hubspot', pending: true }
];

/** Product-style panel showing one agent run. Illustrative only. */
const AgentTrace = () => {
  return (
    <div className="ui-panel agent-trace" role="img" aria-label="Illustration of an agent run trace: signal, enrich, score, draft, evaluate, approve">
      <div className="ui-panel-bar">
        <span className="ui-dots"><i /><i /><i /></span>
        <span className="ui-panel-title">outbound-agent · run 4821</span>
        <span className="ui-badge ui-badge-live">live</span>
      </div>
      <ol className="trace-steps">
        {steps.map((s, i) => (
          <li className={`trace-step${s.pending ? ' is-pending' : ''}`} key={s.label} style={{ '--i': i }}>
            <span className="trace-dot" />
            <div className="trace-body">
              <div className="trace-head">
                <span className="trace-label">{s.label}</span>
                <span className="trace-tag">{s.tag}</span>
                <span className="trace-time">{s.t}</span>
              </div>
              <div className="trace-detail">{s.detail}</div>
            </div>
          </li>
        ))}
      </ol>
      <div className="ui-panel-foot">
        <span>traced in Langfuse</span>
        <span>$0.014 · 6.1s</span>
      </div>
    </div>
  );
};

export default AgentTrace;
