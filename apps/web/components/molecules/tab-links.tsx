import Link from "next/link"

import { Badge } from "@kibo/ui/components/badge"
import { SoonLabel } from "@kibo/ui/components/soon-label"
import { cn } from "@kibo/ui/lib/utils"

export type NavLinkItem = {
  href: string
  label: string
  current?: boolean
  icon?: React.ReactNode
  /** A neutral count; `countTone="warning"` only for queues that need action. */
  count?: number
  countTone?: "default" | "warning"
  /** Not built yet: rendered inert with a Soon label and this reason. */
  soonReason?: string
}

function Count({ item }: { item: NavLinkItem }) {
  return item.count !== undefined ? (
    <Badge
      count={item.count}
      variant={item.countTone === "warning" ? "warning" : "default"}
    />
  ) : null
}

/**
 * Underlined links between sibling pages under a page header. They change
 * the URL; for panels in place use Tabs. Scrolls sideways when it
 * overflows, with the edge faded.
 */
export function TabLinks({
  label,
  items,
  className,
}: {
  label: string
  items: NavLinkItem[]
  className?: string
}) {
  return (
    <nav
      aria-label={label}
      className={cn(
        "flex gap-1 overflow-x-auto border-b border-separator scrollbar-none max-sm:mask-r-from-[calc(100%-2rem)]",
        className
      )}
    >
      {items.map((item) =>
        item.soonReason ? (
          <span
            key={item.href}
            aria-disabled="true"
            title={item.soonReason}
            className="-mb-px inline-flex min-h-10 shrink-0 cursor-not-allowed items-center gap-1.5 border-b-2 border-transparent px-3 text-body-sm font-medium whitespace-nowrap text-disabled max-sm:min-h-11"
          >
            {item.label}
            <SoonLabel />
            <span className="sr-only">{item.soonReason}</span>
          </span>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            aria-current={item.current ? "page" : undefined}
            className={cn(
              "-mb-px inline-flex min-h-10 shrink-0 items-center gap-1.5 border-b-2 px-3 text-body-sm font-medium whitespace-nowrap no-underline max-sm:min-h-11",
              item.current
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
            <Count item={item} />
          </Link>
        )
      )}
    </nav>
  )
}

/**
 * Stacked links between sibling pages, for Settings and Help. With a
 * `title` it sits on a panel. Groups split the list under small labels.
 */
export function SideNav({
  title,
  label,
  items,
  groups,
  className,
}: {
  title?: string
  label: string
  items?: NavLinkItem[]
  groups?: { label: string; items: NavLinkItem[] }[]
  className?: string
}) {
  const sections = groups ?? [{ label: "", items: items ?? [] }]

  return (
    <nav
      aria-label={label}
      className={cn(
        "flex flex-col gap-4",
        title && "rounded-xl border border-transparent bg-raised p-3 shadow-border",
        className
      )}
    >
      {title ? (
        <p className="px-2.5 pt-1 text-overline text-muted-foreground uppercase">
          {title}
        </p>
      ) : null}
      {sections.map((section) => (
        <div key={section.label} className="flex flex-col gap-0.5">
          {section.label ? (
            <p className="px-2.5 pb-1.5 text-overline text-muted-foreground uppercase">
              {section.label}
            </p>
          ) : null}
          {section.items.map((item) =>
            item.soonReason ? (
              <span
                key={item.href}
                aria-disabled="true"
                title={item.soonReason}
                className="flex min-h-9 cursor-not-allowed items-center gap-2.5 rounded-md px-2.5 text-body-sm font-medium text-disabled [&_svg]:size-4"
              >
                {item.icon}
                <span className="flex-1">{item.label}</span>
                <SoonLabel />
                <span className="sr-only">{item.soonReason}</span>
              </span>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={cn(
                  "flex min-h-9 items-center gap-2.5 rounded-md px-2.5 text-body-sm font-medium no-underline transition-colors duration-instant [&_svg]:size-4",
                  item.current
                    ? "bg-primary-subtle text-link"
                    : "text-muted-foreground hover:bg-hovered hover:text-foreground"
                )}
              >
                {item.icon}
                <span className="flex-1">{item.label}</span>
                <Count item={item} />
              </Link>
            )
          )}
        </div>
      ))}
    </nav>
  )
}
