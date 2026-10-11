import { CheckIcon, LockIcon } from "lucide-react"

import { Badge } from "@kibo/ui/components/badge"
import { SoonLabel } from "@kibo/ui/components/soon-label"
import { Spinner } from "@kibo/ui/components/spinner"
import { cn } from "@kibo/ui/lib/utils"

/** A titled card of settings rows; text groups bring their own Save. */
export function SettingsGroup({
  title,
  description,
  footer,
  children,
  className,
}: {
  title: string
  description?: string
  /** A Save button for groups with text fields. */
  footer?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  const id = `settings-${title.toLowerCase().replace(/\W+/g, "-")}`
  return (
    <section
      aria-labelledby={id}
      className={cn(
        "flex max-w-[760px] flex-col overflow-hidden rounded-xl border border-transparent bg-raised shadow-border",
        className
      )}
    >
      <div className="flex flex-col gap-1 border-b border-separator px-5 py-4">
        <h2 id={id} className="text-heading">
          {title}
        </h2>
        {description ? (
          <p className="text-caption text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="flex flex-col">{children}</div>
      {footer ? (
        <div className="flex justify-end gap-3 border-t border-separator px-5 py-3">{footer}</div>
      ) : null}
    </section>
  )
}

/**
 * Label and description on the left, one control on the right. Rows that
 * save on change show Saving… then Saved. On phones selects and inputs
 * stack under the label; switches stay inline.
 */
export function SettingsRow({
  label,
  description,
  htmlFor,
  control,
  saveState,
  soonReason,
  lockedPlan,
  stack = false,
}: {
  label: string
  description?: string
  /** The control's id, so the label names it. */
  htmlFor?: string
  control?: React.ReactNode
  saveState?: "saving" | "saved"
  soonReason?: string
  lockedPlan?: string
  /** Stack the control under the label on phones (selects, inputs). */
  stack?: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-6 border-b border-separator px-5 py-4 last:border-b-0 max-sm:min-h-11",
        stack && "max-sm:flex-col max-sm:items-stretch max-sm:gap-3"
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <label
          htmlFor={htmlFor}
          className={cn("text-body-sm font-medium", (soonReason || lockedPlan) && "text-disabled")}
        >
          {label}
        </label>
        {description ? (
          <p className="max-w-[420px] text-caption text-muted-foreground">{description}</p>
        ) : null}
        {soonReason ? (
          <p className="text-caption text-muted-foreground">{soonReason}</p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {saveState === "saving" ? (
          <span role="status" className="flex items-center gap-1.5 text-caption text-muted-foreground">
            <Spinner className="size-3" />
            Saving…
          </span>
        ) : saveState === "saved" ? (
          <span role="status" className="flex items-center gap-1 text-caption text-success-text">
            <CheckIcon aria-hidden="true" className="size-3.5" />
            Saved
          </span>
        ) : null}
        {soonReason ? (
          <SoonLabel />
        ) : lockedPlan ? (
          <Badge variant="outline">
            <LockIcon />
            {lockedPlan}
          </Badge>
        ) : (
          control
        )}
      </div>
    </div>
  )
}

/**
 * Irreversible actions, last on the page. Each action goes through a
 * Confirm dialog, deletes with type-to-confirm.
 */
export function DangerZone({
  title = "Danger zone",
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <section
      aria-labelledby="danger-zone"
      className="flex max-w-[760px] flex-col overflow-hidden rounded-xl bg-raised shadow-[inset_0_0_0_1px_var(--vi-danger-border)]"
    >
      <h2 id="danger-zone" className="border-b border-separator px-5 py-4 text-heading text-destructive-text">
        {title}
      </h2>
      <div className="flex flex-col">{children}</div>
    </section>
  )
}
