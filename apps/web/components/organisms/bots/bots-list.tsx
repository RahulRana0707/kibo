"use client"

import { useEffect, useState } from "react"
import { ArchiveIcon, MoreHorizontalIcon } from "lucide-react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {
  botListStatuses,
  type BotListItemDto,
  type BotListQuery,
  type BotListStatus,
} from "@kibo/contracts"

import { Button } from "@kibo/ui/components/button"
import { ChipButton } from "@kibo/ui/components/chip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@kibo/ui/components/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@kibo/ui/components/empty"
import { Panel } from "@kibo/ui/components/panel"
import { toast } from "@kibo/ui/components/sonner"

import { IconTile } from "@/components/atoms/icon-tile"
import { SearchField } from "@/components/molecules/search-field"
import { ArchiveBotDialog } from "@/components/organisms/bots/archive-bot-dialog"
import { BotLimitNotice, botsWord } from "@/components/organisms/bots/bot-limit-notice"
import type { BotRowAction } from "@/components/organisms/bots/bot-row-actions"
import { BotsEmpty } from "@/components/organisms/bots/bots-empty"
import { BotsTable } from "@/components/organisms/bots/bots-table"
import { DeleteBotDialog } from "@/components/organisms/bots/delete-bot-dialog"
import { PageHeader } from "@/components/organisms/data/page-header"
import { ApiError } from "@/lib/api/error"
import { botsQueries, useBotAction, useDeleteBot } from "@/lib/query/bots"

const statusLabels: Record<BotListStatus, string> = {
  all: "All",
  active: "Active",
  paused: "Paused",
  draft: "Draft",
  archived: "Archived",
}

const LIMIT_NOTE_ID = "bots-limit-note"

function messageOf(error: unknown) {
  return error instanceof ApiError ? error.message : "Something went wrong. Try again."
}

/** What an empty filter says, and the one way back to bots. */
function emptyCopy(
  status: BotListStatus,
  q: string | undefined
): { title: string; body: string; reset?: "search" | "filter" } {
  if (q) {
    return {
      title: `No bots match “${q}”`,
      body: "Check the spelling, or search by purpose.",
      reset: "search",
    }
  }
  if (status === "all") {
    return {
      title: "No bots in use",
      body: "Restore an archived bot below, or create a new one.",
    }
  }
  if (status === "archived") {
    return {
      title: "No archived bots",
      body: "Bots you archive show here. They don’t count toward your plan.",
      reset: "filter",
    }
  }
  return {
    title: `No ${statusLabels[status].toLowerCase()} bots`,
    body: "Try another filter.",
    reset: "filter",
  }
}

function NoMatches({
  title,
  body,
  reset,
  onReset,
}: ReturnType<typeof emptyCopy> & { onReset: () => void }) {
  return (
    <Empty className="py-10">
      <EmptyHeader>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{body}</EmptyDescription>
      </EmptyHeader>
      {reset ? (
        <EmptyContent>
          <Button variant="secondary" size="sm" onClick={onReset}>
            {reset === "search" ? "Clear search" : "Show all bots"}
          </Button>
        </EmptyContent>
      ) : null}
    </Empty>
  )
}

/** Waits until typing pauses before searching. */
function useDebounced<T>(value: T, delay = 250) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

/**
 * G1: the bots page. Status chips and search live in the URL, so a
 * filtered list can be reloaded or shared; changing them reads from the
 * cache first. Row actions confirm with a toast, and Archive offers Undo.
 */
