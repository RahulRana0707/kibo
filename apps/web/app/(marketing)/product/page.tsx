import type { Metadata } from "next"
import Link from "next/link"

import { buttonVariants } from "@kibo/ui/components/button"

import { chipLinkClassName } from "@/components/atoms/chip"
import { Panel } from "@/components/atoms/panel"
import { PlatformIcon, type Platform } from "@/components/atoms/platform-icon"
import { SectionHeading } from "@/components/molecules/section-heading"
import { CtaBanner } from "@/components/organisms/cta-banner"
import { FeatureSplit } from "@/components/organisms/feature-split"
import { PageHero } from "@/components/organisms/page-hero"
import { SummarySnippet } from "@/components/organisms/previews/analytics"
import { AnswerSnippet } from "@/components/organisms/previews/answers"
import { ConsoleSnippet } from "@/components/organisms/previews/console"
import { PollSnippet } from "@/components/organisms/previews/engagement"
import { KnowledgeSnippet } from "@/components/organisms/previews/knowledge"
import { ModerationSnippet } from "@/components/organisms/previews/moderation"
import { productLinks } from "@/lib/marketing/navigation"

export const metadata: Metadata = {
  title: "Product",
  description:
    "Kibo reads every message, answers from what you’ve taught it, keeps chat safe and tells you what happened.",
}

const platformRow: { platform: Platform; label: string; soon?: boolean }[] = [
  { platform: "youtube", label: "YouTube Live" },
  { platform: "twitch", label: "Twitch" },
  { platform: "kick", label: "Kick, coming soon", soon: true },
  { platform: "tiktok", label: "TikTok Live, coming soon", soon: true },
  { platform: "instagram", label: "Instagram Live, coming soon", soon: true },
]

const rows = [
  {
    eyebrow: "AI Answers",
    title: "Answers the questions you’re tired of",
    lede: "Gear, schedule, sens, Discord link, “is this a new game?” — answered in your bot’s voice, with the source attached.",
    href: "/product/ai-answers",
    action: "Explore AI Answers",
    visual: <AnswerSnippet />,
  },
  {
    eyebrow: "Moderation",
    title: "Keeps chat safe while you play",
    lede: "Filters for spam, links, caps and floods, AI toxicity detection, and an action ladder you control. Every action can be undone.",
    href: "/product/moderation",
    action: "Explore Moderation",
    visual: <ModerationSnippet />,
  },
  {
    eyebrow: "Live Console",
    title: "Your control room for every stream",
    lede: "One feed across YouTube and Twitch, approvals, the moderation queue and quick actions like slow mode — readable at a glance.",
    href: "/product/live-console",
    action: "Explore Live Console",
    visual: <ConsoleSnippet />,
  },
  {
    eyebrow: "Engagement",
    title: "Keeps the room warm",
    lede: "Welcomes for first-timers, commands, timers that only fire when chat is active, polls, giveaways and loyalty points.",
    href: "/product/engagement",
    action: "Explore Engagement",
    visual: <PollSnippet />,
  },
  {
    eyebrow: "Summaries & Analytics",
    title: "Know what happened, every stream",
    lede: "Top questions, a highlights timeline, the mood of chat, new faces and clip-worthy moments — ready when you end the stream.",
    href: "/product/analytics",
    action: "Explore Analytics",
    visual: <SummarySnippet />,
  },
  {
    eyebrow: "Knowledge Base",
    title: "Teach once, answer forever",
    lede: "FAQs, links, rules, gear, schedule and sponsors in one place. Questions Kibo couldn’t answer land in an inbox — answer once and it remembers.",
    href: "/product/knowledge-base",
    action: "Explore Knowledge Base",
    visual: <KnowledgeSnippet />,
  },
  {
    eyebrow: "Multi-platform",
    title: "Every chat, one Kibo",
    lede: "Simulcast to YouTube and Twitch and Kibo treats it as one stream: one feed, one ban list, one summary. Kick, TikTok Live and Instagram Live are next.",
    href: "/integrations",
    action: "See integrations",
    visual: (
      <Panel>
        <div className="flex flex-wrap gap-4">
          {platformRow.map((item) => (
            <PlatformIcon
              key={item.platform}
              platform={item.platform}
              label={item.label}
              size="xl"
              muted={item.soon}
            />
          ))}
        </div>
        <p className="text-caption text-muted-foreground">
          Live today: YouTube and Twitch. Kick, TikTok and Instagram next.
        </p>
      </Panel>
    ),
  },
]

export default function ProductPage() {
  return (
    <>
      <PageHero
        layout="stacked"
        className="pb-12"
        eyebrow="Product"
        title={
          <span className="block max-w-[16ch]">
            One AI teammate for your whole chat
          </span>
        }
        lede="Kibo reads every message, answers from what you’ve taught it, keeps chat safe and tells you what happened. Here’s each part."
        actions={
          <nav aria-label="Features" className="mt-2 flex flex-wrap gap-2">
            {[
              ...productLinks,
              { label: "Multi-platform", href: "/integrations" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={chipLinkClassName()}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        }
      />
      {rows.map((row, index) => (
        <FeatureSplit
          key={row.eyebrow}
          tone={index % 2 === 0 ? "alt" : "default"}
          reverse={index % 2 === 1}
          copy={
            <>
              <SectionHeading
                eyebrow={row.eyebrow}
                title={row.title}
                lede={row.lede}
              />
              <Link
                href={row.href}
                className={buttonVariants({
                  variant: "secondary",
                  className: "self-start",
                })}
              >
                {row.action}
              </Link>
            </>
          }
          visual={row.visual}
        />
      ))}
      <CtaBanner title="Ready when your next stream is" />
    </>
  )
}
