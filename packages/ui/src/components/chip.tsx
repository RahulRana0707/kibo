import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "@kibo/ui/lib/utils"
import { SoonLabel } from "@kibo/ui/components/soon-label"

const chipVariants = cva(
  "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-transparent px-3 text-caption font-medium whitespace-nowrap text-foreground no-underline transition-[box-shadow,background-color] duration-fast ease-out max-sm:h-10 [&_img]:size-5 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-raised shadow-border hover:shadow-border-hover",
        selected:
          "bg-primary-subtle text-link shadow-[inset_0_0_0_1px_var(--vi-accent-border)]",
        add: "bg-transparent text-muted-foreground shadow-[inset_0_0_0_1px_var(--vi-border)] hover:text-foreground",
        disabled:
          "cursor-not-allowed bg-sunken text-disabled shadow-none [&_img]:opacity-55 [&_img]:grayscale",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

/**
 * An interactive pill: filter toggles, onboarding choices, removable
 * values. If pressing it does nothing, use a Badge. Pass `asChild` with a
 * link for a ChipLink.
 */
function Chip({
  variant,
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof chipVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"
  return (
    <Comp
      data-slot="chip"
      className={cn(chipVariants({ variant }), className)}
      {...props}
    />
  )
}

/**
 * A toggle chip (aria-pressed). `soon` renders it aria-disabled with a Soon
 * label; write the reason nearby.
 */
function ChipButton({
  selected = false,
  soon = false,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & { selected?: boolean; soon?: boolean }) {
  return (
    <button
      type="button"
      data-slot="chip"
      aria-pressed={soon ? undefined : selected}
      aria-disabled={soon || undefined}
      className={cn(
        chipVariants({
          variant: soon ? "disabled" : selected ? "selected" : "default",
        }),
        !soon && "press",
        className
      )}
      {...props}
    >
      {children}
      {soon ? <SoonLabel /> : null}
    </button>
  )
}

/** A chip holding a value that can be removed, such as a language. */
function RemovableChip({
  label,
  onRemove,
  className,
  children,
}: {
  /** Names the remove button: “Remove English”. */
  label: string
  onRemove: () => void
  className?: string
  children?: React.ReactNode
}) {
  return (
    <span
      data-slot="chip"
      className={cn(chipVariants({ variant: "selected" }), "pe-1.5", className)}
    >
      {children ?? label}
      <button
        type="button"
        aria-label={`Remove ${label}`}
        onClick={onRemove}
        className="-me-0.5 grid size-5 place-items-center rounded-full hover:bg-primary-subtle-hover max-sm:size-8"
      >
        <XIcon aria-hidden="true" className="size-3.5!" />
      </button>
    </span>
  )
}

export { Chip, ChipButton, RemovableChip, chipVariants }
