import "server-only"

import { cache } from "react"

import { makeQueryClient } from "@/lib/query/query-client"

/**
 * The server's cache for one request: pages prefetch into it and hand
 * the result to the browser with `HydrationBoundary`, so the first paint
 * has data. Never shared between visitors.
 */
export const getQueryClient = cache(makeQueryClient)
