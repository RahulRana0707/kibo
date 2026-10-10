import { cn } from "@kibo/ui/lib/utils"

/** Label and value pairs, such as an integration's category and plans. */
export function DetailList({
  items,
  emphasize = false,
  className,
}: {
  items: { term: string; value: React.ReactNode }[]
  emphasize?: boolean
  className?: string
}) {
  return (
    <dl className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => (
        <div
          key={item.term}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <dt className="text-muted-foreground">{item.term}</dt>
          <dd className={cn("text-end", emphasize && "font-medium")}>
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
