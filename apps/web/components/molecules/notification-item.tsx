import Link from "next/link"
import {
  ChartColumnIcon,
  CreditCardIcon,
  PauseIcon,
  PlugIcon,
  ShieldCheckIcon,
  UserPlusIcon,
} from "lucide-react"

import { cn } from "@kibo/ui/lib/utils"

import { IconTile } from "@/components/atoms/icon-tile"

/** The tile tone says how urgent a notification is. */
const types = {
  "bot-paused": { icon: PauseIcon, tone: "warning" },
  "integration-disconnected": { icon: PlugIcon, tone: "warning" },
  "payment-failed": { icon: CreditCardIcon, tone: "danger" },
  "summary-ready": { icon: ChartColumnIcon, tone: "neutral" },
  "team-invite": { icon: UserPlusIcon, tone: "accent" },
  "approval-waiting": { icon: ShieldCheckIcon, tone: "accent" },
} as const

export type NotificationType = keyof typeof types

/**
 * One event in the notifications menu: what happened, links to it, and at
 * most one action that fixes it (a separate button, never nested in the
 * link).
 */
export function NotificationItem({
  type,
  title,
  body,
  time,
  href,
  unread = false,
  action,
}: {
  type: NotificationType
  title: string
  body?: string
  /** Short relative time, such as “2m”. */
  time: string
  href: string
  unread?: boolean
  action?: React.ReactNode
}) {
  const { icon: Icon, tone } = types[type]

  return (
    <li
      className={cn(
        "relative flex items-start gap-3 rounded-md p-3 transition-colors duration-instant max-sm:p-4",
        unread ? "bg-primary-subtle" : "hover:bg-hovered"
      )}
    >
      <IconTile tone={tone} size="sm">
        <Icon />
      </IconTile>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Link
          href={href}
          className={cn(
            "text-body-sm text-foreground no-underline after:absolute after:inset-0 hover:underline",
            unread ? "font-semibold" : "font-medium"
          )}
        >
          {unread ? <span className="sr-only">Unread. </span> : null}
          {title}
        </Link>
        {body ? (
          <p className="text-caption text-muted-foreground">{body}</p>
        ) : null}
        {action ? <div className="relative z-10 mt-1">{action}</div> : null}
      </div>
      <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground tabular">
        {time}
        {unread ? (
          <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
        ) : null}
      </span>
    </li>
  )
}
