import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Turnstile from './Turnstile';

const AUDIENCES = ['Agency', 'SaaS team', 'Brand', 'Other'];
const INTENTS = [
  { id: 'curious', label: 'Just curious' },
  { id: 'pilot', label: "We'd pilot it" },
  { id: 'pay', label: "We'd pay for it" }
];
const isReady = (intent) => intent === 'pilot' || intent === 'pay';
const POLL_MS = 20000;
const TICK_MS = 4500;
const MOVE_MS = 8000;

const readVoted = () => {
  try { return new Set(JSON.parse(localStorage.getItem('f13-voted') || '[]')); } catch { return new Set(); }
};
const saveVoted = (set) => {
  try { localStorage.setItem('f13-voted', JSON.stringify([...set])); } catch { /* storage blocked */ }
};
const reducedMotion = () => {
  try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
};

// D1 stores UTC as "YYYY-MM-DD HH:MM:SS".
const parseUtc = (s) => (s ? new Date(s.replace(' ', 'T') + 'Z') : null);
const nowUtc = () => new Date().toISOString().slice(0, 19).replace('T', ' ');
const timeAgo = (date) => {
  if (!date) return null;
  const s = Math.max(1, Math.round((Date.now() - date.getTime()) / 1000));
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.round(s / 60)}m ago`;
  if (s < 86400) return `${Math.round(s / 3600)}h ago`;
  return `${Math.round(s / 86400)}d ago`;
};
const monthYear = (date) => (date ? date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : null);
const teams = (n) => `${n} ${n === 1 ? 'team' : 'teams'}`;

// The next build is picked on the 1st of each month (UTC).
const nextPick = () => {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
};
const useCountdown = (target) => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const ms = Math.max(0, target.getTime() - now);
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${d}d ${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
};

const activityLine = (a) => {
  if (a.intent === 'pay') return <>A team said they'd <strong>pay</strong> for <em>{a.title}</em></>;
  if (a.intent === 'pilot') return <>A team would <strong>pilot</strong> <em>{a.title}</em></>;
  return <>New vote for <em>{a.title}</em></>;
};

/** A number that counts to its new value instead of jumping. */
const Count = ({ value }) => {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = from.current;
    if (start === value || reducedMotion()) { from.current = value; setShown(value); return undefined; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / 700);
      const eased = 1 - Math.pow(1 - k, 3);
      setShown(Math.round(start + (value - start) * eased));
      if (k < 1) raf = requestAnimationFrame(tick); else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); from.current = value; };
  }, [value]);
  return <>{shown}</>;
};

const SORTS = [
  { id: 'top', label: 'Most votes' },
  { id: 'trending', label: 'Trending today' },
  { id: 'new', label: 'Newest' }
];
const sorters = {
  top: (a, b) => b.votes - a.votes || (a.created_at || '').localeCompare(b.created_at || '') || a.id - b.id,
  trending: (a, b) => b.votes_24h - a.votes_24h || b.votes - a.votes || a.id - b.id,
  new: (a, b) => (b.created_at || '').localeCompare(a.created_at || '') || b.id - a.id
};

/** One recent board event at a time, rotating. Jumps to the newest when one arrives. */
const ActivityTicker = ({ activity }) => {
  const [i, setI] = useState(0);
  const newest = activity[0]?.created_at;
  useEffect(() => { setI(0); }, [newest]);
  useEffect(() => {
    if (activity.length < 2) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % activity.length), TICK_MS);
    return () => clearInterval(t);
  }, [activity.length, newest]);
  const a = activity[i % activity.length];
  if (!a) return null;
  return (
    <div className="f13-ticker" aria-live="off">
      <span className="f13-ticker-tag">Live</span>
      <span className="f13-ticker-line" key={`${a.request_id}-${a.created_at}-${i}`}>
        {activityLine(a)}
        <span className="f13-ticker-time">{timeAgo(parseUtc(a.created_at))}</span>
      </span>
    </div>
  );
};

const emptyForm = { title: '', details: '', audience: 'Agency', company: '', email: '', website: '' };

/**
 * Live "What should we build next?" board.
 * `limit` caps the leaderboard on the home page; omit it on /requests.
 */
const RequestSystem = ({ limit, showHeading = true }) => {
  const [data, setData] = useState({ requests: [], stats: null, activity: [] });
  const [loadState, setLoadState] = useState('loading');
  const [voted, setVoted] = useState(readVoted);
  const [intents, setIntents] = useState({});
  const [bumped, setBumped] = useState(null);
  const [open, setOpen] = useState(null);
  const [followUp, setFollowUp] = useState(null);
  const [watch, setWatch] = useState({ email: '', state: 'idle', message: '', done: {} });
  const [moves, setMoves] = useState({});
  const [sort, setSort] = useState('top');
  const [plus, setPlus] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [expanded, setExpanded] = useState(false);
  const [token, setToken] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const sectionRef = useRef(null);
  const ideaRef = useRef(null);
  const rowRefs = useRef(new Map());
  const prevTops = useRef(new Map());
  const prevRanks = useRef(null);
  const prevSort = useRef('top');
  const pick = useMemo(nextPick, []);
  const countdown = useCountdown(pick);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/requests');
      if (!res.ok) throw new Error(String(res.status));
      const next = await res.json();
      setData({ requests: next.requests || [], stats: next.stats || null, activity: next.activity || [] });
      // The server knows this visitor's votes even if local storage was cleared.
      if (Array.isArray(next.mine) && next.mine.length) {
        setVoted((v) => {
          const merged = new Set(v);
          next.mine.forEach((m) => merged.add(m.request_id));
          saveVoted(merged);
          return merged;
        });
        setIntents((cur) => {
          const out = { ...cur };
          next.mine.forEach((m) => { if (m.intent) out[m.request_id] = m.intent; });
          return out;
        });
      }
      setLoadState('ready');
    } catch {
      setLoadState((s) => (s === 'ready' ? s : 'offline'));
    }
  }, []);

  // Load once, then refresh every 20s while the section is on screen and the tab is visible.
  useEffect(() => {
    load();
    let timer = null;
    let onScreen = false;
    const arm = () => {
      clearInterval(timer);
      if (onScreen && !document.hidden) timer = setInterval(load, POLL_MS);
    };
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; arm(); });
    const onVis = () => { if (!document.hidden && onScreen) load(); arm(); };
    if (sectionRef.current) io.observe(sectionRef.current);
    document.addEventListener('visibilitychange', onVis);
    return () => { clearInterval(timer); io.disconnect(); document.removeEventListener('visibilitychange', onVis); };
  }, [load]);

  const building = data.requests.find((r) => r.stage === 'building');
  const shipped = data.requests
    .filter((r) => r.stage === 'shipped')
    .sort((a, b) => (b.shipped_at || '').localeCompare(a.shipped_at || ''));
  // Sorted here too, so an optimistic vote reorders the board right away.
  const ballot = data.requests.filter((r) => !r.stage).sort(sorters[sort]);
  const shown = limit ? ballot.slice(0, limit) : ballot;
  const order = shown.map((r) => r.id).join(',');
  const maxVotes = Math.max(1, ...ballot.map((r) => r.votes));
  const stats = data.stats;
  const lastVote = timeAgo(parseUtc(stats?.last_vote_at));

  // Rank changes: remember who moved, and by how much, for a few seconds.
  useEffect(() => {
    const ids = order ? order.split(',').map(Number) : [];
    const before = prevRanks.current;
    prevRanks.current = new Map(ids.map((id, i) => [id, i]));
    const switched = prevSort.current !== sort;
    prevSort.current = sort;
    if (!before || switched) return undefined;
    const changed = {};
    ids.forEach((id, i) => {
      if (before.has(id) && before.get(id) !== i) changed[id] = before.get(id) - i;
    });
    if (!Object.keys(changed).length) return undefined;
    setMoves((m) => ({ ...m, ...changed }));
    const t = setTimeout(() => setMoves((m) => {
      const out = { ...m };
      Object.keys(changed).forEach((id) => { if (out[id] === changed[id]) delete out[id]; });
      return out;
    }), MOVE_MS);
    return () => clearTimeout(t);
  }, [order, sort]);

  // FLIP: rows glide from their old position to their new one when the order changes.
  useLayoutEffect(() => {
    const animate = !reducedMotion();
    const tops = new Map();
    rowRefs.current.forEach((el, id) => {
      if (!el) return;
      const top = el.offsetTop;
      tops.set(id, top);
      const old = prevTops.current.get(id);
      if (!animate || old == null || old === top) return;
      el.style.transition = 'none';
      el.style.transform = `translateY(${old - top}px)`;
      el.style.zIndex = '1';
      void el.offsetHeight; // commit the starting position before animating away from it
      el.style.transition = 'transform 0.6s cubic-bezier(.2,.8,.2,1)';
      el.style.transform = '';
      setTimeout(() => { el.style.zIndex = ''; el.style.transition = ''; }, 650);
    });
    prevTops.current = tops;
  }, [order]);

  const patchRequest = (id, fn) => setData((d) => ({ ...d, requests: d.requests.map((r) => (r.id === id ? fn(r) : r)) }));

  const vote = async (id) => {
    if (voted.has(id)) { setFollowUp(followUp === id ? null : id); return; }
    const next = new Set(voted).add(id);
    setVoted(next);
    saveVoted(next);
    setBumped(id);
    setPlus({ id, k: Date.now() });
    setFollowUp(id);
    setTimeout(() => setBumped(null), 700);
    patchRequest(id, (r) => ({ ...r, votes: r.votes + 1, votes_24h: r.votes_24h + 1 }));
    const title = data.requests.find((r) => r.id === id)?.title;
    setData((d) => ({
      ...d,
      stats: d.stats ? { ...d.stats, total_votes: d.stats.total_votes + 1, votes_24h: d.stats.votes_24h + 1, last_vote_at: nowUtc() } : d.stats,
      activity: title ? [{ request_id: id, title, intent: null, created_at: nowUtc() }, ...d.activity].slice(0, 8) : d.activity
    }));

    let body = null;
    try {
      const res = await fetch('/api/vote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      body = await res.json().catch(() => null);
      if (!res.ok) throw new Error(body?.error || String(res.status));
    } catch {
      // Not saved: undo the optimistic vote and resync.
      const undo = new Set(next);
      undo.delete(id);
      setVoted(undo);
      saveVoted(undo);
      setFollowUp(null);
      load();
      return;
    }
    // The server already had this visitor's vote: show its count, not ours.
    if (!body?.counted) load();
    else patchRequest(id, (r) => ({ ...r, votes: body.votes }));
  };

  const chooseIntent = async (id, intent) => {
    const prev = intents[id];
    if (prev === intent) return;
    setIntents((m) => ({ ...m, [id]: intent }));
    const dReady = (isReady(intent) ? 1 : 0) - (isReady(prev) ? 1 : 0);
    const dPay = (intent === 'pay' ? 1 : 0) - (prev === 'pay' ? 1 : 0);
    patchRequest(id, (r) => ({ ...r, ready: (r.ready || 0) + dReady, pay: (r.pay || 0) + dPay }));
    setData((d) => ({ ...d, stats: d.stats ? { ...d.stats, total_ready: (d.stats.total_ready || 0) + dReady } : d.stats }));
    try {
      const res = await fetch('/api/vote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, intent }) });
      if (!res.ok) throw new Error(String(res.status));
    } catch {
      setIntents((m) => ({ ...m, [id]: prev }));
      load();
    }
  };

  const submitWatch = async (e, id) => {
    e.preventDefault();
    const email = watch.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setWatch((w) => ({ ...w, state: 'error', message: 'Enter a valid email.' }));
    setWatch((w) => ({ ...w, state: 'sending', message: '' }));
    try {
      const res = await fetch('/api/watch', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, email }) });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'Could not save that. Try again in a minute.');
      setWatch((w) => ({ ...w, state: 'idle', message: '', done: { ...w.done, [id]: true } }));
    } catch (err) {
      setWatch((w) => ({ ...w, state: 'error', message: err.message }));
    }
  };

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const earlyAccess = () => {
    setForm((f) => ({ ...f, title: `Early access: ${building?.title || 'In-house AI video production'}`, details: f.details || 'We want this set up for our team. ' }));
    setExpanded(true);
    ideaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => ideaRef.current?.focus(), 450);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (form.details.trim().length < 20) return setStatus({ state: 'error', message: 'Tell us what it should do in at least 20 characters.' });
    if (form.title.trim().length < 6) return setStatus({ state: 'error', message: 'Give it a short name, at least 6 characters.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setStatus({ state: 'error', message: 'Enter a valid email so we can reply.' });
    setStatus({ state: 'sending', message: '' });
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken: token })
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'Something went wrong. Try again in a minute.');
      setForm(emptyForm);
      setExpanded(false);
      setStatus({ state: 'sent', message: "Got it. We read every request, and approved ones join the vote." });
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    } finally {
      setToken('');
      setResetKey((k) => k + 1);
    }
  };

  const renderFollowUp = (r) => {
    const intent = intents[r.id];
    const watching = watch.done[r.id];
    return (
      <div className="f13-fu" role="group" aria-label={`More about your vote for ${r.title}`}>
        <button type="button" className="f13-fu-close" onClick={() => setFollowUp(null)} aria-label="Close">×</button>
        <span className="f13-fu-q">{intent ? 'Thanks. Want to hear when it ships?' : 'Vote counted. How much do you want it?'}</span>
        <div className="f13-fu-intents" role="radiogroup" aria-label="How much do you want it?">
          {INTENTS.map((o) => (
            <button key={o.id} type="button" role="radio" aria-checked={intent === o.id}
              className={`f13-fu-intent${intent === o.id ? ' is-on' : ''}${o.id === 'pay' ? ' is-pay' : ''}`}
              onClick={() => chooseIntent(r.id, o.id)}>
              {o.label}
            </button>
          ))}
        </div>
        {intent && (watching ? (
          <p className="f13-fu-done">We'll email you when it goes into build and when it ships. Nothing else.</p>
        ) : (
          <form className="f13-fu-watch" onSubmit={(e) => submitWatch(e, r.id)} noValidate>
            <input type="email" maxLength={160} value={watch.email} placeholder="Work email"
              aria-label="Email me when it ships"
              onChange={(e) => setWatch((w) => ({ ...w, email: e.target.value, state: 'idle', message: '' }))} />
            <button type="submit" className="f13-btn f13-btn-blue f13-btn-sm" disabled={watch.state === 'sending'}>
              {watch.state === 'sending' ? 'Saving…' : 'Tell me when it ships'}
            </button>
            {watch.message && <span className="f13-fu-err" role="status">{watch.message}</span>}
          </form>
        ))}
      </div>
    );
  };

  return (
    <section className="f13-sheet f13-sheet-graphite f13-board" id="request" ref={sectionRef}>
      <div className="f13-wrap">
        {showHeading && (
          <div className="f13-board-head">
            <span className="f13-board-pill"><span className="f13-live-dot" aria-hidden="true" />Live vote · next build picked in <strong>{countdown}</strong></span>
            <h1 className="f13-display f13-board-title">What should we <em>build next?</em></h1>
            <p className="f13-lede">One click, no sign-up. On the 1st of every month, the most wanted system goes into build, and everyone who voted for it hears first.</p>
          </div>
        )}

        <div className="f13-stats" aria-live="polite">
          {stats ? (
            <>
              <div className="f13-stat"><span className="f13-stat-v"><Count value={stats.total_votes} /></span><span className="f13-stat-l">votes so far</span></div>
              <div className="f13-stat"><span className="f13-stat-v"><Count value={stats.votes_24h} /></span><span className="f13-stat-l">in the last 24 hours</span></div>
              <div className="f13-stat"><span className="f13-stat-v"><Count value={stats.total_ready || 0} /></span><span className="f13-stat-l">teams ready to pilot or pay</span></div>
              <div className="f13-stat"><span className="f13-stat-v"><Count value={stats.total_requests} /></span><span className="f13-stat-l">systems requested{lastVote ? ` · last vote ${lastVote}` : ''}</span></div>
            </>
          ) : <div className="f13-stat is-wide"><span className="f13-stat-l">{loadState === 'offline' ? 'The board is offline right now. Try again in a minute.' : 'Loading live votes…'}</span></div>}
        </div>

        {data.activity.length > 0 && (
          <div className="f13-ticker-wrap"><ActivityTicker activity={data.activity} /></div>
        )}

        <div className="f13-board-grid">
          {/* Leaderboard */}
          <div className="f13-lb">
            <div className="f13-lb-head">
              <div className="f13-lb-tabs" role="tablist" aria-label="Sort the vote">
                {SORTS.map((t) => (
                  <button key={t.id} type="button" role="tab" aria-selected={sort === t.id}
                    className={sort === t.id ? 'is-on' : ''} onClick={() => setSort(t.id)}>{t.label}</button>
                ))}
              </div>
              <span>{voted.size ? `You've voted on ${[...voted].filter((id) => ballot.some((r) => r.id === id)).length}` : 'Tap ▲ to vote'}</span>
            </div>

            {loadState === 'offline' && <p className="f13-req-empty">The board is offline right now. Try again in a minute.</p>}
            {loadState === 'loading' && <p className="f13-req-empty">Loading the board…</p>}

            <ol className="f13-lb-list">
              {shown.map((r, i) => {
                const mine = voted.has(r.id);
                const move = moves[r.id];
                return (
                  <li key={r.id}
                    ref={(el) => { if (el) rowRefs.current.set(r.id, el); else rowRefs.current.delete(r.id); }}
                    className={`f13-lb-row${open === r.id ? ' is-open' : ''}${bumped === r.id ? ' is-bumped' : ''}${move > 0 ? ' is-rising' : ''}`}>
                    <button type="button" className="f13-lb-main" onClick={() => setOpen(open === r.id ? null : r.id)} aria-expanded={open === r.id}>
                      <span className="f13-lb-rank">
                        {i + 1}
                        {move ? <span className={`f13-lb-move ${move > 0 ? 'is-up' : 'is-down'}`} aria-label={`${move > 0 ? 'up' : 'down'} ${Math.abs(move)}`}>{move > 0 ? '▲' : '▼'}{Math.abs(move)}</span> : null}
                      </span>
                      <span className="f13-lb-body">
                        <span className="f13-lb-title">{r.title}</span>
                        <span className="f13-lb-meta">
                          {r.audience && <span className="f13-chip">{r.audience}</span>}
                          {r.votes_24h > 0 && <span className="f13-lb-delta">▲ {r.votes_24h} today</span>}
                          {r.ready > 0 && <span className="f13-lb-ready">{teams(r.ready)} ready to {r.pay > 0 ? 'pilot or pay' : 'pilot'}</span>}
                        </span>
                        <span className="f13-lb-bar" aria-hidden="true"><span style={{ width: `${(r.votes / maxVotes) * 100}%` }} /></span>
                        {open === r.id && <span className="f13-lb-details">{r.details}</span>}
                      </span>
                    </button>
                    <button
                      type="button"
                      className={`f13-lb-vote${mine ? ' is-voted' : ''}`}
                      onClick={() => vote(r.id)}
                      aria-pressed={mine}
                      aria-label={mine ? `You voted for ${r.title}. Show options` : `Vote for ${r.title}`}
                    >
                      {plus?.id === r.id && <span className="f13-lb-plus" key={plus.k} aria-hidden="true">+1</span>}
                      <span className="f13-lb-arrow" aria-hidden="true">▲</span>
                      <span className="f13-lb-count" key={r.votes}>{r.votes}</span>
                      <span className="f13-lb-cta">{mine ? 'Voted' : 'Vote'}</span>
                    </button>
                    {followUp === r.id && mine && renderFollowUp(r)}
                  </li>
                );
              })}
            </ol>

            {limit && ballot.length > limit && (
              <Link to="/requests" className="f13-lb-more">See all {ballot.length} systems →</Link>
            )}
          </div>

          {/* Right rail: now building + suggest */}
          <div className="f13-rail">
            <div className="f13-building">
              <span className="f13-building-tag">Now building</span>
              <h3 className="f13-h3">{building?.title || 'In-house AI video production'}</h3>
              <p>{building?.details || 'Open video and image models deployed in your own accounts, with your team trained to make brand videos, UGC and product content.'}</p>
              <div className="f13-building-foot">
                {building && (
                  <span>
                    {building.votes} {building.votes === 1 ? 'team wants' : 'teams want'} this
                    {building.ready > 0 && <> · {building.ready} ready to pilot</>}
                  </span>
                )}
                <button type="button" className="f13-btn f13-btn-light f13-btn-sm" onClick={earlyAccess}>Get early access</button>
              </div>
            </div>

            <form className={`f13-suggest${expanded ? ' is-expanded' : ''}`} onSubmit={submit} noValidate>
              <label className="f13-suggest-label" htmlFor="f13-idea">Don't see yours?</label>
              <textarea
                id="f13-idea"
                ref={ideaRef}
                rows={expanded ? 3 : 2}
                maxLength={1200}
                value={form.details}
                onChange={update('details')}
                onFocus={() => setExpanded(true)}
                placeholder="Describe the system you wish your team had…"
              />

              {expanded && (
                <div className="f13-suggest-more">
                  <input type="text" maxLength={90} value={form.title} onChange={update('title')} placeholder="Give it a short name" aria-label="System name" />
                  <div className="f13-seg" role="radiogroup" aria-label="Who are you?">
                    {AUDIENCES.map((a) => (
                      <button type="button" key={a} role="radio" aria-checked={form.audience === a} className={form.audience === a ? 'is-on' : ''} onClick={() => setForm((f) => ({ ...f, audience: a }))}>{a}</button>
                    ))}
                  </div>
                  <div className="f13-suggest-row">
                    <input type="email" maxLength={160} value={form.email} onChange={update('email')} placeholder="Work email (never shown)" aria-label="Work email" />
                    <input type="text" maxLength={90} value={form.company} onChange={update('company')} placeholder="Company (optional)" aria-label="Company" />
                  </div>
                  <label className="f13-hp" aria-hidden="true">Website<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} /></label>
                  <Turnstile onToken={setToken} resetKey={resetKey} />
                  <button type="submit" className="f13-btn f13-btn-blue" disabled={status.state === 'sending'}>
                    {status.state === 'sending' ? 'Sending…' : 'Add it to the vote'}
                  </button>
                </div>
              )}

              {status.message && <p className={`f13-req-status is-${status.state}`} role="status">{status.message}</p>}
              <p className="f13-req-note">We review each request before it joins the vote. Your email is only used to reply.</p>
            </form>
          </div>
        </div>

        {!limit && shipped.length > 0 && (
          <div className="f13-shipped">
            <div className="f13-shipped-head">
              <span className="f13-shipped-tag">Shipped from this board</span>
              <span className="f13-shipped-sub">Voted in, built, live with clients.</span>
            </div>
            <div className="f13-shipped-grid">
              {shipped.map((r) => (
                <article key={r.id} className="f13-shipped-card">
                  <span className="f13-shipped-meta">
                    <span className="f13-shipped-check" aria-hidden="true">✓</span>
                    {monthYear(parseUtc(r.shipped_at)) ? `Shipped ${monthYear(parseUtc(r.shipped_at))}` : 'Shipped'} · {r.votes} votes
                  </span>
                  <h3 className="f13-shipped-title">{r.title}</h3>
                  <p>{r.outcome || r.details}</p>
                  {r.link && <a className="f13-shipped-link" href={r.link}>See it →</a>}
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RequestSystem;
