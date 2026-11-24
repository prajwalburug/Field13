import { useEffect, useRef } from 'react';

/*
 * How we work: one schematic, scrubbed by scroll.
 * The section pins (position: sticky) while a cursor moves along the engagement.
 * Everything left of the cursor is done; everything right of it is the plan.
 * Scroll is written straight to the DOM in one rAF, so scrolling never re-renders React.
 *
 * Deliberately no durations or calendar dates: the timeline depends on data access and client decisions, so only the price is fixed.
 * The motion is driven only by the reader's own scrolling, so it stays on under
 * prefers-reduced-motion; only eased transitions and glow are removed there (see CSS).
 */

/* ---------- Geometry (SVG user units) ---------- */
const X0 = 44;           // kick-off
const X_SCOPED = 210;    // discovery done: plan + price fixed
const X_LIVE = 540;      // live
const X1 = 700;          // end of view (run continues)
const LANE = 182;
const TRACKS = [126, 182, 238];
const GATES = [
  { x: 322, label: 'checks' },
  { x: 392, label: 'acceptance' },
  { x: 462, label: 'handover' }
];
// Discovery inputs. `keep` survives the audit; the rest are dropped where they end.
const INPUTS = [
  { y: 70, group: 'ads', end: 104 }, { y: 98, keep: true }, { y: 126, end: 132 },
  { y: 162, group: 'creative', end: 140 }, { y: 190, keep: true },
  { y: 226, group: 'results', keep: true }, { y: 254, end: 118 }, { y: 282, end: 146 }
];
// Run: steady signal inside the agreed range, one excursion caught and corrected.
const SIGNAL = (() => {
  const pts = [];
  for (let i = 0; i <= 20; i += 1) {
    let y = LANE + 5 * Math.sin(i * 0.9) + 2.5 * Math.sin(i * 2.3);
    if (i === 7) y = 216;
    if (i === 8) y = 206;
    pts.push([X_LIVE + i * 8, y]);
  }
  return pts;
})();
const INCIDENT = SIGNAL[7];
const MONTHS = [602, 646, 690];

const STEPS = [
  {
    n: '01', name: 'Discovery', time: 'Plan + price in writing',
    body: 'We look at your ads, creative, accounts and results, cut the ideas that won’t pay back, and pick the one system worth building first. You get the plan and a fixed price in writing before you commit to anything.'
  },
  {
    n: '02', name: 'Build', time: 'No run fee until live',
    body: 'We set it up inside your accounts: the creative pipeline, the posting, the scoreboard. Nothing goes live until it passes checks you’ve signed off.'
  },
  {
    n: '03', name: 'Run', time: 'Every month',
    body: 'We watch it, fix it before you notice, keep shipping new creative, and report on the numbers you care about.'
  }
];
const stepAt = (x) => (x < X_SCOPED ? 0 : x < X_LIVE ? 1 : 2);

/** What the cursor readout says at position x. States, not dates. */
const stateAt = (x) => {
  if (x < X_SCOPED - 14) return 'DISCOVERY · AUDIT';
  if (x < X_SCOPED + 14) return 'PLAN + PRICE FIXED';
  if (x < X_LIVE - 6) return `BUILD · CHECKS ${GATES.filter((g) => x >= g.x).length}/${GATES.length}`;
  if (x < MONTHS[0]) return 'LIVE';
  return `RUN · MONTH ${MONTHS.filter((m) => x >= m).length}`;
};

/* ---------- The schematic, rendered twice: the plan and what's done ---------- */
const inputPath = (w) => (w.keep
  ? `M${X0},${w.y} H118 C162,${w.y} 170,${LANE} ${X_SCOPED},${LANE}`
  : `M${X0},${w.y} H${w.end}`);
