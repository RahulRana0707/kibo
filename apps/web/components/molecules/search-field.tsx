import { SearchIcon } from "lucide-react"

import { Input } from "@kibo/ui/components/input"
import { cn } from "@kibo/ui/lib/utils"

/** A search input with a leading icon and a visually hidden label. */
export function SearchField({
  label,
  size = "default",
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> & {
  label: string
  size?: "default" | "lg"
}) {
  return (
    <label className={cn("relative block", className)}>
      <span className="sr-only">{label}</span>
      <SearchIcon
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute start-3 size-4 text-muted-foreground",
          size === "lg" ? "top-4" : "top-3"
        )}
      />
      <Input
        type="search"
        className={cn("ps-9", size === "lg" && "h-12")}
        {...props}
      />
    </label>
  )
}
