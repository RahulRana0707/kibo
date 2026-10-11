"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@kibo/ui/lib/utils"

/**
 * Turns a setting on or off immediately, with no Save button. Label it by
 * its ON state (“Block explicit songs”).
 */
function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 items-center rounded-full bg-border-strong p-0.5 transition-colors duration-fast ease-out disabled:cursor-not-allowed disabled:bg-border-control aria-disabled:cursor-not-allowed data-[state=checked]:bg-primary disabled:data-[state=checked]:bg-border-strong",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-4 rounded-full bg-on-accent shadow-[0_1px_2px_oklch(0_0_0/0.2)] data-[state=checked]:translate-x-4 motion-safe:transition-transform motion-safe:duration-fast motion-safe:ease-out rtl:data-[state=checked]:-translate-x-4"
      />
    </SwitchPrimitive.Root>
  )
}

/**
 * A switch with its label and description in one row, label first. The
 * whole row toggles it.
 */
function SwitchField({
  label,
  description,
  id,
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  label: React.ReactNode
  description?: React.ReactNode
}) {
  const fallbackId = React.useId()
  const inputId = id ?? fallbackId
  const descriptionId = description ? `${inputId}-description` : undefined

  return (
    <div
      className={cn(
        "flex min-h-10 items-center justify-between gap-4 py-2 max-sm:min-h-11",
        className
      )}
    >
      <div className="flex flex-col gap-0.5">
        <label htmlFor={inputId} className="text-body-sm font-medium">
          {label}
        </label>
        {description ? (
          <p id={descriptionId} className="text-caption text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      <Switch id={inputId} aria-describedby={descriptionId} {...props} />
    </div>
  )
}

export { Switch, SwitchField }
