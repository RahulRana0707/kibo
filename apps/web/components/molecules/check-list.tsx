import { CheckIcon } from "lucide-react"

import { cn } from "@kibo/ui/lib/utils"

/** A list where every item is marked as included. */
export function CheckList({
  items,
  className,
}: {
  items: React.ReactNode[]
  className?: string
}) {
  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <CheckIcon
            aria-hidden="true"
            className="mt-[3px] size-4 shrink-0 text-success-text"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
