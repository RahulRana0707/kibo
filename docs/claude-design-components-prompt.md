# Design Brief: Kibo component library

Paste everything below the line into Claude Design, on the existing Kibo canvas.

---

You designed the Kibo canvas: 24 pages of website screens, built on the **Violet** design system you already installed. We have started building it in code (Next.js website, shadcn components restyled to Violet, lucide icons). Before we build more screens, we need **one component library** that both the canvas and the code follow.

This brief has three parts:

1. **Fix first:** sign up has no name field.
2. **The rules** for the component library.
3. **The full inventory:** every component and variant. It covers what already exists in code and what the remaining screens need.

When you finish, we will rebuild each component in code from your boards. Every value we need must therefore be visible on the board.

Kibo is a **website**, used in desktop browsers and in phone browsers. It is not a native mobile app. Phone width means the same website at 390px, so do not draw native app patterns such as tab bars, status bars or swipe gestures.

Keep using Violet's tokens, type styles, components and the seven design skills, as you did for the screens. This brief adds no new colors or fonts.

---

## Part 1. Fix first: sign up has no name field

**The problem:**
- B1 Sign up asks only for email, password and the terms checkbox.
- C1 Welcome opens with "Welcome to Kibo, Mira" and shows "Display name" already filled in.
- Nothing before C1 asks for a name, so we have no way to know it. In code we currently guess the name from the email address, which is wrong for many people.

**Fix it across the canvas:**

1. **B1 Sign up**, in all three frames: Default, Email taken / weak password, and Mobile web.
   - Add a **Name** field above Email.
   - Label: "Your name". Example placeholder: "Mira Okafor". `autocomplete="name"`.
   - Helper text: "Shown to your team, never to viewers."
   - Error when empty: "Enter your name."
   - Field order: Name, Email, Password, Terms, then "Create account".
2. **B1 errors frame:** add the "name missing" state next to "email taken" and "weak password". The error summary callout covers all three.
3. **C1 Welcome:** keep "Display name", filled in with the name from sign up, so people can change it but never type it twice.
4. **B10 Accept team invite (new account):** if it creates an account, it asks for the name the same way B1 does.
5. **B11 OAuth result:** after Google or Twitch sign-in, the name comes from that account. Show it filled in on C1.
6. **Flow map (Main):** update any arrow or note that lists the sign-up fields.

**Also fix these mismatches we found while building:**

- **B2 Log in, brand panel.** It shows "While you were away" with the creator's real stats. The login page is public and the person isn't signed in yet, so it can't show account data. Replace it with something that is not personal: a product example clearly labelled as an example, or a short benefit list.
- **B9 Session expired.** It shows the person's name and avatar. Once the session has expired we no longer know who they were. Design it without identity: same message, empty email field.
- **B2 errors.** Keep "Account locked" for later. Also add the state we ship today: "Too many attempts. Wait a minute and try again." It is a warning callout, the form stays usable, and there is no countdown.
- **Not available yet.** Some controls exist in the design but not in the product yet. In code they show disabled with a "Soon" label and a reason. Draw this pattern once in the library (see Patterns), so we use one look everywhere. Today it applies to:
  - social sign-in
  - Forgot password
  - bot switching, Pause bot and notifications
  - workspace creation
  - Profile, Settings and Billing

---

## Part 2. Rules for the component library

### Where it goes
- Put it on the page **"00 Flow map & components"**, below the existing Components boards (Sidebar, App top bar, Site navigation, Site footer, Kibo patterns, Onboarding progress bar and the section headers).
- If the page gets too crowded, add a page right after it called **"01 Component library"** and move every component board there, the existing ones included.
- Group the boards under title notes, in atomic design order:
  1. Foundations
  2. Atoms
  3. Molecules
  4. Organisms
  5. Templates
  6. Patterns

  Our code uses these same five layers (Patterns being the sixth group here), so the canvas and the code line up one to one.
- Name every board `Components / <Layer> / <Component>`, for example `Components / Atoms / Button`.

