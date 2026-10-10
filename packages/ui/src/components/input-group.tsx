import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@kibo/ui/lib/utils"
import { Button } from "@kibo/ui/components/button"

const inputGroupVariants = cva(
  "group/input-group flex w-full min-w-0 items-center rounded-md border border-input bg-sunken text-foreground has-[input:disabled]:border-border-control has-[input:disabled]:text-disabled has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ring has-[input:read-only:not(:disabled)]:border-border-subtle has-[input:read-only:not(:disabled)]:bg-page has-[[aria-invalid=true]]:border-destructive",
  {
    variants: {
      size: {
        default: "h-10",
        lg: "h-12",
      },
    },
    defaultVariants: { size: "default" },
  }
)

/**
 * An input with things attached: a leading icon, prefix or suffix text
 * (`discord.gg/`, `seconds`), or a trailing button. The focus ring wraps
 * the whole group.
 */
function InputGroup({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupVariants>) {
  return (
    <div
      data-slot="input-group"
      className={cn(inputGroupVariants({ size }), className)}
      {...props}
    />
  )
}

/** An icon or affix text at the start or end. Decorative icons only. */
function InputGroupAddon({
  className,
  align = "start",
  ...props
}: React.ComponentProps<"span"> & { align?: "start" | "end" }) {
  return (
    <span
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        "flex shrink-0 items-center gap-1 text-body text-muted-foreground select-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        align === "start" ? "order-first ps-3 has-[svg]:pe-2" : "order-last pe-1",
        "data-[align=end]:has-[>span:only-child]:pe-3",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input-group-control"
      className={cn(
        "h-full w-full min-w-0 flex-1 bg-transparent px-3 text-body text-foreground caret-primary outline-none placeholder:text-disabled disabled:cursor-not-allowed group-has-data-[align=start]/input-group:ps-0",
        className
      )}
      {...props}
    />
  )
}

/** A small button inside the group, such as Clear or Copy. */
function InputGroupButton({
  variant = "ghost",
  size = "xs",
  type = "button",
  ...props
}: React.ComponentProps<typeof Button>) {
  return <Button type={type} variant={variant} size={size} {...props} />
}

export { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton }
