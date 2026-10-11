import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@kibo/ui/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 text-xs leading-none font-medium whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-sunken text-muted-foreground",
        accent: "bg-primary-subtle text-link",
        success: "bg-success-subtle text-success-text",
        warning: "bg-warning-subtle text-warning-text",
        destructive: "bg-destructive-subtle text-destructive-text",
        outline:
          "bg-transparent text-muted-foreground shadow-[inset_0_0_0_1px_var(--vi-border)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * A short, non-interactive label: plan, role, state. Always a word or a
 * number. With `count` it becomes a 20px counter capped at `max` (“9+”).
 */
function Badge({
  className,
  variant = "default",
  asChild = false,
  count,
  max = 99,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
    count?: number
    max?: number
  }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(
        badgeVariants({ variant }),
        count !== undefined &&
          "h-5 min-w-5 px-1.5 font-semibold tabular",
        className
      )}
      {...props}
    >
      {count !== undefined ? (count > max ? `${max}+` : count) : children}
    </Comp>
  )
}

export { Badge, badgeVariants }
