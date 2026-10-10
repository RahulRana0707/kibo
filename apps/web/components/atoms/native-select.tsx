import { ChevronDownIcon } from "lucide-react"

import { cn } from "@kibo/ui/lib/utils"

/** A native select styled like the text inputs. */
export function NativeSelect({
  className,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <span className={cn("relative block", className)}>
      <select
        className="h-10 w-full appearance-none rounded-md border border-input bg-sunken ps-3 pe-9 text-body text-foreground"
        {...props}
      />
      <ChevronDownIcon
        aria-hidden="true"
        className="pointer-events-none absolute end-3 top-3 size-4 text-muted-foreground"
      />
    </span>
  )
}
