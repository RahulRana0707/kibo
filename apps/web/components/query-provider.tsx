"use client"

import { useState } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { makeQueryClient } from "@/lib/query/query-client"

/**
 * The browser's one data cache, shared by every screen in a session so a
 * bot loads once and changes show everywhere. Devtools are left out of
 * production builds.
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(makeQueryClient)

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </QueryClientProvider>
  )
}
