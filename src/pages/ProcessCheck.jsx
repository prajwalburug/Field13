import { useState } from 'react';
import Footer from '../components/layout/Footer';

const QUESTIONS = [
  { dim: 'Lead Response', q: 'How fast does someone follow up on a new lead?', opts: [
    { t: 'Usually same hour', s: 10 }, { t: 'Within a day', s: 6 }, { t: 'A few days, depends who is free', s: 3 }, { t: 'Honestly, it varies a lot', s: 0 }
  ]},
  { dim: 'Lead Response', q: 'Is there a defined owner for every new lead the moment it comes in?', opts: [
    { t: 'Yes, auto-assigned every time', s: 10 }, { t: 'Mostly, but manual', s: 6 }, { t: 'Sometimes leads sit unassigned', s: 3 }, { t: 'No clear owner, people just grab them', s: 0 }
  ]},
  { dim: 'Pipeline Visibility', q: 'Can leadership see exactly what is in the pipeline right now, without asking someone?', opts: [
    { t: 'Yes, live dashboard, always trusted', s: 10 }, { t: 'There is a dashboard, but we double-check it', s: 5 }, { t: 'Only via a manual report someone builds', s: 2 }, { t: 'No, it is mostly word of mouth', s: 0 }
  ]},
  { dim: 'Pipeline Visibility', q: 'When a deal stage changes, how quickly does the CRM reflect it?', opts: [
    { t: 'Same day, every time', s: 10 }, { t: 'Within a few days', s: 5 }, { t: 'Only updated before reviews', s: 2 }, { t: 'Rarely matches reality', s: 0 }
  ]},
  { dim: 'Data Quality', q: 'If you opened 10 random deals right now, how many would have complete, accurate info?', opts: [
    { t: '9-10 of them', s: 10 }, { t: '6-8 of them', s: 6 }, { t: '3-5 of them', s: 3 }, { t: 'Fewer than 3', s: 0 }
  ]},
  { dim: 'Data Quality', q: 'In the last quarter, roughly how much pipeline value did you discover was stuck or stalled -- through no competitive reason?', opts: [
    { t: 'Under $10K', s: 0 }, { t: '$10K to $50K', s: 3 }, { t: '$50K to $200K', s: 7 }, { t: 'Over $200K', s: 10 }
  ]},
  { dim: 'Workflow Health', q: 'Are follow-up reminders and stage handoffs automated, or does someone have to remember?', opts: [
    { t: 'Fully automated', s: 10 }, { t: 'Some automation, some manual', s: 6 }, { t: 'Mostly manual', s: 3 }, { t: 'Entirely manual, nothing is automated', s: 0 }
  ]},
  { dim: 'Workflow Health', q: 'When a deal closes, does delivery or ops get notified automatically?', opts: [
    { t: 'Yes, instantly, every time', s: 10 }, { t: 'Usually, with a small delay', s: 5 }, { t: 'Sometimes it gets missed', s: 2 }, { t: 'No, it is word of mouth or Slack', s: 0 }
  ]},
  { dim: 'Team Adoption', q: 'Does your sales team update the CRM without being reminded?', opts: [
    { t: 'Yes, it is just part of the workflow', s: 10 }, { t: 'Mostly, with occasional nudging', s: 6 }, { t: 'Only right before a review', s: 3 }, { t: 'No, it takes real chasing', s: 0 }
  ]},
  { dim: 'Team Adoption', q: 'If the CRM disappeared tomorrow, how much would the team actually miss it?', opts: [
    { t: 'A lot, they rely on it daily', s: 10 }, { t: 'Somewhat', s: 5 }, { t: 'Not much, most work happens elsewhere', s: 2 }, { t: 'They would barely notice', s: 0 }
  ]}
];

const DIMS = ['Lead Response', 'Pipeline Visibility', 'Data Quality', 'Workflow Health', 'Team Adoption'];

const FIX_COPY = {
  'Lead Response': { h: 'Put a clock on first contact', p: 'Set an auto-assignment rule so every new lead has an owner the second it lands -- no exceptions, no "whoever is free."' },
  'Pipeline Visibility': { h: 'Build one dashboard leadership actually opens', p: 'Replace the manual report with a live view of stage, value, and aging deals -- so Monday\'s number is always real.' },
  'Data Quality': { h: 'Force the fields that matter', p: 'Make 3-4 critical fields required at the stage they are needed, so deals cannot move forward with blank data.' },
  'Workflow Health': { h: 'Automate the handoff, not just the reminder', p: 'When a deal closes, delivery should be notified automatically -- not via a Slack message someone forgets to send.' },
  'Team Adoption': { h: 'Make the CRM the easiest way to do the job', p: 'If the team avoids it, the system is fighting how they work. Rebuild the steps around their actual process, not a template.' }
};

