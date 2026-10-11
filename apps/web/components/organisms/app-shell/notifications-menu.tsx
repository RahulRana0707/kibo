"use client"

import Link from "next/link"
import { BellIcon } from "lucide-react"

import { Badge } from "@kibo/ui/components/badge"
import { Button } from "@kibo/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@kibo/ui/components/popover"
import { SoonLabel } from "@kibo/ui/components/soon-label"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@kibo/ui/components/tooltip"
import { cn } from "@kibo/ui/lib/utils"

import {
  NotificationItem,
  type NotificationType,
} from "@/components/molecules/notification-item"

export type AppNotification = {
  id: string
  type: NotificationType
  title: string
  body?: string
  time: string
  href: string
  unread?: boolean
  action?: React.ReactNode
}

/**
 * The bell and its panel. Without `notifications` it is the Not available
 * yet state: the tooltip says Soon and the panel explains what's coming.
 * With them it shows the latest five, unread first tinted.
 */
export function NotificationsMenu({
  notifications,
  compact = false,
}: {
  notifications?: AppNotification[]
  compact?: boolean
}) {
  const soon = notifications === undefined
  const unread = notifications?.filter((item) => item.unread).length ?? 0
  const label = soon
    ? "Notifications, coming soon"
    : unread
      ? `Notifications, ${unread} unread`
      : "Notifications"

  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={label}
              className={cn("relative", compact && "size-11")}
            >
              <BellIcon />
              {unread ? (
                <Badge
                  variant="accent"
                  count={unread}
                  max={9}
                  aria-hidden="true"
                  className="absolute -inset-e-0.5 top-0.5 h-[18px] min-w-[18px] bg-primary px-1 text-[11px] text-on-accent ring-2 ring-page"
                />
              ) : null}
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>{soon ? "Notifications · Soon" : "Notifications"}</TooltipContent>
      </Tooltip>
      <PopoverContent
        align="end"
        className="flex w-[min(380px,calc(100vw-32px))] flex-col gap-0 overflow-hidden p-0"
      >
        <div className="flex items-center justify-between gap-3 border-b border-separator px-4 py-3">
          <h2 className="text-heading">Notifications</h2>
          {soon ? <SoonLabel /> : null}
        </div>
        {soon ? (
          <div className="flex flex-col items-center gap-2 px-6 py-8 text-center">
            <span className="inline-grid size-12 place-items-center rounded-lg bg-sunken text-muted-foreground [&_svg]:size-6 [&_svg]:stroke-[1.5]">
              <BellIcon aria-hidden="true" />
            </span>
            <p className="text-heading">Notifications are coming soon</p>
            <p className="max-w-[32ch] text-body-sm text-muted-foreground">
              Alerts when your bot pauses, an integration disconnects or a
              summary is ready will show up here.
            </p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 py-8 text-center">
            <p className="text-heading">You’re all caught up</p>
            <p className="text-body-sm text-muted-foreground">
              Nothing needs your attention.
            </p>
          </div>
        ) : (
          <>
            <ul className="flex flex-col gap-0.5 p-1.5">
              {notifications.slice(0, 5).map((item) => (
                <NotificationItem key={item.id} {...item} />
              ))}
            </ul>
            <Link
              href="/notifications"
              className="border-t border-separator px-4 py-3 text-center text-body-sm font-medium text-link"
            >
              See all notifications
            </Link>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}
