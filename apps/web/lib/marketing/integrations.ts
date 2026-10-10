import type { Platform } from "@/components/atoms/platform-icon"

export type IntegrationCategory =
  | "Streaming"
  | "Community"
  | "Stream tools"
  | "Knowledge"
  | "Schedule"
  | "Music"
  | "Game data"
  | "Monetization"
  | "Social"
  | "Notifications"
  | "Automation"

export type Integration = {
  slug: string
  name: string
  /** Brand icon; omitted for generic entries such as webhooks. */
  platform?: Platform
  category: IntegrationCategory
  group: "streaming" | "community" | "knowledge" | "more"
  available: boolean
  description?: string
  detail?: {
    lede: string
    does: string[]
    permissions: {
      title: string
      body: string
      icon: "chat" | "shield" | "stream" | "events"
    }[]
    never: string
    steps: string[]
    connectWith: string
    worksWith: string
  }
}

export const integrationGroups = [
  { id: "streaming", title: "Streaming platforms" },
  { id: "community", title: "Community & stream tools" },
  { id: "knowledge", title: "Knowledge, schedule & music" },
  { id: "more", title: "Game data, monetization, social & automation" },
] as const

export const integrationCategories: IntegrationCategory[] = [
  "Streaming",
  "Community",
  "Stream tools",
  "Knowledge",
  "Schedule",
  "Music",
  "Game data",
  "Monetization",
  "Social",
  "Notifications",
  "Automation",
]

