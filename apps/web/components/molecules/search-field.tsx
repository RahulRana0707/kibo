"use client"

import { SearchIcon, XIcon } from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import { Input } from "@kibo/ui/components/input"
import { Spinner } from "@kibo/ui/components/spinner"
import { cn } from "@kibo/ui/lib/utils"

/**
 * Filters what's on the page as you type. Pass `onClear` for a Clear
 * button (Escape clears too), `resultCount` for a polite count, `loading`
 * for a spinner. Jumping anywhere is the Command menu, not this.
 */
export function SearchField({
  label,
  size = "default",
  onClear,
  resultCount,
  loading = false,
  className,
  value,
  onKeyDown,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> & {
  label: string
  size?: "default" | "lg"
  onClear?: () => void
  /** “3 viewers”, announced politely. */
  resultCount?: string
  loading?: boolean
}) {
  const hasValue = typeof value === "string" ? value.length > 0 : false

  return (
    <div role="search" className={cn("flex flex-col gap-2", className)}>
      <label className="relative block">
        <span className="sr-only">{label}</span>
        <SearchIcon
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-s-3 top-1/2 -translate-y-1/2 text-muted-foreground",
            size === "lg" ? "size-5" : "size-4"
          )}
        />
        <Input
          type="search"
          size={size}
          value={value}
          onKeyDown={(event) => {
            if (event.key === "Escape" && onClear) onClear()
            onKeyDown?.(event)
          }}
          className={cn(
            "[&::-webkit-search-cancel-button]:appearance-none",
            size === "lg" ? "ps-10" : "ps-9",
            onClear && "pe-10"
          )}
          {...props}
        />
        <span className="absolute inset-e-1.5 top-1/2 flex -translate-y-1/2 items-center">
          {loading ? (
            <Spinner className="me-1.5 text-muted-foreground" />
          ) : onClear && hasValue ? (
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Clear search"
              onClick={onClear}
            >
              <XIcon />
            </Button>
          ) : null}
        </span>
      </label>
      {resultCount !== undefined ? (
        <p aria-live="polite" className="text-caption text-muted-foreground">
          {resultCount}
        </p>
      ) : null}
    </div>
  )
}