### What each board shows
1. **A variant grid.** Variants across the top, sizes down the side. Where a component has no sizes, use one row per variant.
2. **A state row for each variant.** Draw every state that applies:
   - Default
   - Hover
   - Focus-visible (Violet focus ring)
   - Pressed
   - Disabled
   - Disabled with a reason ("Soon" plus a tooltip or helper line)
   - Loading
   - Invalid / error
   - Selected / checked / current
   - Open (menus, selects, accordions)
   - Empty, loading and error, for anything that shows data
3. **Phone width (390px)** wherever the layout changes: stacking, a full-screen sheet instead of a dropdown, or larger touch targets (44px).
4. **A spec strip under the grid.** Give the exact values for:
   - height and padding
   - gap
   - radius token
   - type style
   - color tokens for background, text, border and icon
   - shadow token
   - icon size and stroke
   - motion (property, duration and easing)

   We copy these into code, so write token names, not hex values.
5. **Code labels.** Label each cell with the property names we use in code, written as `variant="secondary" size="sm"`. Use the names listed in Part 3. Where you think a name should change, keep the current name and add a sticky note with your proposal.
6. **Accessibility notes in one line:**
   - the element and role (`<button>`, `<a>`, menu, dialog)
   - keyboard behaviour (Tab, arrow keys, Escape)
   - what a screen reader announces

### Content and look
- Use real Kibo copy and the existing sample data: Mira Okafor (miraplays), bot Pip, YouTube Live and Twitch. No lorem ipsum.
- Draw **light theme only.** Dark mode comes from the tokens in code, so it needs no boards.
- Use Violet's components wherever they exist: Button, IconButton, TextField, Checkbox, Switch, Tabs, Badge, Card, Toast, ConfirmDialog, EmptyState and Icon. Anything Violet lacks, build from its tokens and mark it **"Kibo addition"** on the board, as you did for platform chip, status pill and the others.
- One look per job. If two screens on the canvas draw the same thing differently (two kinds of table, three kinds of status chip), pick one for the library. Then add a sticky note listing the screens that need updating. Don't restyle those screens in this pass.
- Where our code has a duplicate, decide and note it. For example, Button `secondary` and `outline` look the same today, and so do Badge `default` and `secondary`. Either give each a distinct purpose and look, or tell us to delete one.

### Handoff
Finish with a sticky note **"Code handoff"** that lists:
- components you **added**
- variants you **added or removed** compared with Part 3
- names you propose to **change**
- screens that need **updating** to match the library

---

## Part 3. Inventory

Columns:
- **In code** lists the variants we already have; your board must cover at least these.
- **Add** lists what the remaining screens need.
- Components with an empty "In code" don't exist in code yet.

### 3.1 Foundations (reference boards, no new values)

| Board | Show |
|---|---|
| Color roles | Every `color-*` semantic token as a swatch, with its name and where it is used (page, surface, raised, sunken, hovered, pressed, overlay, inverse, disabled, text primary, text secondary, link, accent solid / hover / subtle / border, danger, success and warning sets, separator, border control, border strong, focus ring). |
| Type styles | hero, display, title, heading, body, body-sm, caption, overline and code, each with size, line height, weight and its use. Include the phone sizes for hero and display. |
| Spacing, radius, shadow | The space scale, radius sm 6 / md 10 / lg 14 / xl 20 / full, and `shadow-border`, `shadow-border-hover` and `shadow-raised`, each on a sample card. |
| Icons | Every icon used anywhere on the canvas, at 16, 20 and 24px, each with its **lucide** name, since that is our icon set in code. Show the outline (default) and filled (active) pairs where both are used. |
| Brand mark | The K mark and the "Kibo" wordmark in sizes `md` and `sm`, the mark alone (favicon, app icon), and the mark on a dark section. |
| Motion | Press, hover, staged enter, icon swap and reduced-motion fallback, each as a labelled diagram (property, duration token, easing). |

### 3.2 Atoms