const ProcessCheck = () => {
  const [phase, setPhase] = useState('quiz');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(new Array(QUESTIONS.length).fill(null));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [results, setResults] = useState(null);

  const select = (idx) => {
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
  };

  const next = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      setPhase('gate');
    }
  };

  const back = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const compute = () => {
    const dimScores = {};
    DIMS.forEach((d) => {
      const idxs = QUESTIONS.map((q, i) => (q.dim === d ? i : null)).filter((i) => i !== null);
      const total = idxs.reduce((sum, i) => sum + QUESTIONS[i].opts[answers[i]].s, 0);
      dimScores[d] = Math.round((total / (idxs.length * 10)) * 100);
    });
    const overall = Math.round(DIMS.reduce((s, d) => s + dimScores[d], 0) / DIMS.length);
    const sorted = DIMS.slice().sort((a, b) => dimScores[a] - dimScores[b]);
    const topFixes = sorted.slice(0, 3).map((d) => ({ dim: d, ...FIX_COPY[d] }));
    return { dimScores, overall, topFixes };
  };

  const submit = async () => {
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSending(true);
    const r = compute();
    setResults(r);
    try {
      await fetch('/api/send-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          overall_score: r.overall,
          dimension_scores: r.dimScores,
          top_fixes: r.topFixes
        })
      });
    } catch (e) {
      console.warn('Email send failed, showing results inline:', e);
    }
    setSent(true);
    setSending(false);
    setPhase('results');
  };

  const progressTotal = QUESTIONS.length + 1;
  const progressDone = phase === 'quiz' ? current + 1 : phase === 'gate' ? QUESTIONS.length + 1 : QUESTIONS.length + 1;

  const scoreClass = (n) => {
    if (n < 50) return 'sc-low';
    if (n < 75) return 'sc-mid';
    return 'sc-good';
  };

  return (
    <>
      <section className="hero process-hero">
        <div className="container container-narrow">
          <div className="section-label">Free self-assessment</div>
          <h1 className="hero-headline mission-headline">
            Run your own <em>Process Check.</em>
          </h1>
          <p className="hero-sub" style={{ maxWidth: 520 }}>
            10 questions, 5 dimensions. The same scorecard we use on every client call. Your score and 3 fixes land in your inbox the moment you finish.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container container-narrow">
          <div className="process-progress">
            {Array.from({ length: progressTotal }).map((_, i) => (
              <div key={i} className={`process-prog-seg${i < progressDone ? ' done' : ''}`} />
            ))}
          </div>

          {phase === 'quiz' && (
            <div className="process-card fade-up" key={current}>
              <div className="process-q-tag">
                Dimension {DIMS.indexOf(QUESTIONS[current].dim) + 1} of 5 &mdash; {QUESTIONS[current].dim}
                <span className="process-q-num">Question {current + 1} of {QUESTIONS.length}</span>
              </div>
              <div className="process-q-text">{QUESTIONS[current].q}</div>
              <div className="process-opts">
                {QUESTIONS[current].opts.map((opt, i) => (
                  <div
                    key={i}
                    className={`process-opt${answers[current] === i ? ' selected' : ''}`}
                    onClick={() => select(i)}
                  >
                    <span className="process-dot" />
                    <span>{opt.t}</span>
                  </div>
                ))}
              </div>
              <div className="process-nav">
                <button className="process-back" onClick={back} disabled={current === 0}>
                  &larr; Back
                </button>
                <button className="process-next" onClick={next} disabled={answers[current] === null}>
                  {current === QUESTIONS.length - 1 ? 'See your score \u2192' : 'Next \u2192'}
                </button>
              </div>
            </div>
          )}

          {phase === 'gate' && (
            <div className="process-card fade-up">
              <div className="process-q-tag">Last step</div>
              <div className="process-q-text">Where should we send your score?</div>
              <div className="process-gate">
                <label className="process-label">Name</label>
                <input type="text" className="process-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                <label className="process-label">Work email</label>
                <input type="email" className="process-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
                <p className="process-gate-note">We will email your score and your 3 fixes. No spam, no list -- just this report.</p>
              </div>
              <div className="process-nav">
                <button className="process-back" onClick={() => { setCurrent(QUESTIONS.length - 1); setPhase('quiz'); }}>
                  &larr; Back
                </button>
                <button className="process-next" onClick={submit} disabled={!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || sending}>
                  {sending ? 'Scoring...' : 'Get my score \u2192'}
                </button>
              </div>
            </div>
          )}

          {phase === 'results' && results && (
            <div className="process-results fade-up">
              <div className="process-sent">Sent to {email} -- shown below too.</div>

              <div className="process-shell">
                <div className="process-score-top">
                  <div className={`process-score-num ${scoreClass(results.overall)}`}>{results.overall}</div>
                  <div className="process-score-label">Your Process Check score / 100</div>
                </div>
                <div className="process-score-body">
                  {DIMS.map((d) => (
                    <div key={d} className="process-dim-row">
                      <span className="process-dim-name">{d}</span>
                      <div className="process-dim-track">
                        <div className="process-dim-fill" style={{ width: `${results.dimScores[d]}%` }} />
                      </div>
                      <span className="process-dim-num">{results.dimScores[d]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="process-fix-heading">Your top 3 fixes</h3>
              <div className="process-fix-list">
                {results.topFixes.map((f, i) => (
                  <div key={i} className="process-fix-item">
                    <div className="process-fix-tag">Fix {String(i + 1).padStart(2, '0')} &mdash; {f.dim}</div>
                    <h4 className="process-fix-title">{f.h}</h4>
                    <p className="process-fix-desc">{f.p}</p>
                  </div>
                ))}
              </div>

              <div className="process-guarantee">
                3 fixes or it is on us -- book the full call and we will go deeper than this self-check can, with a written report in 24 hours.
              </div>

              <div className="process-nav" style={{ marginTop: 30 }}>
                <span></span>
                <a href="https://cal.com/field13-r657gn/45min" className="process-book" target="_blank" rel="noopener noreferrer">
                  Book your free Process Check &rarr;
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProcessCheck;
