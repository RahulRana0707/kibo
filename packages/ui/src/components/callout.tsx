"use client"

import * as React from "react"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@kibo/ui/lib/utils"
import { Button } from "@kibo/ui/components/button"

const tones = {
  info: "bg-primary-subtle text-link shadow-[inset_0_0_0_1px_var(--vi-accent-border)]",
  success:
    "bg-success-subtle text-success-text shadow-[inset_0_0_0_1px_var(--vi-success-border)]",
  warning:
    "bg-warning-subtle text-warning-text shadow-[inset_0_0_0_1px_var(--vi-warning-border)]",
  danger:
    "bg-destructive-subtle text-destructive-text shadow-[inset_0_0_0_1px_var(--vi-danger-border)]",
}

const icons = {
  info: InfoIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon,
  danger: CircleAlertIcon,
}

/**
 * An inline message tied to the content around it: a form error, a
 * warning about a setting, a tip. Danger is an alert, other tones a
 * status. Errors are never dismissible; they leave when fixed.
 */
function Callout({
  tone = "info",
  role,
  title,
  action,
  onDismiss,
  dismissLabel = "Dismiss",
  icon,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  tone?: keyof typeof tones
  role?: "alert" | "status"
  title?: React.ReactNode
  /** One secondary small button, block on phone. */
  action?: React.ReactNode
  onDismiss?: () => void
  dismissLabel?: string
  /** Replaces the tone's icon. */
  icon?: React.ReactNode
}) {
  const Icon = icons[tone]

  return (
    <div
      data-slot="callout"
      role={role ?? (tone === "danger" ? "alert" : "status")}
      className={cn(
        "flex items-start gap-3 rounded-lg p-4 text-body-sm/normal [&_a]:font-medium [&_a]:text-current [&_a]:underline [&_a]:underline-offset-4",
        tones[tone],
        className
      )}
      {...props}
    >
      <span aria-hidden="true" className="mt-0.5 shrink-0 [&_svg]:size-5 [&_svg]:stroke-[1.5]">
        {icon ?? <Icon />}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {title ? <p className="font-semibold">{title}</p> : null}
        {children ? <div className="min-w-0">{children}</div> : null}
        {action ? (
          <div className="mt-2 flex flex-wrap gap-2 max-sm:*:h-11 max-sm:*:w-full">
            {action}
          </div>
        ) : null}
      </div>
      {onDismiss && tone !== "danger" ? (
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label={dismissLabel}
          onClick={onDismiss}
          className="-me-1 -mt-1 text-current hover:bg-transparent hover:text-current max-sm:size-11"
        >
          <XIcon />
        </Button>
      ) : null}
    </div>
  )
}

export { Callout }
