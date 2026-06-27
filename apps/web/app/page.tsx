import Link from "next/link"
import {
  ArrowRightIcon,
  BarChart3Icon,
  BotIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  Clock3Icon,
  CommandIcon,
  DatabaseZapIcon,
  GaugeIcon,
  LockKeyholeIcon,
  MessageSquareTextIcon,
  RadioTowerIcon,
  ShieldCheckIcon,
  SparklesIcon,
  WandSparklesIcon,
  ZapIcon,
} from "lucide-react"

import { Icons } from "@/components/icons"
import { TextReveal } from "@/components/motion/text-reveal"
import SideRays from "@/components/side-rays"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@kibo/ui/components/accordion"
import { Badge } from "@kibo/ui/components/badge"
import { Button } from "@kibo/ui/components/button"

const creatorStack = [
  { label: "YouTube Live", icon: Icons.youtube },
  { label: "Twitch", icon: Icons.twitch },
  { label: "Discord", icon: Icons.discord },
]

const chatRows = [
  {
    name: "pixel_maya",
    text: "what camera is this?",
    tone: "question",
  },
  {
    name: "ninafps",
    text: "discord link pls",
    tone: "link",
  },
  {
    name: "Kibo",
    text: "Camera: Sony ZV-E10. Approved setup page: kibo.link/gear",
    tone: "answer",
  },
  {
    name: "mod_arya",
    text: "Kibo caught the repeated sponsor question again.",
    tone: "mod",
  },
]

const operatingLayers = [
  {
    title: "Creator brain",
    text: "FAQs, rules, sponsors, links, schedules, and tone live in one controlled source.",
    icon: DatabaseZapIcon,
  },
  {
    title: "Live response engine",
    text: "Kibo answers repeat questions from approved knowledge while your stream stays moving.",
    icon: BotIcon,
  },
  {
    title: "Moderation radar",
    text: "Spam, repeats, risky language, and sensitive actions surface before they steal focus.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Community signals",
    text: "Every stream becomes a feedback loop for better content, better docs, and better timing.",
    icon: BarChart3Icon,
  },
]

const controls = [
  "Approved-answer mode before autopilot",
  "Tone and personality rules per bot",
  "Sensitive actions require human review",
  "Knowledge sources stay visible",
]

const pricing = [
  {
    plan: "Starter",
    price: "$0",
    note: "For validating the workflow.",
    features: ["1 creator workspace", "25 FAQ entries", "Manual answer review"],
  },
  {
    plan: "Creator",
    price: "$19",
    note: "For creators who go live every week.",
    features: [
      "3 bots and platform profiles",
      "YouTube, Twitch, and Discord surfaces",
      "Approved auto replies",
      "Stream recap analytics",
    ],
    featured: true,
  },
  {
    plan: "Studio",
    price: "$49",
    note: "For teams, sponsors, and bigger communities.",
    features: [
      "Unlimited FAQs and rules",
      "Team roles",
      "Advanced moderation review",
      "Priority creator support",
    ],
  },
]

const faqs = [
  {
    question: "Will Kibo answer everything automatically?",
    answer:
      "No. The first experience is creator-approved by design. You decide the sources, tone, and which answers can run without review.",
  },
  {
    question: "Which integrations should ship first?",
    answer:
      "YouTube Live and Twitch are the first stream surfaces. Discord is the natural community layer because links, rules, and follow-up discussion live there.",
  },
  {
    question: "Is this just another moderation bot?",
    answer:
      "Moderation is part of the product, but the sharper wedge is attention. Kibo handles repeat knowledge work so creators can stay present on stream.",
  },
  {
    question: "Why would viewers trust an AI reply?",
    answer:
      "Replies show up from approved creator knowledge, not random generation. The product should make source control visible wherever trust matters.",
  },
]

