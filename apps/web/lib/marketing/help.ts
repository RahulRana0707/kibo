export type HelpCategory = {
  slug: string
  title: string
  description: string
  /** Lede on the category page. */
  intro: string
  /** Section headings in the order they appear on the category page. */
  sections: string[]
}

export const helpCategories: HelpCategory[] = [
  {
    slug: "getting-started",
    title: "Getting started",
    description: "Set up your first bot and go live",
    intro: "Create your first bot, teach it and go live.",
    sections: ["First steps", "Your team"],
  },
  {
    slug: "connecting-platforms",
    title: "Connecting platforms",
    description: "YouTube, Twitch and permissions",
    intro: "YouTube, Twitch and what each permission is for.",
    sections: ["YouTube Live", "Twitch", "Permissions & privacy"],
  },
  {
    slug: "bots-and-replies",
    title: "Bots & replies",
    description: "Personality, reply modes, confidence",
    intro: "How your bot decides what to say, and when.",
    sections: ["Reply modes", "Answers"],
  },
  {
    slug: "knowledge-base",
    title: "Knowledge base",
    description: "FAQs, imports, unanswered questions",
    intro: "Everything your bot knows, and how to add more.",
    sections: ["Adding knowledge"],
  },
  {
    slug: "moderation",
    title: "Moderation",
    description: "Filters, action ladder, appeals",
    intro: "Filters, the action ladder and the review queue.",
    sections: ["Filters"],
  },
  {
    slug: "billing-and-plans",
    title: "Billing & plans",
    description: "Trials, invoices, limits",
    intro: "Trials, plans, usage limits and invoices.",
    sections: ["Plans"],
  },
]

export function getHelpCategory(slug: string) {
  return helpCategories.find((category) => category.slug === slug)
}
