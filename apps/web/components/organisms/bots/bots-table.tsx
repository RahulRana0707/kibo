"use client"

import {
  botStatusDisplay,
  personalities,
  replyModes,
  type BotListItemDto,
} from "@kibo/contracts"

import { Avatar } from "@kibo/ui/components/avatar"
import { Badge } from "@kibo/ui/components/badge"
import { DataTable, type Column } from "@kibo/ui/components/data-table"

import { StatusPill } from "@/components/atoms/status-pill"
import {
  BotRowActions,
  type BotRowAction,
} from "@/components/organisms/bots/bot-row-actions"

const shortDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
})

/** “Oct 8”. The server and browser may differ by a day near midnight. */
function DateText({ prefix, iso }: { prefix: string; iso: string }) {
  return (
    <time dateTime={iso} suppressHydrationWarning>
      {prefix} {shortDate.format(new Date(iso))}
    </time>
  )
}

function Muted({ children }: { children: React.ReactNode }) {
  return <span className="text-muted-foreground">{children}</span>
}

function replyModeText(bot: BotListItemDto) {
  const label = replyModes.find((mode) => mode.value === bot.replyMode)?.label
  return bot.replyMode === "auto" ? `${label} · ${bot.confidenceThreshold}%` : label
}

const columns: Column<BotListItemDto>[] = [
  {
    key: "bot",
    header: "Bot",
    primary: true,
    cell: (bot) => (
      <span className="flex min-w-0 items-center gap-3">
        <Avatar name={bot.name} variant="bot" />
        <span className="flex min-w-0 flex-col">
          <span className="flex items-center gap-2">
            <span className="truncate font-semibold">{bot.name}</span>
            {bot.isDefault ? <Badge variant="accent">Default</Badge> : null}
          </span>
          <span className="truncate text-caption font-normal text-muted-foreground">
            {[
              personalities.find((item) => item.value === bot.personality)?.label,
              bot.purpose,
            ]
              .filter(Boolean)
              .join(" · ")}
          </span>
        </span>
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    cell: (bot) =>
      bot.archivedAt ? (
        <StatusPill tone="offline">Archived</StatusPill>
      ) : (
        <StatusPill tone={botStatusDisplay[bot.status].tone}>
          {botStatusDisplay[bot.status].label}
        </StatusPill>
      ),
  },
  {
    key: "platforms",
    header: "Platforms",
    cell: () => <Muted>None yet</Muted>,
  },
  { key: "replyMode", header: "Reply mode", cell: replyModeText },
  {
    key: "replies",
    header: "Replies · 7 days",
    align: "end",
    hideOnPhone: true,
    cell: () => <Muted>—</Muted>,
  },
  {
    key: "answerRate",
    header: "Answer rate",
    align: "end",
    hideOnPhone: true,
    cell: () => <Muted>—</Muted>,
  },
  {
    key: "lastActive",
    header: "Last active",
    hideOnPhone: true,
    cell: (bot) => (
      <span className="text-caption text-muted-foreground">
        {bot.archivedAt ? (
          <DateText prefix="Archived" iso={bot.archivedAt} />
        ) : bot.status === "draft" ? (
          <DateText prefix="Created" iso={bot.createdAt} />
        ) : (
          "—"
        )}
      </span>
    ),
  },
]

/** G1: every bot with its state and settings; stacked cards on phones. */
export function BotsTable({
  bots,
  atLimit,
  onAction,
  empty,
  state,
  onRetry,
}: {
  bots: BotListItemDto[]
  atLimit: boolean
  onAction: (action: BotRowAction, bot: BotListItemDto) => void
  /** Shown when a filter or search matches nothing. */
  empty: React.ReactNode
  state?: "loading" | "error"
  onRetry?: () => void
}) {
  return (
    <DataTable
      caption="Bots"
      columns={columns}
      rows={bots}
      getRowId={(bot) => bot.id}
      rowActions={(bot) => (
        <BotRowActions bot={bot} atLimit={atLimit} onAction={onAction} />
      )}
      empty={empty}
      state={state}
      onRetry={onRetry}
    />
  )
}
