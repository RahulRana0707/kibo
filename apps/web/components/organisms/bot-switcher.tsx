"use client"

import { ChevronDownIcon, PlusIcon, SlidersHorizontalIcon } from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@kibo/ui/components/dropdown-menu"

import { SoonLabel } from "@kibo/ui/components/soon-label"

/** Switches the active bot. Shows "No bot yet" until bots exist. */
export function BotSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-label="Switch bot, no bot yet"
          className="ps-2 pe-2.5"
        >
          <span
            aria-hidden="true"
            className="size-6 shrink-0 rounded-full border border-dashed border-border-strong"
          />
          <span className="text-muted-foreground">No bot yet</span>
          <ChevronDownIcon
            aria-hidden="true"
            className="text-muted-foreground"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-75 p-1.5">
        <DropdownMenuLabel className="text-overline uppercase">
          Bots in this workspace
        </DropdownMenuLabel>
        <p className="px-2.5 py-2 text-body-sm text-muted-foreground">
          You haven’t created a bot yet.
        </p>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <PlusIcon aria-hidden="true" />
          Create bot
          <SoonLabel />
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <SlidersHorizontalIcon aria-hidden="true" />
          Manage bots
          <SoonLabel />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
