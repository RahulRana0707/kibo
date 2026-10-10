# Design Brief: Kibo (AI Community Manager for Streamers)

You are designing the complete product for **Kibo**: the marketing website and the full SaaS web app. Put every screen as a frame on the canvas.

**This is a website, not a mobile app.** Kibo is a web product used in a desktop browser: a marketing site plus a SaaS web app. Design every screen as a web page, using web layouts and web patterns. Don't design native iOS/Android apps or app-store screens, and don't use mobile-app conventions such as bottom tab bars or native app headers. Where this brief asks for mobile, it means the **same website at a small browser width** (responsive web).

**What you decide:** layout, structure, components, interaction patterns, visual hierarchy and UX. You are the designer, and nothing below tells you how a screen should look.

**What this brief gives you:** what the product does, who uses it, every feature, and every screen and section that must exist.

**Design system:** a design system is attached. Use its tokens and components only (color, type, spacing, radius, elevation, motion). Don't invent new colors or type styles. If you need something the system doesn't have, build it from existing tokens and note it on the canvas.

---

## 1. The product

**Kibo is an AI community manager for live streamers and creators.** It joins a creator's live chat (YouTube Live, Twitch, and later Discord, Kick, TikTok Live and Instagram Live). It then does four things:

- answers viewer questions using the creator's own knowledge (FAQs, links, rules, gear, schedule)
- moderates spam and toxicity
- keeps the community engaged
- reports what happened after every stream

**Mission:** help creators focus on creating. Let Kibo handle the community.

**The core problem:** "Too much chat. Not enough attention." Small creators have no moderators. Large creators need many. Both answer the same questions every stream.

**The core loop the whole product is built around:**
Read live chat → understand each message → look up the creator's knowledge → write a reply in the bot's personality → post it (or ask a human to approve it) → log everything → summarize after the stream.

### Who uses it
| Person | Who they are | What they need |
|---|---|---|
| **Solo creator** (main user) | Small to mid streamer, no mods, streams 2–5×/week | Set up fast, trust the bot, see time saved |
| **Established creator** | Large audience, busy chat, a few mods | Strong moderation, control, multiple platforms, analytics |
| **Moderator** | Trusted community member with access granted by the creator | Live console, review queues, viewer history, works from phone too |
| **Manager / agency** | Runs several creators' accounts | Switch between creators, team roles, reports for sponsors |
| **Viewer** | Watches the stream; never logs in to Kibo | Only sees Kibo's chat replies and on-stream overlays |
| **Kibo staff** (internal) | Our support and ops team | Admin panel |

### Key concepts
- **Workspace**: a creator's account. An agency user can belong to several workspaces.
- **Bot**: an AI persona with a name, avatar, personality, welcome message and behavior rules. A workspace can have several bots. Each bot has a status: Draft, Ready, Active, Paused or Archived.
- **Knowledge item**: something the bot knows. Types: FAQ (question + answer), Link, Rule, Note, Gear/Setup, Schedule, Sponsor, Document.
- **Integration**: a connected platform or tool. Status: Pending, Connected, Disconnected, Error, Needs reconnect.
- **Stream / Conversation**: one live session on one platform, containing messages.
- **Message**: one chat line. Sender types: Viewer, Bot, Creator, Moderator, System.
- **Event**: anything Kibo did or noticed (knowledge looked up, answer generated, reply sent, message flagged, moderation action, integration connected/disconnected, error).
- **Plans**: Starter, Creator, Studio. Each has limits on bots, integrations, knowledge items and AI replies per month. Monthly or yearly billing. Free trial.

---

## 2. Full feature list

Design for **all** of these. Some exist in code today and most are planned. Treat every one as a real feature. Phase tags are only for your information: **[Now]** = built, **[Next]** = being built soon, **[Later]** = roadmap. Don't show these tags in the UI.

### 2.1 Accounts and access
- Email + password signup and login, show/hide password field **[Now]**
- Sign in with Google, Twitch or YouTube **[Next]**
- Email verification, forgot/reset password **[Next]**
- Two-factor authentication, active sessions/devices list **[Later]**
- Team invites, roles (Owner, Admin, Moderator, Editor, Analyst), permissions **[Later]**
- Several workspaces per user, with a switcher (agencies) **[Later]**

