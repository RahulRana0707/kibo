# Module 1: Bots

## Context

Every screen after the dashboard is a "Soon" placeholder. A **bot** is the root of the product: knowledge, moderation, reply mode, platforms and the live console all belong to one. Module 1 makes bots real: create, list, configure, pause, archive, delete. Each later module then has something to attach to.

**Sources:**
- Design frames:
  - G1 bots list and G1 states
  - G2 create and G3 templates
  - G4a–f bot detail tabs
  - G5 archive and delete
  - BotHeader
  - C2 and C5 (onboarding steps that reuse these pieces)
- Library boards: bot card, bot switcher.

**Decisions (Oct 14, 2026):**
- Bots belong to a **workspace**. We add Workspace and Member tables now, and every user gets a personal workspace. Workspace and Bot each get a `metadata` JSON field for display-only details.
- The **trial allows 1 bot**. The limit is stored per workspace (`botLimit`, default 1), so billing later sets it per plan.
- **Languages** are English and **Hinglish** (Hindi in Latin script, mixed with English). Devanagari Hindi isn't offered.
- **Every API route returns one envelope:** `{ status, result, error }`.
- The web app uses **TanStack Query** for reads and mutations, with server-side prefetch and hydration.
- All **6 detail tabs** exist. Personality and Behavior work fully. Overview shows real settings with empty metrics. Platforms, Playground and History are truthful Soon or empty shells until their modules land.
- A new shared package, **`@kibo/contracts`**, holds Zod schemas and types for the API and the web.

**Delivered as 5 chunks, one branch and one PR each.**

---

## 1. Data model (Prisma, `apps/api/prisma/schema.prisma`)

### Workspace and Member (new)

```prisma
model Workspace {
  id           String   @id @default(cuid())
  name         String                      // "Mira Okafor" for a personal workspace
  personal     Boolean  @default(true)
  botLimit     Int      @default(1)        // trial = 1; billing sets it per plan later
  defaultBotId String?  @unique
  defaultBot   Bot?     @relation("DefaultBot", fields: [defaultBotId], references: [id], onDelete: SetNull)
  metadata     Json     @default("{}")     // display-only details, see below
  members      Member[]
  bots         Bot[]    @relation("WorkspaceBots")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  @@map("workspace")
}

model Member {
  id          String     @id @default(cuid())
  workspaceId String
  userId      String
  role        MemberRole @default(OWNER)
  workspace   Workspace  @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime   @default(now())
  @@unique([workspaceId, userId])
  @@index([userId])
  @@map("member")
}

enum MemberRole { OWNER }   // ADMIN, MODERATOR… arrive with the Team module (Q)
```

`User` gains `members Member[]`.

**`metadata` (Workspace and Bot)** is for details the UI shows but nothing filters, sorts or joins on:
- logo and avatar image URLs
- banner and accent colour
- description, social links
- timezone label

Rules:
- It is validated by `workspaceMetadataSchema` and `botMetadataSchema` in `@kibo/contracts`: typed, optional keys, unknown keys stripped, ≤ 8 KB.
- It is never used in a `WHERE` or an index.
- A value that becomes queryable moves to its own column.

**Personal workspace:**
- Created in better-auth's `databaseHooks.user.create.after`, in `apps/api/src/auth/auth.service.ts`.
- A lazy fallback, `WorkspacesService.ensurePersonal(userId)`, covers users who already exist, such as `mira@kibo.test`.

### Bot (new)

