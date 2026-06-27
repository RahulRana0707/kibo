"use client"

import Link from "next/link"

import { deleteBotAction } from "@/actions/bots/delete-bot"
import { Button } from "@kibo/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@kibo/ui/components/dropdown-menu"
import { cn } from "@kibo/ui/lib/utils"
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react"

export function BotActionsMenu({
  botId,
  triggerClassName,
}: {
  botId: string
  triggerClassName?: string
}) {
  const formId = `delete-bot-${botId}`

  return (
    <>
      <form id={formId} action={deleteBotAction} className="hidden">
        <input type="hidden" name="botId" value={botId} />
      </form>
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
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild variant="destructive">
            <button
              type="submit"
              form={formId}
              className="flex w-full items-center gap-2 text-left outline-none"
              onClick={(event) => {
                if (!window.confirm("Delete this bot?")) {
                  event.preventDefault()
                }
              }}
            >
              <Trash2Icon />
              <span>Delete</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
