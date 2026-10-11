import Link from "next/link"
import { SearchIcon } from "lucide-react"

import { buttonVariants } from "@kibo/ui/components/button"
import { chipVariants } from "@kibo/ui/components/chip"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@kibo/ui/components/empty"
import { Panel } from "@kibo/ui/components/panel"

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/** Wraps every query word in <mark>. */
function Highlight({ text, words }: { text: string; words: string[] }) {
  if (words.length === 0) {
    return text
  }

  const pattern = new RegExp(`(${words.map(escapeRegExp).join("|")})`, "gi")

  return text.split(pattern).map((part, index) =>
    index % 2 === 1 ? (
      <mark
        key={index}
        className="rounded-[4px] bg-primary-subtle px-0.5 text-link"
      >
        {part}
      </mark>
    ) : (
      part
    )
  )
}

/** The count of results and, when they span topics, a filter per topic. */
export function HelpSearchSummary({
  query,
  count,
  topics,
  current,
  hrefFor,
}: {
  query: string
  count: number
  topics: { slug: string; title: string }[]
  current?: string
  hrefFor: (topic?: string) => string
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p role="status" className="text-muted-foreground">
        {count} {count === 1 ? "result" : "results"} for “{query}”
      </p>
      {topics.length > 1 ? (
        <div
          role="group"
          aria-label="Filter by topic"
          className="flex flex-wrap gap-2"
        >
          <Link
            href={hrefFor()}
            aria-current={!current ? "page" : undefined}
            className={chipVariants({ variant: !current ? "selected" : "default" })}
          >
            All topics
          </Link>
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={hrefFor(topic.slug)}
              aria-current={current === topic.slug ? "page" : undefined}
              className={chipVariants({
                variant: current === topic.slug ? "selected" : "default",
              })}
            >
              {topic.title}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}

/** One matching article: its topic, title and a snippet, query words marked. */
export function HelpSearchResult({
  href,
  topic,
  title,
  snippet,
  words,
}: {
  href: string
  topic?: string
  title: string
  snippet: string
  words: string[]
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-2 rounded-xl border border-transparent bg-raised p-6 text-foreground no-underline shadow-border transition-shadow duration-fast hover:shadow-border-hover max-sm:p-4"
    >
      <span className="text-caption text-muted-foreground">{topic}</span>
      <span className="text-heading">
        <Highlight text={title} words={words} />
      </span>
      <span className="text-body-sm text-muted-foreground">
        <Highlight text={snippet} words={words} />
      </span>
    </Link>
  )
}

/** Nothing matched: echo the query and offer the team. */
export function HelpNoResults({ query }: { query: string }) {
  return (
    <Panel>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="neutral">
            <SearchIcon />
          </EmptyMedia>
          <EmptyTitle>No articles match “{query}”</EmptyTitle>
          <EmptyDescription>
            Try fewer words, or check the spelling. You can also ask our team.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href="/contact" className={buttonVariants()}>
            Contact support
          </Link>
        </EmptyContent>
      </Empty>
    </Panel>
  )
}

/** The way out under a list of results. */
export function HelpDidntFindIt() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface p-6">
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Didn’t find it?</p>
        <p className="text-caption text-muted-foreground">
          Tell us what’s happening and we’ll help.
        </p>
      </div>
      <Link href="/contact" className={buttonVariants({ variant: "secondary" })}>
        Contact support
      </Link>
    </div>
  )
}
