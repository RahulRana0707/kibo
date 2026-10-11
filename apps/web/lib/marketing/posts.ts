import "server-only"

import type { PostSummary } from "@/components/molecules/post-card"
import { formatDate, getBlogPosts } from "@/lib/content"

/** Blog posts as plain data that client components can receive. */
export async function getPostSummaries(): Promise<PostSummary[]> {
  const posts = await getBlogPosts()

  return posts.map(({ slug, metadata }) => ({
    slug,
    title: metadata.title,
    description: metadata.description,
    category: metadata.category,
    dateLabel: formatDate(metadata.date),
    readMinutes: metadata.readMinutes,
    author: metadata.author,
  }))
}