### 2.2 Bots
- Create, edit, delete, archive and list bots; set the active bot **[Now]**
- Name, avatar, personality, welcome message **[Now]**
- Personality presets (Friendly, Hype, Chill, Sarcastic, Professional) plus custom voice instructions **[Next]**
- Bot templates by creator type (Gaming, IRL, Music, Education, Coding, Fitness) **[Next]**
- Reply mode: Auto / Approval (a human approves each reply) / Silent (watch and learn only) **[Next]**
- Confidence threshold: only answer when sure, otherwise stay silent or send the question to the inbox **[Next]**
- Rate limits, cooldown per viewer, quiet mode **[Next]**
- Blocked topics and escalation rules (e.g. never discuss politics; send self-harm mentions to a human immediately) **[Next]**
- Languages: detect the viewer's language and reply in it **[Later]**
- Test playground: chat with the bot before going live and see which knowledge each reply used **[Next]**
- Kill switch: pause the bot instantly from anywhere **[Next]**

### 2.3 Knowledge base
- FAQ, Link, Rule and Note items: create, edit, delete, turn on/off, sort **[Now]**
- CSV FAQ import **[Now]**
- More item types: Gear/Setup (with affiliate links), Schedule, Sponsor, Document upload (PDF/text) **[Next]**
- Auto-import from: YouTube channel About and video descriptions, website URL, Linktree, Notion, Google Drive, past stream transcripts **[Later]**
- Sync status per imported source, re-sync **[Later]**
- **Unanswered questions inbox**: questions Kibo couldn't answer, grouped by similarity, with how often each was asked. Answer once → saved as an FAQ **[Next]**
- **Suggested FAQs**: learned from the creator's or mods' manual answers in chat **[Later]**
- Knowledge health: gaps, conflicting answers, outdated items **[Later]**
- "Ask a question" tester: type a question and see the matched item and the generated answer **[Next]**

### 2.4 Live chat AI (the core)
- Read live chat from connected platforms **[Next]**
- Sort each message: Question, Spam, Toxic, Command, Chatter **[Next]**
- Answer questions from knowledge plus live context (stream title, game, current sponsor) **[Next]**
- Every bot reply links to its source knowledge item ("why it said this") **[Next]**
- Repeated questions answered once, high-traffic sampling **[Next]**
- Defenses against viewers trying to trick the bot (prompt injection) **[Next]**

### 2.5 Live console (control center during a stream)
- One live feed combining every connected platform, with platform marker and message type **[Next]**
- Bot replies shown inline with source and confidence **[Next]**
- Approval queue: approve / edit / reject drafted replies **[Next]**
- Moderation queue for borderline messages **[Next]**
- Quick actions: pause bot, slow mode, followers-only, emote-only, clear chat, send announcement, post as bot **[Next]**
- Viewer quick-look panel (history, notes, past moderation) **[Later]**
- Live metrics: messages/min, questions answered, pending approvals, chat mood **[Next]**
- Alerts: raid or flood detected, toxicity spike, integration error, token expired **[Next]**

### 2.6 Moderation
- Filters: spam, links (with allowed-domain list), caps, emoji/symbol flood, repeated messages **[Next]**
- AI toxicity detection with sensitivity levels (Relaxed / Normal / Strict) **[Next]**
- Custom banned words and phrases, including disguised spellings **[Next]**
- Action ladder: warn → delete → timeout (duration) → ban, configurable per rule **[Next]**
- Review queue for unclear cases **[Next]**
- Moderation log with one-click undo **[Next]**
- Banned and timed-out users list **[Next]**
- Trusted users / regulars (exempt or treated more leniently) **[Later]**
- Raid and flood protection: automatic slow/followers-only mode during spikes **[Later]**
- Shared ban lists across platforms **[Later]**
- Appeals inbox (viewers request a review of a timeout or ban) **[Later]**

### 2.7 Engagement
- Welcome messages for first-time chatters **[Next]**
- Chat commands (`!discord`, `!socials`, `!schedule`, custom), some generated from knowledge **[Next]**
- Timers: scheduled repeating messages (follow reminder, Discord invite, sponsor plug) with a minimum-chat-activity condition **[Next]**
- Shout-outs and event alerts (raids, new subs/members, Super Chats, milestones) **[Later]**
- Polls, predictions, trivia **[Later]**
- Giveaways (entry keyword, eligibility, random winner, history) **[Later]**
- Loyalty points, ranks and badges for regulars **[Later]**
- Viewer queue (`!join` to play with the streamer) **[Later]**
- Song requests (via Spotify/YouTube) **[Later]**
- Q&A / AMA mode: collect and rank questions for the creator to answer live **[Later]**
- Go-live announcements posted to Discord, X, Bluesky, Instagram **[Later]**

