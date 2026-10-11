import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Container } from "@/components/atoms/container"
import { Placeholder } from "@/components/atoms/placeholder"
import { Prose } from "@/components/atoms/prose"
import {
  ArticleHeader,
  ArticleTrialNote,
  KeepReading,
} from "@/components/organisms/marketing/blog-article"
import { TableOfContents } from "@/components/organisms/marketing/table-of-contents"
import { getBlogPost, getBlogPosts, getHeadings } from "@/lib/content"
import { getPostSummaries } from "@/lib/marketing/posts"

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

  const { Content } = post
  const headings = await getHeadings("blog", slug)
  const summaries = await getPostSummaries()
  const summary = summaries.find((item) => item.slug === slug)!
  const related = summaries.filter((item) => item.slug !== slug).slice(0, 3)

  return (
    <>
      <article className="pt-16 pb-24">
        <Container className="flex flex-col gap-12">
          <ArticleHeader post={summary} />
          <Placeholder label="Cover image" ratio="21/9" />
          <div className="flex flex-wrap items-start gap-16">
            <TableOfContents headings={headings} className="flex-[0_1_220px]" />
            <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-8">
              <Prose>
                <Content />
              </Prose>
              <ArticleTrialNote />
            </div>
          </div>
        </Container>
      </article>

      <KeepReading posts={related} />
    </>
  )
}
