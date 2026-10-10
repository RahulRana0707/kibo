export type NavLink = { label: string; href: string; description?: string }

export const productLinks: NavLink[] = [
  {
    label: "AI Answers",
    href: "/product/ai-answers",
    description: "Replies from your knowledge, with sources",
  },
  {
    label: "Moderation",
    href: "/product/moderation",
    description: "Filters, toxicity and an action ladder",
  },
  {
    label: "Live Console",
    href: "/product/live-console",
    description: "Your control room for every stream",
  },
  {
    label: "Engagement",
    href: "/product/engagement",
    description: "Welcomes, commands, polls and loyalty",
  },
  {
    label: "Summaries & analytics",
    href: "/product/analytics",
    description: "The recap after every stream",
  },
  {
    label: "Knowledge Base",
    href: "/product/knowledge-base",
    description: "Everything your bot knows",
  },
]

export const resourceLinks: NavLink[] = [
  { label: "Blog", href: "/blog", description: "Guides and stories" },
  {
    label: "Help center",
    href: "/help",
    description: "Set up and troubleshoot",
  },
  {
    label: "Use cases",
    href: "/use-cases/gaming",
    description: "How creators run Kibo",
  },
  { label: "Changelog", href: "/changelog", description: "What shipped" },
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

export const socialLinks: NavLink[] = [
  { label: "X", href: "https://x.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Twitch", href: "https://twitch.tv" },
  { label: "Discord", href: "https://discord.com" },
  { label: "Bluesky", href: "https://bsky.app" },
]
