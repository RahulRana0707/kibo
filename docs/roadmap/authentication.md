# Authentication and app shell: built vs. planned

Status of the Claude Design frames in section B (authentication) and D (app shell), as of Oct 11, 2026. The backend runs better-auth with **email and password only**.

## Built

| Frame | Route | Notes |
|---|---|---|
| B1 Sign up | `/signup` | Name, email, password (with a strength meter) and terms. Empty or invalid fields show a “Fix N things to continue” summary that links to each field, and the button reads “Creating account…” while it submits. Passwords need at least 10 characters, and the API enforces this too (`minPasswordLength: 10`). |
| B2 Log in | `/login` | Wrong-credentials error. “Keep me logged in for 30 days” is on by default: on, the session cookie lasts 30 days; off, it ends with the browser. Too many attempts shows a rate-limit warning instead of the designed 15-minute lock. The button reads “Logging in…” while it submits. |
| B8 You’re logged out | `/logged-out` | Shown after every log out. |
| B9 Session expired | `/login?session=expired` | The route guard sends people here when their session cookie no longer matches a session. It doesn’t show the person’s name, because the expired session no longer tells us who they were. |
| D App shell | `/dashboard` | Sidebar, top bar (search left, bot right), menus, phone bar and phone menu, built from the library’s app-shell organisms. Controls for features that don’t exist show empty states or “Soon”. |
| E Dashboard · brand new | `/dashboard` | Setup checklist and empty-state cards; every step is marked “Soon”. |
| V1 404 and 500 | any unknown route, runtime errors | |

## Shown but disabled

These sit where the design puts them, disabled with a visible reason, until the backend supports them.

- **Continue with Google / Twitch** (B1, B2, B9): `aria-disabled` with a Soon label and one reason under the group. YouTube sign-in was dropped from the library; it comes back as Google OAuth with YouTube scopes.
- **Forgot password?** (B2): Soon, with “Password reset is coming soon.” under the field.
- Shell: ⌘K search only covers pages and log out; bot switcher, Pause bot, notifications, workspace switching, Profile, Settings, Billing and Keyboard shortcuts are empty states or “Soon”.

## Planned

| Frame | What it needs |
|---|---|
| Social sign-in (B1, B2, B11 OAuth result screens) | better-auth `socialProviders` for Google and Twitch. YouTube sign-in is Google OAuth with YouTube scopes. Client IDs and secrets in `apps/api/.env`, and B11 screens for connecting, success, denied and error. |
| B3 Forgot password, B4 Check your email, B5 Reset password | An email provider (for example Resend or Postmark) and better-auth `emailAndPassword.sendResetPassword`. |
| B6 Verify email | The same email provider and better-auth `emailVerification.sendVerificationEmail`, then decide whether unverified accounts can use the app. |
| B7 Two-factor setup and challenge | better-auth `twoFactor` plugin (TOTP and backup codes) and a migration for its tables. |
| B2 “Account locked” state | A lockout policy (failed-attempt counter and unlock by reset), beyond better-auth’s default rate limit. |
| B8 Log-out confirmation while live | Needs bots and live status; show the dialog only when a bot is live. |
| B10 Accept team invite | Workspaces and roles, likely the better-auth `organization` plugin, plus invite emails. |
| D Banners (trial, payment failed, reconnect, paused) | Billing, integrations and bots. Only the setup banner is shown today. |

## Verified end to end (Oct 11, 2026)

Run in a browser against the local API and Postgres:

- Signing up with an empty form lists all three errors. A valid sign-up lands on `/dashboard` (“Welcome, Test”), stores the full name on the user row and sets an httpOnly session cookie that lasts 30 days.
- The API rejects a 9-character password with `PASSWORD_TOO_SHORT`, so the minimum doesn’t depend on the form.
- Log out from the account menu goes to `/logged-out` and clears the cookie. Opening `/dashboard` afterwards redirects to `/login`.
- A wrong password shows “That email and password don’t match. Check both and try again.”
- Logging in with “Keep me logged in” off sets a browser-session cookie. With it on, the cookie has `Max-Age=2592000` (30 days).
