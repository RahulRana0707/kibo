"use client"

import { Badge } from "@kibo/ui/components/badge"
import type { ColumnDef } from "@tanstack/react-table"

import { BotActionsMenu } from "@/components/bots/bot-actions-menu"
import { BotAvatar } from "@/components/bots/bot-avatar"
import type { BotListItem } from "@/components/bots/types"

function formatStatus(status: string) {
  return status.replaceAll("_", " ").toLowerCase()
}

export function createBotColumns(): ColumnDef<BotListItem>[] {
  return [
    {
      accessorKey: "name",
      header: "Bot",
      cell: ({ row }) => {
        const bot = row.original
        return (
          <div className="flex items-center gap-3">
            <BotAvatar
              name={bot.name}
              avatarUrl={bot.avatarUrl}
              className="size-8 rounded-md"
            />
            <div className="grid gap-0.5">
              <span className="leading-none font-medium">{bot.name}</span>
              <span className="text-xs text-muted-foreground">
                {bot.isActive ? "Active bot" : "Draft bot"}
              </span>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? "default" : "secondary"}>
          {row.original.isActive ? "Active" : formatStatus(row.original.status)}
        </Badge>
      ),
    },
    { accessorKey: "knowledgeCount", header: "Knowledge" },
    { accessorKey: "integrationCount", header: "Integrations" },
    { accessorKey: "createdAtLabel", header: "Created" },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <BotActionsMenu botId={row.original.id} />
        </div>
      ),
    },
  ]
}
