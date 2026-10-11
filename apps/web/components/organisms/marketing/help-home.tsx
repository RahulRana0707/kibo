import Link from "next/link"
import {
  BookIcon,
  BotIcon,
  CheckIcon,
  CreditCardIcon,
  PlugIcon,
  ShieldIcon,
} from "lucide-react"

import { buttonVariants } from "@kibo/ui/components/button"
import { Panel } from "@kibo/ui/components/panel"
import { Heading } from "@kibo/ui/components/typography"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { Container } from "@/components/atoms/container"
import { IconTile } from "@/components/atoms/icon-tile"
import { Section } from "@/components/atoms/section"
import { HelpSearchForm } from "@/components/organisms/marketing/help-search-form"

type ArticleLink = { href: string; title: string }

const categoryIcons: Record<string, React.ReactNode> = {
  "getting-started": <CheckIcon />,
  "connecting-platforms": <PlugIcon />,
  "bots-and-replies": <BotIcon />,
  "knowledge-base": <BookIcon />,
  moderation: <ShieldIcon />,
  "billing-and-plans": <CreditCardIcon />,
}

/** The help center opening: one question, the search, three popular links. */
export function HelpHero({ popular }: { popular: ArticleLink[] }) {
  return (
    <Section tone="alt" className="py-18 max-sm:py-12">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Heading as="h1">How can we help?</Heading>
        <HelpSearchForm className="max-w-[640px]" />
        <p className="text-caption text-muted-foreground">
          Popular:{" "}
          {popular.map((article, index) => (
            <span key={article.href}>
              {index > 0 ? " · " : null}
              <Link href={article.href} className="text-link">
                {article.title}
              </Link>
            </span>
          ))}
        </p>
      </Container>
    </Section>
  )
}

/** One card per help topic, with what it covers and how many articles. */
export function HelpTopics({
  topics,
}: {
  topics: { slug: string; title: string; description: string; count: number }[]
}) {
  return (
    <AutoGrid min="300px" gap="tight">
      {topics.map((topic) => (
        <Link
          key={topic.slug}
          href={`/help/${topic.slug}`}
          className="flex flex-col items-start gap-3.5 rounded-xl border border-transparent bg-raised p-5 text-foreground no-underline shadow-border transition-shadow duration-fast hover:shadow-border-hover"
        >
          <IconTile>{categoryIcons[topic.slug]}</IconTile>
          <span className="flex flex-col gap-1">
            <span className="font-semibold">{topic.title}</span>
            <span className="text-caption text-muted-foreground">
              {topic.description} · {topic.count}{" "}
              {topic.count === 1 ? "article" : "articles"}
            </span>
          </span>
        </Link>
      ))}
    </AutoGrid>
  )
}

/** The way to a person when articles don’t help. */
export function HelpStillStuck() {
  return (
    <Panel className="gap-3">
      <h2 className="text-heading">Still stuck?</h2>
      <p className="text-body-sm text-muted-foreground">
        Our support team replies within a day — faster on Studio.
      </p>
      <Link href="/contact" className={buttonVariants({ variant: "secondary" })}>
        Contact support
      </Link>
    </Panel>
  )
}
