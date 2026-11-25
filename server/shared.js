// Helpers shared by the Pages Functions. Lives outside /functions so it is not a route.

export const json = (data, status = 200, extra = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extra }
  });

export const escapeHtml = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Salted hash of the visitor's IP and user agent. The raw IP is never stored. */
export async function visitorHash(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for') || 'local';
  const ua = request.headers.get('user-agent') || '';
  return sha256(`${ip}|${ua}|${env.HASH_SALT || 'field13-dev-salt'}`);
}

/** Verifies a Cloudflare Turnstile token. Fails closed when a secret is configured. */
export async function verifyTurnstile(token, request, env) {
  if (!env.TURNSTILE_SECRET) return { ok: false, reason: 'captcha not configured' };
  if (!token) return { ok: false, reason: 'missing captcha token' };
  const form = new FormData();
  form.append('secret', env.TURNSTILE_SECRET);
  form.append('response', token);
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) form.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
  const data = await res.json();
  return { ok: !!data.success, reason: (data['error-codes'] || []).join(',') };
}

export async function sendEmail(env, { to, subject, html, replyTo }) {
  if (!env.RESEND_API_KEY || !to) return { skipped: true };
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.EMAIL_FROM || 'Field13 <onboarding@resend.dev>',
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {})
    })
  });
  return { ok: res.ok, status: res.status };
}
