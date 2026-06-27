"use client"

import Link from "next/link"

import { deleteBotAction } from "@/actions/bots/delete-bot"
import { setActiveBotAction } from "@/actions/bots/set-active-bot"
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
  const deleteFormId = `delete-bot-${botId}`
  const activeFormId = `set-active-bot-${botId}`

  return (
    <>
      <form id={deleteFormId} action={deleteBotAction} className="hidden">
        <input type="hidden" name="botId" value={botId} />
      </form>
      <form id={activeFormId} action={setActiveBotAction} className="hidden">
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
          {isActive ? (
            <DropdownMenuItem disabled>
              <CheckCircle2Icon />
              <span>Active bot</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem asChild>
              <button
                type="submit"
                form={activeFormId}
                className="flex w-full items-center gap-2 text-left outline-none"
              >
                <RadioIcon />
                <span>Make active</span>
              </button>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild variant="destructive">
            <button
              type="submit"
              form={deleteFormId}
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