### 2.8 Community (viewer records)
- Viewer directory across platforms: first seen, messages, loyalty, flags, supporter status **[Later]**
- Viewer profile: chat history, mod notes, moderation history, linked accounts on other platforms **[Later]**
- Segments: New, Regulars, VIPs, Supporters, Flagged **[Later]**

### 2.9 Streams, summaries and analytics
- Dashboard counts: bots, knowledge items, integrations, messages, conversations, recent activity **[Now]**
- Stream history list **[Next]**
- **Post-stream summary**: top questions, highlights timeline, mood graph, moderation incidents, new chatters, clip-worthy moments, unanswered questions; shareable and exportable **[Next]**
- Analytics with date range: questions answered, response rate, **time saved**, chat activity, moderation actions, engagement, audience growth, top questions, top chatters, platform comparison **[Next]**
- Weekly digest email **[Later]**
- CSV/PDF export **[Later]**

### 2.10 Schedule
- Stream calendar (synced with Google Calendar and YouTube/Twitch scheduled streams) **[Later]**
- Per-stream setup: title, game/category, active sponsor, special instructions for the bot **[Later]**
- Pre-stream checklist and "going live soon" reminder **[Later]**

### 2.11 Sponsors and monetization
- Sponsor campaigns: talking points, promo codes, links, mention timing **[Later]**
- Tracking of mentions and link clicks; a shareable report for sponsors **[Later]**
- Gear list with affiliate links, merch and products the bot can recommend **[Later]**
- Supporter recognition (Patreon, Ko-fi, Buy Me a Coffee, channel memberships) **[Later]**

### 2.12 Integrations
| Category | Integrations |
|---|---|
| Streaming platforms | YouTube Live **[Now]**, Twitch **[Next]**, Kick, TikTok Live, Instagram Live **[Later]** |
| Community | Discord (bot answers in the server between streams, go-live posts, mod alerts) **[Later]** |
| Stream tools | OBS (overlays as browser sources), Streamlabs, StreamElements, Streamer.bot **[Later]** |
| Knowledge sources | Notion, Google Drive, Linktree, website crawler, YouTube VOD transcripts **[Later]** |
| Schedule | Google Calendar **[Later]** |
| Music | Spotify (`!song`, song requests) **[Later]** |
| Game data | Steam / IGDB (game info), Riot / Valorant (rank lookups) **[Later]** |
| Monetization | Patreon, Ko-fi, Buy Me a Coffee, Shopify (merch) **[Later]** |
| Social | X, Bluesky, Instagram (go-live posts) **[Later]** |
| Notifications | Email, Slack, Discord DM, Telegram, mobile push **[Later]** |
| Automation | Zapier, Make, webhooks, public API with API keys **[Later]** |

For each integration: connect via OAuth, plain-language explanation of permissions, connection status and health, last sync, settings, reconnect, disconnect.

### 2.13 Stream overlays
- On-stream overlay widgets used as OBS browser sources: Kibo answer card, active poll, giveaway, Q&A question spotlight, alerts **[Later]**
- Overlay settings and preview page in the app **[Later]**

### 2.14 Billing and plans
- Plans Starter / Creator / Studio, monthly/yearly, free trial **[Next]**
- Usage meters: bots, integrations, knowledge items, AI replies this month **[Next]**
- Upgrade prompts when a limit is reached or a feature is locked **[Next]**
- Payment method, invoices, change plan, cancel flow (with reason and a retention offer), past-due recovery **[Next]**
- Referral program **[Later]**

### 2.15 Notifications
- In-app notification center **[Next]**
- Events: integration disconnected or token expired, bot paused due to error, raid detected, approval queue backing up, stream summary ready, new unanswered questions, trial ending, payment failed, team invite accepted **[Next]**
- Per-event channel preferences (in-app, email, Slack, Discord, push) **[Later]**

### 2.16 Trust, privacy and support
- Full reply and action history with sources **[Next]**
- Activity / audit log (who changed what) **[Later]**
- Data export, account deletion, data retention settings **[Later]**
- In-app help center, contact support, what's new / changelog, keyboard shortcuts **[Later]**

