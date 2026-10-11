"use client"

import { PlusIcon, SlidersHorizontalIcon } from "lucide-react"

import { Badge } from "@kibo/ui/components/badge"
import { Button } from "@kibo/ui/components/button"
import { Chip, RemovableChip } from "@kibo/ui/components/chip"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@kibo/ui/components/dropdown-menu"

import { SearchField } from "@/components/molecules/search-field"

export type FilterOption = { field: string; label: string; values: string[] }
export type ActiveFilter = { field: string; value: string }

/**
 * Above a data table: search, active filters as removable chips, Add
 * filter, Clear filters and the result count. On phones the filters move
 * behind one Filters button with the active count.
 */
export function FilterBar({
  query,
  onQueryChange,
  searchLabel,
  options,
  active,
  onActiveChange,
  count,
}: {
  query: string
  onQueryChange: (query: string) => void
  searchLabel: string
  options: FilterOption[]
  active: ActiveFilter[]
  onActiveChange: (active: ActiveFilter[]) => void
  /** “24 of 1,204 viewers”, announced politely. */
  count: string
}) {
  const isActive = (field: string, value: string) =>
    active.some((filter) => filter.field === field && filter.value === value)
  const toggle = (field: string, value: string) =>
    onActiveChange(
      isActive(field, value)
        ? active.filter((filter) => !(filter.field === field && filter.value === value))
        : [...active, { field, value }]
    )
  const labelFor = (field: string) =>
    options.find((option) => option.field === field)?.label ?? field

  const menu = (trigger: React.ReactNode) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <div key={option.field}>
            <DropdownMenuLabel>{option.label}</DropdownMenuLabel>
            {option.values.map((value) => (
              <DropdownMenuCheckboxItem
                key={value}
                checked={isActive(option.field, value)}
                onCheckedChange={() => toggle(option.field, value)}
                onSelect={(event) => event.preventDefault()}
              >
                {value}
              </DropdownMenuCheckboxItem>
            ))}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <div role="search" className="flex flex-wrap items-center gap-2">
      <SearchField
        label={searchLabel}
        placeholder={searchLabel}
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        onClear={() => onQueryChange("")}
        className="w-[260px] max-sm:w-auto max-sm:flex-1"
      />
      <div className="flex flex-wrap items-center gap-2 max-sm:hidden">
        {active.map((filter) => (
          <RemovableChip
            key={`${filter.field}-${filter.value}`}
            label={`${labelFor(filter.field)}: ${filter.value}`}
            onRemove={() => toggle(filter.field, filter.value)}
          />
        ))}
        {menu(
          <button type="button">
            <Chip variant="add" className="cursor-pointer">
              <PlusIcon />
              Add filter
            </Chip>
          </button>
        )}
        {active.length ? (
          <Button variant="ghost" size="sm" onClick={() => onActiveChange([])}>
            Clear filters
          </Button>
        ) : null}
      </div>
      {menu(
        <Button variant="secondary" size="icon-lg" className="relative sm:hidden" aria-label={`Filters, ${active.length} active`}>
          <SlidersHorizontalIcon />
          {active.length ? (
            <Badge variant="accent" count={active.length} className="absolute -inset-e-1 -top-1" />
          ) : null}
        </Button>
      )}
      <p aria-live="polite" className="ms-auto text-caption text-muted-foreground tabular max-sm:w-full">
        {count}
      </p>
    </div>
  )
}
