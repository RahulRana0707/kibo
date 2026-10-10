import { cn } from "@kibo/ui/lib/utils"

const headingSizes = {
  hero: "text-hero max-sm:text-[2.5rem]",
  display: "text-display max-sm:text-[1.75rem]",
  title: "text-title",
  heading: "text-heading",
}

type HeadingTag = "h1" | "h2" | "h3" | "p"

/** A heading whose look (`size`) is chosen apart from its level (`as`). */
export function Heading({
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

/** The small uppercase label above a section heading. */
export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-overline text-muted-foreground uppercase", className)}
      {...props}
    />
  )
}

/** The larger introductory paragraph under a page or section heading. */
export function Lede({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-[1.25rem]/[1.5] text-muted-foreground max-sm:text-[1.125rem]",
        className
      )}
      {...props}
    />
  )
}

/** Inline code, commands and IDs such as `!discord`. */
export function Code({ className, ...props }: React.ComponentProps<"code">) {
  return <code className={cn("font-mono text-code", className)} {...props} />
}
