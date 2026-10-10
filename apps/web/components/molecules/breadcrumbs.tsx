import Link from "next/link"

import { cn } from "@kibo/ui/lib/utils"

export type Crumb = { label: string; href?: string }

export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[]
  className?: string
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap gap-2 text-caption text-muted-foreground">
        {items.map((item, index) => (
          <li key={item.label} className="flex gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link
                href={item.href}
                className="text-muted-foreground no-underline hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={index === items.length - 1 ? "page" : undefined}
                className={cn(index === items.length - 1 && "text-foreground")}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
