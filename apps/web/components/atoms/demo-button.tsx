import { buttonVariants } from "@kibo/ui/components/button"
import { cn } from "@kibo/ui/lib/utils"

/**
 * A button drawn inside a product illustration. It is not interactive, so
 * it stays out of the tab order and away from assistive technology.
 */
export function DemoButton({
  variant = "secondary",
  size = "sm",
  className,
  children,
}: NonNullable<Parameters<typeof buttonVariants>[0]> & {
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        buttonVariants({ variant, size }),
        "pointer-events-none",
        className
      )}
    >
      {children}
    </span>
  )
}
