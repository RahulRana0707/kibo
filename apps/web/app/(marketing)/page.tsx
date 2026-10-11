import Link from "next/link"
import {
  BookIcon,
  ChartColumnIcon,
  MessageSquareIcon,
  PauseIcon,
  PlayIcon,
  RadioIcon,
  ShieldIcon,
  StarIcon,
  BlocksIcon,
} from "lucide-react"

import { Badge } from "@kibo/ui/components/badge"
import { buttonVariants } from "@kibo/ui/components/button"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { Container } from "@/components/atoms/container"
import { DemoButton } from "@/components/atoms/demo-button"
import { IconTile } from "@/components/atoms/icon-tile"
import { MessageTag } from "@/components/atoms/message-tag"
import { Panel } from "@kibo/ui/components/panel"
import { PlatformIcon, type Platform } from "@/components/atoms/platform-icon"
import { Section } from "@/components/atoms/section"
import { Confidence, SourceChip } from "@/components/atoms/source-chip"
import { Stat } from "@/components/atoms/stat"
import { StatusPill } from "@/components/atoms/status-pill"
import { Eyebrow, Heading, Lede } from "@kibo/ui/components/typography"
import { ChatFeed, ChatMessage } from "@/components/molecules/chat-message"
import { FeatureItem, FeatureLinkCard } from "@/components/molecules/feature"
import { PlanCard } from "@/components/molecules/plan-card"
import { SectionHeading } from "@/components/molecules/section-heading"
import { TestimonialCard } from "@/components/molecules/testimonial"
import { CtaBanner } from "@/components/organisms/marketing/cta-banner"
import { FaqList, type Faq } from "@/components/organisms/marketing/faq-list"
import { HeroChatDemo } from "@/components/organisms/marketing/hero-chat-demo"
import { PlatformStrip } from "@/components/organisms/marketing/platform-strip"
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
    body: "Sign in with YouTube or Twitch. Kibo asks only for chat access and explains every permission in plain words.",
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

