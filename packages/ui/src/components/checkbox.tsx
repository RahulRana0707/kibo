"use client"

import * as React from "react"
import { CheckIcon, MinusIcon } from "lucide-react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@kibo/ui/lib/utils"

/**
 * Turns one option on or off in a form that is saved later. For a setting
 * that applies at once, use a Switch. Supports `checked="indeterminate"`.
 */
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer group/checkbox grid size-5 shrink-0 place-items-center rounded-sm border-[1.5px] border-border-strong bg-page text-on-accent transition-colors duration-instant hover:border-muted-foreground disabled:cursor-not-allowed disabled:border-border-control disabled:bg-sunken aria-invalid:border-destructive data-[state=checked]:border-transparent data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary-hover data-[state=indeterminate]:border-transparent data-[state=indeterminate]:bg-primary disabled:data-[state=checked]:bg-border-strong disabled:data-[state=indeterminate]:bg-border-strong",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator">
        <CheckIcon
          aria-hidden="true"
          strokeWidth={2.5}
          className="size-3.5 group-data-[state=indeterminate]/checkbox:hidden"
        />
        <MinusIcon
          aria-hidden="true"
          strokeWidth={2.5}
          className="hidden size-3.5 group-data-[state=indeterminate]/checkbox:block"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

/**
 * A checkbox with its label and an optional description, as one 40px row.
 * The description is linked with aria-describedby.
 */
function CheckboxField({
  label,
  description,
  id,
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  label: React.ReactNode
  description?: React.ReactNode
}) {
  const fallbackId = React.useId()
  const inputId = id ?? fallbackId
  const descriptionId = description ? `${inputId}-description` : undefined

  return (
    <div className={cn("flex min-h-10 items-start gap-3 py-2.5", className)}>
      <Checkbox
        id={inputId}
        aria-describedby={descriptionId}
        className="mt-px"
        {...props}
      />
      <div className="flex flex-col gap-0.5">
        <label
          htmlFor={inputId}
          className="text-body-sm font-medium peer-disabled:text-disabled"
        >
          {label}
        </label>
        {description ? (
          <p id={descriptionId} className="text-caption text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  )
}

export { Checkbox, CheckboxField }
