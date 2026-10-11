# Component library: audit and build plan

Source: Claude Design canvas, page **01 Component library** (130 boards, plus the "Code handoff" note). As of Oct 11, 2026.

## What the library contains

| Layer | Boards | Notes |
|---|---|---|
| Foundations | 6 | Color roles, type styles, spacing/radius/shadow, icons (lucide names), brand mark, motion. No new values. |
| Atoms | 32 | Button, Badge, Input, Textarea, Field text, Checkbox, Radio and choice card, Switch, Select (native, custom, combobox, multi), Segmented control, Tabs, Slider and stepper, Avatar, Tooltip, Kbd, Separator, Skeleton, Spinner, Meter and progress, Status pill, Message tag, Chip, Platform icon, Icon tile, Source chip and confidence, Stat, Panel, Section, Typography (and code block), Prose, Brand logo, Soon label, Placeholder. |
| Molecules | 35 | Forms (password, search, tag input, copy field, file upload, date and time pickers), navigation (breadcrumbs, tab links, side nav, pagination, onboarding stepper), feedback (callout, toast, empty state), menus (dropdown, command items, theme switch), content (chat message, charts, feature, integration, plan, post, change item, testimonial, link list, check list, detail list, list row, notification item, setup checklist, article feedback), social sign-in, bot controls. |
| Organisms | 46 | Marketing (site header, footer, hero, feature split, CTA, pricing, directories, forms, cookie banner, use-case nav, platform strip, hero demo), auth (sign up, log in, brand panels), app shell (sidebar, top bar, bot switcher, account menu, notifications, command menu, phone menu, system banners), data (page header, data table, filter bar, dialog, confirm dialog, side sheet, settings rows, feature locked), and 12 product cards (bot, knowledge source, approval, moderation item, viewer, stream summary, schedule event, sponsor, overlay widget, team member, invoice, payment method). |
| Templates | 7 | Marketing, Auth, App, Onboarding, Settings, List and detail, Error. |
| Patterns | 6 | Not available yet, Loading, Empty, Errors, Destructive actions, Live status everywhere. |

Every board has a variant grid, forced states, phone width, a spec strip with token names, code labels and an accessibility note.

## What doesn't match today

### Shared decisions from the handoff

- **Button:** delete `outline` (same as `secondary`; only `dialog.tsx` uses it). Add `loading` ("Saving…" plus spinner, `aria-disabled`), disabled-with-reason / Soon, and full width.
- **Badge:** delete `secondary`, `ghost` and `link`. Add `count` with a 9+ cap, and an icon.
- **Status pill:** rename tone `ready` to `offline`, with "Ready" as a label. Add a `label` prop, the tones `connecting`, `reconnect` and `draft`, and size `sm` (22).
- **Monogram:** merge into Avatar as `variant="bot"`. Avatar gains xs–xl sizes, a status dot, a platform badge and `shape="square"` for workspaces.
- **Message tag:** split `kind` (the word) from `tone`, and add tone `positive`.
- **Stat:** add `tone` positive / negative / neutral, a sparkline, and empty and loading states.
- **Renames:**
  - Onboarding bar → `OnboardingStepper` (`bar` | `list`)
  - Setup banner → `SystemBanner` (kind plus tone)
  - Five section headers → `PageHeader`
  - Top bar plus phone bar → one `AppTopbar`
- **Disabled with a reason uses `aria-disabled`, never `disabled`,** so keyboard and screen reader users can reach it and hear why. We use `disabled` today on social sign-in, Pause bot and the account menu's Soon items.
- **Icons:** lucide at 16, 20 and 24px, with `absoluteStrokeWidth`: 2px at 16, 1.5px at 20 and 24.
- **Token aliases:** `color-bg-inverse` and `color-link`. We already have `--vi-bg-inverse`; only the naming changes. The switch thumb uses `text-on-accent`.

### Built screens that differ from the library

