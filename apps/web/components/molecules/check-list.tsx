import { CheckIcon, MinusIcon } from "lucide-react"

import { cn } from "@kibo/ui/lib/utils"

const sizes = {
  sm: "gap-1.5 text-caption",
  default: "gap-2 text-body-sm",
  lg: "gap-3 text-body",
}

type Item = React.ReactNode | { text: React.ReactNode; included: false }

function isExcluded(item: Item): item is { text: React.ReactNode; included: false } {
  return typeof item === "object" && item !== null && "included" in item
}

/**
 * What's included: plan features, auth panel benefits. Read-only; for
 * tasks people tick off, use the Setup checklist. Pass
 * `{ text, included: false }` for an excluded row.
 */
export function CheckList({
  items,
  size = "default",
  className,
}: {
  items: Item[]
  size?: keyof typeof sizes
  className?: string
}) {
  return (
    <ul className={cn("flex flex-col", sizes[size], className)}>
      {items.map((item, index) => {
        const excluded = isExcluded(item)
        const Icon = excluded ? MinusIcon : CheckIcon
        return (
          <li
            key={index}
            className={cn(
              "flex items-start gap-2",
              excluded && "text-muted-foreground"
            )}
          >
            <Icon
              aria-hidden="true"
              className={cn(
                "mt-0.75 shrink-0",
                size === "lg" ? "size-5" : "size-4",
                excluded ? "text-disabled" : "text-success-text"
              )}
            />
            <span>
              {excluded ? item.text : item}
              {excluded ? <span className="sr-only"> (not included)</span> : null}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
