export type NavLink = { label: string; href: string; description?: string }

/** A link in the site header's menus: a short title, one line and an icon. */
export type MenuLink = NavLink & {
  menuLabel: string
  menuDescription: string
  icon:
    | "message-square"
    | "shield"
    | "messages-square"
    | "trophy"
    | "chart-column"
    | "book-open"
    | "newspaper"
    | "life-buoy"
    | "users"
    | "sparkles"
}

export const productLinks: MenuLink[] = [
  {
    label: "AI Answers",
    href: "/product/ai-answers",
    description: "Replies from your knowledge, with sources",
    menuLabel: "Answers",
    menuDescription: "Replies from your FAQ",
    icon: "message-square",
  },
  {
    label: "Moderation",
    href: "/product/moderation",
    description: "Filters, toxicity and an action ladder",
    menuLabel: "Moderation",
    menuDescription: "Spam, links, raids",
    icon: "shield",
  },
  {
    label: "Live Console",
    href: "/product/live-console",
    description: "Your control room for every stream",
    menuLabel: "Live console",
    menuDescription: "Both chats, one feed",
    icon: "messages-square",
  },
  {
    label: "Engagement",
    href: "/product/engagement",
    description: "Welcomes, commands, polls and loyalty",
    menuLabel: "Engagement",
    menuDescription: "Polls, trivia, loyalty",
    icon: "trophy",
  },
  {
    label: "Summaries & analytics",
    href: "/product/analytics",
    description: "The recap after every stream",
    menuLabel: "Analytics",
    menuDescription: "What chat asked, time saved",
    icon: "chart-column",
  },
  {
    label: "Knowledge Base",
    href: "/product/knowledge-base",
    description: "Everything your bot knows",
    menuLabel: "Knowledge",
    menuDescription: "Teach Pip once",
    icon: "book-open",
  },
]

export const resourceLinks: MenuLink[] = [
  {
    label: "Blog",
    href: "/blog",
    description: "Guides and stories",
    menuLabel: "Blog",
    menuDescription: "Guides and stories",
    icon: "newspaper",
  },
  {
    label: "Help center",
    href: "/help",
    description: "Set up and troubleshoot",
    menuLabel: "Help center",
    menuDescription: "Set up and troubleshoot",
    icon: "life-buoy",
  },
  {
    label: "Use cases",
    href: "/use-cases/gaming",
    description: "How creators run Kibo",
    menuLabel: "Use cases",
    menuDescription: "How creators run Kibo",
    icon: "users",
  },
  {
    label: "Changelog",
    href: "/changelog",
    description: "What shipped",
    menuLabel: "Changelog",
    menuDescription: "What shipped",
    icon: "sparkles",
  },
]

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      ...productLinks.slice(0, 5).map(({ label, href }) => ({ label, href })),
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact sales", href: "/contact" },
      { label: "Changelog", href: "/changelog" },
      { label: "Careers", href: "/about#careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Help center", href: "/help" },
      { label: "Use cases", href: "/use-cases/gaming" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/legal/terms" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Acceptable use", href: "/legal/acceptable-use" },
      { label: "Cookie policy", href: "/legal/cookies" },
    ],
  },
]

export const socialLinks = [
  { label: "X", href: "https://x.com", platform: "x" },
  { label: "YouTube", href: "https://youtube.com", platform: "youtube" },
  { label: "Twitch", href: "https://twitch.tv", platform: "twitch" },
  { label: "Discord", href: "https://discord.com", platform: "discord" },
  { label: "Bluesky", href: "https://bsky.app", platform: "bluesky" },
] as const

/** The side card in the Product menu: the latest notable release. */
export const productMenuNews = {
  title: "New: Twitch support",
  body: "One Kibo for YouTube and Twitch.",
  href: "/changelog",
  linkLabel: "Read the changelog",
}
