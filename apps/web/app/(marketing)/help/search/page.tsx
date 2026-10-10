import type { Metadata } from "next"
import Link from "next/link"
import { SearchIcon } from "lucide-react"

import { buttonVariants } from "@kibo/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@kibo/ui/components/empty"

import { chipLinkClassName } from "@/components/atoms/chip"
import { Container } from "@/components/atoms/container"
import { Panel } from "@/components/atoms/panel"
import { Breadcrumbs } from "@/components/molecules/breadcrumbs"
import { HelpSearchForm } from "@/components/organisms/help-search-form"
import { getHelpArticles, getPlainText } from "@/lib/content"
import { getHelpCategory } from "@/lib/marketing/help"

export const metadata: Metadata = { title: "Search help" }

type Props = { searchParams: Promise<{ q?: string; topic?: string }> }

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

function snippetAround(text: string, words: string[]) {
  const lower = text.toLowerCase()
  const hit = words
    .map((word) => lower.indexOf(word))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0]

  if (hit === undefined) {
    return text.slice(0, 140) + (text.length > 140 ? "…" : "")
  }

  const start = Math.max(0, hit - 60)
  return `${start > 0 ? "…" : ""}${text.slice(start, start + 160)}…`
}

export default async function HelpSearchPage({ searchParams }: Props) {
  const { q = "", topic } = await searchParams
  const query = q.trim()
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)

  const articles = await getHelpArticles()
  const scored = await Promise.all(
    articles.map(async (article) => {
      const body = await getPlainText("help", article.slug)
      const haystack =
        `${article.metadata.title} ${article.metadata.summary} ${body}`.toLowerCase()
      const score = words.filter((word) => haystack.includes(word)).length
      return { article, body, score }
    })
  )

  const matches = scored
    .filter((item) => words.length > 0 && item.score > 0)
    .sort((a, b) => b.score - a.score)
  const topics = [
    ...new Set(matches.map((item) => item.article.metadata.category)),
  ]
  const shown = topic
    ? matches.filter((item) => item.article.metadata.category === topic)
    : matches
  const hrefFor = (topicSlug?: string) =>
    `/help/search?${new URLSearchParams({ q, ...(topicSlug ? { topic: topicSlug } : {}) })}`

  return (
    <section className="pt-14 pb-24">
      <Container width="narrow" className="flex max-w-[860px] flex-col gap-8">
        <Breadcrumbs
          items={[{ label: "Help center", href: "/help" }, { label: "Search" }]}
        />
        <HelpSearchForm defaultValue={query} placeholder="Search help" />
        {query ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p role="status" className="text-muted-foreground">
              {matches.length} {matches.length === 1 ? "result" : "results"} for
              “{query}”
            </p>
            {topics.length > 1 ? (
              <div
                role="group"
                aria-label="Filter by topic"
                className="flex flex-wrap gap-2"
              >
                <Link
                  href={hrefFor()}
                  aria-current={!topic ? "page" : undefined}
                  className={chipLinkClassName(!topic)}
                >
                  All topics
                </Link>
                {topics.map((slug) => (
                  <Link
                    key={slug}
                    href={hrefFor(slug)}
                    aria-current={topic === slug ? "page" : undefined}
                    className={chipLinkClassName(topic === slug)}
                  >
                    {getHelpCategory(slug)?.title}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {shown.length > 0 ? (
          <ol className="flex flex-col gap-2">
            {shown.map(({ article, body }) => (
              <li key={article.slug}>
                <Link
                  href={`/help/${article.metadata.category}/${article.slug}`}
                  className="flex flex-col gap-2 rounded-xl border border-transparent bg-raised p-6 text-foreground no-underline shadow-border transition-shadow duration-150 hover:shadow-border-hover max-sm:p-4"
                >
                  <span className="text-caption text-muted-foreground">
                    {getHelpCategory(article.metadata.category)?.title}
                  </span>
                  <span className="text-heading">
                    <Highlight text={article.metadata.title} words={words} />
                  </span>
                  <span className="text-body-sm text-muted-foreground">
                    <Highlight
                      text={snippetAround(body, words)}
                      words={words}
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        ) : query ? (
          <Panel>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <SearchIcon />
                </EmptyMedia>
                <EmptyTitle>No articles match “{query}”</EmptyTitle>
                <EmptyDescription>
                  Try fewer words, or check the spelling. You can also ask our
                  team.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Link href="/contact" className={buttonVariants()}>
                  Contact support
                </Link>
              </EmptyContent>
            </Empty>
          </Panel>
        ) : (
          <p className="text-muted-foreground">
            Type a question or a few words to search the help center.
          </p>
        )}

        {shown.length > 0 ? (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface p-6">
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Didn’t find it?</p>
              <p className="text-caption text-muted-foreground">
                Tell us what’s happening and we’ll help.
              </p>
            </div>
            <Link
              href="/contact"
              className={buttonVariants({ variant: "secondary" })}
            >
              Contact support
            </Link>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
