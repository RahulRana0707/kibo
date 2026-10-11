import Link from "next/link"
import {
  BlocksIcon,
  BookIcon,
  ChartColumnIcon,
  MessageSquareIcon,
  RadioIcon,
  ShieldIcon,
  StarIcon,
} from "lucide-react"

import { buttonVariants } from "@kibo/ui/components/button"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { type Platform } from "@/components/atoms/platform-icon"
import { Stat } from "@/components/atoms/stat"
import { FeatureItem, FeatureLinkCard } from "@/components/molecules/feature"
import { IntegrationCard } from "@/components/molecules/integration-card"
import { PlanCard } from "@/components/molecules/plan-card"
import { TestimonialCard } from "@/components/molecules/testimonial"
import { ChatShowcase } from "@/components/organisms/marketing/chat-showcase"
import { CtaBanner } from "@/components/organisms/marketing/cta-banner"
import { FaqList, type Faq } from "@/components/organisms/marketing/faq-list"
import { LandingHero } from "@/components/organisms/marketing/landing-hero"
import { MarketingSection } from "@/components/organisms/marketing/marketing-section"
import { PlatformStrip } from "@/components/organisms/marketing/platform-strip"
import { TrustControls } from "@/components/organisms/marketing/trust-controls"
import { getIntegration } from "@/lib/marketing/integrations"
import { plans } from "@/lib/marketing/plans"

const problems = [
  {
    title: "“What’s your sens?” — again",
    body: "The same 20 questions eat the first hour of every stream, and the new viewer who asked leaves before you see it.",
  },
  {
    title: "Nobody watching the door",
    body: "Spam links and bad actors land while you’re mid-clutch. By the time you notice, the damage is in chat.",
  },
  {
    title: "No memory of what happened",
    body: "After four hours live you can’t say who was new, what people asked, or which moment popped off.",
  },
]

const steps = [
  {
    title: "Connect",
    body: "Create an account, then connect YouTube or Twitch. Kibo asks only for chat access and explains every permission in plain words.",
  },
  {
    title: "Teach",
    body: "Import your channel About, links and past VODs, or write FAQs yourself. Kibo shows you what it learned before it says a word.",
  },
  {
    title: "Go live",
    body: "Start in Approval mode and okay replies with one click. Switch to Auto when you trust it.",
  },
]

const features = [
  {
    href: "/product/ai-answers",
    icon: <MessageSquareIcon />,
    title: "AI Answers",
    description:
      "Replies from your FAQs, links, gear and schedule, with the source shown.",
  },
  {
    href: "/product/moderation",
    icon: <ShieldIcon />,
    title: "Moderation",
    description:
      "Spam, link and toxicity filters with a warn → delete → timeout → ban ladder.",
  },
  {
    href: "/product/live-console",
    icon: <RadioIcon />,
    title: "Live Console",
    description:
      "One feed for every platform, plus approvals and quick actions — on desktop or phone.",
  },
  {
    href: "/product/engagement",
    icon: <StarIcon />,
    title: "Engagement",
    description:
      "Welcomes, commands, timers, polls, giveaways and loyalty points.",
  },
  {
    href: "/product/analytics",
    icon: <ChartColumnIcon />,
    title: "Stream Summaries & Analytics",
    description:
      "Top questions, highlights, mood and time saved after every stream.",
  },
  {
    href: "/product/knowledge-base",
    icon: <BookIcon />,
    title: "Knowledge Base",
    description:
      "FAQs, links, rules, gear and sponsors — and an inbox of what Kibo couldn’t answer.",
  },
  {
    href: "/integrations",
    icon: <BlocksIcon />,
    title: "Multi-platform",
    description:
      "YouTube and Twitch today, one inbox for all of them. Kick, TikTok and Instagram next.",
  },
]

// Placeholder figures from the design. Replace with measured numbers before launch.
const impact = [
  { value: "11 hrs", label: "saved per creator each month" },
  { value: "83%", label: "of viewer questions answered automatically" },
  { value: "4.2M", label: "chat messages handled" },
  { value: "1.8 s", label: "median time to answer" },
]

const featuredIntegrations = [
  "youtube",
  "twitch",
  "discord",
  "obs",
  "notion",
  "spotify",
].map((slug) => getIntegration(slug)!)

// Placeholder testimonials from the design. Replace with real creators before launch.
const testimonials = [
  {
    quote:
      "I used to spend the first 20 minutes of every stream answering ‘what game is this’. Now Pip does it and I just play.",
    person: {
      name: "Aarav “Zephyr” Mehta",
      initials: "AM",
      detail: "48K followers · Valorant",
      platforms: ["twitch"] as Platform[],
    },
  },
  {
    quote:
      "Approval mode sold me. I watched it for two streams, it didn’t get anything wrong, so I flipped it to Auto.",
    person: {
      name: "Sana Iqbal · sanacooks",
      initials: "SI",
      detail: "120K subscribers · Cooking",
      platforms: ["youtube"] as Platform[],
    },
  },
  {
    quote:
      "My mods finally get to hang out in chat instead of deleting spam all night.",
    person: {
      name: "Leo Martins · leoplaysbr",
      initials: "LM",
      detail: "210K across both · Minecraft",
      platforms: ["twitch", "youtube"] as Platform[],
    },
  },
]

