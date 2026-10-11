import Link from "next/link"

import { Badge } from "@kibo/ui/components/badge"
import { cn } from "@kibo/ui/lib/utils"

import { Avatar } from "@kibo/ui/components/avatar"
import { Placeholder } from "@/components/atoms/placeholder"

export type PostSummary = {
  slug: string
  title: string
  description: string
  category: string
  dateLabel: string
  readMinutes: number
  author: { name: string; role: string; initials: string }
}

function PostMeta({ post, long }: { post: PostSummary; long?: boolean }) {
  return (
    <span className="flex flex-wrap items-center gap-2 text-caption text-muted-foreground">
      <Badge>{post.category}</Badge>
      {post.dateLabel} · {post.readMinutes} {long ? "min read" : "min"}
    </span>
  )
}

/**
 * A post in the blog grid, or the wide featured post with `featured`.
 * `meta={false}` drops the category and date, for “Keep reading” lists.
 */
export function PostCard({
  post,
  featured = false,
  meta = true,
  headingLevel = "h3",
}: {
  post: PostSummary
  featured?: boolean
  meta?: boolean
  headingLevel?: "h2" | "h3"
}) {
  const Title = headingLevel

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-wrap items-center gap-10 text-foreground no-underline"
      >
        <Placeholder label="Cover image" className="flex-[1_1_480px]" />
        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-3">
          <PostMeta post={post} long />
          <Title className="text-title group-hover:underline">
            {post.title}
          </Title>
          <p className="text-muted-foreground">{post.description}</p>
          <span className="flex items-center gap-2 text-caption">
            <Avatar name={post.author.initials} initials={post.author.initials} size="sm" />
            {post.author.name}, {post.author.role}
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn("group flex flex-col gap-3 text-foreground no-underline")}
    >
      <Placeholder label="Cover image" />
      {meta ? <PostMeta post={post} /> : null}
      <Title className="text-heading group-hover:underline">{post.title}</Title>
    </Link>
  )
}