| Component (code name) | In code | Add |
|---|---|---|
| **Button** (`Button`) | variant: `default` (primary), `secondary`, `outline`, `ghost`, `destructive`, `link`. size: `xs` 28, `sm` 32, `default` 40, `lg` 48, `icon-xs`, `icon-sm`, `icon`, `icon-lg`. Leading icon, trailing icon. | Loading state (spinner plus a changed label, e.g. "Saving…"). Disabled with a reason. Full width. Icon-only with tooltip. Button on a dark section. Decide `secondary` vs `outline`. |
| **Badge** (`Badge`) | variant: `default`, `secondary`, `accent`, `success`, `warning`, `destructive`, `outline`, `ghost`, `link`. One size (24). | With icon. Count badge (unread notifications, "9+"). "Soon" badge. "New" badge. Decide `default` vs `secondary`. |
| **Input** (`Input`, `InputGroup`) | Default, focus, invalid, disabled. Input group with a leading icon or a trailing button. | Read-only. Prefix/suffix text (`discord.gg/`, `@`). Clear button. Size 48 for touch. Character counter. |
| **Textarea** (`Textarea`) | Default, focus, invalid, disabled. | Auto-grow. Character counter with a limit (e.g. bot replies of 200 characters). |
| **Label / field text** (`Label`, `FieldMessage`, `Field`, `FieldSet`) | Label, helper text, error with icon. Field orientation: vertical, horizontal. Fieldset with a legend. | Optional marker ("Optional"). Label with an aside link ("Forgot password?"). Description under a checkbox label. |
| **Checkbox** | — (Violet has it) | Unchecked, checked, indeterminate, disabled, invalid, with description. |
| **Radio group / choice card** | — (C1 uses choice cards) | Radio list. Choice card (title, description, selected). Choice card with an icon or platform logo. |
| **Switch** | — (Violet has it) | Off, on, disabled, with label and description. A settings row with a switch. |
| **Select** (`NativeSelect`) | Native select. | Custom select (open list, checked option, groups). Combobox with search. Multi-select with chips. Empty result. |
| **Segmented control** (`SegmentedControl`) | Two or more options, one selected (e.g. Monthly / Yearly). | Sizes sm / default. With icons. Phone width. |
| **Tabs** | — (Violet has it) | Underline tabs (page sub-nav), with counts, with a disabled tab. Contained tabs inside a card. Overflow at phone width (scrolls in a box). |
| **Slider / number stepper** | — | For settings such as reply frequency or cooldown seconds: slider with value, number input with − / +. |
| **Avatar** (`Avatar`, `Monogram`) | Avatar sizes `sm` 24, `default` 32, `lg` 40; image, initials fallback, avatar group with count. Monogram sizes `sm` / `md` / `lg`, `bot` variant. | Live dot / status badge on an avatar. Viewer avatar from a platform (with a small platform icon). Merge Avatar and Monogram if they are the same thing. |
| **Tooltip** (`Tooltip`) | Top, right, bottom, left. | With a keyboard shortcut. On a disabled control (explaining why). |
| **Kbd** | — | `⌘K`, `Ctrl K`, single keys, inside a tooltip and inside a menu item. |
| **Separator** (`Separator`, `DividerText`) | Horizontal, vertical. Divider with text ("or with email"). | — |
| **Skeleton** (`Skeleton`) | Block. | Text lines, avatar plus line, card, table row, chart. |
| **Spinner** | — | 16 and 20px, on light and on accent. |
| **Meter / progress** (`Meter`) | tone: `accent`, `success`, `warning`, `danger`. | With label and value. Thin (4px) and default. Indeterminate progress. Password strength (weak / fair / strong). Usage meter (0%, 60%, 90%, 100% over limit). |
| **Status pill** (`StatusPill`) | tone: `live`, `ready` (used for "Offline"), `paused`, `error`. | Starting / connecting, Needs reconnect, Draft. Rename `ready` if "Offline" is the meaning. Small size for table cells. |
| **Message tag** (`MessageTag`) | tone: `neutral`, `question`, `spam`, `toxic`. | Every tag the moderation and console screens use (link, caps, command, first-time chatter, sponsor mention, …). |
| **Chip** (`Chip`, `ChipButton`, chip link) | Default, selected. | With icon or platform logo. Removable (×). "Add" chip. Disabled ("Soon"). |
| **Platform icon** (`PlatformIcon`, `GlyphTile`) | sizes `sm` 22, `lg` 40, `xl` 56. `muted` (coming soon). | Connected / disconnected overlay dot. |
| **Icon tile** (`IconTile`) | tone: `accent`, `neutral`. size: `sm` 32, `md` 40. Icon or step number. | success, warning, danger tones. Done-check state. |
| **Source chip / confidence** (`SourceChip`, `Confidence`) | Source chip ("Link · Discord"), confidence level. | Hover or open state showing why the bot answered. Low / medium / high confidence. |
| **Stat** (`Stat`) | size: `sm`, `md`, `lg`. `labelFirst`. | With change (up / down / no change, with a word, never color alone). With sparkline. Empty ("—") and loading. |
| **Panel** (`Panel`) | variant: `panel`, `surface`, `well`, `raised`. | — |
| **Section** (`Section`, marketing) | tone: `default`, `alt`, `dark`. | — |
| **Typography** (`Heading`, `Eyebrow`, `Lede`, `Code`) | Heading size: `hero`, `display`, `title`, `heading`, separate from its level. Eyebrow, lede, inline code. | Code block with a Copy button (copied state). |
| **Prose** (`Prose`, used for blog, help and legal MDX) | Long-form styles. | One board covering h2, h3, paragraph, links, lists, blockquote, table, inline code, code block, image with caption and a callout inside an article. |
| **Brand logo** (`BrandLogo`) | size: `md`, `sm`. | Mark only. |
| **Soon label** (`SoonLabel`) | Text label. | Its pairing with a disabled button, menu item, nav item and card. |
| **Placeholder** (`Placeholder`) | Image placeholder for screenshots. | — |

