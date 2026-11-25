# Deploying field13.com on Cloudflare (free plan)

The site is a static Vite build plus three Cloudflare Pages Functions:

| Route | File | What it does |
|---|---|---|
| `GET /api/requests` | `functions/api/requests.js` | Approved requests, most voted first. Never returns emails. |
| `POST /api/requests` | `functions/api/requests.js` | New request: validation, honeypot, Turnstile check, 3 per hour per visitor, saved as `pending`, email to you. |
| `POST /api/vote` | `functions/api/vote.js` | One vote per visitor per approved request. Sending `intent` (`curious` / `pilot` / `pay`) again records how much they want it. |
| `POST /api/watch` | `functions/api/watch.js` | "Tell me when it ships": stores an email per request (10 per hour per visitor). |
| `POST /api/admin/notify` | `functions/api/admin/notify.js` | Emails a request's watchers about its current stage. Needs the `ADMIN_TOKEN` secret. |
| `POST /api/send-score` | `functions/api/send-score.js` | Readiness quiz email (port of the old Vercel `api/send-score.js`). |

Data lives in a Cloudflare D1 database (`db/schema.sql`).

## One-time setup (about 20 minutes)

1. **Log in to Cloudflare from this folder.** This opens your browser.
   ```bash
   npx wrangler login
   ```
2. **Create the database** and copy the `database_id` it prints into `wrangler.toml`.
   ```bash
   npx wrangler d1 create field13-requests
   ```
3. **Create the tables** in the live database, then load the starter ballot (six systems at 0 votes, with *In-house AI video production* marked as now building).
   ```bash
   npm run cf:db:remote
   ```
   ```bash
   npm run cf:seed:remote
   ```
4. **Create a Turnstile widget** in the Cloudflare dashboard (Turnstile → Add widget, domain `field13.com`, mode *Managed*). You get a **site key** and a **secret key**.
5. **Create the Pages project.** Easiest: Cloudflare dashboard → Workers & Pages → Create → Pages → connect the `prajwalburug/Field13` GitHub repo.
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable (build): `VITE_TURNSTILE_SITE_KEY` = the Turnstile **site key**
6. **Add the secrets** (Pages project → Settings → Variables and secrets, type *Secret*):
   - `TURNSTILE_SECRET` = the Turnstile **secret key**
   - `RESEND_API_KEY` = your Resend key (same one Vercel uses today)
   - `HASH_SALT` = any long random string
   - `ADMIN_TOKEN` = another long random string, used to send "it's in build / it shipped" emails
   - Optional: `EMAIL_FROM` = e.g. `Field13 <hello@field13.com>` once the domain is verified in Resend
7. **Bind the database** if the dashboard didn't pick it up from `wrangler.toml`: Settings → Bindings → D1 → variable `DB` → `field13-requests`.
8. **Move the domain.** Pages project → Custom domains → add `field13.com`. Once it serves correctly, remove the domain from Vercel. After that `vercel.json` and the `api/` folder can be deleted.

Alternative to steps 5–7 without GitHub: `npm run cf:deploy` (then add the variables and secrets in the dashboard).

## Running it locally

```bash
npm run cf:db:local
```
```bash
npm run cf:dev
```
Opens the full site with the functions at http://localhost:8788, using Cloudflare's always-pass Turnstile test keys from `.env.cfdev` and `.dev.vars`.

## Approving requests

New requests arrive by email and wait as `pending`. Approve or reject them in the Cloudflare dashboard (D1 → field13-requests → Console) or from the terminal:

```bash
npx wrangler d1 execute field13-requests --remote --command "SELECT id, title, audience, company, email, created_at FROM requests WHERE status = 'pending' ORDER BY created_at"
```
```bash
npx wrangler d1 execute field13-requests --remote --command "UPDATE requests SET status = 'approved' WHERE id = 12"
```
```bash
npx wrangler d1 execute field13-requests --remote --command "UPDATE requests SET status = 'rejected' WHERE id = 13"
```

## Upgrading an existing database (board v2)

A database created before board v2 needs one migration (adds vote intent, watchers and the shipped fields). Run it once:

```bash
npm run cf:migrate:remote
```

New databases created from `db/schema.sql` already include it; don't run the migration on those.

## The board

- **Now building:** whichever approved request has `stage = 'building'` sits in the blue card.
- **Shipping one and starting the next:** give the shipped one a one-line outcome (and optionally a link), then email its watchers:
  ```bash
  npx wrangler d1 execute field13-requests --remote --command "UPDATE requests SET stage = 'shipped', shipped_at = datetime('now'), outcome = 'Running for 3 agencies, saving about 6 hours a week each.', link = 'https://field13.com/insights/...' WHERE id = 1; UPDATE requests SET stage = 'building' WHERE id = 4"
  ```
  ```bash
  curl -X POST https://field13.com/api/admin/notify -H "Authorization: Bearer $ADMIN_TOKEN" -H "Content-Type: application/json" -d '{"id":1}'
  ```
  ```bash
  curl -X POST https://field13.com/api/admin/notify -H "Authorization: Bearer $ADMIN_TOKEN" -H "Content-Type: application/json" -d '{"id":4}'
  ```
  Each watcher gets one email per stage. Shipped requests leave the vote and appear on the **Shipped from this board** strip on /requests.
- **Demand signal:** after voting, people say whether they're just curious, would pilot it, or would pay. See who's ready:
  ```bash
  npx wrangler d1 execute field13-requests --remote --command "SELECT r.title, COUNT(*) AS votes, SUM(v.intent = 'pilot') AS pilot, SUM(v.intent = 'pay') AS pay FROM votes v JOIN requests r ON r.id = v.request_id GROUP BY r.id ORDER BY pay DESC, pilot DESC"
  ```
  ```bash
  npx wrangler d1 execute field13-requests --remote --command "SELECT r.title, w.email, w.created_at FROM watchers w JOIN requests r ON r.id = w.request_id ORDER BY w.created_at DESC"
  ```
- **Monthly pick:** the countdown on the board counts to the 1st of next month (UTC) and promises the most-voted system goes into build then. Change the copy in `src/components/f13/RequestSystem.jsx` if that cadence changes.
- **Live numbers:** votes, votes today, teams ready to pilot or pay, systems requested, "last vote" and the Live ticker all come from the database. The board refreshes every 20 seconds while it's on screen (and when the tab comes back into focus); rows slide to their new rank and show ▲/▼ for a few seconds. Nothing is invented.
