import type { Metadata } from "next"

import { Container } from "@/components/atoms/container"
import { Heading, Lede } from "@/components/atoms/typography"
import { BlogIndex } from "@/components/organisms/blog-index"
import { NewsletterSignup } from "@/components/organisms/newsletter-signup"
import { getPostSummaries } from "@/lib/marketing/posts"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides for growing a community, product updates and stories from creators.",
}

export default async function BlogPage() {
  const posts = await getPostSummaries()

  return (
    <>
      <section className="pt-18 pb-24">
        <Container className="flex flex-col gap-6">
          <Heading as="h1">Blog</Heading>
          <Lede>
            Guides for growing a community, product updates and stories from
            creators.
          </Lede>
          <BlogIndex posts={posts} />
        </Container>
      </section>
      <NewsletterSignup />
    </>
  )
}
