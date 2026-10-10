"use client"

import { BellIcon } from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@kibo/ui/components/dropdown-menu"
import { cn } from "@kibo/ui/lib/utils"

/** The bell and its panel. Empty until alerts exist. */
export function NotificationsMenu({ compact = false }: { compact?: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className={cn(compact && "size-11")}
        >
          <BellIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[min(420px,calc(100vw-32px))] overflow-hidden rounded-xl p-0"
      >
        <div className="border-b border-separator px-4 py-3.5">
          <h2 className="text-heading">Notifications</h2>
        </div>
        <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
          <span className="inline-grid size-12 place-items-center rounded-lg bg-primary-subtle text-link [&_svg]:size-6 [&_svg]:stroke-[1.5]">
            <BellIcon aria-hidden="true" />
          </span>
          <p className="text-heading">You’re all caught up</p>
          <p className="max-w-[32ch] text-body-sm text-muted-foreground">
            Alerts about your bots, streams and integrations will show up here.
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
