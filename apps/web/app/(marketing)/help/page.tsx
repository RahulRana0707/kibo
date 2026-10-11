import type { Metadata } from "next"

import { Container } from "@/components/atoms/container"
import { MainAside } from "@/components/atoms/main-aside"
import { Section } from "@/components/atoms/section"
import { LinkPanel } from "@/components/molecules/link-list"
import {
  HelpHero,
  HelpStillStuck,
  HelpTopics,
} from "@/components/organisms/marketing/help-home"
import { getHelpArticles } from "@/lib/content"
import { helpCategories } from "@/lib/marketing/help"

export const metadata: Metadata = {
  title: "Help center",
  description: "Set up Kibo, connect your platforms and fix common problems.",
}

export default async function HelpPage() {
  const articles = await getHelpArticles()
  const popular = articles
    .filter((article) => article.metadata.popular)
    .map((article) => ({
      href: `/help/${article.metadata.category}/${article.slug}`,
      title: article.metadata.title,
    }))
  const topics = helpCategories.map((category) => ({
    ...category,
    count: articles.filter(
      (article) => article.metadata.category === category.slug
    ).length,
  }))

  return (
    <>
      <HelpHero popular={popular.slice(0, 3)} />

      <Section className="pt-16">
        <Container className="flex flex-col gap-8">
          <h2 className="text-title">Browse by topic</h2>
          <HelpTopics topics={topics} />
        </Container>
      </Section>

      <Section tone="alt">
        <Container>
          <MainAside
            className="gap-12"
            mainClassName="gap-4"
            main={
              <>
                <h2 className="text-title">Popular articles</h2>
                <LinkPanel items={popular} />
              </>
            }
            aside={<HelpStillStuck />}
          />
        </Container>
      </Section>
    </>
  )
}
