import { json, visitorHash } from '../../server/shared.js';

const MAX_PER_HOUR = 10;

// POST /api/watch  { id, email }: email me when this system goes into build or ships.
export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400); }
  if (body.website) return json({ ok: true }, 201); // honeypot

  const id = Number.parseInt(body.id, 10);
  const email = String(body.email || '').trim().toLowerCase();
  if (!Number.isInteger(id) || id < 1) return json({ error: 'Invalid request id.' }, 400);
  if (email.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Enter a valid email.' }, 400);

  const row = await env.DB.prepare(
    `SELECT stage FROM requests WHERE id = ? AND status = 'approved' AND (stage IS NULL OR stage != 'shipped')`
  ).bind(id).first();
  if (!row) return json({ error: 'Request not found.' }, 404);

  const ipHash = await visitorHash(request, env);
  const recent = await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM watchers WHERE ip_hash = ? AND created_at > datetime('now', '-1 hour')`
  ).bind(ipHash).first();
  if ((recent?.n || 0) >= MAX_PER_HOUR) return json({ error: 'Too many sign-ups from you in the last hour. Try again later.' }, 429);

  // Already in build? Count that stage as announced, so they only hear about the ship.
  await env.DB.prepare(
    `INSERT OR IGNORE INTO watchers (request_id, email, ip_hash, notified_stage) VALUES (?, ?, ?, ?)`
  ).bind(id, email, ipHash, row.stage || null).run();

  return json({ ok: true }, 201);
}
