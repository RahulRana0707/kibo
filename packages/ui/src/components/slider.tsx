"use client"

import * as React from "react"
import { MinusIcon, PlusIcon } from "lucide-react"
import { Slider as SliderPrimitive } from "radix-ui"

import { cn } from "@kibo/ui/lib/utils"

/**
 * For a value that's easier to feel than type (confidence threshold,
 * reply frequency). Always show the value beside the label.
 */
function Slider({
  className,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const values = props.value ?? props.defaultValue ?? [props.min ?? 0]

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(
        "relative flex h-5 w-full touch-none items-center select-none data-[disabled]:cursor-not-allowed max-sm:h-11",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 grow overflow-hidden rounded-full bg-border-strong data-[disabled]:bg-border-control">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary data-[disabled]:bg-border-strong" />
      </SliderPrimitive.Track>
      {values.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="block size-5 rounded-full border-2 border-primary bg-raised shadow-raised data-[disabled]:border-border-strong"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

/**
 * Exact small numbers (cooldown seconds, winners) with − and + buttons.
 * `name` names the buttons: “Decrease cooldown”.
 */
function NumberStepper({
  value,
  onValueChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  name,
  disabled,
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "value" | "onChange" | "type"> & {
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  name: string
}) {
  const clamp = (next: number) => Math.min(max, Math.max(min, next))
  const buttonClassName =
    "grid size-10 shrink-0 place-items-center text-muted-foreground hover:bg-hovered hover:text-foreground disabled:cursor-not-allowed disabled:text-disabled disabled:hover:bg-transparent max-sm:size-12 [&_svg]:size-4"

  return (
    <div
      data-slot="number-stepper"
      className={cn(
        "inline-flex h-10 items-stretch overflow-hidden rounded-md border border-input bg-sunken has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ring max-sm:h-12",
        className
      )}
    >
      <button
        type="button"
        aria-label={`Decrease ${name}`}
        disabled={disabled || value <= min}
        onClick={() => onValueChange(clamp(value - step))}
        className={buttonClassName}
      >
        <MinusIcon aria-hidden="true" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(event) => {
          const next = event.currentTarget.valueAsNumber
          if (!Number.isNaN(next)) onValueChange(clamp(next))
        }}
        className="w-16 bg-transparent text-center text-body text-foreground tabular outline-none [appearance:textfield] disabled:text-disabled [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        {...props}
      />
      <button
        type="button"
        aria-label={`Increase ${name}`}
        disabled={disabled || value >= max}
        onClick={() => onValueChange(clamp(value + step))}
        className={buttonClassName}
      >
        <PlusIcon aria-hidden="true" />
      </button>
    </div>
  )
}

export { Slider, NumberStepper }
