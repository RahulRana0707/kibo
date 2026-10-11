import { cn } from "@kibo/ui/lib/utils"

const widths = {
  default: "max-w-300",
  narrow: "max-w-[760px]",
}

/** Centers content at the page width with the side gutter. */
export function Container({
  width = "default",
  className,
  ...props
}: React.ComponentProps<"div"> & { width?: keyof typeof widths }) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 max-sm:px-4",
        widths[width],
        className
      )}
      {...props}
    />
  )
}
