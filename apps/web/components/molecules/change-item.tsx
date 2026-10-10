import { Badge } from "@kibo/ui/components/badge"

const labels = {
  new: { text: "New", variant: "accent" },
  improved: { text: "Improved", variant: "default" },
  fixed: { text: "Fixed", variant: "default" },
} as const

/** One line in a changelog release. */
export function ChangeItem({
  type,
  children,
}: {
  type: keyof typeof labels
  children: React.ReactNode
}) {
  const label = labels[type]

  return (
    <li className="flex items-start gap-3">
      <Badge variant={label.variant} className="w-[84px] shrink-0">
        {label.text}
      </Badge>
      <span>{children}</span>
    </li>
  )
}

export function ChangeList({ children }: { children: React.ReactNode }) {
  return <ul className="flex! list-none! flex-col gap-3 ps-0!">{children}</ul>
}
