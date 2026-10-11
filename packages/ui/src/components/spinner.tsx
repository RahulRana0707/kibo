import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@kibo/ui/lib/utils"

const spinnerVariants = cva(
  "inline-block shrink-0 animate-spin rounded-full border-2 border-current border-e-transparent [animation-duration:800ms]",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
      },
    },
    defaultVariants: { size: "sm" },
  }
)

/**
 * Work under ~10 seconds: saving, connecting, refreshing. Decorative: the
 * changed label beside it (“Saving…”) carries the meaning. Keeps running
 * under reduced motion.
 */
function Spinner({
  className,
  size,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof spinnerVariants>) {
  return (
    <span
      data-slot="spinner"
      aria-hidden="true"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  )
}

export { Spinner }