export const integrations: Integration[] = [
  {
    slug: "youtube",
    name: "YouTube Live",
    platform: "youtube",
    category: "Streaming",
    group: "streaming",
    available: true,
    description: "Read and reply in live chat, moderate, read stream details.",
    detail: {
      lede: "Kibo reads your YouTube live chat, answers questions, moderates and uses your stream title and description as live context.",
      does: [
        "Answers questions in live chat as your bot account, or as your channel",
        "Deletes messages and times out users under your moderation rules",
        "Thanks new members and Super Chats",
        "Uses your stream title and description as live context",
        "Imports your channel About page and video descriptions as knowledge",
      ],
      permissions: [
        {
          icon: "chat",
          title: "Read and send live chat messages",
          body: "So Kibo can see questions and reply to them.",
        },
        {
          icon: "shield",
          title: "Moderate live chat",
          body: "Delete messages, time out and ban — only by your rules, always logged and undoable.",
        },
        {
          icon: "stream",
          title: "Read your channel and live streams",
          body: "Title, description and whether you’re live.",
        },
      ],
      never:
        "Kibo never uploads videos, changes your channel settings or reads your private messages.",
      steps: [
        "Open **Integrations** in Kibo and choose **Connect YouTube**.",
        "Sign in with the Google account that owns your channel and approve the permissions above.",
        "Pick which bot runs on YouTube and whether it replies as itself or as your channel.",
      ],
      connectWith: "Google sign-in",
      worksWith: "Chat, moderation, members",
    },
  },
  {
    slug: "twitch",
    name: "Twitch",
    platform: "twitch",
    category: "Streaming",
    group: "streaming",
    available: true,
    description: "Chat, moderation, raids, subs and channel points.",
    detail: {
      lede: "Kibo reads your Twitch chat, answers questions, moderates and reacts to raids, subs and channel-point redemptions.",
      does: [
        "Answers questions in chat as your bot account, or as you",
        "Deletes messages and times out users under your moderation rules",
        "Turns on slow, followers-only or emote-only mode during raids",
        "Thanks new subs, gifted subs and raiders",
        "Uses your stream title and category as live context",
      ],
      permissions: [
        {
          icon: "chat",
          title: "Read and send chat messages",
          body: "So Kibo can see questions and reply to them.",
        },
        {
          icon: "shield",
          title: "Moderate chat",
          body: "Delete messages, time out and ban — only by your rules, always logged and undoable.",
        },
        {
          icon: "stream",
          title: "Read stream and channel details",
          body: "Title, category and whether you’re live.",
        },
        {
          icon: "events",
          title: "See subs, raids and redemptions",
          body: "For shout-outs and alerts. Kibo never sees payment details.",
        },
      ],
      never:
        "Kibo never posts to your channel feed, changes your stream settings or reads whispers.",
      steps: [
        "Open **Integrations** in Kibo and choose **Connect Twitch**.",
        "Sign in to Twitch and approve the permissions above.",
        "Pick which bot runs on Twitch and whether it replies as itself or as you.",
      ],
      connectWith: "Twitch sign-in",
      worksWith: "Chat, moderation, events",
    },
  },
  {
    slug: "kick",
    name: "Kick",
    platform: "kick",
    category: "Streaming",
    group: "streaming",
    available: false,
    description: "Chat and moderation.",
  },
  {
    slug: "tiktok",
    name: "TikTok Live",
    platform: "tiktok",
    category: "Streaming",
    group: "streaming",
    available: false,
    description: "Comments and gifts.",
  },
  {
    slug: "instagram",
    name: "Instagram Live",
    platform: "instagram",
    category: "Streaming",
    group: "streaming",
    available: false,
    description: "Live comments.",
  },
  {
    slug: "discord",
    name: "Discord",
    platform: "discord",
    category: "Community",
    group: "community",
    available: false,
    description:
      "Answers in your server between streams, go-live posts, mod alerts.",
  },
  {
    slug: "obs",
    name: "OBS",
    platform: "obs",
    category: "Stream tools",
    group: "community",
    available: false,
    description: "Overlays as browser sources.",
  },
  {
    slug: "streamlabs",
    name: "Streamlabs",
    platform: "streamlabs",
    category: "Stream tools",
    group: "community",
    available: false,
    description: "Alerts and donations.",
  },
  {
    slug: "elgato",
    name: "Elgato Stream Deck",
    platform: "elgato",
    category: "Stream tools",
    group: "community",
    available: false,
    description: "Pause Pip, start a poll or post a FAQ from a key.",
  },
  {
    slug: "facebook-gaming",
    name: "Facebook Gaming",
    platform: "facebook-gaming",
    category: "Streaming",
    group: "community",
    available: false,
    description: "Answer and moderate Facebook live chat.",
  },
  {
    slug: "notion",
    name: "Notion",
    platform: "notion",
    category: "Knowledge",
    group: "knowledge",
    available: false,
    description: "Import pages as knowledge.",
  },
  {
    slug: "google-drive",
    name: "Google Drive",
    platform: "google-drive",
    category: "Knowledge",
    group: "knowledge",
    available: false,
    description: "Docs and PDFs as knowledge.",
  },
  {
    slug: "linktree",
    name: "Linktree",
    platform: "linktree",
    category: "Knowledge",
    group: "knowledge",
    available: false,
    description: "Your links, kept in sync.",
  },
  {
    slug: "google-calendar",
    name: "Google Calendar",
    platform: "google-calendar",
    category: "Schedule",
    group: "knowledge",
    available: false,
    description: "Schedule answers and reminders.",
  },
  {
    slug: "spotify",
    name: "Spotify",
    platform: "spotify",
    category: "Music",
    group: "knowledge",
    available: false,
    description: "!song and song requests.",
  },
  {
    slug: "steam",
    name: "Steam / IGDB",
    platform: "steam",
    category: "Game data",
    group: "more",
    available: false,
  },
  {
    slug: "riot",
    name: "Riot / Valorant",
    platform: "riot",
    category: "Game data",
    group: "more",
    available: false,
  },
  {
    slug: "patreon",
    name: "Patreon",
    platform: "patreon",
    category: "Monetization",
    group: "more",
    available: false,
  },
  {
    slug: "ko-fi",
    name: "Ko-fi",
    platform: "ko-fi",
    category: "Monetization",
    group: "more",
    available: false,
  },
  {
    slug: "buy-me-a-coffee",
    name: "Buy Me a Coffee",
    platform: "buy-me-a-coffee",
    category: "Monetization",
    group: "more",
    available: false,
  },
  {
    slug: "shopify",
    name: "Shopify",
    platform: "shopify",
    category: "Monetization",
    group: "more",
    available: false,
  },
  {
    slug: "x",
    name: "X",
    platform: "x",
    category: "Social",
    group: "more",
    available: false,
  },
  {
    slug: "bluesky",
    name: "Bluesky",
    platform: "bluesky",
    category: "Social",
    group: "more",
    available: false,
  },
  {
    slug: "slack",
    name: "Slack",
    platform: "slack",
    category: "Notifications",
    group: "more",
    available: false,
  },
  {
    slug: "telegram",
    name: "Telegram",
    platform: "telegram",
    category: "Notifications",
    group: "more",
    available: false,
  },
  {
    slug: "zapier",
    name: "Zapier",
    platform: "zapier",
    category: "Automation",
    group: "more",
    available: false,
  },
  {
    slug: "make",
    name: "Make",
    platform: "make",
    category: "Automation",
    group: "more",
    available: false,
  },
  {
    slug: "webhooks",
    name: "Webhooks & API",
    category: "Automation",
    group: "more",
    available: false,
  },
]

export function getIntegration(slug: string) {
  return integrations.find((integration) => integration.slug === slug)
}
