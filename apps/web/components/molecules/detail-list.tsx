"use client"

import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import { useCopy } from "@kibo/ui/components/code-block"
import { cn } from "@kibo/ui/lib/utils"

type Detail = {
  term: string
  /** `null` reads “Not set”. */
  value: React.ReactNode | null
  /** Text to copy; adds a Copy button named after the term. */
  copy?: string
}

function CopyValue({ term, text }: { term: string; text: string }) {
  const { state, copy } = useCopy(text)
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      aria-label={state === "copied" ? "Copied" : `Copy ${term.toLowerCase()}`}
      onClick={copy}
      className="max-sm:size-11"
    >
      {state === "copied" ? (
        <CheckIcon className="text-success-text" />
      ) : (
        <CopyIcon />
      )}
    </Button>
  )
}

/**
 * Key and value pairs: settings summaries, invoice lines, integration
 * details. Labels left, values right; labels stack above values when the
 * list is narrow. `total` marks the last row as a total.
 */
export function DetailList({
  items,
  emphasize = false,
  total = false,
  className,
}: {
  items: Detail[]
  emphasize?: boolean
  total?: boolean
  className?: string
}) {
  return (
    <dl className={cn("@container flex flex-col", className)}>
      {items.map((item, index) => {
        const isTotal = total && index === items.length - 1
        return (
          <div
            key={item.term}
            className={cn(
              "flex min-h-10 flex-col gap-0.5 border-b border-separator py-2 last:border-b-0 @[360px]:flex-row @[360px]:items-center @[360px]:justify-between @[360px]:gap-4",
              isTotal && "border-t border-t-border-control text-body"
            )}
          >
            <dt
              className={cn(
                "text-body-sm text-muted-foreground",
                isTotal && "font-semibold text-foreground"
              )}
            >
              {item.term}
            </dt>
            <dd
              className={cn(
                "flex items-center gap-1 text-body-sm tabular @[360px]:justify-end @[360px]:text-end",
                (emphasize || isTotal) && "font-semibold",
                isTotal && "text-body"
              )}
            >
              {item.value ?? (
                <span className="text-muted-foreground">Not set</span>
              )}
              {item.copy ? <CopyValue term={item.term} text={item.copy} /> : null}
            </dd>
          </div>
        )
      })}
    </dl>
  )
}
