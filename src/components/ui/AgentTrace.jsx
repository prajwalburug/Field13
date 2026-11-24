const steps = [
  { t: '09:02', label: 'Pull', detail: '38 ads scaling in your niche, transcripts and hooks extracted', tag: 'ad library' },
  { t: '09:04', label: 'Hooks', detail: '10 hooks drafted in your brand voice, best 4 picked', tag: 'brand voice' },
  { t: '09:16', label: 'Generate', detail: '4 lip-synced takes, same presenter, same voice', tag: 'video' },
  { t: '09:29', label: 'Edit', detail: 'Demo b-roll, captions and music, cut to 9:16 and 4:5', tag: 'edit' },
  { t: '09:31', label: 'Check', detail: '12 / 12 checks passed · AI label on · on-brand', tag: 'brand check' },
  { t: '09:31', label: 'Approve', detail: 'Waiting for you, then launched as 4 test variants', tag: 'meta · tiktok', pending: true }
];

/** Product-style panel showing one creative-engine run. Illustrative only. */
const AgentTrace = () => {
  return (
    <div className="ui-panel agent-trace" role="img" aria-label="Illustration of a creative engine run: pull, hooks, generate, edit, check, approve">
      <div className="ui-panel-bar">
        <span className="ui-dots"><i /><i /><i /></span>
        <span className="ui-panel-title">creative-engine · run 4821</span>
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
        <span>every step logged</span>
        <span>4 clips · ready to test</span>
      </div>
    </div>
  );
};

export default AgentTrace;