| Field | Type | Default | Rule / meaning |
|---|---|---|---|
| `id` | cuid | | |
| `workspaceId` | FK → Workspace (cascade) | | |
| `name` | String | | 1–40 chars, trimmed |
| `nameKey` | String | | lower-cased `name`; `@@unique([workspaceId, nameKey])` keeps names unique, case-insensitively |
| `purpose` | String? | | ≤ 60, e.g. "Ranked nights" |
| `status` | `BotStatus` | `DRAFT` | `DRAFT`, `ACTIVE` or `PAUSED` |
| `archivedAt` | DateTime? | | archived when set; restoring keeps the previous `status` |
| `pausedAt`, `pausedById` | DateTime?, String? | | "Paused by Mira Okafor on Oct 4" |
| `templateKey` | String? | | `gaming`, `irl`, `music`, `education`, `coding` or `fitness` |
| `metadata` | Json | `{}` | display-only: avatar image, accent, notes |
| **Personality & voice (G4b)** | | | |
| `personality` | `Personality` | `FRIENDLY` | `FRIENDLY`, `HYPE`, `CHILL`, `SARCASTIC` or `PROFESSIONAL` |
| `voiceNotes` | String? | | ≤ 1,000 |
| `languages` | String[] | `["en"]` | 1–2 of `en` (English) and `hi-Latn` (Hinglish) |
| `replyInViewerLanguage` | Boolean | true | answers in English or Hinglish to match the question |
| `welcomeEnabled` | Boolean | true | |
| `welcomeMessage` | String? | template text | ≤ 300; tokens `{viewer}`, `{game}`, `{title}` |
| **Replying (G4c)** | | | |
| `replyMode` | `ReplyMode` | `SILENT` | `AUTO`, `APPROVAL` or `SILENT` |
| `confidenceThreshold` | Int | 85 | 50–99 |
| `unsureAction` | `UnsureAction` | `SEND_TO_INBOX` | `DRAFT_FOR_APPROVAL`, `SEND_TO_INBOX` or `REPLY_NOT_SURE` |
| `approvers` | `Approvers` | `OWNER` | `OWNER` or `MODERATORS` |
| `maxRepliesPerMinute` | Int | 8 | 1–30 |
| `viewerCooldownSeconds` | Int | 30 | 15, 30 or 60 |
| `answerRepeatedOnce` | Boolean | true | |
| `quietMode` | Boolean | false | |
| **Safety (G4c)** | | | |
| `blockedTopics` | String[] | `[]` | ≤ 20 topics, each ≤ 60 |
| `blockedTopicReply` | String | "That's not something I can chat about — back to the stream!" | ≤ 200 |
| `ignoreChatInstructions` | Boolean | true | |
| `createdById`, `createdAt`, `updatedAt` | | | |

Indexes: `@@index([workspaceId, archivedAt])`.

**Languages:**
- Hinglish uses the code `hi-Latn`, the standard tag for Hindi written in Latin script.
- The list lives in `@kibo/contracts`, so adding a language later is a one-line change.

### EscalationRule (new; an ordered list per bot)

| Field | Type | Rule |
|---|---|---|
| `id`, `botId` (FK, cascade) | | |
| `trigger` | String | ≤ 120, e.g. "Mentions of self-harm" |
| `severity` | `Severity` | `HIGHEST`, `HIGH` or `NORMAL` |
| `action` | `EscalationAction` | `ALERT_MODS`, `HIDE_AND_REVIEW` or `DRAFT_FOR_APPROVAL` |
| `position` | Int | order shown |

New bots get the 3 default rules from G4c.

### State machine

```
DRAFT ──(first platform connected: Module 4)──▶ ACTIVE ◀──pause/resume──▶ PAUSED
any state ──archive──▶ archived (archivedAt set) ──restore──▶ previous state
any state ──delete (type name)──▶ gone
```

In Module 1 bots stay `DRAFT`, because "Finish setup" needs platforms. Pause and resume are built and tested through the API. The UI shows them only for `ACTIVE` and `PAUSED` bots.

**Display mapping:**

| Stored | Pill tone | Label |
|---|---|---|
| `DRAFT` | `draft` | Draft |
| `ACTIVE` | `offline` | Ready |
| `PAUSED` | `paused` | Paused |

### Rules enforced in the service

- **Limit:**
  - Non-archived bots must stay ≤ `workspace.botLimit`, which is 1 on the trial.
  - Create, duplicate and restore return **409 `BOT_LIMIT_REACHED`**. Archived bots don't count.
  - On the trial, the second bot needs the first one archived.
- **Names:** a clash returns **409 `BOT_NAME_TAKEN`**. Duplicates are named "Pip copy", then "Pip copy 2".
- **Default bot:** the first bot becomes the default. When the default is archived or deleted, the default moves to the oldest remaining bot, or to none.
- **Workspace scope:** another workspace's bot returns **404 `BOT_NOT_FOUND`**, never 403.

**Migration:** switch from `db push` to `prisma migrate dev`, with a first migration `add_workspaces_and_bots`.

---

## 2. One response envelope for every API route

Every Nest route uses one shape, and the HTTP status code stays meaningful (200, 201, 400, 401, 404, 409, 500):

