import Link from "next/link"

import { cn } from "@kibo/ui/lib/utils"

import { IconTile } from "@/components/atoms/icon-tile"

/** A whole-card link to a product page, with an icon, title and summary. */
export function FeatureLinkCard({
  href,
  icon,
  title,
  description,
  className,
}: {
  href: string
  icon?: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-transparent bg-raised p-6 text-foreground no-underline shadow-border transition-shadow duration-150 ease-out hover:shadow-border-hover",
        className
      )}
    >
      {icon ? <IconTile>{icon}</IconTile> : null}
      <span className="text-heading">{title}</span>
      <span className="text-body-sm text-muted-foreground">{description}</span>
    </Link>
  )
}

/**
 * A titled point with optional icon. `boxed` puts it on a panel; otherwise it
 * sits directly on the section background.
 */
export function FeatureItem({
  icon,
  title,
  children,
  boxed = false,
  className,
}: {
  icon?: React.ReactNode
  title: React.ReactNode
  children: React.ReactNode
  boxed?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-2",
        boxed &&
          "rounded-xl border border-transparent bg-raised p-6 shadow-border max-sm:p-4",
        className
      )}
    >
      {icon ? <IconTile className="mb-1">{icon}</IconTile> : null}
      <h3 className="text-heading">{title}</h3>
      <p className="text-body-sm text-muted-foreground">{children}</p>
    </div>
  )
}
