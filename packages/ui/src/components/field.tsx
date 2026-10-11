import { CircleAlertIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@kibo/ui/lib/utils"
import { Label } from "@kibo/ui/components/label"

const fieldVariants = cva("flex min-w-0 gap-2", {
  variants: {
    orientation: {
      vertical: "flex-col",
      // Label column 200, stacking below 640.
      horizontal:
        "flex-col sm:grid sm:grid-cols-[200px_minmax(0,1fr)] sm:items-start sm:gap-x-4 sm:[&>[data-slot=field-label]]:pt-2.5 sm:[&>:not([data-slot=field-label])]:col-start-2",
    },
  },
  defaultVariants: { orientation: "vertical" },
})

/** One label, its control and the helper or error under it. */
function Field({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      data-slot="field"
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

/**
 * The visible label. Mark the few optional fields, not the many required
 * ones. `aside` sits at the end of the row (“Forgot password?”).
 */
function FieldLabel({
  optional = false,
  aside,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Label> & {
  optional?: boolean
  aside?: React.ReactNode
}) {
  const label = (
    <Label
      data-slot={aside ? undefined : "field-label"}
      className={cn(!aside && className)}
      {...props}
    >
      {children}
      {optional ? (
        <span className="text-caption font-normal text-muted-foreground">
          (optional)
        </span>
      ) : null}
    </Label>
  )

  if (!aside) {
    return label
  }

  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1",
        className
      )}
    >
      {label}
      {aside}
    </div>
  )
}

/**
 * Helper text under a control, or an error with its icon when `error` is
 * set. An error replaces the helper; link it with aria-describedby.
 */
function FieldMessage({
  error = false,
  className,
  children,
  ...props
}: React.ComponentProps<"p"> & { error?: boolean }) {
  if (error) {
    return (
      <p
        data-slot="field-error"
        className={cn(
          "flex items-start gap-1.5 text-caption text-destructive-text [&_a]:font-medium [&_a]:text-current [&_a]:underline [&_a]:underline-offset-4",
          className
        )}
        {...props}
      >
        <CircleAlertIcon aria-hidden="true" className="mt-px size-4 shrink-0" />
        <span>{children}</span>
      </p>
    )
  }

  return (
    <p
      data-slot="field-description"
      className={cn("text-caption text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  )
}

/**
 * Characters used against a limit. Turns warning at 90% and danger past the
 * limit, and only speaks up within 10 characters of it.
 */
function FieldCounter({
  value,
  max,
  className,
  ...props
}: React.ComponentProps<"p"> & { value: number; max: number }) {
  const over = value > max
  const near = value >= max * 0.9

  return (
    <p
      data-slot="field-counter"
      aria-live={max - value <= 10 ? "polite" : "off"}
      className={cn(
        "text-end text-[0.75rem] text-muted-foreground tabular",
        near && "font-semibold text-warning-text",
        over && "text-destructive-text",
        className
      )}
      {...props}
    >
      {value} / {max}
    </p>
  )
}

/** A group of controls under one legend, such as a radio group. */
function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn("m-0 flex min-w-0 flex-col gap-2 border-0 p-0", className)}
      {...props}
    />
  )
}

function FieldLegend({ className, ...props }: React.ComponentProps<"legend">) {
  return (
    <legend
      data-slot="field-legend"
      className={cn("mb-2 p-0 text-body-sm font-medium", className)}
      {...props}
    />
  )
}

export { Field, FieldLabel, FieldMessage, FieldCounter, FieldSet, FieldLegend }
