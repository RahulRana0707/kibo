import { MoreHorizontalIcon } from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import { Heading } from "@kibo/ui/components/typography"
import { cn } from "@kibo/ui/lib/utils"

import { Breadcrumbs, type Crumb } from "@/components/molecules/breadcrumbs"
import { TabLinks, type NavLinkItem } from "@/components/molecules/tab-links"

/**
 * One header for every app section: breadcrumbs, media, title, status,
 * description or meta, up to two actions plus an overflow menu, and
 * sub-tabs. On phones the title drops to 24, actions fold into the
 * overflow, and tabs scroll.
 */
export function PageHeader({
  title,
  breadcrumbs,
  media,
  status,
  description,
  meta,
  actions,
  overflow,
  tabs,
  className,
}: {
  title: string
  breadcrumbs?: Crumb[]
  /** An Avatar xl for a bot, a PlatformIcon xl for an integration. */
  media?: React.ReactNode
  /** A StatusPill beside the title, inside role="status". */
  status?: React.ReactNode
  description?: React.ReactNode
  meta?: React.ReactNode
  /** At most one primary and one secondary. */
  actions?: React.ReactNode
  /** The ⋯ menu; pass a DropdownMenu, or leave out. */
  overflow?: React.ReactNode
  tabs?: { label: string; items: NavLinkItem[] }
  className?: string
}) {
  return (
    <header className={cn("flex flex-col gap-5", className)}>
      {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          {media ? (
            <span className="shrink-0 max-sm:[&_[data-slot=avatar]]:size-12">{media}</span>
          ) : null}
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <Heading as="h1" size="display" className="max-sm:text-title">
                {title}
              </Heading>
              {status ? <span role="status">{status}</span> : null}
            </div>
            {description ? (
              <p className="max-w-[65ch] text-muted-foreground">{description}</p>
            ) : null}
            {meta ? (
              <div className="flex flex-wrap items-center gap-3 text-caption text-muted-foreground">
                {meta}
              </div>
            ) : null}
          </div>
        </div>
        {actions || overflow ? (
          <div className="flex items-center gap-3">
            {actions ? <div className="flex gap-3 max-sm:hidden">{actions}</div> : null}
            {overflow ?? (actions ? (
              <Button
                variant="secondary"
                size="icon"
                aria-label="More actions"
                className="sm:hidden max-sm:size-11"
              >
                <MoreHorizontalIcon />
              </Button>
            ) : null)}
          </div>
        ) : null}
      </div>
      {tabs ? (
        <TabLinks label={tabs.label} items={tabs.items} className="-mx-6 px-6 max-sm:-mx-4 max-sm:px-4" />
      ) : null}
    </header>
  )
}
