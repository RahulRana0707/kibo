import { queryOptions } from "@tanstack/react-query"
import type { WorkspaceDto } from "@kibo/contracts"

import { apiClientFetch } from "@/lib/api/client"
import type { ApiFetcher } from "@/lib/query/fetcher"
import { queryKeys } from "@/lib/query/keys"

/** The signed-in creator's workspace: name, default bot and bot limit. */
export const workspaceQuery = (fetcher: ApiFetcher = apiClientFetch) =>
  queryOptions({
    queryKey: queryKeys.workspace,
    queryFn: () => fetcher<WorkspaceDto>("/workspaces/current"),
  })
