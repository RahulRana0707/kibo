"use client"

import { EmptyState } from "@/components/empty-state"
import { Button } from "@kibo/ui/components/button"
import { Input } from "@kibo/ui/components/input"
import { SearchIcon, XIcon } from "lucide-react"

import type { BotListItem } from "@/components/bots/types"
import { BotsDataTable } from "@/components/bots/bots-data-table"
import { BotsGrid } from "@/components/bots/bots-grid"
import { BotsViewToggle } from "@/components/bots/bots-view-toggle"
import { useCollectionControls } from "@/hooks/use-collection-controls"

export function BotsList({ bots }: { bots: BotListItem[] }) {
  const {
    viewMode,
    setViewMode,
    query,
    setQuery,
    clearQuery,
    hasFilter,
    filteredItems,
  } = useCollectionControls(bots, (bot, value) =>
    [
      bot.name,
      bot.status,
      bot.knowledgeCount.toString(),
      bot.integrationCount.toString(),
      bot.createdAtLabel,
      bot.isActive ? "active" : "draft",
    ].some((entry) => entry.toLowerCase().includes(value))
  )

  if (!bots.length) {
    return (
      <EmptyState
        iconName="bot"
        title="No bots yet"
        description="Create your first bot, then search, switch views, and manage it here."
        primaryAction={{ label: "Create bot", href: "/bots/new" }}
      />
    )
  }

  const hasResults = filteredItems.length > 0

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-[360px]">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search bots"
              className="pl-9"
            />
          </div>

          {hasFilter ? (
            <Button variant="outline" onClick={clearQuery} className="shrink-0">
              <XIcon data-icon="inline-start" />
              Clear filter
            </Button>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-3 whitespace-nowrap lg:justify-end">
          <p className="whitespace-nowrap text-sm text-muted-foreground">
            {hasFilter
              ? `${filteredItems.length} of ${bots.length} bots`
              : `${bots.length} bots`}
          </p>
          <BotsViewToggle value={viewMode} onValueChange={setViewMode} />
        </div>
      </div>

      {hasResults ? (
        viewMode === "grid" ? (
          <BotsGrid bots={filteredItems} />
        ) : (
          <BotsDataTable bots={filteredItems} />
        )
      ) : (
        <div className="px-6 py-10">
          <EmptyState
            iconName="bot"
            title="No matching bots"
            description={`We couldn't find any bots matching "${query.trim()}". Try a different term or clear the filter.`}
            primaryAction={{ label: "Create bot", href: "/bots/new" }}
          />
        </div>
      )}
    </section>
  )
}
