import type { Metadata } from "next"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { botListQuerySchema, type BotListQuery } from "@kibo/contracts"

import { BotsList } from "@/components/organisms/bots/bots-list"
import { apiServerFetch } from "@/lib/api/server"
import { botsQueries } from "@/lib/query/bots"
import { getQueryClient } from "@/lib/query/get-query-client"

export const metadata: Metadata = { title: "Bots" }

export default async function BotsPage({ searchParams }: PageProps<"/bots">) {
  const { status, q } = await searchParams
  // A hand-edited URL falls back to every bot rather than an error.
  const parsed = botListQuerySchema.safeParse({ status, q })
  const query: BotListQuery = parsed.success
    ? parsed.data
    : { status: "all", q: undefined }

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(botsQueries.list(query, apiServerFetch))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BotsList initialQuery={query} />
    </HydrationBoundary>
  )
}
