import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@kibo/ui/lib/utils"

import { IconTile } from "@/components/atoms/icon-tile"

/**
 * A whole-card link to a feature page. The card is one link named by its
 * title; `cta` (“Learn about answers”) is decorative text inside it.
 */
export function FeatureLinkCard({
  href,
  icon,
  title,
  description,
  cta,
  className,
}: {
  href: string
  icon?: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  cta?: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/feature flex flex-col gap-3 rounded-xl border border-transparent bg-raised p-6 text-foreground no-underline shadow-border transition-shadow duration-fast ease-out press hover:shadow-border-hover max-sm:p-4",
        className
      )}
    >
      {icon ? <IconTile>{icon}</IconTile> : null}
      <span className="text-heading group-hover/feature:underline">{title}</span>
      <span className="text-body-sm text-muted-foreground">{description}</span>
      {cta ? (
        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-1 text-body-sm font-medium text-link"
        >
          {cta}
          <ArrowRightIcon className="size-4 transition-transform duration-fast group-hover/feature:translate-x-0.5 rtl:rotate-180" />
        </span>
      ) : null}
    </Link>
  )
}

/**
 * A titled point explained in place; it never links. `boxed` puts it on a
 * surface (`boxed="raised"` for a panel inside an alt section);
 * `layout="inline"` puts a small icon beside the text.
 */
export function FeatureItem({
  icon,
  title,
  children,
  boxed = false,
  layout = "stacked",
  className,
}: {
  icon?: React.ReactNode
  title: React.ReactNode
  children: React.ReactNode
  boxed?: boolean | "raised"
  layout?: "stacked" | "inline"
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 gap-2",
        layout === "inline" ? "flex-row items-start gap-3" : "flex-col",
        boxed && "rounded-xl p-6 max-sm:p-4",
        boxed === "raised" ? "bg-raised shadow-border" : boxed && "bg-surface",
        className
      )}
    >
      {icon ? (
        <IconTile size={layout === "inline" ? "sm" : "md"} className={layout === "stacked" ? "mb-1" : undefined}>
          {icon}
        </IconTile>
      ) : null}
      <div className="flex min-w-0 flex-col gap-2">
        <h3 className="text-heading">{title}</h3>
        <p className="text-body-sm text-muted-foreground">{children}</p>
      </div>
    </div>
  )
}
