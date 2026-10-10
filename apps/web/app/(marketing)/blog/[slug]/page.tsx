import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { buttonVariants } from "@kibo/ui/components/button"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { Container } from "@/components/atoms/container"
import { Monogram } from "@/components/atoms/monogram"
import { Placeholder } from "@/components/atoms/placeholder"
import { Prose } from "@/components/atoms/prose"
import { Section } from "@/components/atoms/section"
import { Heading, Lede } from "@/components/atoms/typography"
import { Breadcrumbs } from "@/components/molecules/breadcrumbs"
import { TableOfContents } from "@/components/organisms/table-of-contents"
import {
  formatDate,
  getBlogPost,
  getBlogPosts,
  getHeadings,
} from "@/lib/content"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost((await params).slug)
  return post
    ? { title: post.metadata.title, description: post.metadata.description }
    : {}
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const { metadata, Content } = post
  const headings = await getHeadings("blog", slug)
  const related = (await getBlogPosts())
    .filter((item) => item.slug !== slug)
    .slice(0, 3)

  return (
    <>
      <article className="pt-16 pb-24">
        <Container className="flex flex-col gap-12">
          <header className="flex max-w-[820px] flex-col gap-4">
            <Breadcrumbs
              items={[
                { label: "Blog", href: "/blog" },
                { label: metadata.category },
              ]}
            />
            <Heading as="h1">{metadata.title}</Heading>
            <Lede>{metadata.description}</Lede>
            <div className="flex flex-wrap items-center gap-3 text-caption text-muted-foreground">
              <Monogram initials={metadata.author.initials} size="sm" />
              <span className="font-medium text-foreground">
                {metadata.author.name}, {metadata.author.role}
              </span>
              <span>
                {formatDate(metadata.date)} · {metadata.readMinutes} min read
              </span>
            </div>
          </header>
          <Placeholder label="Cover image" ratio="21/9" />
          <div className="flex flex-wrap items-start gap-16">
            <TableOfContents headings={headings} className="flex-[0_1_220px]" />
            <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-8">
              <Prose>
                <Content />
              </Prose>
              <hr className="max-w-[68ch] border-separator" />
              <div className="flex max-w-[68ch] flex-wrap items-center justify-between gap-4 rounded-xl bg-surface p-6">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Try it on your next stream</p>
                  <p className="text-caption text-muted-foreground">
                    Import your channel’s About page in one click.
                  </p>
                </div>
                <Link href="/signup" className={buttonVariants()}>
                  Start free trial
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </article>

      <Section tone="alt">
        <Container className="flex flex-col gap-6">
          <h2 className="text-title">Keep reading</h2>
          <AutoGrid min="300px">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group flex flex-col gap-3 text-foreground no-underline"
              >
                <Placeholder label="Cover image" />
                <h3 className="text-heading group-hover:underline">
                  {item.metadata.title}
                </h3>
              </Link>
            ))}
          </AutoGrid>
        </Container>
      </Section>
    </>
  )
}