```jsonc
// success
{ "status": "success", "result": { /* data */ }, "error": null }

// failure
{ "status": "failed", "result": null,
  "error": { "code": "BOT_LIMIT_REACHED", "message": "Your trial includes 1 bot. Archive Pip to create another.",
             "details": null } }
```

- `status` is always `"success"` or `"failed"`.
- `result` holds the data. Lists return `{ items, counts, limit }`.
- `error` is always `null` on success. On failure it holds:
  - `code`: a machine reason from `@kibo/contracts/errors`
  - `message`: one sentence the UI can show as is
  - `details`: field `issues` for validation errors, otherwise `null`

**Error codes:**
- `VALIDATION_FAILED`
- `UNAUTHENTICATED`
- `NOT_FOUND`
- `BOT_NOT_FOUND`
- `BOT_LIMIT_REACHED`
- `BOT_NAME_TAKEN`
- `BOT_IS_DRAFT`
- `BOT_ARCHIVED`
- `CONFIRM_NAME_MISMATCH`
- `INTERNAL_ERROR`

**How it's built (`apps/api/src/common/`):**
- `response.interceptor.ts`: a global interceptor that wraps every returned value in the success envelope. A 204 becomes 200 with `result: null`.
- `api-exception.ts`: `ApiException(code, message, httpStatus, details?)`, thrown by services.
- `envelope-exception.filter.ts`: a global filter that maps errors to the failure envelope:
  - `ApiException` passes through as is
  - Zod pipe errors become 400 `VALIDATION_FAILED` with `details.issues`
  - Nest's `HttpException` maps by status (401 becomes `UNAUTHENTICATED`, 404 becomes `NOT_FOUND`)
  - anything else becomes 500 `INTERNAL_ERROR`, logged, with no stack in the response
- Both are registered in `main.ts`.
- `ZodValidationPipe` throws `ApiException`.
- `ApiResponse<T>` is defined once in `@kibo/contracts`.

**Scope:**
- It covers `/health`, `/auth/session`, `/workspaces/*` and `/bots/*`.
- better-auth's own routes under `/api/auth/*` aren't Nest routes and keep better-auth's format, which its client library needs.
- Consumers to update:
  - `apps/web/proxy.ts`
  - `apps/web/lib/api/auth.server.ts`
  - the health e2e test

---

## 3. Shared contracts: `packages/contracts` (`@kibo/contracts`, new)

```
packages/contracts/
  package.json             # zod peer; builds to dist (ESM + CJS) for Nest (nodenext) and Next
  src/index.ts
  src/api.ts               # ApiResponse<T>, ApiErrorBody, isFailure()
  src/errors.ts            # error codes + default messages
  src/workspaces.ts        # WorkspaceDto, workspaceMetadataSchema, TRIAL_BOT_LIMIT = 1
  src/bots/enums.ts        # personalities (label, description, sample replies), reply modes,
                           # unsure actions, severities, statuses + display labels
  src/bots/languages.ts    # [{ code: "en", name: "English" }, { code: "hi-Latn", name: "Hinglish", hint: "Hindi + English" }]
  src/bots/schemas.ts      # createBotSchema, updateBotSchema (identity | personality | replying | safety | metadata),
                           # escalationRulesSchema, deleteBotSchema { confirmName }, botListQuerySchema, botMetadataSchema
  src/bots/types.ts        # BotDto, BotListItemDto, BotListResult { items, counts, limit }, EscalationRuleDto
  src/bots/templates.ts    # 6 templates (Hinglish sample lines included)
  test/*.test.ts           # Vitest schema tests
```

**Wiring:**
- `turbo.json` builds `contracts` before `api` and `web`.
- `apps/web/next.config` adds it to `transpilePackages`.

---

## 4. API (`apps/api/src`)

All routes sit behind the existing `SessionGuard` and `@CurrentUser()` (`src/auth/`). They are validated with the existing `ZodValidationPipe` and contract schemas, and wrapped by the global envelope. The pattern follows the removed bots module (commit `fc6572e^`).

### New files

```
src/common/response.interceptor.ts
src/common/envelope-exception.filter.ts
src/common/api-exception.ts
src/workspaces/workspaces.module.ts
src/workspaces/workspaces.service.ts     # ensurePersonal(userId), getCurrent(userId)
src/workspaces/workspaces.controller.ts  # GET /workspaces/current, PATCH /workspaces/current (name, metadata)
src/workspaces/workspace.decorator.ts    # @CurrentWorkspace()
src/bots/bots.module.ts
src/bots/bots.controller.ts
src/bots/bots.service.ts                 # all rules, in Prisma transactions
src/bots/bots.mapper.ts                  # row → BotDto (lower-case enums, ISO dates)
src/bots/escalation-rules.service.ts
```