### 3.3 Molecules

| Component (code name) | In code | Add |
|---|---|---|
| **Callout** (`Callout`) | tone: `info`, `warning`, `danger`. role: `alert` or `status`. | `success` tone. With title. With an action. Dismissible. |
| **Password field** (`PasswordField`) | Show / Hide toggle, invalid, label aside ("Forgot password?"). | With strength meter (weak / fair / strong). Confirm-password pairing for B5. |
| **Search field** (`SearchField`) | size: `default`, `lg`. | Clear button. ⌘K hint. With a results count. Loading. |
| **Breadcrumbs** (`Breadcrumbs`) | Links plus the current page. | Truncation at phone width. |
| **Section heading** (`SectionHeading`) | size: `hero`, `display`, `title`. align: `start`, `center`. Eyebrow, lede. | With an action on the end. |
| **Tab links / side nav** (`TabLinks`, `SideNav`) | Current item. | With counts. With a disabled "Soon" item. Phone width (select or scrolling row). |
| **Check list** (`CheckList`) | Check icon plus text. | — |
| **Detail list** (`DetailList`) | Key / value rows, `emphasize`. | With a copy action. Phone width (stacked). |
| **List row** (`ListRow`) | `inset`. align: `center`, `start`. | Leading avatar / icon / platform. Trailing chevron, action, menu or switch. Hover, selected, disabled. |
| **Chat message** (`ChatMessage`, `ChatFeed`) | Viewer, `bot`, `note`, tone `flagged`. Platform icon, tags, source chip. | Pending approval (Approve / Edit / Reject). Deleted by moderation. Viewer timed out. Edited reply. Pinned. Long message. Phone width. |
| **Charts** (`BarChart`, `MoodChart`, `ChartAxis`, `ChartLegend`) | Bar chart sizes `sm` / `md`. Mood chart. Axis. Legend (accent / muted). | Line / area chart. Sparkline. Donut. Heatmap (best times to stream). Tooltip on hover. Empty, loading, error. |
| **Feature card / item** (`FeatureLinkCard`, `FeatureItem`) | Link card. Item, `boxed`. | — |
| **Integration card** (`IntegrationCard`) | `compact`. Available or coming soon. | In-app states: not connected, connecting, connected (account name), needs reconnect, error, locked by plan. |
| **Plan card** (`PlanCard`) | `compact`, `featured`, yearly or monthly price. | Current plan. Trial (days left). Downgrade / upgrade buttons. |
| **Post card** (`PostCard`) | `featured`. Heading level h2 or h3. | — |
| **Change item** (`ChangeItem`) | label: New, Improved, Fixed. | — |
| **Testimonial** (`TestimonialCard`, `PullQuote`) | Card, pull quote. | — |
| **Link list** (`LinkList`) | — | — |
| **Social sign-in** (`SocialSignIn`) | Google, Twitch and YouTube buttons, disabled, with a "coming soon" note. | Enabled. Connecting (spinner, "Connecting to Google…"). |
| **Theme switch** (`ThemeMenuSwitch`) | Light / Dark / Auto, as radio items inside the account menu. | — |
| **Bot controls** (`BotStatus`, `PauseBotButton`) | Status pill. Pause button, `compact` icon-only for phone, disabled with a reason. | Live → "Pause bot". Paused → "Resume bot". Confirm while live (T5). Pausing in progress. |
| **Dropdown menu items** (`DropdownMenu`) | Item, with icon, with shortcut, label, separator, radio items, disabled + Soon. | Checkbox item. Submenu. Destructive item. Item with description. User header (name, email). |
| **Command items** (`Command`) | Page items, disabled items, an action (Log out), group headings. | Recent searches. No results. Loading. Item with a shortcut. |
| **Toast** (`Sonner`) | Basic toast. | Success, error, info, warning, loading → success, with Undo, with description. Stacking. Phone placement. |
| **Empty state** (`Empty`) | Media variants: default, icon. Title, description, content. | Inside a card. Full page. Inside a table. Search with no results. Action disabled with a reason. |
| **Accordion** (`Accordion`, `Collapsible`) | FAQ accordion. | Multiple open. Settings section that expands. |
| **Pagination** | — | Pages, previous / next, "Showing 1–25 of 312", phone width. |
| **Notification item** | — | Unread / read. Types: bot paused, integration disconnected, payment failed, summary ready, team invite, approval waiting. |
| **Date & time pickers** | — | Date, time, date range, timezone. Used by Schedule and Analytics. |
| **File upload** | — | Dropzone states: idle, drag over, uploading (progress), processing, done, failed, wrong file type, too large. Used by Knowledge base. |
| **Tag input** | — | Add / remove words, paste a list, duplicate warning. Used by moderation word lists. |
| **Copy field** | — | Share link, overlay URL, API key: masked, revealed, copied. |
| **Article feedback** (`ArticleFeedback`) | Helpful yes / no. | Thanks state. "Tell us more" follow-up. |
| **Onboarding stepper** (OnbBar) | — | Step upcoming / current / done, phone version. |
| **Setup checklist row** (`SetupChecklist`) | Current step, "Soon" badge. | Todo, current, done, skipped, Soon. |

