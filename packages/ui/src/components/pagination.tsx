import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@kibo/ui/lib/utils"
import { buttonVariants } from "@kibo/ui/components/button"
import { Spinner } from "@kibo/ui/components/spinner"

/** First, current ±1 and last, with gaps between. */
function pageWindow(page: number, pageCount: number) {
  const pages = new Set([1, page - 1, page, page + 1, pageCount])
  const sorted = [...pages]
    .filter((value) => value >= 1 && value <= pageCount)
    .sort((a, b) => a - b)
  const result: (number | "gap")[] = []
  sorted.forEach((value, index) => {
    const previous = sorted[index - 1]
    if (previous !== undefined && value - previous > 1) result.push("gap")
    result.push(value)
  })
  return result
}

type LinkProps = {
  href: string
  className?: string
  children: React.ReactNode
  "aria-label"?: string
  "aria-current"?: "page"
}

/**
 * Pages through long tables, 25 rows a page. Live feeds load more instead.
 * Pass `linkAs` (Next.js Link) so pages navigate without a reload.
 */
function Pagination({
  page,
  total,
  pageSize = 25,
  href,
  linkAs: LinkComponent = "a",
  loading = false,
  noun = "results",
  className,
}: {
  page: number
  total: number
  pageSize?: number
  href: (page: number) => string
  linkAs?: React.ElementType<LinkProps>
  loading?: boolean
  /** What the rows are: “viewers”, “invoices”. */
  noun?: string
  className?: string
}) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const first = total === 0 ? 0 : (page - 1) * pageSize + 1
  const last = Math.min(total, page * pageSize)
  const range = (
    <p className="flex items-center gap-2 text-caption text-muted-foreground tabular">
      Showing {first.toLocaleString()}–{last.toLocaleString()} of{" "}
      {total.toLocaleString()} {noun}
      {loading ? <Spinner /> : null}
    </p>
  )

  if (pageCount === 1) {
    return <div className={className}>{range}</div>
  }

  const step = (target: number, label: string, icon: React.ReactNode) => {
    const disabled = target < 1 || target > pageCount
    const classes = cn(
      buttonVariants({ variant: "secondary", size: "sm" }),
      "max-sm:size-11 max-sm:px-0",
      disabled && "pointer-events-none bg-sunken text-disabled shadow-none"
    )
    return disabled ? (
      <span aria-disabled="true" className={classes}>
        {icon}
        <span className="max-sm:sr-only">{label}</span>
      </span>
    ) : (
      <LinkComponent href={href(target)} className={classes}>
        {icon}
        <span className="max-sm:sr-only">{label}</span>
      </LinkComponent>
    )
  }

  return (
    <nav
      aria-label="Pagination"
      aria-busy={loading || undefined}
      className={cn(
        "flex flex-wrap items-center justify-between gap-4",
        className
      )}
    >
      {range}
      <div className="flex items-center gap-1">
        {step(page - 1, "Previous", <ChevronLeftIcon aria-hidden="true" className="rtl:rotate-180" />)}
        <span className="px-2 text-caption text-muted-foreground tabular sm:hidden">
          Page {page} of {pageCount}
        </span>
        <ul className="flex items-center gap-1 max-sm:hidden">
          {pageWindow(page, pageCount).map((item, index) =>
            item === "gap" ? (
              <li key={`gap-${index}`} aria-hidden="true" className="px-1 text-muted-foreground">
                …
              </li>
            ) : (
              <li key={item}>
                <LinkComponent
                  href={href(item)}
                  aria-current={item === page ? "page" : undefined}
                  aria-label={`Page ${item}`}
                  className={cn(
                    "inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-body-sm text-muted-foreground no-underline tabular hover:bg-hovered hover:text-foreground",
                    item === page &&
                      "bg-raised font-semibold text-foreground shadow-border hover:bg-raised"
                  )}
                >
                  {item}
                </LinkComponent>
              </li>
            )
          )}
        </ul>
        {step(page + 1, "Next", <ChevronRightIcon aria-hidden="true" className="rtl:rotate-180" />)}
      </div>
    </nav>
  )
}

export { Pagination, pageWindow }
