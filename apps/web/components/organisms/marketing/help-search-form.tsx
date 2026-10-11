import { Button } from "@kibo/ui/components/button"
import { cn } from "@kibo/ui/lib/utils"

import { SearchField } from "@/components/molecules/search-field"

/** Sends a query to the help search page. Works without JavaScript. */
export function HelpSearchForm({
  defaultValue,
  placeholder = "twitch disconnected",
  className,
}: {
  defaultValue?: string
  placeholder?: string
  className?: string
}) {
  return (
    <form
      role="search"
      action="/help/search"
      aria-label="Search help articles"
      className={cn("flex w-full gap-3", className)}
    >
      <SearchField
        label="Search help articles"
        name="q"
        size="lg"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="flex-1"
      />
      <Button type="submit" size="lg">
        Search
      </Button>
    </form>
  )
}