### Endpoints (each `result` below sits inside the envelope)

| Method and path | Body / query | `result` | Failure codes |
|---|---|---|---|
| `GET /workspaces/current` | | `{ id, name, role, defaultBotId, metadata, limits: { bots: { used, max } } }` | |
| `PATCH /workspaces/current` | `{ name?, metadata? }` | `WorkspaceDto` | `VALIDATION_FAILED` |
| `GET /bots` | `?status=all\|active\|paused\|draft\|archived&q=` | `{ items: BotListItemDto[], counts, limit: { used, max } }` | |
| `POST /bots` | `{ name, purpose?, personality, languages, replyInViewerLanguage, templateKey?, copyFrom?: { botId } }` | `BotDto` (201) | `BOT_LIMIT_REACHED`, `BOT_NAME_TAKEN`, `VALIDATION_FAILED` |
| `GET /bots/:id` | | `BotDto` + escalation rules | `BOT_NOT_FOUND` |
| `PATCH /bots/:id` | a section of `updateBotSchema` | `BotDto` | `BOT_NAME_TAKEN`, `VALIDATION_FAILED` |
| `PUT /bots/:id/escalation-rules` | `{ rules: [{ trigger, severity, action }] }` (≤ 20) | `EscalationRuleDto[]` | `VALIDATION_FAILED` |
| `POST /bots/:id/pause` / `resume` | | `BotDto` | `BOT_IS_DRAFT` |
| `POST /bots/:id/archive` / `restore` | | `BotDto` | `BOT_LIMIT_REACHED` (restore) |
| `POST /bots/:id/duplicate` | | `BotDto` (201, `DRAFT`) | `BOT_LIMIT_REACHED` |
| `POST /bots/:id/make-default` | | `WorkspaceDto` | `BOT_ARCHIVED` |
| `DELETE /bots/:id` | `{ confirmName }` | `null` | `CONFIRM_NAME_MISMATCH` |

`copyFrom` copies settings and escalation rules now. The G2 checkboxes for Knowledge and for Commands & timers render with Soon until Modules 3 and 7.

### Tests

`apps/api/test/*.e2e-spec.ts` uses Jest and supertest against a `kibo_test` database. A Compose init script creates that database, and the test env overrides `DATABASE_URL`. They assert the envelope on every response, plus:
- create, then a 2nd create returns 409 at limit 1
- raising `botLimit` in the test allows 3
- name clash
- another workspace's bot returns 404
- archive, then restore over the limit
- delete with the wrong name
- the default bot moving
- the PATCH sections
- the escalation-rules replace
- `languages: ["hi"]` rejected and `["hi-Latn"]` accepted

---

## 5. Web (`apps/web`)

### Data layer: TanStack Query

TanStack Query v5 (`@tanstack/react-query`, plus devtools in dev only) gives:
- **One cache** shared by the bots list, the bot switcher in the top bar, the bot header and the dashboard, so each bot loads once per page.
- **Instant filter and search changes** from cached results, and background refetch when the window regains focus.
- **Mutations with invalidation and optimistic updates:** pause and resume, archive with Undo, and set as default feel instant and roll back if the API fails.

**How it fits the App Router:**
- **`components/query-provider.tsx`** (client): one `QueryClient` per browser session. Defaults: `staleTime` 30 s, `retry` 1, and no retry on 4xx. Added in `app/layout.tsx` next to `ThemeProvider`.
- **Server prefetch:**
  - Protected pages create a per-request `QueryClient` (`lib/query/get-query-client.ts`, using React `cache`) and `prefetchQuery`, through `apiServerFetch`, which forwards the cookie.
  - The page is wrapped in `<HydrationBoundary state={dehydrate(client)}>`.
  - The first paint has data, with no loading flash. This is TanStack's documented App Router pattern.