### 2.17 Responsive web on phones
- The web app works in a phone browser so creators and mods can act during a stream: live console, approvals, moderation queue, pause bot, notifications **[Later]**

### 2.18 Internal admin (Kibo staff only)
- Users and workspaces, plan overrides, system health, abuse reports, integration error monitor **[Later]**

---

## 3. Screen inventory

Design **every** screen below. For each screen:

- Include all listed sections.
- Design **all states** that apply: default (with realistic data), empty / first-time, loading, error, and any special states listed.
- Desktop web is the main target (design at a standard desktop browser width). Also design a **responsive web version at phone width** for everything marked 📱. It is still the website in a phone browser, not a native app.
- Use realistic streamer content: creator names, game titles, real-sounding chat messages and numbers. No lorem ipsum.

### A. Marketing website (public, SaaS landing)

**A1. Landing page** 📱
- Top navigation (Product, Integrations, Pricing, Resources, Log in, Get started)
- Hero: the main value statement and primary call to action
- Supported-platforms strip
- The problem (too much chat, not enough attention)
- How it works (connect → teach → go live)
- Live chat demo showing Kibo answering, moderating and welcoming
- Feature sections: AI Answers, Moderation, Live Console, Engagement, Stream Summaries & Analytics, Knowledge Base, Multi-platform
- "Time saved" / impact numbers
- Integrations preview
- Trust and control (approval mode, kill switch, "why it said this")
- Testimonials from creators
- Pricing preview
- FAQ
- Final call to action
- Footer (product, company, resources, legal, socials)

**A2. Pricing** 📱: monthly/yearly toggle; Starter / Creator / Studio plan cards; full feature comparison; usage limits explained; FAQ; agency/enterprise contact.

**A3. Features overview**, plus one page each for: **A3a** AI Answers, **A3b** Moderation, **A3c** Live Console, **A3d** Engagement, **A3e** Analytics & Summaries, **A3f** Knowledge Base.

**A4. Integrations directory (public)**: by category, with a detail view for one integration.

**A5. Use cases**: Gaming, IRL/Just Chatting, Education, Music, Agencies (one template plus one example).

**A6. About**

**A7. Contact / Sales**

**A8. Blog**: index and article.

**A9. Changelog**

**A10. Help center**: home, category, article, search results.

**A11. Legal**: Terms, Privacy, Acceptable Use (one template), and a cookie consent banner.

**A12. Public stream summary share page**: a read-only summary a creator can share with sponsors or their community.

### B. Authentication 📱

**B1. Sign up**: email/password, Google/Twitch/YouTube sign-in, terms consent, error states (email taken, weak password).

**B2. Log in**: email/password, social sign-in, error states (wrong credentials, locked account).

**B3. Forgot password**

**B4. Check your email** (after reset request or signup)

**B5. Reset password**: new password, plus success and expired-link states.

**B6. Verify email**: pending, success, expired/invalid link.

**B7. Two-factor**: setup (QR code + backup codes) and login challenge.

**B8. Log out**: confirmation and a "you've been logged out" screen.

**B9. Session expired**: sign in again.

**B10. Accept team invite**: as a new user and as an existing user; invalid/expired invite.

**B11. OAuth result screens**: connecting…, success, permission denied, error.

### C. Onboarding (first run)

**C1. Welcome / creator profile**: display name, content type, platforms, audience size, languages, timezone.

**C2. Create your first bot**: name, avatar, personality preset or template.

**C3. Teach Kibo**: pick knowledge sources (connect channel, paste links, upload CSV, write FAQs manually), import progress, review what was imported.

**C4. Connect a platform**: YouTube/Twitch with permissions explained.

**C5. Choose reply mode**: Auto / Approval / Silent, with a recommendation for new users.

**C6. Test drive**: chat with the bot in the playground.

**C7. Start trial / choose plan**

**C8. You're ready**: go-live checklist and next steps.

Show a progress indicator across onboarding, plus "skip for now" and "resume setup" states.

### D. App shell (wraps every signed-in screen) 📱
- Main navigation to every app area below
- Workspace switcher (agencies) and bot switcher
- Global bot status indicator (Live / Ready / Paused / Error) with a kill switch available from anywhere
- Global search / command access
- Notifications entry point and panel
- Help entry point
- User menu: profile, settings, billing, log out
- Plan usage indicator
- System banners: trial ending, payment failed, integration needs reconnect, bot paused due to error, maintenance notice