| Where | Today | Library |
|---|---|---|
| Site header, Product | Narrow dropdown, a text list | Wide menu: three columns of icon tile, title and one line, plus a "New: Twitch support" side card. A disclosure button, not a menu. |
| Site header | Same at every scroll position | After 8px of scroll: 60px tall, raised background and shadow |
| Phone site menu | — | Rows 48, groups expand in place, Get started and Log in as 48px blocks at the bottom |
| Site footer | Text social links, desktop only | Official marks for social links, an accordion on phone, `bg-page` |
| Social sign-in | Three buttons, `disabled` | Google and Twitch only (YouTube kept for later), `aria-disabled`, one reason under the group |
| Sign up | No name field, short summary | Name field first. Summary titled "Fix N things…" listing linked errors. "Creating account…" while submitting. |
| Log in | — | "Keep me logged in for 30 days", "Logging in…" while submitting |
| Menus | Items vary | 36px items, `radius-md`, `bg-hover` highlight, destructive item last. Phone opens a bottom sheet. |
| Command menu | Accent highlight | 44px rows, `bg-hover` highlight, recent searches, no results, loading |
| Notifications | "You're all caught up" | Notifications are Soon: the bell tooltip says Soon and the panel explains what's coming |
| Top bar | Search on the left, bot on the right | The library spec puts the bot switcher, status and Pause on the left and search, bell and avatar on the right. The live Topbar board still has search on the left. Decided: keep search left (see Decisions). |
| Setup banner | One-off component | `SystemBanner`: one component with tones info, warning, danger and neutral, and kinds setup, trial, payment, reconnect, paused and maintenance |
| Check list | One size | `sm`, `default` and `lg`, plus excluded rows |
| Meter | One thickness | `default` 6 / `thin` 4, a strength variant, usage thresholds (80% warning, 100% danger), indeterminate `Progress` |
| Spinner | Missing | `Spinner` sm 16 / md 20, shown after 300ms |
| Route files | The landing page has 46 `className`s; 11 more pages have 9–34 | Pages only fill template slots; sections become organisms |

Every row above is now fixed; see Status.

## Decisions (Oct 11, 2026)

- **Structure:** generic pieces go in `packages/ui`, Kibo pieces in `apps/web`'s atomic layers (below).
- **Renames:** adopt every rename the handoff proposes, including Button `default` → `primary`.
- **Product cards:** build all 12 now as presentational components shown on `/design`, and wire them to data when each feature ships.
- **Top bar:** keep ⌘K search on the left and the bot on the right, as on the live Topbar board and in code.
- **When a page frame and a library board disagree, the board wins.** The boards are newer and carry the code handoff. The page frames (A, B, D, E, V1) set layout, copy and spacing.

## Where components live

The boards' code labels write every import as `@/components/<layer>/…`, Button included. We keep two packages, with one rule for what goes where:

**`packages/ui` (`@kibo/ui`): the Violet design system.**
- Tokens and global styles.
- Every generic component that any React app could use. These have no Kibo words and no `next/*` imports.
- Built on shadcn and Radix:
  - Button, Badge, Input, Textarea, Field
  - Checkbox, RadioGroup and ChoiceCard, Switch, Select, Combobox and MultiSelect, SegmentedControl, Tabs, Slider and NumberStepper
  - Avatar, Tooltip, Kbd, Separator, Skeleton, Spinner, Meter and Progress, Chip, Panel, Typography and CodeBlock
  - Callout, Accordion, DropdownMenu, Command, Toast, Empty, Pagination, Dialog, ConfirmDialog, Sheet, Popover
  - DatePicker and Calendar, TagInput, CopyField, FileDropzone, DataTable primitives

**`apps/web/components`: Kibo, in atomic layers.**
- **atoms:** BrandLogo, StatusPill, PlatformIcon, MessageTag, SourceChip and Confidence, IconTile, Stat, SoonLabel, Section, Container, Prose
- **molecules:** PasswordField, SearchField, SectionHeading, TabLinks and SideNav, CheckList, DetailList, ListRow, ChatMessage, Charts, the feature, integration, plan and post cards, SocialSignIn, BotControls, NotificationItem, OnboardingStepper, SetupChecklist, …
- **organisms,** grouped in folders: `marketing/`, `auth/`, `app-shell/`, `data/` (page header, filter bar, settings, feature locked), `cards/` (the 12 product cards)
- **templates:** marketing, auth, app, onboarding, settings, list-detail, error, share

**Rules:**
- Imports go one way only: `app` → templates → organisms → molecules → atoms → `@kibo/ui`.
- Routes only fill template slots.
- An ESLint `no-restricted-imports` rule per layer enforces both.
- No re-export shims between the two packages.

**Showcase.** A development-only `/design` route renders every component with its variants and states, one page per layer, in the same order as the canvas. It is how we check each component against its board, now and whenever the design changes. It returns 404 in production.

## Build order

1. **Setup:**
   - folder moves
   - layer lint rules
   - `/design` showcase shell
   - token aliases
   - motion tokens: `duration-instant` 100, `fast` 150, `moderate` 200, `slow` 300
   - icon stroke convention
2. **Atoms:**
   - update the existing ones: Button, Badge, Avatar (merge Monogram), StatusPill, MessageTag, Meter, Stat, Chip, IconTile, PlatformIcon, Typography
   - add the missing ones: Checkbox, Radio and ChoiceCard, Switch, Select family, Tabs, Slider and NumberStepper, Kbd, Spinner, Progress, CodeBlock
