import type { Metadata } from "next"
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

import { AutoGrid } from "@/components/atoms/auto-grid"
import { Container } from "@/components/atoms/container"
import { IconTile } from "@/components/atoms/icon-tile"
import { Panel } from "@kibo/ui/components/panel"
import { Section } from "@/components/atoms/section"
import { Heading } from "@kibo/ui/components/typography"
import { LinkList } from "@/components/molecules/link-list"
import { HelpSearchForm } from "@/components/organisms/help-search-form"
import { getHelpArticles } from "@/lib/content"
import { helpCategories } from "@/lib/marketing/help"

export const metadata: Metadata = {
  title: "Help center",
  description: "Set up Kibo, connect your platforms and fix common problems.",
}

const categoryIcons: Record<string, React.ReactNode> = {
  "getting-started": <CheckIcon />,
  "connecting-platforms": <PlugIcon />,
  "bots-and-replies": <BotIcon />,
  "knowledge-base": <BookIcon />,
  moderation: <ShieldIcon />,
  "billing-and-plans": <CreditCardIcon />,
}

export default async function HelpPage() {
  const articles = await getHelpArticles()
  const popular = articles.filter((article) => article.metadata.popular)
  const hrefOf = (article: (typeof articles)[number]) =>
    `/help/${article.metadata.category}/${article.slug}`

  return (
    <>
      <Section tone="alt" className="py-18 max-sm:py-12">
        <Container className="flex flex-col items-center gap-6 text-center">
          <Heading as="h1">How can we help?</Heading>
          <HelpSearchForm className="max-w-[640px]" />
          <p className="text-caption text-muted-foreground">
            Popular:{" "}
            {popular.slice(0, 3).map((article, index) => (
              <span key={article.slug}>
                {index > 0 ? " · " : null}
                <Link href={hrefOf(article)} className="text-link">
                  {article.metadata.title}
                </Link>
              </span>
            ))}
          </p>
        </Container>
      </Section>

      <Section className="pt-16">
        <Container className="flex flex-col gap-8">
          <h2 className="text-title">Browse by topic</h2>
          <AutoGrid min="300px" gap="tight">
            {helpCategories.map((category) => {
              const count = articles.filter(
                (article) => article.metadata.category === category.slug
              ).length

              return (
                <Link
                  key={category.slug}
                  href={`/help/${category.slug}`}
                  className="flex items-start gap-3.5 rounded-xl border border-transparent bg-raised p-5 text-foreground no-underline shadow-border transition-shadow duration-150 hover:shadow-border-hover"
                >
                  <IconTile>{categoryIcons[category.slug]}</IconTile>
                  <span className="flex flex-col gap-1">
                    <span className="font-semibold">{category.title}</span>
                    <span className="text-caption text-muted-foreground">
                      {category.description} · {count}{" "}
                      {count === 1 ? "article" : "articles"}
                    </span>
                  </span>
                </Link>
              )
            })}
          </AutoGrid>
        </Container>
      </Section>

      <Section tone="alt">
        <Container className="flex flex-wrap gap-12">
          <div className="flex min-w-0 flex-[2_1_480px] flex-col gap-4">
            <h2 className="text-title">Popular articles</h2>
            <LinkList
              items={popular.map((article) => ({
                href: hrefOf(article),
                title: article.metadata.title,
              }))}
            />
          </div>
          <Panel className="flex-[1_1_300px] gap-3 self-start">
            <h2 className="text-heading">Still stuck?</h2>
            <p className="text-body-sm text-muted-foreground">
              Our support team replies within a day — faster on Studio.
            </p>
            <Link
              href="/contact"
              className={buttonVariants({ variant: "secondary" })}
            >
              Contact support
            </Link>
          </Panel>
        </Container>
      </Section>
    </>
  )
}
