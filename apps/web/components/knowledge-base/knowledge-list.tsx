"use client"

import { SearchIcon, Trash2Icon } from "lucide-react"
import { useState } from "react"

import { KnowledgeEditDialog } from "@/components/knowledge-base/knowledge-edit-dialog"
import type { KnowledgeBaseItem } from "@/components/knowledge-base/types"
import { useKnowledgeBasePage } from "@/components/knowledge-base/use-knowledge-base-page"
import { Badge } from "@kibo/ui/components/badge"
import { Button } from "@kibo/ui/components/button"
import { Input } from "@kibo/ui/components/input"

const TYPE_FILTERS = ["ALL", "FAQ", "RULE", "NOTE", "LINK"] as const
type TypeFilter = (typeof TYPE_FILTERS)[number]

function filterLabel(filter: TypeFilter) {
  if (filter === "FAQ") {
    return "FAQ"
  }

  return filter.charAt(0) + filter.slice(1).toLowerCase()
}

function searchableText(item: KnowledgeBaseItem) {
  return [
    item.type,
    item.title,
    item.question,
    item.answer,
    item.content,
    item.sourceUrl,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
}

export function KnowledgeList({ items }: { items: KnowledgeBaseItem[] }) {
  const [query, setQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("ALL")
  const { deleteKnowledge, isDeletingKnowledge } = useKnowledgeBasePage()

  if (!items.length) {
    return (
      <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center">
        <p className="text-sm font-medium">No knowledge yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Add one FAQ or import a CSV to give Kibo approved answers.
        </p>
      </div>
    )
  }

  const normalizedQuery = query.trim().toLowerCase()
  const filteredItems = items.filter((item) => {
    const matchesType = typeFilter === "ALL" || item.type === typeFilter
    const matchesQuery =
      !normalizedQuery || searchableText(item).includes(normalizedQuery)

    return matchesType && matchesQuery
  })
  const hasFilter = typeFilter !== "ALL" || !!normalizedQuery

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <SearchIcon className="-translate-y-1/2 absolute top-1/2 left-3 size-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search knowledge"
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm text-muted-foreground">
            {filteredItems.length} of {items.length} items
          </p>
          {TYPE_FILTERS.map((filter) => (
            <Button
              key={filter}
              type="button"
              variant={typeFilter === filter ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setTypeFilter(filter)}
              className="h-8"
            >
              {filterLabel(filter)}
            </Button>
          ))}
        </div>
      </div>

      {filteredItems.length ? (
        <div className="overflow-hidden rounded-lg border border-border bg-background">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="grid gap-3 border-border border-b px-3 py-3 last:border-b-0 md:grid-cols-[1fr_auto] md:items-center"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={item.isActive ? "secondary" : "outline"}>
                    {filterLabel(item.type as TypeFilter)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Added {item.createdAtLabel}
                  </span>
                </div>
                <h3 className="mt-2 truncate font-heading text-sm font-semibold tracking-tight">
                  {item.question ?? item.title ?? "Untitled knowledge"}
                </h3>
                <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
                  {item.answer ?? item.content ?? item.sourceUrl}
                </p>
                {item.sourceUrl ? (
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {item.sourceUrl}
                  </p>
                ) : null}
              </div>

              <div className="flex items-center gap-1 md:justify-self-end">
                <KnowledgeEditDialog item={item} />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={isDeletingKnowledge}
                  onClick={() => {
                    void deleteKnowledge(item.id)
                  }}
                >
                  <Trash2Icon />
                  <span className="sr-only">Delete knowledge item</span>
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center">
          <p className="text-sm font-medium">No matches</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {hasFilter
              ? "Try another search or switch the type filter."
              : "Add knowledge to this bot to see it here."}
          </p>
        </div>
      )}
    </div>
  )
}