### E. Dashboard (home) 📱
- **States:** brand-new (setup checklist), set up but offline, **live now**, just finished a stream.
- Sections: bot and live status; key numbers (questions answered, response rate, time saved, messages, moderation actions); last stream summary preview; unanswered questions count; approval/moderation queue counts; recent activity feed; upcoming scheduled stream; integration health; setup checklist (until complete).

### F. Live Console 📱
- **States:** offline (no live stream), connecting, live, bot paused, platform disconnected mid-stream, raid/flood alert, very high chat volume.
- Sections: combined live chat feed (platform, sender type, message type: Question/Spam/Toxic/Command/Chatter); bot replies with source and confidence; approval queue (approve / edit / reject); moderation queue; quick actions (pause bot, slow mode, followers-only, emote-only, clear chat, announcement, post as bot); viewer quick-look; live metrics; current stream context (title, game, active sponsor); alerts.

### G. Bots
**G1. Bots list**: status, connected platforms, last active, quick actions; empty state; plan limit reached state.

**G2. Create bot**: from scratch or from a template.

**G3. Template gallery**

**G4. Bot detail**, with these areas:
- **G4a** Overview: status, platforms, recent performance, recent replies
- **G4b** Personality & voice: preset, custom instructions, welcome message, avatar, languages, live preview of sample replies
- **G4c** Behavior & safety: reply mode, confidence threshold, rate limits, cooldowns, blocked topics, escalation rules
- **G4d** Platforms: which integrations this bot runs on
- **G4e** Playground: test chat with source and confidence for each reply
- **G4f** History: every reply and action, filterable, with "why it said this"

**G5. Delete / archive bot** confirmation

### H. Knowledge base
**H1. Knowledge list**: search, filter by type, on/off toggle, sort order, source badge; empty state; plan limit state.

**H2. Add / edit item**, one view per type: FAQ, Link, Rule, Note, Gear/Setup, Schedule, Sponsor, Document upload.

**H3. CSV import flow**: upload → map columns → preview and validation errors → result.

**H4. Sources**: connected import sources (YouTube, website, Linktree, Notion, Google Drive, transcripts) with sync status, last synced, re-sync, errors; add-source flow.

**H5. Unanswered questions inbox**: grouped similar questions, frequency, where they were asked; answer → save as FAQ, merge, dismiss; empty state ("Kibo answered everything").

**H6. Suggested FAQs**: learned from manual replies; accept, edit or reject.

**H7. Knowledge health**: gaps, conflicts, stale items.

**H8. Ask-a-question tester**

### I. Moderation
**I1. Moderation overview**: recent incidents, actions taken, false-positive rate, toxicity trend.

**I2. Rules & filters**: spam, links and allowed domains, caps, emoji flood, repetition, toxicity sensitivity, banned words; action ladder per rule.

**I3. Review queue**: approve / remove / timeout / ban; bulk actions.

**I4. Moderation log**: filterable, with undo.

**I5. Banned & timed-out users**: lift a ban, see the reason.

**I6. Trusted users**

**I7. Raid & flood protection** settings

**I8. Appeals inbox**

### J. Engagement
**J1.** Commands list and editor

**J2.** Timers / scheduled messages list and editor

**J3.** Welcome messages and shout-out / event alert settings

**J4.** Polls & predictions: create, live results, history

**J5.** Trivia

**J6.** Giveaways: create, live entries, pick winner, history

**J7.** Loyalty: points rules, ranks, leaderboard

**J8.** Viewer queue

**J9.** Song requests

**J10.** Q&A / AMA mode: collected questions, ranking, mark answered

**J11.** Go-live announcements: destinations, message template, history

### K. Community
**K1. Viewer directory**: search, segments, filters, cross-platform identity.

**K2. Viewer profile**: overview, chat history, notes, moderation history, loyalty, linked accounts.

**K3. Segments**

### L. Streams & analytics
**L1. Stream history**: list of past streams with key numbers.

**L2. Stream summary / detail**: overview, top questions, highlights timeline, mood graph, moderation incidents, new chatters, clip-worthy moments, unanswered questions, share and export.

