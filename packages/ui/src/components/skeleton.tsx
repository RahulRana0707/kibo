import { cn } from "@kibo/ui/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "rounded-md bg-sunken motion-safe:animate-pulse",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