### 3.4 Organisms

**Marketing**

| Component (code name) | In code | Add |
|---|---|---|
| **Site header** (`SiteHeader`, `MobileNav`) | Desktop bar, phone menu. | Scrolled state. Product menu open. Phone menu open. |
| **Site footer** (`SiteFooter`) | Desktop. | Phone width. |
| **Page hero** (`PageHero`) | layout: `split`, `stacked`, `centered`. Breadcrumbs, eyebrow, actions, visual. | — |
| **Feature split** (`FeatureSplit`) | `reverse`. tone: `default`, `alt`. | Phone width. |
| **CTA banner** (`CtaBanner`) | Default, `flush`. | — |
| **Pricing** (`PricingPlans`, `ComparisonTable`) | Monthly / yearly toggle, plans, comparison table. | Comparison table at phone width. |
| **Lists and directories** (`FaqList`, `IntegrationsDirectory`, `BlogIndex`, `TableOfContents`) | — | Directory with filters active and an empty result. Table of contents with the current section. |
| **Forms** (`NewsletterSignup`, `ContactForm`, `HelpSearchForm`) | — | Default, errors, submitting, sent, failed. |
| **Cookie banner** (`CookieBanner`) | — | Default, preferences open. |
| **Other** (`UseCaseNav`, `PlatformStrip`, `HeroChatDemo`) | — | — |

**Authentication**

