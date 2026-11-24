import { json, escapeHtml, visitorHash, verifyTurnstile, sendEmail } from '../../server/shared.js';

// POST /api/builders: an AI marketer or growth lead applies to co-build systems with Field13.
// Stored privately; nothing here is ever returned by a public endpoint.

const EXPERIENCE = ['2-4', '5-8', '9+'];
const LIMITS = { name: [2, 80], email: [5, 160], linkedin: [12, 200], role: [4, 120], system: [0, 120], pitch: [30, 1200] };
const MAX_PER_HOUR = 2;

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400); }

  // Honeypot: real people never fill this hidden field.
  if (body.website) return json({ ok: true }, 201);

  const clean = (k) => String(body[k] || '').trim();
  const name = clean('name');
  const email = clean('email').toLowerCase();
  const linkedin = clean('linkedin');
  const role = clean('role');
  const system = clean('system');
  const pitch = clean('pitch');
  const experience = EXPERIENCE.includes(body.experience) ? body.experience : null;

  const outOfRange = (v, [min, max]) => v.length < min || v.length > max;
  if (outOfRange(name, LIMITS.name)) return json({ error: 'Add your name.' }, 400);
  if (outOfRange(email, LIMITS.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Enter a valid work email.' }, 400);
  if (outOfRange(linkedin, LIMITS.linkedin) || !/linkedin\.com\//i.test(linkedin)) return json({ error: 'Add your LinkedIn profile link.' }, 400);
  if (outOfRange(role, LIMITS.role)) return json({ error: 'Tell us your current role and company.' }, 400);
  if (outOfRange(system, LIMITS.system)) return json({ error: 'Keep the system name under 120 characters.' }, 400);
  if (outOfRange(pitch, LIMITS.pitch)) return json({ error: 'Tell us what you bring in 30 to 1,200 characters.' }, 400);

  const captcha = await verifyTurnstile(body.turnstileToken, request, env);
  if (!captcha.ok) return json({ error: 'Please complete the spam check and try again.' }, 400);

  const ipHash = await visitorHash(request, env);
  const recent = await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM builders WHERE ip_hash = ? AND created_at > datetime('now', '-1 hour')`
  ).bind(ipHash).first();
  if ((recent?.n || 0) >= MAX_PER_HOUR) return json({ error: 'We already have your application. We will be in touch.' }, 429);

  const inserted = await env.DB.prepare(
    `INSERT INTO builders (name, email, linkedin, role, experience, system, pitch, ip_hash)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`
  ).bind(name, email, linkedin, role, experience, system || null, pitch, ipHash).first();

  await sendEmail(env, {
    to: env.NOTIFY_EMAIL,
    replyTo: email,
    subject: `Build with us #${inserted.id}: ${name}, ${role}`.slice(0, 140),
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;color:#111">
        <p style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#0E2A8F">Field13 · Build with us</p>
        <h2 style="margin:6px 0 4px">${escapeHtml(name)}</h2>
        <p style="margin:0 0 12px;color:#555">${escapeHtml(role)}${experience ? ' · ' + escapeHtml(experience) + ' years' : ''}</p>
        <p><a href="${escapeHtml(linkedin)}">${escapeHtml(linkedin)}</a> · ${escapeHtml(email)}</p>
        ${system ? `<p><strong>Wants to build:</strong> ${escapeHtml(system)}</p>` : ''}
        <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(pitch)}</p>
        <p style="color:#555;font-size:13px">Next: reply to book a call. Track it in D1:<br>
        <code>UPDATE builders SET status = 'call' WHERE id = ${inserted.id};</code></p>
      </div>`
  });

  return json({ ok: true, id: inserted.id }, 201);
}
