"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { ChipButton } from "@/components/atoms/chip"
import { IntegrationCard } from "@/components/molecules/integration-card"
import { SearchField } from "@/components/molecules/search-field"
import {
  integrationCategories,
  integrationGroups,
  integrations,
  type IntegrationCategory,
} from "@/lib/marketing/integrations"

/** Search, category filters and the grouped integration grid. */
export function IntegrationsDirectory() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<IntegrationCategory | "All">("All")

  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return integrations.filter(
      (item) =>
        (category === "All" || item.category === category) &&
        (!needle ||
          item.name.toLowerCase().includes(needle) ||
          item.description?.toLowerCase().includes(needle))
    )
  }, [query, category])

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-5">
        <SearchField
          label="Search integrations"
          placeholder="Spotify"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="max-w-[420px]"
        />
        <div
          role="group"
          aria-label="Filter by category"
          className="flex flex-wrap gap-2"
        >
          {(["All", ...integrationCategories] as const).map((item) => (
            <ChipButton
              key={item}
              selected={item === category}
              onClick={() => setCategory(item)}
            >
              {item}
            </ChipButton>
          ))}
        </div>
      </div>

      <p role="status" className="sr-only">
        {shown.length} integrations shown
      </p>

      {integrationGroups.map((group) => {
        const items = shown.filter((item) => item.group === group.id)
        if (items.length === 0) {
          return null
        }
        const compact = group.id === "more"

        return (
          <section key={group.id} className="flex flex-col gap-4">
            <h2 className="text-title">{group.title}</h2>
            <AutoGrid min={compact ? "200px" : "260px"} gap="tight">
              {items.map((item) => (
                <IntegrationCard
                  key={item.slug}
                  integration={item}
                  compact={compact}
                />
              ))}
            </AutoGrid>
            {compact ? (
              <p className="text-caption text-muted-foreground">
                All coming soon. Want one sooner?{" "}
                <Link href="/contact" className="text-link">
                  Tell us which
                </Link>
                .
              </p>
            ) : null}
          </section>
        )
      })}

      {shown.length === 0 ? (
        <p className="text-muted-foreground">
          No integrations match “{query}”.{" "}
          <Link href="/contact" className="text-link">
            Tell us what you need
          </Link>
          .
        </p>
      ) : null}
    </div>
  )
}
