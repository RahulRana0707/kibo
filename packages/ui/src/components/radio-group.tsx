"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@kibo/ui/lib/utils"

/**
 * Pick exactly one. Up to five short options: radio items. Options that
 * need a sentence or a logo: choice cards. More than seven: a Select.
 * One Tab stop; arrow keys move and select.
 */
function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-1", className)}
      {...props}
    />
  )
}

const radioClassName =
  "grid size-5 shrink-0 place-items-center rounded-full border-[1.5px] border-border-strong bg-page transition-[border-color,border-width] duration-instant group-hover/radio:border-muted-foreground group-disabled/radio:border-border-control group-disabled/radio:bg-sunken group-data-[state=checked]/radio:border-[6px] group-data-[state=checked]/radio:border-primary group-disabled/radio:group-data-[state=checked]/radio:border-border-strong"

/** A radio with its label and optional description, as one 40px row. */
function RadioItem({
  label,
  description,
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  label: React.ReactNode
  description?: React.ReactNode
}) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-item"
      className={cn(
        "group/radio flex min-h-10 items-start gap-3 rounded-md py-2.5 text-start disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <span aria-hidden="true" className={cn(radioClassName, "mt-px")} />
      <span className="flex flex-col gap-0.5">
        <span className="text-body-sm font-medium group-disabled/radio:text-disabled">
          {label}
        </span>
        {description ? (
          <span className="text-caption text-muted-foreground">
            {description}
          </span>
        ) : null}
      </span>
    </RadioGroupPrimitive.Item>
  )
}

/**
 * A radio drawn as a card, for options that need a sentence or a logo.
 * Pass `media` for a platform logo or icon.
 */
function ChoiceCard({
  label,
  description,
  media,
  aside,
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  label: React.ReactNode
  description?: React.ReactNode
  media?: React.ReactNode
  /** Trailing content, such as a Soon label on a disabled card. */
  aside?: React.ReactNode
}) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="choice-card"
      className={cn(
        "group/radio flex min-h-14 w-full items-start gap-3 rounded-lg border border-transparent bg-raised p-4 text-start shadow-border transition-[box-shadow,background-color] duration-fast ease-out hover:shadow-border-hover disabled:cursor-not-allowed disabled:bg-sunken disabled:shadow-none data-[state=checked]:bg-primary-subtle data-[state=checked]:shadow-[inset_0_0_0_1px_var(--vi-accent-border)]",
        className
      )}
      {...props}
    >
      {media ? <span className="shrink-0">{media}</span> : null}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-body-sm font-medium group-disabled/radio:text-disabled">
          {label}
        </span>
        {description ? (
          <span className="text-caption text-muted-foreground group-disabled/radio:text-disabled">
            {description}
          </span>
        ) : null}
      </span>
      {aside ?? (
        <span aria-hidden="true" className={cn(radioClassName, "mt-px")} />
      )}
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioItem, ChoiceCard }
