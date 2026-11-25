import { json, escapeHtml, sendEmail } from '../../../server/shared.js';

// POST /api/admin/notify  { id }   with header  Authorization: Bearer <ADMIN_TOKEN>
// Emails everyone watching request `id` about its current stage ('building' or 'shipped'),
// once per stage. Run it right after changing the stage in D1.
export async function onRequestPost({ request, env }) {
  const auth = request.headers.get('authorization') || '';
  if (!env.ADMIN_TOKEN || auth !== `Bearer ${env.ADMIN_TOKEN}`) return json({ error: 'Unauthorized.' }, 401);

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400); }
  const id = Number.parseInt(body.id, 10);
  const req = await env.DB.prepare(
    `SELECT id, title, stage, outcome, link FROM requests WHERE id = ? AND status = 'approved'`
  ).bind(id).first();
  if (!req) return json({ error: 'Request not found.' }, 404);
  if (!['building', 'shipped'].includes(req.stage)) return json({ error: `Stage is "${req.stage || 'none'}", nothing to announce.` }, 400);

  const { results: watchers } = await env.DB.prepare(
    `SELECT email FROM watchers WHERE request_id = ? AND (notified_stage IS NULL OR notified_stage != ?)`
  ).bind(id, req.stage).all();

  const site = env.SITE_URL || 'https://field13.com';
  const shipped = req.stage === 'shipped';
  const subject = shipped ? `It's live: ${req.title}` : `We're building it: ${req.title}`;
  const message = shipped
    ? `The system you voted for has shipped.${req.outcome ? ' ' + escapeHtml(req.outcome) : ''}`
    : 'The system you voted for won the vote and is now in build. Reply to this email if you want to be one of the first teams to get it.';
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;color:#111">
      <p style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#0E2A8F">Field13 · What should we build next?</p>
      <h2 style="margin:6px 0 12px">${escapeHtml(subject)}</h2>
      <p style="line-height:1.6">${message}</p>
      <p><a href="${escapeHtml(req.link || site + '/requests')}" style="color:#0E2A8F">${shipped ? 'See it' : 'See the board'} &rarr;</a></p>
      <p style="color:#777;font-size:12px">You asked to hear about this on field13.com. We only email when it changes stage.</p>
    </div>`;

  let sent = 0;
  for (const { email } of watchers) {
    const r = await sendEmail(env, { to: email, subject, html });
    if (r.ok) {
      sent += 1;
      await env.DB.prepare(`UPDATE watchers SET notified_stage = ? WHERE request_id = ? AND email = ?`).bind(req.stage, id, email).run();
    }
  }
  return json({ ok: true, stage: req.stage, watchers: watchers.length, sent });
}