const integrations: { platform: Platform; name: string; category: string }[] = [
  { platform: "youtube", name: "YouTube Live", category: "Streaming" },
  { platform: "twitch", name: "Twitch", category: "Streaming" },
  { platform: "discord", name: "Discord", category: "Community" },
  { platform: "obs", name: "OBS", category: "Overlays" },
  { platform: "notion", name: "Notion", category: "Knowledge" },
  { platform: "spotify", name: "Spotify", category: "Music" },
]

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
      <Section className="pt-20">
        <Container className="flex flex-wrap items-center gap-16">
          <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-6">
            <Eyebrow>Too much chat. Not enough attention.</Eyebrow>
            <Heading as="h1" size="hero">
              Your AI community manager for live chat
            </Heading>
            <Lede className="max-w-[52ch]">
              Kibo joins your YouTube and Twitch chat, answers viewers from your
              own FAQs, catches spam and toxicity, and hands you a summary after
              every stream.
            </Lede>
            <div className="flex flex-wrap gap-3">
              <Link href="/signup" className={buttonVariants({ size: "lg" })}>
                Start free trial
              </Link>
              <Link
                href="/product/live-console"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                <PlayIcon aria-hidden="true" data-icon="inline-start" />
                Watch the demo
              </Link>
            </div>
            <p className="text-caption text-muted-foreground">
              14-day free trial · Approval mode on by default · Pause anytime
            </p>
          </div>
          <HeroChatDemo />
        </Container>
      </Section>

      <PlatformStrip />

      <Section>
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="The problem"
            title="Chat grows faster than you can read it"
            lede="Small creators have no moderators. Big creators need a lot of them. Everyone answers the same questions every single stream."
          />
          <AutoGrid min="300px">
            {problems.map((problem) => (
              <Panel key={problem.title} variant="surface">
                <h3 className="text-heading">{problem.title}</h3>
                <p className="text-body-sm text-muted-foreground">
                  {problem.body}
                </p>
              </Panel>
            ))}
          </AutoGrid>
        </Container>
      </Section>

      <Section tone="alt">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="How it works"
            title="Live in three steps"
            align="center"
          />
          <AutoGrid as="ol" min="300px">
            {steps.map((step, index) => (
              <li key={step.title}>
                <Panel className="h-full">
                  <IconTile>{index + 1}</IconTile>
                  <h3 className="text-heading">{step.title}</h3>
                  <p className="text-body-sm text-muted-foreground">
                    {step.body}
                  </p>
                </Panel>
              </li>
            ))}
          </AutoGrid>
        </Container>
      </Section>

      <Section tone="dark">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="See it in chat"
            title="Answers, moderates and welcomes — in your voice"
          />
          <div className="flex flex-wrap items-start gap-6">
            <Panel className="min-w-0 flex-[999_1_560px] p-3 max-sm:p-3">
              <ChatFeed>
                <ChatMessage
                  author="lowkeyLiam"
                  platform="twitch"
                  tag={<MessageTag tone="question">Question</MessageTag>}
                  time="9:02 PM"
                >
                  when do you stream next week
                </ChatMessage>
                <ChatMessage
                  author="Pip"
                  bot
                  time="9:02 PM"
                  source="Schedule · Weekly"
                  confidence={98}
                >
                  @lowkeyLiam Tue, Thu and Sat at 7 PM IST. Sunday is cozy-games
                  day. Full schedule: !schedule
                </ChatMessage>
                <ChatMessage
                  author="saltyspud"
                  platform="youtube"
                  tag={<MessageTag tone="toxic">Toxic</MessageTag>}
                  time="9:03 PM"
                  quiet
                >
                  Message hidden · held for review
                </ChatMessage>
                <ChatMessage
                  author="momo_draws"
                  platform="twitch"
                  tag={<Badge className="h-5">First message</Badge>}
                  time="9:03 PM"
                >
                  omg the ace
                </ChatMessage>
                <ChatMessage author="Pip" bot time="9:03 PM">
                  Welcome @momo_draws! You picked a good minute to show up.
                </ChatMessage>
              </ChatFeed>
            </Panel>
            <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-6">
              <FeatureItem title="Answers from your knowledge">
                Every reply links to the FAQ, link or note it came from.
              </FeatureItem>
              <FeatureItem title="Moderates in the background">
                Spam, links and toxicity handled by your rules, with one-click
                undo.
              </FeatureItem>
              <FeatureItem title="Makes newcomers feel seen">
                First-time chatters get a welcome, so nobody talks into the
                void.
              </FeatureItem>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Product"
            title="Everything your chat needs, in one place"
          />
          <AutoGrid min="340px">
            {features.map((feature) => (
              <FeatureLinkCard key={feature.href} {...feature} />
            ))}
          </AutoGrid>
        </Container>
      </Section>

      <Section tone="alt">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Impact"
            title="Time back for the part only you can do"
          />
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
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col gap-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <SectionHeading
              eyebrow="Integrations"
              title="Plays well with your setup"
              lede="Streaming platforms, OBS and stream tools, Discord, Notion, Spotify and more."
            />
            <Link
              href="/integrations"
              className={buttonVariants({ variant: "secondary" })}
            >
              Browse integrations
            </Link>
          </div>
          <AutoGrid as="ul" min="200px" gap="tight">
            {integrations.map((item) => (
              <li key={item.platform}>
                <Panel className="flex-row items-center gap-3 p-4 max-sm:p-4">
                  <PlatformIcon platform={item.platform} size="lg" />
                  <span className="flex flex-col gap-1">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-caption text-muted-foreground">
                      {item.category}
                    </span>
                  </span>
                </Panel>
              </li>
            ))}
          </AutoGrid>
        </Container>
      </Section>

      <Section tone="alt">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Trust and control"
            title="You stay in charge of your chat"
          />
          <AutoGrid min="320px">
            <Panel>
              <h3 className="text-heading">Approval mode</h3>
              <p className="text-body-sm text-muted-foreground">
                Kibo drafts, you approve. Every reply waits for a click until
                you switch it to Auto.
              </p>
              <Panel
                variant="well"
                className="flex-row flex-wrap items-center justify-between"
              >
                <span className="text-caption">
                  “@GG_Rohan 0.32 at 800 DPI…”
                </span>
                <span className="flex gap-2">
                  <DemoButton variant="ghost">Reject</DemoButton>
                  <DemoButton variant="primary">Approve</DemoButton>
                </span>
              </Panel>
            </Panel>
            <Panel>
              <h3 className="text-heading">Kill switch</h3>
              <p className="text-body-sm text-muted-foreground">
                Pause the bot instantly from any screen — or your phone —
                mid-stream.
              </p>
              <Panel
                variant="well"
                className="flex-row flex-wrap items-center justify-between"
              >
                <StatusPill tone="live">Live</StatusPill>
                <DemoButton>
                  <PauseIcon />
                  Pause bot
                </DemoButton>
              </Panel>
            </Panel>
            <Panel>
              <h3 className="text-heading">Why it said this</h3>
              <p className="text-body-sm text-muted-foreground">
                Every reply shows the knowledge it used and how sure it was.
                Unsure? It stays quiet and asks you.
              </p>
              <Panel
                variant="well"
                className="flex-row flex-wrap items-center gap-3"
              >
                <SourceChip>FAQ · Valorant settings</SourceChip>
                <Confidence value={94} suffix="sure" />
              </Panel>
            </Panel>
          </AutoGrid>
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Creators"
            title="Made with streamers, for streamers"
          />
          <AutoGrid min="320px">
            {testimonials.map((item) => (
              <TestimonialCard key={item.person.name} {...item} />
            ))}
          </AutoGrid>
        </Container>
      </Section>

      <Section tone="alt">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <SectionHeading
              eyebrow="Pricing"
              title="Start free, grow when chat does"
            />
            <Link
              href="/pricing"
              className={buttonVariants({ variant: "secondary" })}
            >
              Compare plans
            </Link>
          </div>
          <AutoGrid min="300px">
            {plans.map((plan) => (
              <PlanCard key={plan.code} plan={plan} compact />
            ))}
          </AutoGrid>
        </Container>
      </Section>

      <Section>
        <Container width="narrow" className="flex flex-col gap-6">
          <Heading>Questions, answered</Heading>
          <FaqList items={faqs} />
        </Container>
      </Section>

      <CtaBanner
        flush
        title="Focus on creating. Let Kibo handle the community."
        lede="Set up your first bot before your next stream."
      />
    </>
  )
}
