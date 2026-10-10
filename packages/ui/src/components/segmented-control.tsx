"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@kibo/ui/lib/utils"

type Segment<T extends string> = {
  value: T
  label: React.ReactNode
  icon?: React.ReactNode
  /** Required when the option shows only an icon. */
  ariaLabel?: string
}

/**
 * Sets one value from 2–4 short options, applied in place (Monthly /
 * Yearly). If it swaps whole panels, use Tabs. One Tab stop; arrows move
 * and select. `block` shares the full width (phone).
 */
function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onValueChange,
  size = "default",
  block = false,
  className,
}: {
  label: string
  options: Segment<T>[]
  value: T
  onValueChange: (value: T) => void
  size?: "default" | "sm"
  block?: boolean
  className?: string
}) {
  return (
    <RadioGroupPrimitive.Root
      aria-label={label}
      value={value}
      onValueChange={(next) => onValueChange(next as T)}
      orientation="horizontal"
      className={cn(
        "gap-1 rounded-lg bg-sunken p-1",
        block ? "flex w-full" : "inline-flex",
        className
      )}
    >
      {options.map((option) => (
        <RadioGroupPrimitive.Item
          key={option.value}
          value={option.value}
          aria-label={option.ariaLabel}
          className={cn(
            "inline-flex items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap text-muted-foreground hover:text-foreground data-[state=checked]:bg-raised data-[state=checked]:text-foreground data-[state=checked]:shadow-border [&_svg]:size-4 [&_svg]:shrink-0",
            size === "sm" ? "h-7 px-2.5 text-caption" : "h-8 px-3 text-body-sm",
            block && "flex-1 max-sm:h-9"
          )}
        >
          {option.icon}
          {option.label}
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  )
}

export { SegmentedControl, type Segment }
