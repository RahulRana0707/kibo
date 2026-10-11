import type { Metadata } from "next"

import { Container } from "@/components/atoms/container"
import { Breadcrumbs } from "@/components/molecules/breadcrumbs"
import { HelpSearchForm } from "@/components/organisms/marketing/help-search-form"
import {
  HelpDidntFindIt,
  HelpNoResults,
  HelpSearchResult,
  HelpSearchSummary,
} from "@/components/organisms/marketing/help-search-results"
import { getHelpArticles, getPlainText } from "@/lib/content"
import { getHelpCategory } from "@/lib/marketing/help"

export const metadata: Metadata = { title: "Search help" }

type Props = { searchParams: Promise<{ q?: string; topic?: string }> }

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
          <HelpSearchSummary
            query={query}
            count={matches.length}
            topics={topics.map((slug) => ({
              slug,
              title: getHelpCategory(slug)?.title ?? slug,
            }))}
            current={topic}
            hrefFor={hrefFor}
          />
        ) : null}

        {shown.length > 0 ? (
          <ol className="flex flex-col gap-2">
            {shown.map(({ article, body }) => (
              <li key={article.slug}>
                <HelpSearchResult
                  href={`/help/${article.metadata.category}/${article.slug}`}
                  topic={getHelpCategory(article.metadata.category)?.title}
                  title={article.metadata.title}
                  snippet={snippetAround(body, words)}
                  words={words}
                />
              </li>
            ))}
          </ol>
        ) : query ? (
          <HelpNoResults query={query} />
        ) : (
          <p className="text-muted-foreground">
            Type a question or a few words to search the help center.
          </p>
        )}

        {shown.length > 0 ? <HelpDidntFindIt /> : null}
      </Container>
    </section>
  )
}
