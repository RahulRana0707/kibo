# YouTube OAuth Setup

Kibo uses Google OAuth to connect a creator's YouTube channel to a bot.

## Required Env

Add these to `apps/api/.env`:

```bash
GOOGLE_YOUTUBE_CLIENT_ID="..."
GOOGLE_YOUTUBE_CLIENT_SECRET="..."
GOOGLE_YOUTUBE_REDIRECT_URI="http://localhost:4000/integrations/youtube/callback"
```

`WEB_URL` must match the Next.js app origin so the API can redirect back to the
frontend. For local development:

```bash
WEB_URL="http://localhost:3000"
API_URL="http://localhost:4000"
```

## Google Cloud Console Steps

1. Open Google Cloud Console.
2. Create or select a project for Kibo.
3. Go to **APIs & Services** -> **Library**.
4. Enable **YouTube Data API v3**.
5. Go to **APIs & Services** -> **OAuth consent screen**.
6. Choose **External** while developing unless you are inside a Google Workspace organization.
7. Fill in the app name, support email, and developer contact email.
8. Add yourself under **Test users** while the app is in testing mode.
9. Go to **APIs & Services** -> **Credentials**.
10. Create **OAuth client ID**.
11. Select **Web application**.
12. Add this authorized redirect URI for local development:

```text
http://localhost:4000/integrations/youtube/callback
```

13. Copy the client ID and client secret into `apps/api/.env`.
14. Restart the Nest API dev server after changing env values.

## Scope

Kibo currently requests:

```text
https://www.googleapis.com/auth/youtube.readonly
```

This is enough for the initial read-only connection flow: identify the creator's channel and prepare to read YouTube Live Chat.

## Local Test

1. Start the app.
2. Sign in.
3. Create a bot if you do not have one.
4. Go to `/integrations`.
5. Select the bot.
6. Click **Connect** on YouTube Live.
7. Choose the Google account that owns or manages the YouTube channel.
8. Approve the requested read-only YouTube access.
9. You should land back on `/integrations?botId=...&youtube=connected`.

## Production Redirect URI

When deploying, add a second authorized redirect URI in Google Cloud Console:

```text
https://YOUR_API_DOMAIN/integrations/youtube/callback
```

Then set:

```bash
WEB_URL="https://YOUR_WEB_DOMAIN"
API_URL="https://YOUR_API_DOMAIN"
GOOGLE_YOUTUBE_REDIRECT_URI="https://YOUR_API_DOMAIN/integrations/youtube/callback"
```
