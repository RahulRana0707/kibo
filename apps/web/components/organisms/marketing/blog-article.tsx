import Link from "next/link"

import { Avatar } from "@kibo/ui/components/avatar"
import { buttonVariants } from "@kibo/ui/components/button"
import { Heading, Lede } from "@kibo/ui/components/typography"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { Container } from "@/components/atoms/container"
import { Section } from "@/components/atoms/section"
import { Breadcrumbs } from "@/components/molecules/breadcrumbs"
import { PostCard, type PostSummary } from "@/components/molecules/post-card"

/** Breadcrumbs, title, standfirst and byline at the top of a post. */
export function ArticleHeader({ post }: { post: PostSummary }) {
  return (
    <header className="flex max-w-[820px] flex-col gap-4">
      <Breadcrumbs
        items={[{ label: "Blog", href: "/blog" }, { label: post.category }]}
      />
      <Heading as="h1">{post.title}</Heading>
      <Lede>{post.description}</Lede>
      <div className="flex flex-wrap items-center gap-3 text-caption text-muted-foreground">
        <Avatar
          name={post.author.initials}
          initials={post.author.initials}
          size="sm"
        />
        <span className="font-medium text-foreground">
          {post.author.name}, {post.author.role}
        </span>
        <span>
          {post.dateLabel} · {post.readMinutes} min read
        </span>
      </div>
    </header>
  )
}

/** The trial nudge after the last paragraph. */
export function ArticleTrialNote() {
  return (
    <>
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
    </>
  )
}

/** Three more posts under the article. */
export function KeepReading({ posts }: { posts: PostSummary[] }) {
  return (
    <Section tone="alt">
      <Container className="flex flex-col gap-6">
        <h2 className="text-title">Keep reading</h2>
        <AutoGrid min="300px">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} meta={false} />
          ))}
        </AutoGrid>
      </Container>
    </Section>
  )
}
