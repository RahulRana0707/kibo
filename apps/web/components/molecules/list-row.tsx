import Link from "next/link"
import { ChevronRightIcon } from "lucide-react"

import { cn } from "@kibo/ui/lib/utils"

/**
 * A leading visual, a title with a line of detail, and a trailing control:
 * the building block for settings lists, integrations, bots and members.
 * With `href` the whole row is one link with a chevron; never nest a
 * button inside it.
 */
export function ListRow({
  leading,
  trailing,
  title,
  detail,
  href,
  inset = false,
  align = "center",
  selected = false,
  disabled = false,
  className,
  children,
}: {
  leading?: React.ReactNode
  trailing?: React.ReactNode
  title?: React.ReactNode
  detail?: React.ReactNode
  href?: string
  /** Rows inside a card: padded, separators between. */
  inset?: boolean
  align?: "center" | "start"
  selected?: boolean
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}) {
  const body = (
    <>
      {leading}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {title ? (
          <span className="text-body-sm font-medium">{title}</span>
        ) : null}
        {detail ? (
          <span className="text-caption text-muted-foreground">{detail}</span>
        ) : null}
        {children}
      </div>
      {trailing}
      {href ? (
        <ChevronRightIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground rtl:rotate-180"
        />
      ) : null}
    </>
  )

  const classes = cn(
    "flex gap-3 border-b border-separator py-3 last:border-b-0",
    align === "start" ? "items-start" : "items-center",
    (title || detail) && (detail ? "min-h-14" : "min-h-11"),
    inset && "px-3",
    href &&
      "rounded-md px-3 text-foreground no-underline transition-colors duration-instant hover:bg-hovered",
    selected && "bg-primary-subtle",
    disabled && "text-disabled [&_*]:text-disabled",
    className
  )

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {body}
      </Link>
    )
  }

  return (
    <div aria-disabled={disabled || undefined} className={classes}>
      {body}
    </div>
  )
}
