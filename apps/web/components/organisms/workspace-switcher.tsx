"use client"

import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@kibo/ui/components/dropdown-menu"
import { cn } from "@kibo/ui/lib/utils"

import { Avatar } from "@kibo/ui/components/avatar"
import { SoonLabel } from "@kibo/ui/components/soon-label"

/** The current workspace, with the menu to switch or create one. */
export function WorkspaceSwitcher({
  workspace,
  large = false,
}: {
  workspace: string
  large?: boolean
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex w-full items-center gap-2.5 rounded-lg border border-transparent bg-raised text-start shadow-border hover:shadow-border-hover aria-expanded:shadow-border-hover",
          large ? "min-h-14 px-3 py-2.5" : "px-2.5 py-2"
        )}
      >
        <Avatar name={workspace} size="sm" shape="square" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-caption text-muted-foreground">Workspace</span>
          <span className="truncate text-body-sm font-medium">{workspace}</span>
        </span>
        <ChevronsUpDownIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-75 p-1.5">
        <DropdownMenuLabel className="text-overline uppercase">
          Your workspaces
        </DropdownMenuLabel>
        <DropdownMenuItem className="min-h-11 bg-hovered">
          <Avatar name={workspace} size="sm" shape="square" />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate font-medium text-foreground">
              {workspace}
            </span>
            <span className="text-caption">Personal</span>
          </span>
          <CheckIcon
            aria-label="Current workspace"
            className="size-4! text-link"
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <PlusIcon aria-hidden="true" />
          Create workspace
          <SoonLabel />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
