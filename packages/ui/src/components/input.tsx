import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@kibo/ui/lib/utils"

// Shared by Input, Textarea, InputGroup, Select triggers and TagInput.
const controlSurface =
  "rounded-md border border-input bg-sunken text-body text-foreground caret-primary placeholder:text-disabled read-only:not-disabled:border-border-subtle read-only:not-disabled:bg-page disabled:cursor-not-allowed disabled:border-border-control disabled:text-disabled aria-invalid:border-destructive"

const inputVariants = cva(
  `w-full min-w-0 px-3 ${controlSurface} file:me-3 file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-body-sm file:font-medium file:text-foreground`,
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
 * Single-line text, always 16px so iOS never zooms. Placeholders show an
 * example, never an instruction. `size="lg"` (48) for touch-first forms.
 */
function Input({
  className,
  type,
  size,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants, controlSurface }
