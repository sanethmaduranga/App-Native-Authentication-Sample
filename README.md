# WSO2 IS — App-Native Authentication Sample (Next.js)

A Next.js sample application demonstrating **app-native authentication** with [WSO2 Identity Server](https://wso2.com/identity-server/) using the [`@asgardeo/nextjs`](https://www.npmjs.com/package/@asgardeo/nextjs) SDK.

## Features

- Sign in / Sign out (app-native, no browser redirect)
- User profile display
- **Password recovery** via email OTP (with reCAPTCHA v2)
- **Username recovery** via email
- WSO2 IS themed UI across all pages

---

## Prerequisites

| Requirement | Version |
|---|---|
| Node.js | 18 or later |
| npm | 9 or later |
| Java (JDK) | 17 (recommended) or 11 |
| WSO2 Identity Server | 7.2.0 |

---

## Step 1 — Set Up WSO2 Identity Server (Single Node, Development)

### 1.1 Download and Extract

Download the WSO2 IS 7.2.0 distribution from the [WSO2 releases page](https://github.com/wso2/product-is/releases/tag/v7.2.0) and extract it:

```bash
unzip wso2is-7.2.0.zip
cd wso2is-7.2.0
```

### 1.2 Configure Email Notifications

Account recovery (password reset / username recovery) requires IS to send emails. Configure the SMTP settings in:

```
<IS_HOME>/repository/conf/deployment.toml
```

Add or update the following block. Example using **Gmail**:

```toml
[output_adapter.email]
from_address    = "your-sender@gmail.com"
username        = "your-sender@gmail.com"
password        = "<your-gmail-app-password>"
hostname        = "smtp.gmail.com"
port            = 587
enable_start_tls = true
enable_authentication = true
```

> **Gmail App Password** — if your Google account has 2-Step Verification enabled (recommended), you cannot use your regular password here. Generate an App Password at:
> [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
> Select **Mail** as the app and copy the 16-character password into the `password` field above.

Other common SMTP providers:

<details>
<summary>Office 365 / Outlook</summary>

```toml
[output_adapter.email]
from_address    = "your-sender@outlook.com"
username        = "your-sender@outlook.com"
password        = "<your-password>"
hostname        = "smtp.office365.com"
port            = 587
enable_start_tls = true
enable_authentication = true
```
</details>

<details>
<summary>Custom SMTP server</summary>

```toml
[output_adapter.email]
from_address    = "no-reply@yourdomain.com"
username        = "no-reply@yourdomain.com"
password        = "<your-password>"
hostname        = "mail.yourdomain.com"
port            = 587
enable_start_tls = true
enable_authentication = true
```
</details>

### 1.3 Start the Server

**Linux / macOS:**
```bash
sh <IS_HOME>/bin/wso2server.sh
```

**Windows:**
```bash
<IS_HOME>\bin\wso2server.bat
```

Wait until you see:

```
[timestamp] INFO  {org.wso2.carbon.ui.internal.CarbonUIServiceComponent} -
 Mgt Console URL  : https://localhost:9443/console
```

The IS Management Console is now available at `https://localhost:9443/console`.
Default credentials: **admin / admin**

> **Browser certificate warning** — IS ships with a self-signed certificate. When you first visit `https://localhost:9443` your browser will show a security warning. Click **Advanced → Proceed to localhost** to accept it. This is required for the OIDC logout redirect to work from the app.

---

## Step 2 — Register the Application in WSO2 IS

1. Sign in to `https://localhost:9443/console` with **admin / admin**
2. Go to **Applications** → **New Application** → **Standard-Based Application**
3. Select **OAuth2 / OpenID Connect** and fill in:
   - **Name**: `is-nextjs` (or any name)
   - **Allowed grant types**: `Code`
   - **Authorized redirect URLs**: `http://localhost:3000`
   - **Allowed origins**: `http://localhost:3000`
4. Click **Register** — note down the **Client ID** and **Client Secret** from the Protocol tab
5. Under the **Login Flow** tab, enable **App-Native Authentication**

---

## Step 3 — Enable Account Recovery in WSO2 IS

### Password Recovery

1. Go to **Login & Registration** → **Account Recovery** → **Password Recovery**
2. Enable **Email OTP** under notification methods
3. Save

### Username Recovery

1. Go to **Login & Registration** → **Account Recovery** → **Username Recovery**
2. Enable **Email** notification
3. Save

> **Recovery callback URL regex** — under Password Recovery settings, ensure the regex allows your app's URL. For local development set it to:
> ```
> .*
> ```
> Restrict this appropriately in production (e.g. `https://yourdomain.com/.*`).

---

## Step 4 — Configure the Application

All configuration lives in a **single file**. Copy the example and fill in your values:

```bash
cp .env.example .env.local
```

Open `.env.local` and set each value:

```bash
# ── WSO2 Identity Server ──────────────────────────────────────────
NEXT_PUBLIC_ASGARDEO_BASE_URL="https://localhost:9443"

# From IS Console → Applications → your app → Protocol tab
NEXT_PUBLIC_ASGARDEO_CLIENT_ID="<your-client-id>"
ASGARDEO_CLIENT_SECRET="<your-client-secret>"

# Generate with: openssl rand -base64 32
ASGARDEO_SECRET="<your-random-secret>"

NEXT_PUBLIC_ASGARDEO_SIGN_IN_URL="/sign-in"

# ── IS Admin Credentials (server-side recovery API calls) ─────────
IS_ADMIN_USERNAME="admin"
IS_ADMIN_PASSWORD="admin"

# ── Google reCAPTCHA v2 ───────────────────────────────────────────
# Get keys from https://www.google.com/recaptcha/admin
# For local testing you can use Google's public test keys (see .env.example)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="<your-recaptcha-site-key>"
RECAPTCHA_SECRET_KEY="<your-recaptcha-secret-key>"
```

All these values are centralised in [`lib/config.ts`](./lib/config.ts) — no other files need to be edited for configuration.

---

## Step 5 — Handle the IS Self-Signed Certificate

The following line in `next.config.ts` disables TLS verification for the Next.js server process so server-side API calls to IS succeed with the self-signed certificate:

```ts
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
```

> **Remove this line before deploying to production.** In production IS should have a valid CA-signed TLS certificate.

---

## Step 6 — Install Dependencies and Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Application Routes

| Route | Description |
|---|---|
| `/` | Home — shows user profile when signed in |
| `/sign-in` | App-native sign-in page |
| `/forgot-password` | Password recovery — enter username → reCAPTCHA → email OTP |
| `/reset-password` | Enter OTP from email → set new password |
| `/forgot-username` | Username recovery — enter email → username sent to email |

---

## Project Structure

```
is-nextjs/
├── .env.example              ← copy to .env.local and fill in values
├── lib/
│   └── config.ts             ← single source of truth for all configuration
├── app/
│   ├── layout.tsx            # Root layout with AsgardeoProvider
│   ├── page.tsx              # Home page
│   ├── sign-in/page.tsx      # Sign-in page
│   ├── forgot-password/      # Password recovery flow
│   ├── reset-password/       # OTP verification + new password
│   ├── forgot-username/      # Username recovery flow
│   ├── components/
│   │   └── AuthLayout.tsx    # Shared WSO2 IS themed layout for auth pages
│   └── api/recovery/         # Server-side proxy routes to IS recovery APIs
│       ├── init/             # POST /api/users/v2/recovery/password/init
│       ├── recover/          # POST /api/users/v2/recovery/password/recover
│       ├── confirm/          # POST /api/users/v2/recovery/password/confirm
│       ├── reset/            # POST /api/users/v2/recovery/password/reset
│       ├── username-init/    # POST /api/users/v2/recovery/username/init
│       └── username-recover/ # POST /api/users/v2/recovery/username/recover
├── proxy.ts                  # Asgardeo proxy middleware (Next.js 16+)
└── next.config.ts            # NODE_TLS_REJECT_UNAUTHORIZED for local IS
```

---

## Tech Stack

| Package | Purpose |
|---|---|
| `next` 16 | Framework |
| `@asgardeo/nextjs` | WSO2 IS / Asgardeo SDK |
| `react-google-recaptcha` | reCAPTCHA v2 widget |
| `tailwindcss` 4 | Styling |

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `fetch failed` / `Network Error` on sign-in | IS is not reachable. Check it is running and `NEXT_PUBLIC_ASGARDEO_BASE_URL` is correct. |
| Browser shows certificate warning on logout redirect | Visit `https://localhost:9443` and accept the certificate exception. |
| Recovery email not received | Check `deployment.toml` SMTP settings and verify the sender address is correct. Check spam folder. |
| `reCAPTCHA verification failed` | The test keys only work on `localhost`. Register real keys at [recaptcha.google.com](https://www.google.com/recaptcha/admin) for other hosts. |
| `Password recovery is not enabled` | Enable Email OTP in IS Console → Login & Registration → Account Recovery → Password Recovery. |

---

## Security Notes

- **`IS_ADMIN_USERNAME` / `IS_ADMIN_PASSWORD`** are used server-side only (never sent to the browser). In production use a dedicated service account with only the `internal_user_recovery_create` permission.
- **`ASGARDEO_CLIENT_SECRET`** and **`RECAPTCHA_SECRET_KEY`** are server-side only — they do not have the `NEXT_PUBLIC_` prefix and are never exposed to the browser.
- **Remove `NODE_TLS_REJECT_UNAUTHORIZED = "0"`** from `next.config.ts` before deploying to production.
- Replace Google's **test reCAPTCHA keys** with real keys from [https://www.google.com/recaptcha/admin](https://www.google.com/recaptcha/admin) for any non-local environment.
