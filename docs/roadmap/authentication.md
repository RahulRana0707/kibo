# Authentication and app shell: built vs. planned

Status of the Claude Design frames in section B (authentication) and D (app shell), as of Oct 10, 2026. The backend runs better-auth with **email and password only**.

## Built

| Frame | Route | Notes |
|---|---|---|
| B1 Sign up | `/signup` | Email + password, terms checkbox, “email already in use” and “weak password” errors. The design asks only for email, so the display name is made from the email until onboarding (C1) collects it. |
| B2 Log in | `/login` | Wrong-credentials error. “Keep me logged in” works (better-auth `rememberMe`). Too many attempts shows a rate-limit warning instead of the designed 15-minute lock. |
| B8 You’re logged out | `/logged-out` | Shown after every log out. |
| B9 Session expired | `/login?session=expired` | The route guard sends people here when their session cookie no longer matches a session. It doesn’t show the person’s name, because the expired session no longer tells us who they were. |
| D App shell | `/dashboard` | Sidebar, top bar, menus, phone bar and phone menu as designed. Controls for features that don’t exist show empty states or “Soon”. |
| E Dashboard · brand new | `/dashboard` | Setup checklist and empty-state cards; every step is marked “Soon”. |
| V1 404 and 500 | any unknown route, runtime errors | |

## Shown but disabled

These sit where the design puts them, disabled with a visible reason, until the backend supports them.

- **Continue with Google / Twitch / YouTube** (B1, B2, B9)
- **Forgot password?** link (B2)
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
