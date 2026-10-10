import Link from "next/link"

import { cn } from "@kibo/ui/lib/utils"

/** Underlined tabs that navigate between sibling pages. */
export function TabLinks({
  label,
  items,
  className,
}: {
  label: string
  items: { href: string; label: string; current?: boolean }[]
  className?: string
}) {
  return (
    <nav
      aria-label={label}
      className={cn(
        "flex gap-1 overflow-x-auto border-b border-separator",
        className
      )}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={item.current ? "page" : undefined}
          className={cn(
            "-mb-px inline-flex min-h-10 items-center border-b-2 px-3 text-body-sm font-medium whitespace-nowrap no-underline",
            item.current
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