function FloatingNav() {
  return (
    <header className="absolute inset-x-0 top-5 z-30 px-4">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between rounded-lg border border-border/80 bg-background/70 px-3 shadow-2xl backdrop-blur-xl">
        <a href="#top" className="flex items-center gap-2">
          <Icons.logo className="size-8" />
          <span className="font-heading text-sm font-semibold">Kibo</span>
        </a>
        <nav className="hidden items-center gap-5 text-xs text-muted-foreground md:flex">
          <a href="#platform" className="hover:text-foreground">
            Platform
          </a>
          <a href="#controls" className="hover:text-foreground">
            Controls
          </a>
          <a href="#pricing" className="hover:text-foreground">
            Pricing
          </a>
          <a href="#faq" className="hover:text-foreground">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">
              Join waitlist
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

function HeroConsole() {
  return (
    <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-lg border border-border bg-card/80 p-3 shadow-2xl">
      <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-md border border-border bg-background">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              <span className="text-sm font-medium">Live stream control</span>
            </div>
            <Badge variant="outline">2,842 watching</Badge>
          </div>
          <div className="grid gap-3 p-4 md:grid-cols-[0.85fr_1.15fr]">
            <div className="flex min-h-72 flex-col justify-between rounded-md border border-border bg-card/60 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RadioTowerIcon className="text-primary" />
                  <span className="text-sm font-medium">Stream pulse</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  live
                </span>
              </div>
              <div className="grid gap-3">
                {[
                  ["Answered", "128"],
                  ["Links shared", "42"],
                  ["Mod alerts", "7"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-end justify-between rounded-md bg-muted/40 px-3 py-2"
                  >
                    <span className="text-xs text-muted-foreground">
                      {label}
                    </span>
                    <span className="font-heading text-2xl font-semibold">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="rounded-md border border-border bg-background p-3">
                <div className="mb-2 flex items-center gap-2">
                  <SparklesIcon className="text-primary" />
                  <span className="text-xs font-medium">Approved source</span>
                </div>
                <p className="text-xs leading-5 text-muted-foreground">
                  Gear FAQ matched. No sensitive action required.
                </p>
              </div>
            </div>
            <div className="relative min-h-72 overflow-hidden rounded-md border border-border bg-card/60 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquareTextIcon className="text-primary" />
                  <span className="text-sm font-medium">Chat lane</span>
                </div>
                <Badge variant="secondary">Kibo active</Badge>
              </div>
              <div className="flex flex-col gap-3">
                {chatRows.map((row, index) => (
                  <div
                    key={`${row.name}-${row.text}`}
                    className="flex animate-kibo-chat-row items-start gap-3 rounded-md border border-border bg-background/80 p-3"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <div
                      className={
                        row.name === "Kibo"
                          ? "flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground"
                          : "flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-medium"
                      }
                    >
                      {row.name === "Kibo"
                        ? "K"
                        : row.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">{row.name}</span>
                        {row.tone === "answer" ? (
                          <Badge variant="secondary">answered</Badge>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm leading-5 text-muted-foreground">
                        {row.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          <div className="rounded-md border border-border bg-background p-4">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Creator mode</p>
                <h3 className="font-heading text-xl font-semibold">
                  Answer only from approved memory
                </h3>
              </div>
              <LockKeyholeIcon className="text-primary" />
            </div>
            <div className="grid gap-2">
              {controls.map((control) => (
                <div
                  key={control}
                  className="flex items-center gap-2 rounded-md bg-muted/40 px-3 py-2"
                >
                  <CheckCircle2Icon className="text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {control}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {creatorStack.map((platform) => (
              <div
                key={platform.label}
                className="flex min-h-28 flex-col justify-between rounded-md border border-border bg-background p-3"
              >
                <platform.icon className="text-2xl" />
                <span className="text-xs text-muted-foreground">
                  {platform.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div
      id="top"
      className="dark min-h-screen bg-background text-foreground selection:bg-primary/30"
    >
      <div className="relative overflow-hidden">
        <FloatingNav />
        <main>
          <section className="relative overflow-hidden border-b border-border px-4 pt-28 pb-16 sm:px-6 lg:px-8">
            <div className="absolute inset-0">
              <SideRays
                speed={2.5}
                rayColor1="#EAB308"
                rayColor2="#96c8ff"
                intensity={2}
                spread={2}
                origin="top-right"
                tilt={0}
                saturation={1.5}
                blend={0.75}
                falloff={1.6}
                opacity={1}
              />
            </div>
            <div className="relative mx-auto flex max-w-7xl flex-col gap-10">
              <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
                <Badge variant="outline" className="gap-2">
                  <Clock3Icon data-icon="inline-start" />
                  Built for the questions chat asks every stream
                </Badge>
                <TextReveal
                  as="h1"
                  text={["The AI community manager", "for live creators."]}
                  stagger={0.055}
                  blur={8}
                  yOffset="28%"
                  className="font-heading text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
                />
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  Kibo turns your FAQs, links, rules, and creator voice into a
                  controlled assistant that answers repeat chat, protects focus,
                  and keeps communities moving while you are live.
                </p>
                <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">
                      Start building Kibo
                      <ArrowRightIcon data-icon="inline-end" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href="#platform">Watch product flow</a>
                  </Button>
                </div>
                <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
                  {creatorStack.map((platform) => (
                    <span
                      key={platform.label}
                      className="inline-flex items-center gap-2"
                    >
                      <platform.icon />
                      {platform.label}
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-2">
                    <ShieldCheckIcon />
                    Creator-controlled answers
                  </span>
                </div>
              </div>
              <HeroConsole />
            </div>
          </section>

          <section className="border-b border-border px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
              {[
                ["6.4 hrs", "moderation and repeat-answer work saved weekly"],
                ["94%", "answers sourced from approved creator memory"],
                ["38%", "lower live-chat interruption load"],
                ["4 min", "to publish a new answer across surfaces"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-lg border border-border bg-card p-5"
                >
                  <div className="font-heading text-3xl font-semibold">
                    {value}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="platform"
            className="border-b border-border px-4 py-20 sm:px-6 lg:px-8"
          >
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="flex flex-col gap-5">
                <Badge variant="secondary" className="w-fit">
                  Creator operating layer
                </Badge>
                <h2 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                  Not a bot in chat. A control room for creator attention.
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  The product should feel like a serious SaaS console with a
                  creator-native pulse: fast answers, visible sources, clean
                  approvals, and community analytics that actually change what
                  you publish next.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {operatingLayers.map((layer) => (
                  <div
                    key={layer.title}
                    className="rounded-lg border border-border bg-card p-5"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <layer.icon className="text-primary" />
                      <ChevronRightIcon className="text-muted-foreground" />
                    </div>
                    <h3 className="font-heading text-lg font-medium">
                      {layer.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {layer.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="controls"
            className="border-b border-border px-4 py-20 sm:px-6 lg:px-8"
          >
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="rounded-md border border-border bg-background p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Launch policy
                      </p>
                      <h3 className="font-heading text-xl font-semibold">
                        Approved answer pipeline
                      </h3>
                    </div>
                    <CommandIcon className="text-primary" />
                  </div>
                  <div className="grid gap-3">
                    {[
                      [
                        "Collect",
                        "Import FAQs, sponsor copy, social links, and rules.",
                      ],
                      [
                        "Review",
                        "Approve what Kibo can say and where it can say it.",
                      ],
                      [
                        "Respond",
                        "Let the assistant answer repeat work during stream.",
                      ],
                      [
                        "Improve",
                        "Use stream signals to sharpen the next knowledge update.",
                      ],
                    ].map(([title, text], index) => (
                      <div
                        key={title}
                        className="grid gap-3 rounded-md border border-border bg-card/60 p-3 sm:grid-cols-[2.5rem_1fr]"
                      >
                        <span className="flex size-10 items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-medium">{title}</h4>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            {text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-5">
                <Badge variant="outline" className="w-fit">
                  Trust first
                </Badge>
                <h2 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                  AI should make creators calmer, not nervous.
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  Kibo starts constrained on purpose. Every powerful action
                  should expose the source, the reason, and the control point so
                  creators can trust the system under live pressure.
                </p>
                <div className="grid gap-3">
                  {[
                    { label: "Fast enough for live chat", icon: ZapIcon },
                    { label: "Clear enough for moderators", icon: GaugeIcon },
                    {
                      label: "Flexible enough for creator voice",
                      icon: WandSparklesIcon,
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-md border border-border bg-card">
                        <item.icon className="text-primary" />
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            id="pricing"
            className="border-b border-border px-4 py-20 sm:px-6 lg:px-8"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-10">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div className="max-w-2xl">
                  <Badge variant="secondary" className="mb-4">
                    Pricing
                  </Badge>
                  <h2 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                    Start free. Upgrade when Kibo is saving real attention.
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-muted-foreground">
                  Pricing is visual for now, but the positioning is intentional:
                  prove value with a small creator, then scale with teams and
                  heavier communities.
                </p>
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                {pricing.map((tier) => (
                  <div
                    key={tier.plan}
                    className={
                      tier.featured
                        ? "relative rounded-lg border border-primary bg-card p-5 shadow-2xl"
                        : "rounded-lg border border-border bg-card p-5"
                    }
                  >
                    {tier.featured ? (
                      <Badge className="absolute top-5 right-5">
                        <SparklesIcon data-icon="inline-start" />
                        Popular
                      </Badge>
                    ) : null}
                    <div className="flex min-h-52 flex-col gap-5">
                      <div>
                        <h3 className="font-heading text-xl font-semibold">
                          {tier.plan}
                        </h3>
                        <div className="mt-4 flex items-end gap-1">
                          <span className="font-heading text-5xl font-semibold">
                            {tier.price}
                          </span>
                          <span className="pb-2 text-sm text-muted-foreground">
                            /mo
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                          {tier.note}
                        </p>
                      </div>
                      <div className="flex flex-1 flex-col gap-3">
                        {tier.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle2Icon className="text-primary" />
                            <span className="text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Button variant={tier.featured ? "default" : "outline"}>
                        Choose {tier.plan}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <Badge variant="outline" className="mb-4">
                  FAQ
                </Badge>
                <h2 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                  Careful where it matters. Fast where it helps.
                </h2>
              </div>
              <Accordion type="single" collapsible>
                {faqs.map((faq) => (
                  <AccordionItem key={faq.question} value={faq.question}>
                    <AccordionTrigger className="p-4 text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 text-sm leading-6 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        </main>
      </div>

      <footer className="border-t border-border px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Icons.logo className="size-8" />
            <div className="flex flex-col">
              <span className="font-heading text-sm font-semibold">Kibo</span>
              <span className="text-xs text-muted-foreground">
                AI community manager for streamers
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <a href="#platform" className="hover:text-foreground">
              Platform
            </a>
            <a href="#controls" className="hover:text-foreground">
              Controls
            </a>
            <a href="#pricing" className="hover:text-foreground">
              Pricing
            </a>
            <a href="#faq" className="hover:text-foreground">
              FAQ
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
