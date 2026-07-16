"use client"

import Link from "next/link"

import { useBotActions } from "@/components/bots/use-bot-actions"
import { Button } from "@kibo/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@kibo/ui/components/dropdown-menu"
import { cn } from "@kibo/ui/lib/utils"
import {
  CheckCircle2Icon,
  MoreHorizontalIcon,
  PencilIcon,
  RadioIcon,
  Trash2Icon,
} from "lucide-react"

export function BotActionsMenu({
  botId,
  isActive,
  triggerClassName,
}: {
  botId: string
  isActive?: boolean
  triggerClassName?: string
}) {
  const {
    deleteBot,
    isDeletingBot,
    setActiveBot,
    isSettingActiveBot,
  } = useBotActions()
  const isPending = isDeletingBot || isSettingActiveBot

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("size-7", triggerClassName)}
          >
            <MoreHorizontalIcon />
            <span className="sr-only">Open actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem asChild>
            <Link href={`/bots/${botId}/edit`}>
              <PencilIcon />
              <span>Edit</span>
            </Link>
          </DropdownMenuItem>
          {isActive ? (
            <DropdownMenuItem disabled>
              <CheckCircle2Icon />
              <span>Active bot</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              disabled={isPending}
              onClick={() => {
                void setActiveBot(botId)
              }}
            >
              <RadioIcon />
              <span>Make active</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={isPending}
            variant="destructive"
            onClick={() => {
              if (window.confirm("Delete this bot?")) {
                void deleteBot(botId)
              }
            }}
          >
            <Trash2Icon />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
