"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@kibo/ui/lib/utils"

/**
 * Divides content, never controls. Decorative by default; use
 * `decorative={false}` only between groups in a menu or toolbar. Spacing
 * comes from the parent's gap.
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-separator data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

/** A label between two rules, such as “or with email”. */
function DividerText({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="divider-text"
      className={cn(
        "flex items-center gap-3 text-caption text-muted-foreground before:h-px before:flex-1 before:bg-separator after:h-px after:flex-1 after:bg-separator",
        className
      )}
      {...props}
    />
  )
}

export { Separator, DividerText }
