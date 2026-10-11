import { FileSpreadsheetIcon, GlobeIcon, FileTextIcon } from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import { Progress } from "@kibo/ui/components/meter"

import { GlyphTile, PlatformIcon, type Platform } from "@/components/atoms/platform-icon"
import { StatusPill } from "@/components/atoms/status-pill"

export type SourceStatus = "ready" | "importing" | "queued" | "stale" | "failed"

/** Source states reuse the status pill tones with source words. */
const statuses = {
  ready: { tone: "live", word: "Ready" },
  importing: { tone: "connecting", word: "Importing" },
  queued: { tone: "offline", word: "Queued" },
  stale: { tone: "reconnect", word: "Out of date" },
  failed: { tone: "error", word: "Failed" },
} as const

const glyphs = { file: FileSpreadsheetIcon, website: GlobeIcon, doc: FileTextIcon }

export type KnowledgeSource = {
  id: string
  name: string
  /** “Spreadsheet · 148 rows”. */
  kind: string
  glyph?: keyof typeof glyphs
  platform?: Platform
  answers: number | null
  status: SourceStatus
  /** Why it failed or changed: “Doc changed Oct 8”. */
  reason?: string
  updated: string
  progress?: number
}

/** The leading visual and name cell of a source row. */
export function SourceName({ source }: { source: KnowledgeSource }) {
  const Glyph = glyphs[source.glyph ?? "file"]
  return (
    <span className="flex items-center gap-3">
      {source.platform ? (
        <PlatformIcon platform={source.platform} size="lg" />
      ) : (
        <GlyphTile size="sm" className="size-8">
          <Glyph />
        </GlyphTile>
      )}
      <span className="flex min-w-0 flex-col">
        <span className="truncate font-medium">{source.name}</span>
        <span className="text-caption text-muted-foreground">{source.kind}</span>
      </span>
    </span>
  )
}

/** Status pill, with progress while importing and the reason when stuck. */
export function SourceStatusCell({ source }: { source: KnowledgeSource }) {
  const status = statuses[source.status]
  return (
    <span className="flex flex-col gap-1">
      <StatusPill tone={status.tone} size="sm" className="w-fit">
        {status.word}
      </StatusPill>
      {source.status === "importing" ? (
        <Progress label={`Importing ${source.name}`} value={source.progress} className="w-24" />
      ) : null}
      {source.reason ? (
        <span className="text-caption text-muted-foreground">{source.reason}</span>
      ) : null}
    </span>
  )
}

/** The one action for a source's state. */
export function SourceAction({
  source,
  onAction,
}: {
  source: KnowledgeSource
  onAction?: (source: KnowledgeSource) => void
}) {
  const label = {
    ready: null,
    importing: "Cancel",
    queued: null,
    stale: "Sync now",
    failed: "Reconnect",
  }[source.status]
  return label ? (
    <Button variant="secondary" size="xs" onClick={() => onAction?.(source)}>
      {label}
    </Button>
  ) : null
}