**L3. Analytics overview**: date range, platform filter; questions answered, response rate, time saved, chat activity, moderation, engagement, growth, top questions, top chatters, platform comparison.

**L4. Reports & exports**: weekly digest settings, export history.

### M. Schedule
**M1. Stream calendar** (with external calendar sync status)

**M2. Upcoming stream setup**: title, game, active sponsor, bot instructions for this stream, pre-stream checklist.

### N. Sponsors & monetization
**N1. Sponsors list**

**N2. Sponsor campaign detail**: talking points, codes, links, mention timing, mention/click tracking, shareable report.

**N3. Gear & affiliate list**

**N4. Merch & products**

**N5. Supporter connections and recognition settings**

### O. Integrations
**O1. Integrations directory (in-app)**: by category, with status for each (connected, available, needs reconnect, error, coming soon, locked by plan).

**O2. Integration detail**: what it does, permissions in plain language, connected account, health, last sync, settings, reconnect, disconnect.

**O3. Disconnect confirmation**

**O4. Developer**: API keys (create, reveal once, revoke), webhooks (endpoints, events, delivery log).

### P. Overlays
**P1. Overlay library and settings**: widget list, browser-source URL, preview.

**P2. Overlay widgets as they appear on stream**: answer card, poll, giveaway, Q&A spotlight, alert. Show them on a sample gameplay frame.

### Q. Team
**Q1. Members list**: roles, last active, pending invites.

**Q2. Invite members**

**Q3. Roles & permissions overview**

**Q4. Activity / audit log**

### R. Settings
**R1. Profile**: name, avatar, email, password.

**R2. Security**: two-factor, active sessions/devices, connected sign-in methods.

**R3. Workspace**: creator profile, timezone, default languages, brand voice defaults.

**R4. Notification preferences**: event × channel.

**R5. Billing**: current plan, usage meters, payment method, invoices, change plan, trial and past-due states.

**R6. Change plan flow** and **cancel subscription flow** (reason → offer → confirm).

**R7. Data & privacy**: export data, retention, delete workspace / account (with strong confirmation).

### S. Notifications & help
**S1. Notification center**: full page, plus empty state.

**S2. What's new / changelog** (in-app)

**S3. Help & support**: search, articles, contact support form.

**S4. Keyboard shortcuts** reference

### T. Phone-width web views 📱
The same web app at phone browser width (not a native app), for the tasks creators and mods do mid-stream: home and live status, live console, approval queue, moderation queue, pause bot, notifications, stream summary.

### U. Emails (design as email frames)
Welcome; verify email; reset password; team invite; integration disconnected; bot paused due to error; raid alert; stream summary ready; weekly digest; trial ending; payment failed; receipt / invoice.

### V. Global system screens and patterns
- 404 not found, 500 error, 403 no permission, maintenance, offline / connection lost
- Feature locked → upgrade prompt
- Plan limit reached
- Standard confirmation dialogs (destructive vs. non-destructive)
- Toast / feedback messages (success, warning, error, undo)
- Loading patterns, and empty-state patterns that guide the next action

### W. Internal admin (Kibo staff only)
**W1.** Users & workspaces list

**W2.** User / workspace detail: plan override, view-as, notes

**W3.** System health and integration error monitor

**W4.** Abuse reports

---

## 4. Principles to keep in mind (not visual direction)

- **Creators are mid-stream and distracted.** Live surfaces must be readable at a glance and usable with one hand or one click.
- **Trust before automation.** Make it obvious what Kibo did, why it did it, and how to undo or stop it.
- **Show value.** "Time saved" and "questions answered" are what keep users paying; make them visible.
- **Every empty state teaches.** First-time users should always know the next step.
- **Multi-platform from day one.** Platform identity must be clear wherever messages, viewers or integrations appear.
- **Plan limits are friendly, not hostile.** Upgrade prompts explain what you get.

---

## 5. Canvas organization and handoff

- Group frames into sections matching the letters above (A–W), in that order.
- Name every frame `<Code> <Screen> / <State> / <Breakpoint>`, e.g. `F Live Console / Raid alert / Desktop`, `B2 Log in / Error / Mobile web`.
- Put a flow map at the start: marketing → signup → onboarding → dashboard → go live → stream summary.
- Collect shared components you create (beyond the design system) into a separate components section.
- Where a screen has many states, show the default state in full and the other states as variants next to it.
