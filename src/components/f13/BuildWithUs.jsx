import { useEffect, useRef, useState } from 'react';
import Turnstile from './Turnstile';
import { CAL_LINK } from '../../data/site';

/*
 * The two-way side of the vote: experienced AI marketers and growth leads apply
 * to co-build the systems people vote for. Apply here, then a call, then build.
 * The after-vote popup can open this with a system already filled in ("f13:cobuild").
 */
const EXPERIENCE = [
  { id: '2-4', label: '2–4 years' },
  { id: '5-8', label: '5–8 years' },
  { id: '9+', label: '9+ years' }
];
const empty = { name: '', email: '', linkedin: '', role: '', experience: '5-8', system: '', pitch: '', website: '' };

const fit = [
  'You run growth, performance or marketing ops inside a company today.',
  'You have shipped AI workflows that someone actually relies on.',
  'You want to build with real brands, not side-project demos.'
];
const steps = [
  { n: '01', name: 'Apply', body: 'Tell us who you are and what you would build.' },
  { n: '02', name: 'Call', body: 'A call with Prajwal or Subhajit to see if it fits.' },
  { n: '03', name: 'Build', body: 'Pick a system from the race and build it with us.' }
];

const BuildWithUs = () => {
  const [form, setForm] = useState(empty);
  const [token, setToken] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [sentName, setSentName] = useState('');
  const sectionRef = useRef(null);
  const firstRef = useRef(null);

  // Opened from the after-vote popup with a system already chosen.
  useEffect(() => {
    const onCoBuild = (e) => {
      const system = e.detail?.system;
      if (system) setForm((f) => ({ ...f, system }));
      // Wait a frame so the popup has closed and handed focus back before we scroll.
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => firstRef.current?.focus({ preventScroll: true }), 700);
      }, 60);
    };
    window.addEventListener('f13:cobuild', onCoBuild);
    return () => window.removeEventListener('f13:cobuild', onCoBuild);
  }, []);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setStatus({ state: 'error', message: 'Add your name.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setStatus({ state: 'error', message: 'Enter a valid work email.' });
    if (!/linkedin\.com\//i.test(form.linkedin)) return setStatus({ state: 'error', message: 'Add your LinkedIn profile link.' });
    if (form.role.trim().length < 4) return setStatus({ state: 'error', message: 'Tell us your current role and company.' });
    if (form.pitch.trim().length < 30) return setStatus({ state: 'error', message: 'Tell us what you bring in at least 30 characters.' });
    setStatus({ state: 'sending', message: '' });
    try {
      const res = await fetch('/api/builders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken: token })
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'Something went wrong. Try again in a minute.');
      setSentName(form.name.trim().split(' ')[0]);
      setForm(empty);
      setStatus({ state: 'sent', message: '' });
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    } finally {
      setToken('');
      setResetKey((k) => k + 1);
    }
  };

  return (
    <section className="f13-sheet f13-sheet-graphite bw bw-dark" id="build-with-us" ref={sectionRef}>
      <div className="f13-wrap bw-grid">
        <div className="bw-copy">
          <div className="f13-label">Build with us</div>
          <h2 className="f13-h2">Already running growth somewhere? <em>Build the next system with us.</em></h2>
          <p className="f13-lede">
            This board works both ways. If you are an AI marketer or growth lead with real experience inside a company,
            you can help build the systems people vote for. You bring the know-how from the field, we bring the stack and the clients.
          </p>

          <div className="bw-fit">
            <span className="bw-fit-title">Who it's for</span>
            <ul>{fit.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>

          <ol className="bw-steps">
            {steps.map((s) => (
              <li key={s.n}>
                <span className="bw-step-n">{s.n}</span>
                <strong>{s.name}</strong>
                <span>{s.body}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bw-card">
          {status.state === 'sent' ? (
            <div className="bw-done" role="status">
              <span className="bw-done-check" aria-hidden="true">✓</span>
              <h3 className="bw-done-title">Thanks{sentName ? `, ${sentName}` : ''}. Next step is a call.</h3>
              <p>We read every application ourselves. Book a slot now, or we'll email you to set one up.</p>
              <a href={CAL_LINK} className="f13-btn f13-btn-blue" target="_blank" rel="noopener noreferrer">Book the call</a>
            </div>
          ) : (
            <form className="bw-form" onSubmit={submit} noValidate>
              <h3 className="bw-form-title">Apply to co-build</h3>
              <div className="bw-row">
                <label className="bw-field"><span>Name</span>
                  <input ref={firstRef} type="text" maxLength={80} value={form.name} onChange={update('name')} autoComplete="name" />
                </label>
                <label className="bw-field"><span>Work email</span>
                  <input type="email" maxLength={160} value={form.email} onChange={update('email')} autoComplete="email" />
                </label>
              </div>
              <label className="bw-field"><span>LinkedIn</span>
                <input type="url" maxLength={200} value={form.linkedin} onChange={update('linkedin')} placeholder="linkedin.com/in/…" />
              </label>
              <label className="bw-field"><span>Current role and company</span>
                <input type="text" maxLength={120} value={form.role} onChange={update('role')} placeholder="Head of Growth at …" />
              </label>
              <div className="bw-field">
                <span id="bw-exp">Experience in growth or marketing</span>
                <div className="bw-seg" role="radiogroup" aria-labelledby="bw-exp">
                  {EXPERIENCE.map((o) => (
                    <button key={o.id} type="button" role="radio" aria-checked={form.experience === o.id}
                      className={form.experience === o.id ? 'is-on' : ''}
                      onClick={() => setForm((f) => ({ ...f, experience: o.id }))}>{o.label}</button>
                  ))}
                </div>
              </div>
              <label className="bw-field"><span>What would you build? <em>Optional</em></span>
                <input type="text" maxLength={120} value={form.system} onChange={update('system')} placeholder="A system from the race, or your own idea" />
              </label>
              <label className="bw-field"><span>What you bring</span>
                <textarea rows={3} maxLength={1200} value={form.pitch} onChange={update('pitch')} placeholder="What you've built or run, and the results it had" />
              </label>
              <label className="f13-hp" aria-hidden="true">Website<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} /></label>
              <Turnstile onToken={setToken} resetKey={resetKey} />
              {status.state === 'error' && <p className="bw-error" role="status">{status.message}</p>}
              <button type="submit" className="f13-btn f13-btn-blue bw-submit" disabled={status.state === 'sending'}>
                {status.state === 'sending' ? 'Sending…' : 'Apply and book a call'}
              </button>
              <p className="bw-note">Your details stay with us. We only use them to reply.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default BuildWithUs;
