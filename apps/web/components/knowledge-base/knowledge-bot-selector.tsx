"use client"

import Link from "next/link"
import { CheckCircle2Icon, ChevronDownIcon } from "lucide-react"

import type { KnowledgeBaseBotOption } from "@/components/knowledge-base/types"
import { Button } from "@kibo/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@kibo/ui/components/dropdown-menu"

export function KnowledgeBotSelector({
  bots,
  selectedBotId,
}: {
  bots: KnowledgeBaseBotOption[]
  selectedBotId: string
}) {
  const selectedBot = bots.find((bot) => bot.id === selectedBotId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" className="justify-between">
          <span className="truncate">
            {selectedBot?.name ?? "Choose bot"}
          </span>
          <ChevronDownIcon data-icon="inline-end" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Upload knowledge to</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {bots.map((bot) => (
            <DropdownMenuItem key={bot.id} asChild>
              <Link
                href={`/knowledge-base?botId=${bot.id}`}
                className="flex items-center justify-between gap-3"
              >
                <span className="min-w-0">
                  <span className="block truncate">{bot.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {bot.knowledgeCount} knowledge item
                    {bot.knowledgeCount === 1 ? "" : "s"}
                    {bot.isActive ? " · Active bot" : ""}
                  </span>
                </span>
                {bot.id === selectedBotId ? (
                  <CheckCircle2Icon className="shrink-0" />
                ) : null}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