const trackPath = (y) => `M${X_SCOPED},${LANE} C238,${LANE} 236,${y} 266,${y} H490 C516,${y} 514,${LANE} ${X_LIVE},${LANE}`;
const signalPath = SIGNAL.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y.toFixed(1)}`).join(' ');

const Schematic = () => (
  <g>
    {[[X0, X_SCOPED, '01  Discovery'], [X_SCOPED + 8, X_LIVE, '02  Build'], [X_LIVE + 8, X1, '03  Run']].map(([a, b, t]) => (
      <g key={t} className="s-phase">
        <text x={a} y="22">{t.toUpperCase()}</text>
        <path d={`M${a},34 V30 H${b - 8} V34`} />
      </g>
    ))}

    {INPUTS.map((w) => (
      <g key={w.y} className={w.keep ? 's-keep' : 's-drop'}>
        {w.group && <text className="s-group" x={X0} y={w.y - 8}>{w.group.toUpperCase()}</text>}
        <path d={inputPath(w)} />
        <circle cx={X0} cy={w.y} r="2.2" className="s-pin" />
        {!w.keep && <path className="s-x" d={`M${w.end - 3},${w.y - 3} l6,6 m0,-6 l-6,6`} />}
      </g>
    ))}
    <g className="s-select">
      <rect x={X_SCOPED - 6} y={LANE - 6} width="12" height="12" transform={`rotate(45 ${X_SCOPED} ${LANE})`} />
      <rect className="s-tagbox" x={X_SCOPED - 86} y="84" width="172" height="22" rx="3" />
      <text x={X_SCOPED} y="99" textAnchor="middle">plan · fixed price</text>
      <path className="s-leader" d={`M${X_SCOPED},106 V${LANE - 10}`} />
    </g>

    {TRACKS.map((y, i) => (
      <g key={y} className="s-track">
        <path d={trackPath(y)} />
        <text x="270" y={y - 8}>{['creators', 'creative', 'scoreboard'][i]}</text>
      </g>
    ))}
    {GATES.map((g) => (
      <g key={g.x} className="s-gate">
        <path d={`M${g.x},${TRACKS[0] - 16} V${TRACKS[2] + 16}`} />
        {TRACKS.map((y) => <rect key={y} x={g.x - 3} y={y - 3} width="6" height="6" />)}
        <text x={g.x} y={TRACKS[2] + 32} textAnchor="middle">{g.label}</text>
      </g>
    ))}
    <g className="s-live">
      <circle cx={X_LIVE} cy={LANE} r="7" />
      <circle cx={X_LIVE} cy={LANE} r="2.5" className="s-core" />
      <text x={X_LIVE} y={LANE - 16} textAnchor="middle">LIVE</text>
    </g>

    <g className="s-band">
      <path d={`M${X_LIVE + 10},${LANE - 20} H${X1}`} />
      <path d={`M${X_LIVE + 10},${LANE + 20} H${X1}`} />
      <text x={X1} y={LANE - 26} textAnchor="end">agreed range</text>
    </g>
    <path className="s-signal" d={signalPath} />
    <g className="s-incident">
      <circle cx={INCIDENT[0]} cy={INCIDENT[1]} r="4" />
      <path d={`M${INCIDENT[0]},${INCIDENT[1] + 5} V${LANE + 44}`} />
      <text x={INCIDENT[0]} y={LANE + 56} textAnchor="middle">caught, fixed</text>
    </g>

    <g className="s-axis">
      <path d={`M${X0},300 H${X1}`} />
      {[[X0, 'Kick-off', 'first call', 'start'], [X_SCOPED, 'Plan + price', 'fixed in writing', 'middle'], [X_LIVE, 'Live', 'run fee starts', 'end']].map(([x, a, b, anchor]) => (
        <g key={a}>
          <path d={`M${x},296 V304`} />
          <text x={x} y="322" textAnchor={anchor} className="s-date">{a}</text>
          <text x={x} y="337" textAnchor={anchor}>{b}</text>
        </g>
      ))}
      {MONTHS.map((x, i) => (
        <g key={x}>
          <rect x={x - 2.5} y="297.5" width="5" height="5" />
          <text x={x} y="322" textAnchor="middle" className="s-date">M{i + 1}</text>
        </g>
      ))}
      <text x={X1} y="337" textAnchor="end">report + improve</text>
    </g>
  </g>
);

const HowItWorks = () => {
  const trackRef = useRef(null);
  const liveClip = useRef(null);
  const cursor = useRef(null);
  const readout = useRef(null);
  const readoutBox = useRef(null);
  const bar = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    let raf = 0;
    let lastStep = -1;
    let lastState = '';
    const frame = () => {
      raf = 0;
      const el = trackRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      // Finish a little before the pin releases, so the end state is readable.
      const p = Math.min(1, Math.max(0, -r.top / span) * 1.12);
      const x = X0 + p * (X1 - X0);
      liveClip.current?.setAttribute('width', String(x));
      cursor.current?.setAttribute('transform', `translate(${x} 0)`);
      readoutBox.current?.setAttribute('transform', `translate(${Math.min(X1 - 62, Math.max(X0 + 62, x)) - x} 0)`);
      if (bar.current) bar.current.style.transform = `scaleY(${p})`;
      const state = stateAt(x);
      if (state !== lastState && readout.current) { lastState = state; readout.current.textContent = state; }
      const s = stepAt(x);
      if (s !== lastStep) {
        lastStep = s;
        stepRefs.current.forEach((li, i) => {
          if (!li) return;
          li.classList.toggle('is-active', i === s);
          li.classList.toggle('is-past', i < s);
          if (i === s) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
        });
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(frame); };
    frame();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="f13-sheet f13-sheet-graphite f13-how hw" id="how">
      <div className="f13-wrap">
        <div className="f13-how-head">
          <div>
            <div className="f13-label">How we work</div>
            <h2 className="f13-h2">
              Most creative pipelines stall after the first batch.<br />
              <em>Ours ship every month, or that month is free.</em>
            </h2>
          </div>
          <p className="f13-lede">
            New ad ideas are easy. Making, shipping and testing them every week is where teams run out of hands. We set up one system in three steps, then stay on to run it.
          </p>
        </div>
      </div>

      <div className="hw-track" ref={trackRef}>
        <div className="hw-stage">
          <div className="f13-wrap hw-stage-grid">
            <ol className="hw-steps">
              <span className="hw-progress" aria-hidden="true"><span ref={bar} /></span>
              {STEPS.map((s, i) => (
                <li key={s.n} ref={(el) => { stepRefs.current[i] = el; }} className={`hw-step${i === 0 ? ' is-active' : ''}`}>
                  <div className="hw-step-row">
                    <span className="hw-step-n">{s.n}</span>
                    <h3 className="hw-step-name">{s.name}</h3>
                    <span className="hw-step-time">{s.time}</span>
                  </div>
                  <div className="hw-step-body"><p>{s.body}</p></div>
                </li>
              ))}
            </ol>

            <figure className="hw-figure">
              <svg
                className="hw-svg"
                viewBox="0 0 720 366"
                role="img"
                aria-label="Engagement path: discovery narrows your stack, data and funnel to one system with a plan and a fixed price; the build passes evals, acceptance and handover checks before going live; then we run it, catch issues, and report monthly."
              >
                <defs>
                  <pattern id="hw-dots" width="14" height="14" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.7" className="s-dot" />
                  </pattern>
                  <clipPath id="hw-done"><rect ref={liveClip} x="0" y="0" width={X0} height="366" /></clipPath>
                  <linearGradient id="hw-cursor-g" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="40" y2="300">
                    <stop offset="0" stopColor="#9DB3FF" stopOpacity="0" />
                    <stop offset="0.2" stopColor="#9DB3FF" stopOpacity="0.9" />
                    <stop offset="0.85" stopColor="#9DB3FF" stopOpacity="0.9" />
                    <stop offset="1" stopColor="#9DB3FF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <rect x="0" y="40" width="720" height="250" fill="url(#hw-dots)" />
                <g className="hw-plan"><Schematic /></g>
                <g className="hw-done" clipPath="url(#hw-done)"><Schematic /></g>
                <g ref={cursor} className="hw-cursor" transform={`translate(${X0} 0)`}>
                  <path d="M0,40 V300" stroke="url(#hw-cursor-g)" />
                  <g ref={readoutBox} transform="translate(62 0)">
                    <rect x="-62" y="348" width="124" height="18" rx="2" className="hw-readout-box" />
                    <text ref={readout} y="360.5" textAnchor="middle" className="hw-readout">DISCOVERY · AUDIT</text>
                  </g>
                </g>
              </svg>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
