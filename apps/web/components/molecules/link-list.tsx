import Link from "next/link"
import { ChevronRightIcon } from "lucide-react"

import { cn } from "@kibo/ui/lib/utils"

/** A panel of divided links, each with an optional second line. */
export function LinkList({
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
