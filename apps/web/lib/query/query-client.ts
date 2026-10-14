import { QueryClient } from "@tanstack/react-query"

import { ApiError } from "@/lib/api/error"

/**
 * One set of defaults for the browser cache and each server request:
 * data counts as fresh for 30 seconds, and a failed read retries once
 * unless the API said no (a 4xx won't change on a second try).
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
        retry: (failureCount, error) =>
          !(error instanceof ApiError && error.status < 500) &&
          failureCount < 1,
      },
    },
  })
}