3. **Molecules:**
   - update the existing ones
   - add Pagination, NotificationItem, the date and time pickers, FileDropzone and FileRow, TagInput, CopyField, OnboardingStepper, CommandTrigger
4. **Organisms, then templates:**
   - fix the site header (Product menu, scrolled state, phone menu), footer, auth forms (Name field), app shell and SystemBanner
   - add PageHeader, DataTable, FilterBar, ConfirmDialog, Settings and FeatureLocked
   - then the 12 product cards
5. **Screen pass:**
   - move route-level styling into organisms
   - compare every built page with its frame at 1440 and 390
   - update `docs/roadmap/authentication.md`

Each step ends with lint, type-check, build and a showcase check against the boards.

## Status (Oct 11, 2026)

Steps 1 to 5 are done. Every board has a component and a `/design` showcase entry. Lint and type-check pass.

### Screen pass

Every built page was compared side by side with its frame, rendered locally from the canvas, at 1440 and 390: the 24 marketing routes, sign up, log in, logged out, the app shell, the new dashboard, the share page and 404. Fixes made:

- **Type:** DM Sans now loads its optical-size axis (`axes: ["opsz"]`). Without it, large headings ran wider than the design and wrapped early on every page.
- **Charts:** rebuilt to the charts board:
  - bars with a muted comparison
  - a line chart with a comparison line, crosshair and tooltip
  - sparkline, mood bar, donut and heatmap
  - legend and axis
  - empty, loading and error states

  The line chart keeps the board's headroom above the peak.
- **CTA banner:** now the board's dark section: an inset card with the copy beside the actions, or `flush` (full bleed and centered). It takes an optional outlined secondary action.
- **Integration card:**
  - Directory card: stacked as on the board (a 40px logo, the category badge or Soon at top right, then the name and one line).
  - `compact`: shows the category.
  - The landing page's integration strip uses `compact`.
- **Detail list:** values of 24 characters or fewer stay beside their label down to 220px wide (the board's rule), so the integration sidebar reads label left, value right.
- **Feature item:** `boxed="raised"` for boxes inside an alt section, where the surface box disappeared (moderation, engagement and both use cases).
- **Smaller fixes:**
  - The /product hero is padded 96 and its chips sit on one line.
  - The /about heading spans the column (`SectionHeading wide`).
  - Pull quotes are balanced.
  - Help topic cards are stacked.
  - The landing hero keeps 80 top padding on phones.
  - Step 1 now reads “Create an account, then connect YouTube or Twitch.”
- **Bugs:**
  - Opening the account menu crashed: `DropdownMenuItem asChild` passed Radix's Slot two children. The fix affects every link item in every menu.
  - Help search snippets showed raw Markdown links.

Intended differences from the frames, because a newer board says otherwise:

- the footer (`bg-page`, platform marks)
- the “Most popular” plan (a 2px accent inset)
- social sign-in (Google and Twitch, Soon)
- the article feedback buttons (“Yes” / “No”)
- the reconnect status tone (warning)
- the phone banner action (a full-width block under the message)

### Routes now only fill slots

Page-level layout moved into organisms. The most `className`s in any marketing or share route went from 46 to 11. New pieces:

- **`MarketingSection`:** a section, container and heading around any content.
- **Landing page:** `LandingHero`, `ChatShowcase`, `TrustControls`.
- **Share page:** the `summary/` organisms (`SummaryTitle`, `SummaryStats`, `SummaryChatChart`, `SummaryHighlights`, `SummaryTopQuestions`, `SummarySponsor`) and a `ShareTemplate`.
- **Integration detail:** `IntegrationHeader`, `IntegrationDetails`, `IntegrationAside`.
- **Help:** `HelpHero`, `HelpTopics`, `HelpStillStuck`, and the search results organisms.
- **About:** `StorySection`, `TeamGrid`, `CareersCallout`.
- **Blog post:** `ArticleHeader`, `ArticleTrialNote`, `KeepReading`.
- **Atoms:** `MainAside`, for main-and-aside columns.

### Still open

- Placeholder art (team photos, blog covers, changelog and help screenshots) stays until real images exist. The handoff asks for real images with the placeholder text as alt.
- Product screens beyond the dashboard (C, F–W) haven't been built. Their cards and templates exist on `/design`.

## New dependencies to expect

- `react-day-picker`, for the date pickers (shadcn Calendar)
- `@tanstack/react-table`, for the data table. Not needed: `DataTable` covers sorting, selection, bulk and row actions and phone cards on its own.
- Charts stay hand-drawn SVG. Decided at step 3: the line chart's tooltip, crosshair and keyboard support didn't need a library.
