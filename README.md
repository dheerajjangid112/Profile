# Profile UI (Vite + React)

## Subscribe email (serverless)

This project is a static Vite UI plus a serverless endpoint that sends subscription details to an email address.

### How it works
- The UI posts the form to `POST /api/subscribe`.
- The API uses SMTP (via `nodemailer`) to email the details to `SUBSCRIBE_TO_EMAIL` (default: `dheerajjangid961@gmail.com`).

### Required environment variables (API)
Set these in your hosting provider (recommended: Vercel free tier).

- `SMTP_HOST` (e.g. `smtp.gmail.com`)
- `SMTP_PORT` (e.g. `587`)
- `SMTP_USER` (your SMTP username)
- `SMTP_PASS` (your SMTP password / app password)

Optional:
- `SMTP_SECURE` (`true` for port 465)
- `MAIL_FROM` (defaults to `SMTP_USER`)
- `SUBSCRIBE_TO_EMAIL` (defaults to `dheerajjangid961@gmail.com`)
- `ALLOWED_ORIGINS` (comma-separated list of allowed origins, e.g. `https://your-site.vercel.app,https://your-domain.com`)

### Deploy on Vercel (recommended)
1. Push this repo to GitHub.
2. Import in Vercel.
3. Add the environment variables above.
4. Deploy.

Vercel will automatically host:
- the static UI
- the serverless function at `api/subscribe.js` as `/api/subscribe`

### Local dev notes
- `npm run dev` runs only the Vite UI.
- The `/api/subscribe` route is NOT available unless you run a local function server.

If you do run a local function server on `http://127.0.0.1:8787`, Vite is configured to proxy `/api/*` there.

