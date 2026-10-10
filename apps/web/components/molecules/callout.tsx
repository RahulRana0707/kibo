import { CircleAlertIcon, InfoIcon, LockIcon } from "lucide-react"

import { cn } from "@kibo/ui/lib/utils"

const tones = {
  info: "bg-primary-subtle text-link shadow-[inset_0_0_0_1px_var(--vi-accent-border)]",
  danger:
    "bg-destructive-subtle text-destructive-text shadow-[inset_0_0_0_1px_var(--vi-danger-border)]",
  warning:
    "bg-warning-subtle text-warning-text shadow-[inset_0_0_0_1px_var(--vi-warning-border)]",
}

const icons = {
  info: InfoIcon,
  danger: CircleAlertIcon,
  warning: LockIcon,
}

/** A tinted note: information, an error, or something that needs attention. */
export function Callout({
  tone = "info",
  role,
  className,
  children,
}: {
  tone?: keyof typeof tones
  role?: "alert" | "status"
  className?: string
  children: React.ReactNode
}) {
  const Icon = icons[tone]

  return (
    <div
      role={role}
      className={cn(
        "flex items-start gap-3 rounded-lg p-4 text-body-sm [&_a]:font-medium [&_a]:text-current [&_a]:underline [&_a]:underline-offset-4",
        tones[tone],
        className
      )}
    >
      <Icon aria-hidden="true" className="mt-[3px] size-4 shrink-0" />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}
