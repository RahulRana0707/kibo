"use client"

import * as React from "react"
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  CircleAlertIcon,
} from "lucide-react"

import { cn } from "@kibo/ui/lib/utils"
import { Button } from "@kibo/ui/components/button"
import { Checkbox } from "@kibo/ui/components/checkbox"
import { Skeleton } from "@kibo/ui/components/skeleton"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@kibo/ui/components/table"

export type Column<Row> = {
  key: string
  header: string
  cell: (row: Row) => React.ReactNode
  align?: "start" | "end" | "center"
  sortable?: boolean
  /** Shown as the card title at phone width. */
  primary?: boolean
  /** Left out of the phone card. */
  hideOnPhone?: boolean
  className?: string
}

export type Sort = { key: string; direction: "asc" | "desc" }

/**
 * Every list of records: viewers, knowledge items, members, invoices.
 * Sortable headers, row selection with a bulk bar, a row menu, empty,
 * loading and error states, and stacked cards below 640.
 */
function DataTable<Row>({
  caption,
  columns,
  rows,
  getRowId,
  sort,
  onSortChange,
  selectable = false,
  selected = [],
  onSelectedChange,
  bulkActions,
  rowActions,
  state,
  empty,
  onRetry,
  className,
}: {
  /** Names the table for screen readers. */
  caption: string
  columns: Column<Row>[]
  rows: Row[]
  getRowId: (row: Row) => string
  sort?: Sort
  onSortChange?: (sort: Sort) => void
  selectable?: boolean
  selected?: string[]
  onSelectedChange?: (ids: string[]) => void
  /** Small actions for the selected rows; replaces the filter bar. */
  bulkActions?: React.ReactNode
  /** The ⋯ menu at the end of each row. */
  rowActions?: (row: Row) => React.ReactNode
  state?: "loading" | "error"
  /** Shown when there are no rows. */
  empty?: React.ReactNode
  onRetry?: () => void
  className?: string
}) {
  const ids = rows.map(getRowId)
  const allSelected = ids.length > 0 && ids.every((id) => selected.includes(id))
  const someSelected = !allSelected && ids.some((id) => selected.includes(id))
  const toggle = (id: string) =>
    onSelectedChange?.(
      selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]
    )
  const span = columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)
  const primary = columns.find((column) => column.primary) ?? columns[0]

  const body = (() => {
    if (state === "loading") {
      return Array.from({ length: 5 }, (_, index) => (
        <TableRow key={index} className="hover:bg-transparent">
          <TableCell colSpan={span} className="py-0">
            <Skeleton variant="row" className="border-0" />
          </TableCell>
        </TableRow>
      ))
    }
    if (state === "error") {
      return (
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={span} className="py-8 text-center">
            <span className="inline-flex flex-col items-center gap-2 text-muted-foreground">
              <CircleAlertIcon aria-hidden="true" className="size-5 text-destructive-text" />
              Unable to load this list.
              {onRetry ? (
                <Button variant="secondary" size="xs" onClick={onRetry}>
                  Try again
                </Button>
              ) : null}
            </span>
          </TableCell>
        </TableRow>
      )
    }
    if (rows.length === 0) {
      return (
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={span} className="p-0">
            {empty}
          </TableCell>
        </TableRow>
      )
    }
    return rows.map((row) => {
      const id = getRowId(row)
      const isSelected = selected.includes(id)
      return (
        <TableRow key={id} data-state={isSelected ? "selected" : undefined}>
          {selectable ? (
            <TableCell className="w-10 pe-0">
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => toggle(id)}
                aria-label={`Select ${String(primary?.cell(row) ?? id)}`}
              />
            </TableCell>
          ) : null}
          {columns.map((column) => (
            <TableCell key={column.key} align={column.align} className={column.className}>
              {column.cell(row)}
            </TableCell>
          ))}
          {rowActions ? <TableCell className="w-10 ps-0 text-end">{rowActions(row)}</TableCell> : null}
        </TableRow>
      )
    })
  })()

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {selected.length && bulkActions ? (
        <div
          role="region"
          aria-label={`${selected.length} selected`}
          className="flex flex-wrap items-center gap-3 rounded-lg bg-primary-subtle px-4 py-2 text-body-sm text-link"
        >
          <span className="font-medium" aria-live="polite">
            {selected.length} selected
          </span>
          <div className="flex flex-wrap gap-2">{bulkActions}</div>
          <Button
            variant="ghost"
            size="xs"
            className="ms-auto text-link"
            onClick={() => onSelectedChange?.([])}
          >
            Clear selection
          </Button>
        </div>
      ) : null}

      <div className="max-sm:hidden">
        <Table aria-busy={state === "loading" || undefined}>
          <TableCaption>{caption}</TableCaption>
          <TableHeader>
            <tr>
              {selectable ? (
                <TableHead className="w-10 pe-0">
                  <Checkbox
                    checked={allSelected ? true : someSelected ? "indeterminate" : false}
                    onCheckedChange={() => onSelectedChange?.(allSelected ? [] : ids)}
                    aria-label="Select all rows"
                  />
                </TableHead>
              ) : null}
              {columns.map((column) => {
                const sorted = sort?.key === column.key ? sort.direction : undefined
                return (
                  <TableHead
                    key={column.key}
                    align={column.align}
                    aria-sort={
                      sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : undefined
                    }
                    className={cn(sorted && "text-foreground")}
                  >
                    {column.sortable && onSortChange ? (
                      <button
                        type="button"
                        onClick={() =>
                          onSortChange({
                            key: column.key,
                            direction: sorted === "asc" ? "desc" : "asc",
                          })
                        }
                        className="inline-flex items-center gap-1 uppercase hover:text-foreground"
                      >
                        {column.header}
                        {sorted === "asc" ? (
                          <ArrowUpIcon aria-hidden="true" className="size-3" />
                        ) : sorted === "desc" ? (
                          <ArrowDownIcon aria-hidden="true" className="size-3" />
                        ) : (
                          <ArrowUpDownIcon aria-hidden="true" className="size-3 opacity-60" />
                        )}
                      </button>
                    ) : (
                      column.header
                    )}
                  </TableHead>
                )
              })}
              {rowActions ? (
                <TableHead className="w-10">
                  <span className="sr-only">Actions</span>
                </TableHead>
              ) : null}
            </tr>
          </TableHeader>
          <TableBody>{body}</TableBody>
        </Table>
      </div>

      {/* Phone: rows as stacked cards. */}
      <div className="sm:hidden">
        {state || rows.length === 0 ? (
          <Table>
            <TableBody>{body}</TableBody>
          </Table>
        ) : (
          <ul aria-label={caption} className="flex flex-col gap-2">
            {rows.map((row) => {
              const id = getRowId(row)
              return (
                <li
                  key={id}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border border-transparent bg-raised p-4 shadow-border",
                    selected.includes(id) && "bg-primary-subtle"
                  )}
                >
                  {selectable ? (
                    <Checkbox
                      checked={selected.includes(id)}
                      onCheckedChange={() => toggle(id)}
                      aria-label={`Select ${String(primary?.cell(row) ?? id)}`}
                      className="mt-0.5"
                    />
                  ) : null}
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="font-medium">{primary?.cell(row)}</div>
                    <dl className="flex flex-wrap gap-x-4 gap-y-1 text-caption text-muted-foreground">
                      {columns
                        .filter((column) => column !== primary && !column.hideOnPhone)
                        .map((column) => (
                          <div key={column.key} className="flex gap-1">
                            <dt>{column.header}:</dt>
                            <dd className="text-foreground tabular">{column.cell(row)}</dd>
                          </div>
                        ))}
                    </dl>
                  </div>
                  {rowActions ? <div className="[&_button]:size-11">{rowActions(row)}</div> : null}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export { DataTable }
