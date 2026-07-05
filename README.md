# ask2rowplanner — BTX Roots of War Planner

A live-syncing command sheet for the RoW team. Static site on Netlify + Supabase
for shared data. Everyone with the site sees the plan update live; only leaders
holding a **write key** can change it.

## Security model (read this — it's the honest version)
- **Reads are open to anyone holding the site.** The Supabase anon key ships in
  the browser (that's normal). Anyone who can load the page can read the plan.
- **Writes are gated by a leadership key**, checked inside the database by a
  `security definer` function (`save_plan`). The anon key has **no** direct
  write access to the table, so a regular member — or anyone who extracts the
  anon key — can read the plan but **cannot overwrite or wipe it**. This does
  not depend on the Netlify password working.
- **The Netlify password only gates the static files.** It does not protect
  Supabase (separate origin). Treat it as "keep casual outsiders off the page,"
  not as real data protection. Also: Basic-Auth via `_headers` may require a
  paid Netlify plan — **after deploying, open the site in a private window and
  confirm it actually prompts for a password.** If it doesn't, the page is
  public, but thanks to the write key the plan still can't be tampered with.
- No secrets live in this repo. The site password and the anon key are injected
  at build time from Netlify env vars; the leadership write key exists only as a
  bcrypt hash inside Supabase.

## ⚠️ Revoke any token pasted in chat
If a GitHub token was pasted into a chat, treat it as burned. Delete it at
GitHub → Settings → Developer settings → Personal access tokens. Generate a
fresh one on your own machine only when you push.

## Set up Supabase (once)
1. Supabase dashboard → SQL Editor → paste and run `supabase_schema.sql`.
   This creates the shared `plan` table (read-open, write-gated), the secret
   store, and the realtime feed.
2. Set the leadership write key (run in the SQL Editor, which runs as owner):
   ```sql
   select public.set_plan_secret('YOUR-LEADERSHIP-WRITE-KEY');
   ```
   Re-run any time to rotate it. Share this key only with leaders who may edit
   the plan (e.g. in a private leadership channel).

## Configure the site
The anon key and site password are NOT committed. Provide them one of two ways:

**Recommended — Netlify env vars (nothing sensitive in Git):**
Netlify → Site configuration → Environment variables, add:
- `SITE_PASSWORD` — the page password (share in your alliance Discord)
- `SITE_USER` — optional, defaults to `btx`
- `SUPABASE_ANON_KEY` — Supabase → Project Settings → API → **anon public** key
  (NOT the service_role key, NOT the DB password)

The build step (`scripts/inject-secrets.sh`) writes these into `_headers` and
`config.js` at deploy time.

**Manual (drag-and-drop deploys):** edit `public/_headers` (replace
`__SITE_PASSWORD__`) and `public/config.js` (replace the anon-key placeholder)
locally before dragging the folder in. Don't commit those edits.

## Deploy
### Option A — GitHub + Netlify (auto-deploys on push, recommended)
Push this folder, then Netlify → Add new site → Import from Git → pick the repo.
Build command and publish dir come from `netlify.toml`. Set the env vars above.

### Option B — drag & drop
Fill in the two placeholders manually (see above), then Netlify → Add new site →
Deploy manually → drag the **public** folder in.

## How it works
- One shared Supabase row (`plan`, id `btx`) holds map assignments + roster and
  syncs live via realtime.
- If Supabase isn't configured yet, the app runs local-only (localStorage), so
  it works before you finish wiring the backend.
- In the app, a leader taps **Write key** (on the Blue map tab) and enters the
  leadership key once per device; it's kept in that device's localStorage and
  sent with each save. Without it, saves stay local and the shared plan is
  untouched.

## To revoke access later
- Rotate the leadership write key: re-run `set_plan_secret('new-key')`.
- Change `SITE_PASSWORD` and redeploy.
