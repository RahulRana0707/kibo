import Link from "next/link"

import { Badge } from "@kibo/ui/components/badge"

const labels = {
  new: { text: "New", variant: "accent" },
  improved: { text: "Improved", variant: "success" },
  fixed: { text: "Fixed", variant: "default" },
} as const

/**
 * One line in the changelog and What's new: the label says what kind of
 * change, the sentence what people can do now. `href` links it (in-app).
 */
export function ChangeItem({
  type,
  href,
  children,
}: {
  type: keyof typeof labels
  href?: string
  children: React.ReactNode
}) {
  const label = labels[type]

  return (
    <li className="flex items-start gap-3 text-body-sm/normal max-sm:flex-col max-sm:gap-1.5">
      <Badge variant={label.variant} className="w-21 shrink-0 max-sm:w-auto">
        {label.text}
      </Badge>
      {href ? (
        <Link href={href} className="text-foreground hover:underline">
          {children}
        </Link>
      ) : (
        <span>{children}</span>
      )}
    </li>
  )
}

export function ChangeList({ children }: { children: React.ReactNode }) {
  return <ul className="flex! list-none! flex-col gap-3 ps-0!">{children}</ul>
}
