export type PlanCode = "starter" | "creator" | "studio"

export type Plan = {
  code: PlanCode
  name: string
  tagline: string
  monthly: number
  /** Per-month price when billed yearly. */
  yearlyMonthly: number
  /** Total charged once a year. */
  yearlyTotal: number
  featured?: boolean
  /** Two short points for the landing page preview. */
  highlights: string[]
  /** The full list on the pricing page. */
  features: string[]
  /** Shown above `features` for plans that build on a smaller one. */
  includesPrevious?: string
}

export const plans: Plan[] = [
  {
    code: "starter",
    name: "Starter",
    tagline: "For new streamers finding their community.",
    monthly: 9,
    yearlyMonthly: 7,
    yearlyTotal: 84,
    highlights: ["1 bot, 1 platform", "2,000 AI replies a month"],
    features: [
      "1 bot",
      "1 streaming platform",
      "100 knowledge items",
      "2,000 AI replies a month",
      "Spam and link filters",
      "Post-stream summary",
    ],
  },
  {
    code: "creator",
    name: "Creator",
    tagline: "For regular streamers with a busy chat.",
    monthly: 24,
    yearlyMonthly: 19,
    yearlyTotal: 228,
    featured: true,
    highlights: ["3 bots, YouTube + Twitch", "Stream summaries & analytics"],
    includesPrevious: "Everything in Starter, plus",
    features: [
      "3 bots",
      "YouTube + Twitch together",
      "1,000 knowledge items, 15,000 AI replies",
      "AI toxicity detection",
      "Analytics and time saved",
      "Moderators on the live console",
    ],
  },
  {
    code: "studio",
    name: "Studio",
    tagline: "For big channels, teams and agencies.",
    monthly: 79,
    yearlyMonthly: 63,
    yearlyTotal: 756,
    highlights: [
      "Team roles, multiple workspaces",
      "Sponsor reports, API access",
    ],
    includesPrevious: "Everything in Creator, plus",
    features: [
      "10 bots, every platform",
      "Team roles and audit log",
      "Several workspaces",
      "Sponsor reports",
      "API and webhooks",
      "Priority support",
    ],
  },
]

type Cell = boolean | string

export const comparison: {
  group: string
  rows: { feature: string; values: [Cell, Cell, Cell] }[]
}[] = [
  {
    group: "Usage limits",
    rows: [
      { feature: "Bots", values: ["1", "3", "10"] },
      { feature: "Integrations", values: ["2", "6", "Unlimited"] },
      { feature: "Knowledge items", values: ["100", "1,000", "10,000"] },
      { feature: "AI replies a month", values: ["2,000", "15,000", "75,000"] },
      {
        feature: "Extra AI replies",
        values: [false, "$5 per 2,500", "$5 per 5,000"],
      },
    ],
  },
  {
    group: "Live chat AI",
    rows: [
      { feature: "Answers with sources", values: [true, true, true] },
      {
        feature: "Approval, Auto and Silent modes",
        values: [true, true, true],
      },
      { feature: "Multi-platform live console", values: [false, true, true] },
      {
        feature: "Reply in the viewer’s language",
        values: [false, false, true],
      },
    ],
  },
  {
    group: "Moderation",
    rows: [
      {
        feature: "Spam, link, caps and flood filters",
        values: [true, true, true],
      },
      { feature: "AI toxicity detection", values: [false, true, true] },
      { feature: "Raid and flood protection", values: [false, true, true] },
      {
        feature: "Shared ban lists across platforms",
        values: [false, false, true],
      },
    ],
  },
  {
    group: "Engagement & insights",
    rows: [
      { feature: "Commands, timers, welcomes", values: [true, true, true] },
      { feature: "Polls, giveaways, loyalty", values: [false, true, true] },
      {
        feature: "Analytics history",
        values: ["7 days", "90 days", "Unlimited"],
      },
      {
        feature: "Sponsor reports and exports",
        values: [false, false, true],
      },
    ],
  },
  {
    group: "Team & support",
    rows: [
      {
        feature: "Seats (you + moderators)",
        values: ["2", "5", "Unlimited"],
      },
      {
        feature: "Roles, permissions, audit log",
        values: [false, false, true],
      },
      { feature: "Support", values: ["Help center", "Email", "Priority"] },
    ],
  },
]
