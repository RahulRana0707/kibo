"use client"

import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from "lucide-react"

import { Avatar } from "@kibo/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@kibo/ui/components/dropdown-menu"
import { cn } from "@kibo/ui/lib/utils"

import { StatusPill } from "@/components/atoms/status-pill"

export type Workspace = { id: string; name: string; role: string; live?: boolean }

/**
 * The current workspace and the menu to switch. Each row shows whether a
 * bot is live there. Creating a workspace is Soon.
 */
export function WorkspaceSwitcher({
  current,
  workspaces,
  large = false,
  onSwitch,
}: {
  current: Workspace
  workspaces?: Workspace[]
  large?: boolean
  onSwitch?: (workspace: Workspace) => void
}) {
  const all = workspaces ?? [current]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex w-full items-center gap-2.5 rounded-lg border border-transparent bg-raised text-start shadow-border hover:shadow-border-hover aria-expanded:shadow-border-hover",
          large ? "min-h-14 px-3 py-2.5" : "px-2.5 py-2"
        )}
      >
        <Avatar name={current.name} size="sm" shape="square" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-caption text-muted-foreground">Workspace</span>
          <span className="truncate text-body-sm font-medium">{current.name}</span>
        </span>
        <ChevronsUpDownIcon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-75">
        <DropdownMenuLabel>Your workspaces</DropdownMenuLabel>
        {all.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onSelect={() => onSwitch?.(workspace)}
            className="min-h-11"
          >
            <Avatar name={workspace.name} size="sm" shape="square" />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-medium text-foreground">{workspace.name}</span>
              <span className="text-caption text-muted-foreground">{workspace.role}</span>
            </span>
            {workspace.live ? <StatusPill tone="live" size="sm" /> : null}
            {workspace.id === current.id ? (
              <CheckIcon aria-label="Current workspace" className="size-4 text-link!" />
            ) : null}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem soon>
          <PlusIcon aria-hidden="true" />
          Create workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
