import Link from "next/link"
import { PlayIcon } from "lucide-react"

import { buttonVariants } from "@kibo/ui/components/button"
import { Eyebrow, Heading, Lede } from "@kibo/ui/components/typography"

import { Container } from "@/components/atoms/container"
import { Section } from "@/components/atoms/section"
import { HeroChatDemo } from "@/components/organisms/marketing/hero-chat-demo"

/** The landing page opening: the promise, two actions and a live chat demo. */
export function LandingHero() {
  return (
    <Section className="pt-20 max-sm:pt-20">
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
  )
}
