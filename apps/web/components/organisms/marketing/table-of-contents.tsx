"use client"

import { useEffect, useState } from "react"

import { cn } from "@kibo/ui/lib/utils"

import type { Heading } from "@/lib/content"

/** "On this page" links that follow the reader's scroll position. */
export function TableOfContents({
  headings,
  title = "On this page",
  className,
}: {
  headings: Heading[]
  title?: string
  className?: string
}) {
  const [activeId, setActiveId] = useState(headings[0]?.id)

  useEffect(() => {
    const targets = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) {
          setActiveId(visible.target.id)
        }
      },
      { rootMargin: "-96px 0px -70% 0px" }
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  return (
    <nav
      aria-label={title}
      className={cn("flex flex-col gap-3 lg:sticky lg:top-24", className)}
    >
      <p className="text-overline text-muted-foreground uppercase">{title}</p>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          aria-current={heading.id === activeId ? "location" : undefined}
          className={cn(
            "text-body-sm/[1.4] no-underline",
            heading.id === activeId
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {heading.title}
        </a>
      ))}
    </nav>
  )
}
