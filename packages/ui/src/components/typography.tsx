import * as React from "react"

import { cn } from "@kibo/ui/lib/utils"

const headingSizes = {
  hero: "text-hero max-sm:text-[2.5rem]",
  display: "text-display max-sm:text-[1.75rem]",
  title: "text-title",
  heading: "text-heading",
}

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p"

/**
 * A heading whose look (`size`) is chosen apart from its level (`as`), so
 * the outline stays right when the look changes. Levels never skip.
 */
function Heading({
  as: Tag = "h2",
  size = "display",
  className,
  ...props
}: React.ComponentProps<"h2"> & {
  as?: HeadingTag
  size?: keyof typeof headingSizes
}) {
  return <Tag className={cn(headingSizes[size], className)} {...props} />
}

/** The small uppercase label above a heading. */
function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-overline text-muted-foreground uppercase", className)}
      {...props}
    />
  )
}

/** The larger introductory paragraph under a page or section heading. */
function Lede({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "max-w-[60ch] text-[1.25rem]/[1.5] text-muted-foreground max-sm:text-[1.125rem]",
        className
      )}
      {...props}
    />
  )
}

/** Inline code, commands and IDs such as `!discord`. */
function Code({ className, ...props }: React.ComponentProps<"code">) {
  return (
    <code
      className={cn(
        "rounded-sm bg-sunken px-[5px] py-px font-mono text-[0.875em]",
        className
      )}
      {...props}
    />
  )
}

export { Heading, Eyebrow, Lede, Code }