- **Client:** `useQuery` and `useMutation` through `apiClientFetch` (`credentials: "include"`; the API's CORS already allows `WEB_URL` with credentials).
- **Query key factory:** `lib/query/keys.ts`
  - `["workspace"]`
  - `["bots", { status, q }]`
  - `["bot", id]`
- **Query modules:**
  - `lib/query/bots.ts` holds `botsQueries` (list and detail options, shared by server prefetch and client hooks) and mutation hooks: `useCreateBot`, `useUpdateBot`, `usePauseBot`, `useArchiveBot`, `useRestoreBot`, `useDuplicateBot`, `useMakeDefaultBot`, `useDeleteBot`, `useSaveEscalationRules`.
  - `lib/query/workspace.ts` holds the workspace query.
- **Envelope handling:**
  - `apiServerFetch` and `apiClientFetch` unwrap the envelope: they return `result` on success, and throw `ApiError { code, message, status, details }` on `failed`.
  - Forms map `details.issues` onto fields.
  - Other errors show `error.message` in a toast or callout.
- **No Server Functions in this module.** Mutations go through TanStack Query, so one pattern covers everything.

### Routes (each only fills template slots; `proxy.ts` adds `/bots/:path*`)

| Route | Frame | Content |
|---|---|---|
| `app/(protected)/bots/page.tsx` | G1, G1 states | Page header ("1 of 1 bot on your trial"), status chips with counts, search, bots table (phone: cards), row actions, archived section, empty state with template shortcuts, limit callout and meter |
| `…/bots/new/page.tsx` | G2 | From template or scratch; name, reply language (Match the viewer / English / Hinglish), personality, copy from (settings now, the rest Soon), Draft/Silent callout; `?template=` preselects. At the limit, the page shows the limit callout instead of the form |
| `…/bots/templates/page.tsx` | G3 | Template gallery and preview |
| `…/bots/[botId]/layout.tsx` | BotHeader | Breadcrumb, avatar, name, status, Default bot, summary, Pause/Resume, "Test in playground" (Soon), the tabs |
| `…/[botId]/page.tsx` | G4a | Overview: empty metrics, empty recent replies, platforms (none yet), knowledge coverage (Soon), **Settings at a glance (real)** |
| `…/[botId]/personality/page.tsx` | G4b | Identity, languages (English / Hinglish), personality, voice notes, welcome message, live preview |
| `…/[botId]/behavior/page.tsx` | G4c | Replying + Safety, escalation rules editor |
| `…/[botId]/platforms/page.tsx` | G4d | Platform rows with Connect as Soon ("Connecting platforms opens with Integrations") |
| `…/[botId]/playground/page.tsx` | G4e | Soon panel |
| `…/[botId]/history/page.tsx` | G4f | Empty history: "Nothing yet. Every reply and moderation action will be listed here." |

Both settings forms keep a sticky **Discard / Save** bar and an unsaved-changes guard.

### Components (reuse first)

**Reused:**
- `@kibo/ui`: `DataTable`, `ConfirmDialog` (`typeToConfirm`), `Slider`, `TagInput`, `RadioGroup` and `ChoiceCard`, `SegmentedControl`, `Switch`, `Select`, `Field`, `Textarea`, `DropdownMenu`, `Callout`, `Meter`, `Empty`, `toast`
- web: `PageHeader`, `FilterBar`, `SettingsGroup` and `SettingsRow`, `LimitNotice`, `TabLinks`, `StatusPill`, `Avatar`, `ChatMessage`, `DetailList`, `BotCard`, `BotSwitcher`, `PauseBotButton`

**New:**

```
components/query-provider.tsx
components/molecules/personality-picker.tsx
components/molecules/language-picker.tsx         # English / Hinglish chips
components/molecules/confidence-field.tsx
components/organisms/bots/bots-table.tsx
components/organisms/bots/bot-row-actions.tsx
components/organisms/bots/bots-empty.tsx
components/organisms/bots/bot-limit-notice.tsx   # "Your trial includes 1 bot. Archive Pip to make room, or see plans."
components/organisms/bots/archive-bot-dialog.tsx
components/organisms/bots/delete-bot-dialog.tsx
components/organisms/bots/create-bot-form.tsx    # reused by onboarding C2 in Module 2
components/organisms/bots/template-gallery.tsx
components/organisms/bots/bot-header.tsx
components/organisms/bots/bot-overview.tsx
components/organisms/bots/personality-form.tsx
components/organisms/bots/bot-preview.tsx        # sample replies per personality, in English or Hinglish
components/organisms/bots/behavior-form.tsx
components/organisms/bots/escalation-rules-editor.tsx
components/templates/record-template.tsx         # header + tabs + content
lib/query/get-query-client.ts, keys.ts, bots.ts, workspace.ts
```

### App shell wiring (chunk 5)

- **`app/(protected)/layout.tsx`:** prefetches the workspace and its bots, and passes the real workspace and default bot to `AppTemplate`.
- **`BotSwitcher`:** reads the bots query, opens bot pages, and has working "Create bot" and "Manage bots".
- **`lib/app-navigation.ts`:** Bots becomes `ready: true`.
- **Dashboard step 1:** links to `/bots/new`, and shows done once a bot exists.
- **Command menu:** gains "Bots" and "Create bot".
- **Top bar and header Pause:** wired to the mutation for `ACTIVE` and `PAUSED` bots. Draft shows "Finish setup to go live first."
- **`/design`:** gains bot organism boards.

---

## 6. Settings: the full list

| Group | Setting | Control | Values (default) |
|---|---|---|---|
| Identity | Bot name | Input | 1–40, unique in workspace |
| | Purpose | Input | ≤ 60, optional |
| | Avatar | Initials (image later, in `metadata`) | |
| | Languages | Chips | English, Hinglish (English) |
| | Reply in viewer's language | Checkbox | on |
| Personality | Personality | Choice cards | Friendly / Hype / Chill / Sarcastic / Professional (Friendly) |
| | Voice notes | Textarea + counter | ≤ 1,000 |
| Welcome | Welcome first-time chatters | Checkbox | on |
| | Message | Textarea | ≤ 300, `{viewer}`, `{game}`, `{title}` |
| Replying | Reply mode | Segmented | Auto / Approval / Silent (Silent) |
| | Confidence threshold | Slider | 50–99 (85) |
| | When unsure | Select | Draft for approval / Inbox / "I'm not sure" (Inbox) |
| | Who can approve | Radio | Me / My moderators (Me) |
| | Max replies per minute | Number | 1–30 (8) |
| | Cooldown per viewer | Select | 15 s / 30 s / 1 min (30 s) |
| | Answer repeated questions once | Switch | on |
| | Quiet mode | Switch | off |
| Safety | Blocked topics | TagInput | ≤ 20 |
| | What it says instead | Input | ≤ 200 |
| | Escalation rules | List editor | trigger, severity, action; 3 defaults |
| | Ignore instructions from chat | Switch | on |
| Bot | Default, Pause/Resume, Duplicate, Archive/Restore, Delete | Menus and dialogs | |

**Templates** set personality, reply mode, welcome message, voice notes and blocked topics now. Their FAQs, commands and moderation strictness are stored as `templateKey` and applied by Modules 3, 7 and 4.

---

## 7. Chunks (one branch and PR each)

| # | Branch | Contains | Done when |
|---|---|---|---|
| 1 | `feat/bots-data` | `@kibo/contracts`; response envelope (interceptor, filter, exception) + updated `/health`, `/auth/session` consumers; Prisma models, metadata, first migration; personal workspace hook + backfill; workspaces and bots API; e2e and contract tests | All endpoints return the envelope and pass e2e; `mira@kibo.test` has a personal workspace with `botLimit` 1 |
| 2 | `feat/bots-list` | TanStack Query setup (provider, server prefetch, keys, envelope-aware fetchers); `/bots` list, filters, search, empty, limit, archived section, row actions, dialogs, toasts; proxy route; sidebar Bots ready | Manage bots fully from the list |
| 3 | `feat/bots-create` | `/bots/new`, `/bots/templates`, create form, template gallery, copy from; dashboard step 1 | Create from scratch or a template, landing on the bot |
| 4 | `feat/bots-settings` | `[botId]` layout, header, 6 tabs; personality + behavior forms; escalation editor; Soon shells | Every setting saves, reloads and validates |
| 5 | `feat/bots-shell` | Switcher, top bar Pause, command menu, layout prefetch, `/design` boards; `docs/roadmap/bots.md` status | The shell shows real bots everywhere |

**Every PR:**
- lint, type-check, build and tests pass
- browser check with `mira@kibo.test` at 1440 and 390, against the frames
- no console errors
- the PR description lists screens and frames

---

## 8. Verification (end to end, after chunk 5)

1. `pnpm db:up`, `pnpm --filter api db:migrate`, then the API (8090) and the web app (3050). Log in as `mira@kibo.test`.
2. **Envelope:**
   - `curl localhost:8090/health` returns `{ status: "success", result: {…}, error: null }`.
   - `curl localhost:8090/bots` without a cookie returns 401 `{ status: "failed", result: null, error: { code: "UNAUTHENTICATED", … } }`.
3. **Create:** "Create your bot" opens `/bots/new`. Create "Pip" from Gaming with Hinglish. It lands on Overview, Draft, Silent and default. Step 1 shows done.
4. **Limit:**
   - Opening Create bot again shows the limit callout.
   - `POST /bots` returns 409 `BOT_LIMIT_REACHED`.
   - Duplicate is disabled, with the reason.
5. **Personality:**
   - Change the personality and voice notes. The preview shows Hinglish lines. Save, reload, and the values persist.
   - A 1,001-character voice note shows the field error from `details.issues`.
6. **Behavior:** set Auto and 90%, add a blocked topic, add and reorder an escalation rule, save, reload.
7. **Archive and Undo:**
   - Archive Pip, and the toast's Undo restores it. The cache updates without a reload.
   - Archive it again, then create a second bot: allowed.
   - Restore Pip: 409, and the UI says why.
8. **Delete:** a wrong name keeps the button disabled; the right name deletes it. The default moves.
9. **Shell:** the switcher and top bar show the default bot from the same cached query. There's no duplicate `/bots` request in the network tab.
10. **Security:** a second account gets 404 for the first account's bot.
11. `pnpm turbo run lint typecheck build test`.

---

## Status

| Chunk | Branch | State |
|---|---|---|
| 1 | `feat/bots-data` | Done, in review |
| 2 | `feat/bots-list` | Done, in review |
| 3 | `feat/bots-create` | Not started |
| 4 | `feat/bots-settings` | Not started |
| 5 | `feat/bots-shell` | Not started |

### Chunk 1 notes (Oct 14, 2026)

Built as planned. Five things differ from the plan:

- **The e2e tests run the real server.** better-auth ships ES modules only, and Jest can't load those in-process. `test/global-setup.ts` therefore:
  - creates and migrates a `kibo_test` database
  - compiles the API into `dist-e2e/`, so a running dev server's `dist/` is never touched
  - starts it on port 8091

  The tests then call it over HTTP. This replaces the planned Compose init script.
- **The migrations start from a baseline.** `0_init` holds the existing auth tables and was marked applied without being run, so the dev database kept its data. `add_workspaces_and_bots` follows it. From now on the schema changes only through `pnpm --filter api db:migrate`.
- **There is one more error code, `REQUEST_FAILED`.** It covers a 4xx that isn't field validation, for example a malformed JSON body ("The request body isn't valid JSON."). Unknown routes answer `NOT_FOUND` with "That page or item doesn't exist." instead of Nest's "Cannot GET /path".
- **`@kibo/contracts` builds to CommonJS in `dist/`.** Both Nest and Next import that build, so it isn't in `transpilePackages`. Turbo builds it before `dev`, `typecheck` and `test`.
- **The workspace is resolved by a guard.** `WorkspaceGuard`, placed after `SessionGuard`, puts the workspace on the request, and `@CurrentWorkspace()` reads it. A decorator alone can't run async lookups.


### Chunk 2 notes (Oct 14, 2026)

Built as planned, with these differences:

- **Create bot and Browse templates show Soon.** `/bots/new` and `/bots/templates` arrive in chunk 3, which turns these buttons, the empty state's template cards and the phone menu into links.
- **Bot names don't link yet.** The bot page (`/bots/[botId]`) arrives in chunk 4. For the same reason the row has no Test or Finish setup action; a paused bot shows Resume and an archived one Restore.
- **Filters change the URL without a server round trip.** The page prefetches the list for the URL it was opened with. After that, the chips and search update the address with `history.replaceState` and read from the TanStack cache, keeping the previous list on screen while the next one loads.
- **Replies, answer rate and platforms show "—" and "None yet".** They fill in when streams (Module 4) exist.
- **Mutation hooks arrive with their screens.** Chunk 2 adds `useBotAction` (pause, resume, archive, restore, duplicate, set as default) and `useDeleteBot`. Create, update and escalation rules come with chunks 3 and 4.
- **`lib/query/query-client.ts` holds the shared defaults.** The browser provider and the per-request server client (`get-query-client.ts`) both build from it. `lib/query/fetcher.ts` types the fetcher that query options take, so the same options run on the server with `apiServerFetch`.
