/**
 * Central configuration for the WSO2 IS Next.js sample application.
 *
 * All values are sourced from environment variables.
 * Copy `.env.example` to `.env.local` and fill in your values before running.
 */

const config = {
  /**
   * WSO2 Identity Server base URL.
   * Example: https://localhost:9443
   */
  isBaseUrl: process.env.NEXT_PUBLIC_ASGARDEO_BASE_URL!,

  /**
   * OAuth2 / OIDC application credentials registered in WSO2 IS.
   */
  clientId: process.env.NEXT_PUBLIC_ASGARDEO_CLIENT_ID!,
  clientSecret: process.env.ASGARDEO_CLIENT_SECRET!,

  /**
   * Secret used to sign JWT session cookies. Generate with:
   *   openssl rand -base64 32
   */
  sessionSecret: process.env.ASGARDEO_SECRET!,

  /**
   * Route the Asgardeo SDK redirects to for sign-in.
   */
  signInUrl: process.env.NEXT_PUBLIC_ASGARDEO_SIGN_IN_URL ?? '/sign-in',

  /**
   * WSO2 IS admin credentials used by server-side API routes
   * to call IS management / recovery APIs.
   * Use a dedicated service account with minimal permissions in production.
   */
  isAdminUsername: process.env.IS_ADMIN_USERNAME ?? 'admin',
  isAdminPassword: process.env.IS_ADMIN_PASSWORD ?? 'admin',

  /**
   * Google reCAPTCHA v2 keys.
   * Obtain from https://www.google.com/recaptcha/admin
   * NEXT_PUBLIC_* keys are exposed to the browser.
   */
  recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
  recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY!,
} as const;

/** Base64-encoded Basic Auth header value for IS admin API calls. */
export const isAdminAuth = () =>
  Buffer.from(`${config.isAdminUsername}:${config.isAdminPassword}`).toString('base64');

export default config;
