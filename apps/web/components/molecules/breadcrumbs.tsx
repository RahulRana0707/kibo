import Link from "next/link"

import { cn } from "@kibo/ui/lib/utils"

export type Crumb = { label: string; href?: string }

/**
 * Where a detail page sits, on pages two or more levels deep. Past three
 * levels the middle collapses to “…”; on phones the current page
 * truncates.
 */
export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[]
  className?: string
}) {
  const collapsible = items.length > 3

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex min-w-0 flex-wrap items-center gap-2 text-caption text-muted-foreground">
        {items.map((item, index) => {
          const last = index === items.length - 1
          // Keep the first and the last two; hide the rest when collapsing.
          const middle = index > 0 && index < items.length - 2
          return (
            <li
              key={`${item.label}-${index}`}
              className={cn(
                "flex min-w-0 items-center gap-2",
                middle && collapsible && "hidden"
              )}
            >
              {index > 0 ? (
                <span aria-hidden="true" className="text-disabled">
                  /
                </span>
              ) : null}
              {collapsible && index === items.length - 2 ? (
                <span aria-hidden="true" className="text-disabled">
                  … <span className="ms-2">/</span>
                </span>
              ) : null}
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground no-underline transition-colors duration-instant hover:text-foreground hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={cn(
                    last &&
                      "max-w-35 truncate font-medium text-foreground sm:max-w-none"
                  )}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
