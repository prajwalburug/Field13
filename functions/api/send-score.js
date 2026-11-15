import { json, escapeHtml, sendEmail } from '../../server/shared.js';

// POST /api/send-score: emails the readiness quiz result (Cloudflare port of api/send-score.js).
export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400); }
  const { name, email, overall_score, dimension_scores, top_fixes } = body;
  if (!name || !email) return json({ error: 'Missing name or email' }, 400);

  const dimRows = Object.entries(dimension_scores || {})
    .map(([dim, score]) => `<tr><td style="padding:8px 0;color:#5A5A5A;border-bottom:1px solid #E4E4E0;">${escapeHtml(dim)}</td><td style="padding:8px 0;text-align:right;font-family:monospace;border-bottom:1px solid #E4E4E0;">${Number(score) || 0}/100</td></tr>`)
    .join('');
  const fixItems = (top_fixes || [])
    .map((f, i) => `<div style="margin:0 0 14px;"><p style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#0E2A8F;margin:0;">Fix ${i + 1} · ${escapeHtml(f.dim)}</p><p style="font-weight:bold;margin:4px 0;">${escapeHtml(f.h)}</p><p style="color:#5A5A5A;margin:0;line-height:1.5;">${escapeHtml(f.p)}</p></div>`)
    .join('');

  const html = `
    <div style="max-width:520px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;color:#111;">
      <p style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#0E2A8F;">Field13 AI Readiness Score</p>
      <h1 style="font-size:26px;margin:8px 0 4px;">Hi ${escapeHtml(name)}, your score is ${Number(overall_score) || 0}/100</h1>
      <p style="color:#5A5A5A;line-height:1.6;">Here is how your setup scored across all five dimensions:</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;border-top:1px solid #D9D5CA;border-bottom:1px solid #D9D5CA;">${dimRows}</table>
      <h2 style="font-size:16px;margin:20px 0 8px;">Your top 3 fixes</h2>
      ${fixItems}
      <p style="margin-top:24px;"><a href="https://cal.com/field13-r657gn/45min" style="background:#0E2A8F;color:#fff;padding:14px 24px;text-decoration:none;display:inline-block;font-size:13px;border-radius:6px;">Book a discovery call →</a></p>
      <p style="font-size:12px;color:#8A8A8A;margin-top:30px;border-top:1px solid #D9D5CA;padding-top:14px;">FIELD13 · AI systems behind modern marketing</p>
    </div>`;

  const sent = await sendEmail(env, { to: email, subject: `Your Field13 AI readiness score: ${Number(overall_score) || 0}/100`, html });
  if (env.NOTIFY_EMAIL) await sendEmail(env, { to: env.NOTIFY_EMAIL, subject: `Quiz completed: ${name} (${overall_score}/100)`, html, replyTo: email });
  if (sent.skipped) return json({ ok: true, skipped: true });
  return sent.ok ? json({ ok: true }) : json({ error: 'Email failed' }, 502);
}
