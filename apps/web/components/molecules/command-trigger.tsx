"use client"

import { SearchIcon } from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import { KbdGroup } from "@kibo/ui/components/kbd"
import { cn } from "@kibo/ui/lib/utils"

/**
 * “Search or jump to…” in the top bar: a button styled like a search field
 * that opens the Command menu. Shows ⌘K on a Mac and Ctrl K elsewhere.
 */
export function CommandTrigger({
  onOpen,
  className,
}: {
  onOpen: () => void
  className?: string
}) {
  return (
    <Button
      variant="secondary"
      aria-keyshortcuts="Meta+K Control+K"
      onClick={onOpen}
      className={cn(
        "max-w-[420px] flex-[1_1_240px] justify-start font-normal text-muted-foreground",
        className
      )}
    >
      <SearchIcon aria-hidden="true" />
      <span className="flex-1 text-start">Search or jump to…</span>
      <KbdGroup keys={["mod", "k"]} aria-hidden="true" />
    </Button>
  )
}
