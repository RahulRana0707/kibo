import { CircleAlertIcon } from "lucide-react"

import { cn } from "@kibo/ui/lib/utils"

/** Helper text under a field, or an error with its icon when `error` is set. */
export function FieldMessage({
  id,
  error = false,
  className,
  children,
}: {
  id?: string
  error?: boolean
  className?: string
  children: React.ReactNode
}) {
  if (error) {
    return (
      <p
        id={id}
        className={cn(
          "flex items-start gap-1.5 text-caption text-destructive-text [&_a]:font-medium [&_a]:text-current [&_a]:underline [&_a]:underline-offset-4",
          className
        )}
      >
        <CircleAlertIcon aria-hidden="true" className="mt-px size-4 shrink-0" />
        <span>{children}</span>
      </p>
    )
  }

  return (
    <p id={id} className={cn("text-caption text-muted-foreground", className)}>
      {children}
    </p>
  )
}
