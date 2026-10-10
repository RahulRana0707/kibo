import Link from "next/link"
import { CodeIcon } from "lucide-react"

import { Badge } from "@kibo/ui/components/badge"
import { cn } from "@kibo/ui/lib/utils"

import { GlyphTile, PlatformIcon } from "@/components/atoms/platform-icon"
import type { Integration } from "@/lib/marketing/integrations"

/** One integration in the directory. Links to its page when available. */
export function IntegrationCard({
  integration,
  compact = false,
}: {
  integration: Integration
  compact?: boolean
}) {
  const body = (
    <>
      {integration.platform ? (
        <PlatformIcon platform={integration.platform} size="lg" />
      ) : (
        <GlyphTile>
          <CodeIcon />
        </GlyphTile>
      )}
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-semibold">{integration.name}</span>
          {compact ? null : integration.available ? (
            <Badge variant="success">Available</Badge>
          ) : (
            <Badge>Coming soon</Badge>
          )}
        </span>
        {!compact && integration.description ? (
          <span className="text-caption text-muted-foreground">
            {integration.description}
          </span>
        ) : null}
      </span>
    </>
  )

  const className = cn(
    "flex items-start gap-3 rounded-xl border border-transparent bg-raised p-4 text-foreground no-underline shadow-border",
    compact && "items-center"
  )

  return integration.available ? (
    <Link
      href={`/integrations/${integration.slug}`}
      className={cn(
        className,
        "transition-shadow duration-150 hover:shadow-border-hover"
      )}
    >
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  )
}
