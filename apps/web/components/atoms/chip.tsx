import { cn } from "@kibo/ui/lib/utils"

export const chipClassName =
  "inline-flex h-8 items-center gap-1.5 rounded-full border border-transparent px-3 text-caption font-medium whitespace-nowrap text-foreground no-underline"

const unselected = "bg-raised shadow-border hover:shadow-border-hover"
const selected =
  "bg-primary-subtle text-link shadow-[inset_0_0_0_1px_var(--vi-accent-border)]"

/** A pill for static choices. Use ChipButton for filters and chipLinkClassName for links. */
export function Chip({
  selected: isSelected = false,
  className,
  ...props
}: React.ComponentProps<"span"> & { selected?: boolean }) {
  return (
    <span
      className={cn(
        chipClassName,
        isSelected ? selected : unselected,
        className
      )}
      {...props}
    />
  )
}

export function ChipButton({
  selected: isSelected = false,
  className,
  ...props
}: React.ComponentProps<"button"> & { selected?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      className={cn(
        chipClassName,
        "cursor-pointer",
        isSelected ? selected : unselected,
        className
      )}
      {...props}
    />
  )
}

export function chipLinkClassName(isSelected = false) {
  return cn(chipClassName, isSelected ? selected : unselected)
}
