"use client"

import { useMemo, useState } from "react"

import { VIEW_MODE_STORAGE_KEY } from "@/lib/storage-keys"
import { useLocalStorageState } from "@/hooks/use-local-storage-state"

export type CollectionViewMode = "grid" | "table"

export function useCollectionControls<T>(
  items: T[],
  matches: (item: T, query: string) => boolean,
  defaultViewMode: CollectionViewMode = "grid"
) {
  const [viewMode, setViewMode] = useLocalStorageState<CollectionViewMode>(
    VIEW_MODE_STORAGE_KEY,
    defaultViewMode
  )
  const [query, setQuery] = useState("")

  const filteredItems = useMemo(() => {
    const value = query.trim().toLowerCase()

    if (!value) {
      return items
    }

    return items.filter((item) => matches(item, value))
  }, [items, matches, query])

  return {
    viewMode,
    setViewMode,
    query,
    setQuery,
    clearQuery: () => setQuery(""),
    hasFilter: query.trim().length > 0,
    filteredItems,
  } as const
}
