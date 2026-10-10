import Link from "next/link"

import { cn } from "@kibo/ui/lib/utils"

/** A titled vertical list of links on a panel, with the current page marked. */
export function SideNav({
  title,
  label,
  items,
  className,
}: {
  title: string
  label: string
  items: { href: string; label: string; current?: boolean }[]
  className?: string
}) {
  return (
    <nav
      aria-label={label}
      className={cn(
        "flex flex-col gap-1 rounded-xl border border-transparent bg-raised p-3 shadow-border",
        className
      )}
    >
      <p className="px-2.5 pt-1 pb-2 text-overline text-muted-foreground uppercase">
        {title}
      </p>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={item.current ? "page" : undefined}
          className={cn(
            "flex min-h-9 items-center rounded-md px-2.5 text-body-sm font-medium no-underline transition-colors duration-100",
            item.current
              ? "bg-primary-subtle text-link"
              : "text-muted-foreground hover:bg-hovered hover:text-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