export function BotsList({ initialQuery }: { initialQuery: BotListQuery }) {
  const [status, setStatus] = useState<BotListStatus>(initialQuery.status)
  const [search, setSearch] = useState(initialQuery.q ?? "")
  const q = useDebounced(search.trim()) || undefined
  const query: BotListQuery = { status, q }

  const { data, isError, refetch } = useQuery({
    ...botsQueries.list(query),
    placeholderData: keepPreviousData,
  })

  // Keep the URL in step without a server round trip.
  useEffect(() => {
    const params = new URLSearchParams()
    if (status !== "all") params.set("status", status)
    if (q) params.set("q", q)
    const next = params.size ? `?${params}` : window.location.pathname
    window.history.replaceState(null, "", next)
  }, [status, q])

  const [archiving, setArchiving] = useState<BotListItemDto | null>(null)
  const [deleting, setDeleting] = useState<BotListItemDto | null>(null)

  const pause = useBotAction("pause")
  const resume = useBotAction("resume")
  const archive = useBotAction("archive")
  const restore = useBotAction("restore")
  const duplicate = useBotAction("duplicate")
  const makeDefault = useBotAction("makeDefault")
  const remove = useDeleteBot()

  const onError = (error: unknown) => toast.error(messageOf(error))

  const archiveNow = (bot: BotListItemDto) =>
    archive.mutate(bot, {
      onSuccess: () =>
        toast.success(`${bot.name} archived`, {
          action: {
            label: "Undo",
            onClick: () =>
              restore.mutate(bot, {
                onSuccess: () => toast.success(`${bot.name} restored`),
                onError,
              }),
          },
        }),
      onError,
    })

  const onAction = (action: BotRowAction, bot: BotListItemDto) => {
    switch (action) {
      case "archive":
        return setArchiving(bot)
      case "delete":
        return setDeleting(bot)
      case "pause":
        return pause.mutate(bot, {
          onSuccess: () =>
            toast.success(`${bot.name} paused`, {
              action: { label: "Undo", onClick: () => resume.mutate(bot, { onError }) },
            }),
          onError,
        })
      case "resume":
        return resume.mutate(bot, {
          onSuccess: () => toast.success(`${bot.name} is back on`),
          onError,
        })
      case "restore":
        return restore.mutate(bot, {
          onSuccess: () => toast.success(`${bot.name} restored`),
          onError,
        })
      case "duplicate":
        return duplicate.mutate(bot, {
          onSuccess: (copy) => toast.success(`${copy.name} created as a draft`),
          onError,
        })
      case "makeDefault":
        return makeDefault.mutate(bot, {
          onSuccess: () => toast.success(`${bot.name} is now your default bot`),
          onError,
        })
    }
  }

  const counts = data?.counts
  const limit = data?.limit
  const atLimit = limit ? limit.used >= limit.max : false
  const neverCreated = counts ? counts.all === 0 && counts.archived === 0 : false
  // On the trial there's one bot to suggest archiving.
  const onlyBot =
    data && limit?.used === 1 && status !== "archived" && !q
      ? data.items.find((bot) => !bot.archivedAt)
      : undefined

  const header = (
    <PageHeader
      title="Bots"
      description={
        <>
          Each bot has its own personality, rules and platforms.
          {limit && !neverCreated
            ? ` ${limit.used} of ${limit.max} ${botsWord(limit.max)} on your trial.`
            : null}
        </>
      }
      actions={
        neverCreated ? null : (
          <>
            <Button variant="secondary" soon aria-describedby="bots-create-soon">
              Browse templates
            </Button>
            <Button
              soon
              aria-describedby={atLimit ? `${LIMIT_NOTE_ID} bots-create-soon` : "bots-create-soon"}
            >
              Create bot
            </Button>
            <span id="bots-create-soon" className="sr-only">
              Coming soon
            </span>
          </>
        )
      }
      overflow={
        neverCreated ? undefined : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon-lg"
                aria-label="Bot actions"
                className="sm:hidden"
              >
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem soon>Create bot</DropdownMenuItem>
              <DropdownMenuItem soon>Browse templates</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    />
  )

  if (neverCreated && !q) {
    return (
      <>
        {header}
        <BotsEmpty />
      </>
    )
  }

  return (
    <>
      {header}

      {atLimit && limit ? (
        <BotLimitNotice
          id={LIMIT_NOTE_ID}
          limit={limit}
          onArchive={onlyBot ? () => setArchiving(onlyBot) : undefined}
        />
      ) : null}

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div
            role="group"
            aria-label="Filter bots"
            className="flex gap-2 overflow-x-auto max-sm:-mx-4 max-sm:px-4"
          >
            {botListStatuses.map((value) => (
              <ChipButton
                key={value}
                selected={status === value}
                onClick={() => setStatus(value)}
                className="shrink-0"
              >
                {statusLabels[value]}
                {counts ? <span className="tabular">{counts[value]}</span> : null}
              </ChipButton>
            ))}
          </div>
          <SearchField
            label="Search bots"
            placeholder="Search bots"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onClear={() => setSearch("")}
            className="w-[280px] max-sm:w-full"
          />
        </div>

        <BotsTable
          bots={data?.items ?? []}
          atLimit={atLimit}
          onAction={onAction}
          state={isError ? "error" : data ? undefined : "loading"}
          onRetry={() => void refetch()}
          empty={
            <NoMatches
              {...emptyCopy(status, q)}
              onReset={() => (q ? setSearch("") : setStatus("all"))}
            />
          }
        />
      </div>

      {counts?.archived && status !== "archived" ? (
        <Panel className="flex-row flex-wrap items-center justify-between gap-3">
          <span className="flex items-center gap-3">
            <IconTile tone="neutral">
              <ArchiveIcon />
            </IconTile>
            <span className="flex flex-col">
              <span className="font-semibold">
                {counts.archived} archived {botsWord(counts.archived)}
              </span>
              <span className="text-caption text-muted-foreground">
                They don’t count toward your plan
              </span>
            </span>
          </span>
          <Button variant="ghost" onClick={() => setStatus("archived")}>
            Show archived
          </Button>
        </Panel>
      ) : null}

      <ArchiveBotDialog
        bot={archiving}
        onOpenChange={(open) => !open && setArchiving(null)}
        onConfirm={archiveNow}
      />
      <DeleteBotDialog
        bot={deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        onArchiveInstead={(bot) => {
          setDeleting(null)
          setArchiving(bot)
        }}
        onConfirm={async (bot) => {
          try {
            await remove.mutateAsync({ bot, confirmName: bot.name })
            toast.success(`${bot.name} deleted`)
          } catch (error) {
            onError(error)
          }
        }}
      />
    </>
  )
}
