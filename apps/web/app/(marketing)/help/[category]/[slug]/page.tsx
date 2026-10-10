import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Container } from "@/components/atoms/container"
import { Prose } from "@/components/atoms/prose"
import { Heading } from "@kibo/ui/components/typography"
import { Breadcrumbs } from "@/components/molecules/breadcrumbs"
import { SideNav } from "@/components/molecules/side-nav"
import { ArticleFeedback } from "@/components/organisms/article-feedback"
import { getHelpArticle, getHelpArticles } from "@/lib/content"
import { getHelpCategory } from "@/lib/marketing/help"

type Props = { params: Promise<{ category: string; slug: string }> }

export async function generateStaticParams() {
  const articles = await getHelpArticles()
  return articles.map((article) => ({
    category: article.metadata.category,
    slug: article.slug,
  }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getHelpArticle((await params).slug)
  return article
    ? { title: article.metadata.title, description: article.metadata.summary }
    : {}
}

export default async function HelpArticlePage({ params }: Props) {
  const { category: categorySlug, slug } = await params
  const article = await getHelpArticle(slug)
  const category = getHelpCategory(categorySlug)

  if (!article || !category || article.metadata.category !== category.slug) {
    notFound()
  }

  const { metadata, Content } = article
  const siblings = (await getHelpArticles()).filter(
    (item) => item.metadata.category === category.slug
  )
  const related = siblings
    .filter(
      (item) => item.slug !== slug && item.metadata.section === metadata.section
    )
    .slice(0, 2)

  return (
    <section className="pt-14 pb-24">
      <Container className="flex flex-wrap items-start gap-14">
        <SideNav
          title={category.title}
          label="Articles in this topic"
          className="min-w-0 flex-[0_1_260px]"
          items={siblings.map((item) => ({
            href: `/help/${category.slug}/${item.slug}`,
            label: item.metadata.title,
            current: item.slug === slug,
          }))}
        />
        <article className="flex min-w-0 flex-[1_1_560px] flex-col gap-6">
          <Breadcrumbs
            items={[
              { label: "Help center", href: "/help" },
              { label: category.title, href: `/help/${category.slug}` },
            ]}
          />
          <Heading as="h1">{metadata.title}</Heading>
          <p className="text-caption text-muted-foreground">
            Updated {metadata.updated} · {metadata.readMinutes} min read
          </p>
          <Prose>
            <Content />
          </Prose>
          <ArticleFeedback />
          {related.length > 0 ? (
            <section className="flex flex-col gap-3">
              <h2 className="text-heading">Related</h2>
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/help/${category.slug}/${item.slug}`}
                  className="text-link"
                >
                  {item.metadata.title}
                </Link>
              ))}
            </section>
          ) : null}
        </article>
      </Container>
    </section>
  )
}
