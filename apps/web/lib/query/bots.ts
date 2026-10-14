import {
  queryOptions,
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query"
import type {
  BotDto,
  BotListItemDto,
  BotListQuery,
  BotListResult,
  BotStatus,
  WorkspaceDto,
} from "@kibo/contracts"

import { apiClientFetch } from "@/lib/api/client"
import type { ApiFetcher } from "@/lib/query/fetcher"
import { queryKeys } from "@/lib/query/keys"

function listPath({ status, q }: BotListQuery) {
  const params = new URLSearchParams({ status })
  if (q) params.set("q", q)
  return `/bots?${params}`
}

/**
 * Query options shared by server prefetch and the browser: pass
 * `apiServerFetch` on the server so the visitor's cookie goes along.
 */
export const botsQueries = {
  list: (query: BotListQuery, fetcher: ApiFetcher = apiClientFetch) =>
    queryOptions({
      queryKey: queryKeys.bots.list(query),
      queryFn: () => fetcher<BotListResult>(listPath(query)),
    }),
  detail: (botId: string, fetcher: ApiFetcher = apiClientFetch) =>
    queryOptions({
      queryKey: queryKeys.bot(botId),
      queryFn: () => fetcher<BotDto>(`/bots/${botId}`),
    }),
}

type ListSnapshot = [readonly unknown[], BotListResult | undefined][]

/** Applies a change to every cached bots list, and returns the old ones. */
async function patchLists(
  client: QueryClient,
  patch: (list: BotListResult, query: BotListQuery) => BotListResult
): Promise<ListSnapshot> {
  await client.cancelQueries({ queryKey: queryKeys.bots.all })
  const snapshot = client.getQueriesData<BotListResult>({
    queryKey: queryKeys.bots.all,
  })
  for (const [key, list] of snapshot) {
    if (list) {
      client.setQueryData(key, patch(list, key[1] as BotListQuery))
    }
  }
  return snapshot
}

function setStatus(status: BotStatus) {
  return (list: BotListResult, bot: BotListItemDto): BotListResult => ({
    ...list,
    items: list.items.map((item) =>
      item.id === bot.id ? { ...item, status } : item
    ),
    counts: {
      ...list.counts,
      [bot.status]: list.counts[bot.status] - 1,
      [status]: list.counts[status] + 1,
    },
  })
}

function setDefault(list: BotListResult, bot: BotListItemDto): BotListResult {
  return {
    ...list,
    items: list.items.map((item) => ({ ...item, isDefault: item.id === bot.id })),
  }
}

function archive(
  list: BotListResult,
  bot: BotListItemDto,
  query: BotListQuery
): BotListResult {
  return {
    ...list,
    items:
      query.status === "archived"
        ? list.items
        : list.items.filter((item) => item.id !== bot.id),
    counts: {
      ...list.counts,
      all: list.counts.all - 1,
      [bot.status]: list.counts[bot.status] - 1,
      archived: list.counts.archived + 1,
    },
    limit: { ...list.limit, used: list.limit.used - 1 },
  }
}

const actions = {
  pause: { path: "pause", optimistic: setStatus("paused") },
  resume: { path: "resume", optimistic: setStatus("active") },
  archive: { path: "archive", optimistic: archive },
  makeDefault: { path: "make-default", optimistic: setDefault },
  // These can be refused (the bot limit), so the list waits for the API.
  restore: { path: "restore", optimistic: undefined },
  duplicate: { path: "duplicate", optimistic: undefined },
} satisfies Record<
  string,
  {
    path: string
    optimistic:
      | ((list: BotListResult, bot: BotListItemDto, query: BotListQuery) => BotListResult)
      | undefined
  }
>

type BotAction = keyof typeof actions
type ActionResult<A extends BotAction> = A extends "makeDefault"
  ? WorkspaceDto
  : BotDto

/** Refreshes everything a bot change can touch: lists, the bot, the workspace. */
function invalidateBot(client: QueryClient, botId: string) {
  return Promise.all([
    client.invalidateQueries({ queryKey: queryKeys.bots.all }),
    client.invalidateQueries({ queryKey: queryKeys.bot(botId) }),
    client.invalidateQueries({ queryKey: queryKeys.workspace }),
  ])
}

/**
 * One bot action from the list or the bot page. Pause, resume, archive
 * and set-as-default show at once and roll back if the API refuses.
 */
export function useBotAction<A extends BotAction>(action: A) {
  const client = useQueryClient()
  const { path, optimistic } = actions[action]

  return useMutation({
    mutationFn: (bot: BotListItemDto) =>
      apiClientFetch<ActionResult<A>>(`/bots/${bot.id}/${path}`, {
        method: "POST",
      }),
    onMutate: async (bot) =>
      optimistic
        ? {
            snapshot: await patchLists(client, (list, query) =>
              optimistic(list, bot, query)
            ),
          }
        : undefined,
    onError: (_error, _bot, context) => {
      for (const [key, list] of context?.snapshot ?? []) {
        client.setQueryData(key, list)
      }
    },
    onSettled: (_data, _error, bot) => invalidateBot(client, bot.id),
  })
}

/** Deletes a bot for good; the API checks the typed name too. */
export function useDeleteBot() {
  const client = useQueryClient()

  return useMutation({
    mutationFn: ({ bot, confirmName }: { bot: BotListItemDto; confirmName: string }) =>
      apiClientFetch<null>(`/bots/${bot.id}`, {
        method: "DELETE",
        body: JSON.stringify({ confirmName }),
      }),
    onSuccess: (_data, { bot }) => {
      client.removeQueries({ queryKey: queryKeys.bot(bot.id) })
    },
    onSettled: (_data, _error, { bot }) => invalidateBot(client, bot.id),
  })
}