| Component (code name) | In code | Add |
|---|---|---|
| **Sign up form** (`SignupForm`) | Email, password, terms, errors, error summary. | **The Name field from Part 1.** Submitting. |
| **Log in form** (`LoginForm`) | Default, missing fields, wrong credentials, rate limited, session expired heading, "Keep me logged in". | Submitting. Locked (later). |
| **Auth panels** | Sign up brand panel, log in brand panel (fixed per Part 1). | — |

**App shell**

| Component (code name) | In code | Add |
|---|---|---|
| **Sidebar** (`AppSidebar`, `AppNav`, `WorkspaceSwitcher`, `PlanUsageCard`) | Grouped nav with the current item, workspace switcher, plan card ("No plan yet"). | Nav item with a count, with "Soon", locked by plan. Plan card states: trial with days left, usage 60%, 90%, at limit. Workspace switcher with several workspaces. |
| **Top bar** (`AppTopbar`) | Desktop and phone. | Bot live, bot paused, no bot, error. |
| **Bot switcher** (`BotSwitcher`) | No bot (empty menu). | One bot, several bots, open with statuses. |
| **Account menu** (`AccountMenu`) | Name / email header, items, theme switch, Log out. | — |
| **Notifications menu** (`NotificationsMenu`) | Empty ("You're all caught up"). | With unread items. Unread count on the bell. Phone version as a full sheet. |
| **Command menu** (`CommandMenu`) | ⌘K dialog. | Empty query, results, no results. |
| **Phone menu** (`MobileMenu`) | Full-width sheet. | — |
| **System banners** (`SetupBanner`) | Setup banner. | Trial ending, payment failed, reconnect a platform, bot paused, maintenance. One component with tones. |

**App pages and data**

| Component | Add |
|---|---|
| **Page header** (generalize BotHeader, KnowNav, ModNav, EngNav and SetNav) | Title, description, actions, status, sub-tabs. Phone width. |
| **Data table** | Sortable header, row hover, selected rows, bulk action bar, row action menu, empty, loading, error, pagination. At phone width, rows become stacked cards. |
| **Filter bar** | Search, filter chips, "Clear filters", results count. |
| **Dialog** (`Dialog`) | Sizes sm / md / lg. Form dialog. |
| **Confirm dialog** | Destructive. Type-to-confirm (delete bot, delete workspace). |
| **Side sheet** (`Sheet`) | Right-side detail panel (viewer record, message detail). Phone bottom sheet (T5). |
| **Settings row and danger zone** | Label, description and control (switch, select, button). Danger zone card. |
| **Feature locked / plan limit** (V3) | Inline lock, locked page, upgrade dialog. |
| **Product cards** | One board each, with live, paused, draft, error, empty and loading states:<br>• Bot card<br>• Knowledge source row (queued, importing, ready, failed, out of date)<br>• Approval queue card<br>• Moderation queue item<br>• Viewer card<br>• Stream summary card<br>• Schedule event<br>• Sponsor card<br>• Overlay widget preview<br>• Team member row (roles, pending invite)<br>• Invoice row<br>• Payment method |

### 3.5 Templates

| Template (code name) | Variants |
|---|---|
| **Marketing** (`MarketingTemplate`) | Header, content and footer, at desktop and phone width. |
| **Auth** (`AuthTemplate`, `AuthCardTemplate`) | With brand panel, form only, centered card (logged out, expired). |
| **App** (`AppTemplate`) | With and without a banner, at desktop and phone width. |
| **Onboarding** | Progress bar, centered card, Skip / Back / Continue. |
| **Settings** | Section nav and content. |
| **List and detail** | Table with a detail sheet. |
| **Error** (`ErrorTemplate`) | 404, 500, 403. |

### 3.6 Patterns (one board each)

- **Not available yet:** a disabled control with "Soon" and a reason. Show it on a button, menu item, nav item, card and sign-in button.
- **Loading:** first load (skeleton), refresh (inline spinner), saving ("Saving…" becomes "Changes saved").
- **Empty:** first use, no results, filtered to nothing, cleared.
- **Errors:** field, form summary, section failed to load (with Retry), page error, offline.
- **Destructive actions:** Undo toast for reversible actions, confirm dialog for irreversible ones.
- **Live status everywhere:** how Live, Paused, Offline and Error look in the top bar, sidebar, cards, tables and on phone.
