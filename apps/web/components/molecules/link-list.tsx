import Link from "next/link"
import { ArrowUpRightIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@kibo/ui/lib/utils"

/**
 * A titled column of links: footer columns, related articles, the legal
 * index. External links get an arrow and say they open a new tab.
 */
export function LinkList({
  title,
  links,
  tone = "muted",
  className,
}: {
  title?: string
  links: { href: string; label: React.ReactNode; external?: boolean; current?: boolean }[]
  tone?: "muted" | "accent"
  className?: string
}) {
  const titleId = title ? `links-${title.toLowerCase().replace(/\W+/g, "-")}` : undefined

  return (
    <nav aria-labelledby={titleId} className={cn("flex flex-col gap-2", className)}>
      {title ? (
        <p id={titleId} className="text-caption font-semibold text-foreground">
          {title}
        </p>
      ) : null}
      <ul className="flex flex-col gap-2">
        {links.map((link) => {
          const classes = cn(
            "inline-flex min-h-6 items-center gap-1 no-underline hover:underline max-sm:min-h-11",
            tone === "accent"
              ? "text-[0.9375rem] text-link"
              : "text-body-sm text-muted-foreground hover:text-foreground",
            link.current && "font-medium text-foreground"
          )
          return (
            <li key={link.href}>
              {link.external ? (
                <a href={link.href} target="_blank" rel="noreferrer" className={classes}>
                  {link.label}
                  <ArrowUpRightIcon aria-hidden="true" className="size-3" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link
                  href={link.href}
                  aria-current={link.current ? "page" : undefined}
                  className={classes}
                >
                  {link.label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/** A panel of divided links, each with an optional second line. */
export function LinkPanel({
  items,
  className,
}: {
  items: {
    href: string
    title: React.ReactNode
    description?: React.ReactNode
  }[]
  className?: string
}) {
  return (
    <ul
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-transparent bg-raised shadow-border",
        className
      )}
    >
      {items.map((item) => (
        <li
          key={item.href}
          className="border-b border-separator last:border-b-0"
        >
          <Link
            href={item.href}
            className="flex items-center gap-3 px-6 py-3 text-foreground no-underline transition-colors duration-100 hover:bg-hovered max-sm:px-4"
          >
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              <span className={item.description ? "font-medium" : undefined}>
                {item.title}
              </span>
              {item.description ? (
                <span className="text-caption text-muted-foreground">
                  {item.description}
                </span>
              ) : null}
            </span>
            <ChevronRightIcon
              aria-hidden="true"
              className="size-4 shrink-0 text-muted-foreground"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