const faqs: Faq[] = [
  {
    question: "Will Kibo say something I wouldn’t?",
    answer:
      "Kibo only answers from knowledge you’ve added, and every reply shows its source. Start in Approval mode, set blocked topics, and it stays silent whenever it isn’t sure.",
  },
  {
    question: "Which platforms does it support?",
    answer:
      "YouTube Live and Twitch today, including both at once when you simulcast. Kick, TikTok Live, Instagram Live and Discord are next.",
  },
  {
    question: "Do I still need human moderators?",
    answer:
      "Kibo handles the repetitive work: spam, links, floods and the same questions over and over. Bans and borderline calls stay with you and your mods, who review them from the live console.",
  },
  {
    question: "Can my mods use it from their phone?",
    answer:
      "Yes. The live console works in a phone browser, with approvals, the moderation queue and the pause button one thumb away. There’s no app to install.",
  },
  {
    question: "What happens to my viewers’ data?",
    answer:
      "Kibo stores chat messages to answer questions and build your stream summaries. It never sells data or uses your chat to train models for anyone else. You can export or delete everything from Settings.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Cancel from Billing whenever you like; your plan runs to the end of the period you paid for, and your data stays for 30 days in case you come back.",
  },
]

export default function LandingPage() {
  return (
    <>
      <LandingHero />
      <PlatformStrip />

      <MarketingSection
        eyebrow="The problem"
        title="Chat grows faster than you can read it"
        lede="Small creators have no moderators. Big creators need a lot of them. Everyone answers the same questions every single stream."
      >
        <AutoGrid min="300px">
          {problems.map((problem) => (
            <FeatureItem key={problem.title} boxed title={problem.title}>
              {problem.body}
            </FeatureItem>
          ))}
        </AutoGrid>
      </MarketingSection>

      <MarketingSection
        tone="alt"
        eyebrow="How it works"
        title="Live in three steps"
        align="center"
      >
        <AutoGrid as="ol" min="300px">
          {steps.map((step, index) => (
            <li key={step.title}>
              <FeatureItem
                boxed="raised"
                icon={index + 1}
                title={step.title}
                className="h-full"
              >
                {step.body}
              </FeatureItem>
            </li>
          ))}
        </AutoGrid>
      </MarketingSection>

      <MarketingSection
        tone="dark"
        eyebrow="See it in chat"
        title="Answers, moderates and welcomes — in your voice"
      >
        <ChatShowcase />
      </MarketingSection>

      <MarketingSection
        eyebrow="Product"
        title="Everything your chat needs, in one place"
      >
        <AutoGrid min="340px">
          {features.map((feature) => (
            <FeatureLinkCard key={feature.href} {...feature} />
          ))}
        </AutoGrid>
      </MarketingSection>

      <MarketingSection
        tone="alt"
        eyebrow="Impact"
        title="Time back for the part only you can do"
      >
        <AutoGrid>
          {impact.map((item) => (
            <Stat
              key={item.label}
              value={item.value}
              label={item.label}
              labelFirst={false}
              size="xl"
            />
          ))}
        </AutoGrid>
      </MarketingSection>

      <MarketingSection
        gap="tight"
        eyebrow="Integrations"
        title="Plays well with your setup"
        lede="Streaming platforms, OBS and stream tools, Discord, Notion, Spotify and more."
        action={
          <Link
            href="/integrations"
            className={buttonVariants({ variant: "secondary" })}
          >
            Browse integrations
          </Link>
        }
      >
        <AutoGrid as="ul" min="200px" gap="tight">
          {featuredIntegrations.map((integration) => (
            <li key={integration.slug}>
              <IntegrationCard integration={integration} compact />
            </li>
          ))}
        </AutoGrid>
      </MarketingSection>

      <MarketingSection
        tone="alt"
        eyebrow="Trust and control"
        title="You stay in charge of your chat"
      >
        <TrustControls />
      </MarketingSection>

      <MarketingSection
        eyebrow="Creators"
        title="Made with streamers, for streamers"
      >
        <AutoGrid min="320px">
          {testimonials.map((item) => (
            <TestimonialCard key={item.person.name} {...item} />
          ))}
        </AutoGrid>
      </MarketingSection>

      <MarketingSection
        tone="alt"
        eyebrow="Pricing"
        title="Start free, grow when chat does"
        action={
          <Link
            href="/pricing"
            className={buttonVariants({ variant: "secondary" })}
          >
            Compare plans
          </Link>
        }
      >
        <AutoGrid min="300px">
          {plans.map((plan) => (
            <PlanCard key={plan.code} plan={plan} compact />
          ))}
        </AutoGrid>
      </MarketingSection>

      <MarketingSection width="narrow" gap="tight" title="Questions, answered">
        <FaqList items={faqs} />
      </MarketingSection>

      <CtaBanner
        flush
        title="Focus on creating. Let Kibo handle the community."
        lede="Set up your first bot before your next stream."
      />
    </>
  )
}
