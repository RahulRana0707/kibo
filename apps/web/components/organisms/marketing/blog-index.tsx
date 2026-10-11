"use client"

import { useState } from "react"

import { Button } from "@kibo/ui/components/button"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { ChipButton } from "@kibo/ui/components/chip"
import { PostCard, type PostSummary } from "@/components/molecules/post-card"

const categories = [
  "All",
  "Community",
  "Moderation",
  "Guides",
  "Product",
  "Creator stories",
]

const pageSize = 7

/** The featured post, the grid and the category filter on the blog index. */
export function BlogIndex({ posts }: { posts: PostSummary[] }) {
  const [category, setCategory] = useState("All")
  const [visible, setVisible] = useState(pageSize)

  const filtered =
    category === "All"
      ? posts
      : posts.filter((post) => post.category === category)
  const [featured, ...rest] = filtered.slice(0, visible)

  return (
    <div className="flex flex-col gap-12">
      <div
        role="group"
        aria-label="Filter posts"
        className="flex flex-wrap gap-2"
      >
        {categories.map((item) => (
          <ChipButton
            key={item}
            selected={item === category}
            onClick={() => {
              setCategory(item)
              setVisible(pageSize)
            }}
          >
            {item}
          </ChipButton>
        ))}
      </div>
      {featured ? (
        <PostCard post={featured} featured headingLevel="h2" />
      ) : (
        <p className="text-muted-foreground">No posts in {category} yet.</p>
      )}
      {rest.length > 0 ? (
        <AutoGrid min="320px" className="gap-y-12">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} headingLevel="h2" />
          ))}
        </AutoGrid>
      ) : null}
      {filtered.length > visible ? (
        <div className="flex justify-center">
          <Button
            variant="secondary"
            onClick={() => setVisible((count) => count + pageSize)}
          >
            Load more posts
          </Button>
        </div>
      ) : null}
    </div>
  )
}
