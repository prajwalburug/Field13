import { json, visitorHash } from '../../server/shared.js';

const INTENTS = ['curious', 'pilot', 'pay'];

// POST /api/vote  { id, intent? }
// One vote per visitor per approved request. Sending `intent` again later
// records how much this visitor wants it, without adding a second vote.
export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400); }
  const id = Number.parseInt(body.id, 10);
  if (!Number.isInteger(id) || id < 1) return json({ error: 'Invalid request id.' }, 400);
  const intent = INTENTS.includes(body.intent) ? body.intent : null;

  const row = await env.DB.prepare(
    `SELECT votes FROM requests WHERE id = ? AND status = 'approved' AND (stage IS NULL OR stage != 'shipped')`
  ).bind(id).first();
  if (!row) return json({ error: 'Request not found.' }, 404);

  const voter = await visitorHash(request, env);
  const ins = await env.DB.prepare(
    `INSERT OR IGNORE INTO votes (request_id, voter_hash, intent) VALUES (?, ?, ?)`
  ).bind(id, voter, intent).run();

  if (ins.meta.changes > 0) {
    const updated = await env.DB.prepare(`UPDATE requests SET votes = votes + 1 WHERE id = ? RETURNING votes`).bind(id).first();
    return json({ ok: true, votes: updated.votes, counted: true, intent });
  }
  if (intent) {
    await env.DB.prepare(`UPDATE votes SET intent = ? WHERE request_id = ? AND voter_hash = ?`).bind(intent, id, voter).run();
  }
  return json({ ok: true, votes: row.votes, counted: false, intent });
}
