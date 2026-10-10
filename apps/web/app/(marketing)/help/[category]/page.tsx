import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Container } from "@/components/atoms/container"
import { Heading, Lede } from "@/components/atoms/typography"
import { Breadcrumbs } from "@/components/molecules/breadcrumbs"
import { LinkList } from "@/components/molecules/link-list"
import { SearchField } from "@/components/molecules/search-field"
import { SideNav } from "@/components/molecules/side-nav"
import { getHelpArticles } from "@/lib/content"
import { getHelpCategory, helpCategories } from "@/lib/marketing/help"

type Props = { params: Promise<{ category: string }> }

export function generateStaticParams() {
  return helpCategories.map((category) => ({ category: category.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getHelpCategory((await params).category)
  return category ? { title: `${category.title} · Help` } : {}
}

export default async function HelpCategoryPage({ params }: Props) {
  const category = getHelpCategory((await params).category)

  if (!category) {
    notFound()
  }

  const articles = (await getHelpArticles()).filter(
    (article) => article.metadata.category === category.slug
  )

  return (
    <section className="pt-14 pb-24">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Breadcrumbs
            items={[
              { label: "Help center", href: "/help" },
              { label: category.title },
            ]}
          />
          <form
            role="search"
            action="/help/search"
            className="flex-[0_1_320px]"
          >
            <SearchField
              label="Search help"
              name="q"
              placeholder="Search help"
            />
          </form>
        </div>
        <div className="flex flex-col gap-2">
          <Heading as="h1">{category.title}</Heading>
          <Lede>
            {category.intro} {articles.length}{" "}
            {articles.length === 1 ? "article" : "articles"}.
          </Lede>
        </div>
        <div className="flex flex-wrap items-start gap-6">
          <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-6">
            {category.sections.map((section) => {
              const inSection = articles.filter(
                (article) => article.metadata.section === section
              )

              return inSection.length > 0 ? (
                <section key={section} className="flex flex-col gap-3">
                  <h2 className="text-heading">{section}</h2>
                  <LinkList
                    items={inSection.map((article) => ({
                      href: `/help/${category.slug}/${article.slug}`,
                      title: article.metadata.title,
                      description: article.metadata.summary,
                    }))}
                  />
                </section>
              ) : null
            })}
          </div>
          <SideNav
            title="Topics"
            label="Help topics"
            className="min-w-0 flex-[1_1_320px]"
            items={helpCategories.map((item) => ({
              href: `/help/${item.slug}`,
              label: item.title,
              current: item.slug === category.slug,
            }))}
          />
        </div>
      </Container>
    </section>
  )
}
