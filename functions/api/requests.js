import { json, escapeHtml, visitorHash, verifyTurnstile, sendEmail } from '../../server/shared.js';

const AUDIENCES = ['Agency', 'SaaS team', 'Brand', 'Other'];
const LIMITS = { title: [6, 90], details: [20, 1200], company: [0, 90], email: [5, 160] };
const MAX_PER_HOUR = 3;

// GET /api/requests: approved requests with live stats, recent activity, shipped
// systems and this visitor's own votes. Emails are never returned.
export async function onRequestGet({ request, env }) {
  const voter = await visitorHash(request, env);
  const [list, stats, activity, mine] = await env.DB.batch([
    env.DB.prepare(
      `SELECT r.id, r.title, r.details, r.audience, r.stage, r.votes, r.created_at,
              r.outcome, r.link, r.shipped_at,
              (SELECT COUNT(*) FROM votes v WHERE v.request_id = r.id AND v.created_at > datetime('now', '-1 day')) AS votes_24h,
              (SELECT COUNT(*) FROM votes v WHERE v.request_id = r.id AND v.intent IN ('pilot', 'pay')) AS ready,
              (SELECT COUNT(*) FROM votes v WHERE v.request_id = r.id AND v.intent = 'pay') AS pay
         FROM requests r
        WHERE r.status = 'approved'
        ORDER BY (r.stage = 'building') DESC, r.votes DESC, r.created_at ASC
        LIMIT 60`
    ),
    env.DB.prepare(
      `SELECT
         (SELECT COUNT(*) FROM votes) AS total_votes,
         (SELECT COUNT(*) FROM votes WHERE created_at > datetime('now', '-1 day')) AS votes_24h,
         (SELECT MAX(created_at) FROM votes) AS last_vote_at,
         (SELECT COUNT(*) FROM requests WHERE status != 'rejected') AS total_requests,
         (SELECT COUNT(*) FROM votes WHERE intent IN ('pilot', 'pay')) AS total_ready`
    ),
    env.DB.prepare(
      `SELECT r.id AS request_id, r.title, v.intent, v.created_at
         FROM votes v JOIN requests r ON r.id = v.request_id
        WHERE r.status = 'approved'
        ORDER BY v.created_at DESC
        LIMIT 8`
    ),
    env.DB.prepare(`SELECT request_id, intent FROM votes WHERE voter_hash = ?`).bind(voter)
  ]);
  return json({
    requests: list.results,
    stats: stats.results[0],
    activity: activity.results,
    mine: mine.results
  });
}

// POST /api/requests: new request, stored as pending until approved.
export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400); }

  // Honeypot: real people never fill this hidden field.
  if (body.website) return json({ ok: true }, 201);

  const title = String(body.title || '').trim();
  const details = String(body.details || '').trim();
  const company = String(body.company || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  const audience = AUDIENCES.includes(body.audience) ? body.audience : 'Other';

  const outOfRange = (v, [min, max]) => v.length < min || v.length > max;
  if (outOfRange(title, LIMITS.title)) return json({ error: 'Give the system a name of 6 to 90 characters.' }, 400);
  if (outOfRange(details, LIMITS.details)) return json({ error: 'Describe what it should do in 20 to 1,200 characters.' }, 400);
  if (outOfRange(company, LIMITS.company)) return json({ error: 'Company name is too long.' }, 400);
  if (outOfRange(email, LIMITS.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Enter a valid email.' }, 400);

  const captcha = await verifyTurnstile(body.turnstileToken, request, env);
  if (!captcha.ok) return json({ error: 'Please complete the spam check and try again.' }, 400);

  const ipHash = await visitorHash(request, env);
  const recent = await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM requests WHERE ip_hash = ? AND created_at > datetime('now', '-1 hour')`
  ).bind(ipHash).first();
  if ((recent?.n || 0) >= MAX_PER_HOUR) return json({ error: 'Too many requests from you in the last hour. Try again later.' }, 429);

  const inserted = await env.DB.prepare(
    `INSERT INTO requests (title, details, audience, company, email, ip_hash) VALUES (?, ?, ?, ?, ?, ?) RETURNING id`
  ).bind(title, details, audience, company || null, email, ipHash).first();

  await sendEmail(env, {
    to: env.NOTIFY_EMAIL,
    replyTo: email,
    subject: `New system request #${inserted.id}: ${title}`.slice(0, 140),
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;color:#111">
        <p style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#0E2A8F">Field13 · Request a system</p>
        <h2 style="margin:6px 0 12px">${escapeHtml(title)}</h2>
        <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(details)}</p>
        <p style="color:#555">${escapeHtml(audience)}${company ? ' · ' + escapeHtml(company) : ''} · ${escapeHtml(email)}</p>
        <p style="color:#555;font-size:13px">Status: pending. Approve it in the D1 console:<br>
        <code>UPDATE requests SET status = 'approved' WHERE id = ${inserted.id};</code></p>
      </div>`
  });

  return json({ ok: true, id: inserted.id }, 201);
}
