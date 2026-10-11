import Link from "next/link"
import { ShieldIcon } from "lucide-react"

import { Avatar } from "@kibo/ui/components/avatar"
import { Badge } from "@kibo/ui/components/badge"

import { PlatformIcon, platforms, type Platform } from "@/components/atoms/platform-icon"

const roles = {
  regular: { variant: "success", word: "Regular" },
  new: { variant: "accent", word: "New" },
  mod: { variant: "default", word: "Mod" },
  strikes: { variant: "destructive", word: "" },
} as const

/**
 * A chatter as Kibo knows them: platform, how long they've been around,
 * how much they talk, role and strikes. One link that opens their sheet.
 */
export function ViewerCard({
  name,
  platform,
  since,
  role,
  strikes,
  stats,
  href,
}: {
  name: string
  platform: Platform
  /** “Since Mar 2026 · sub 8 months”. */
  since: string
  role: keyof typeof roles
  strikes?: number
  stats: { label: string; value: string }[]
  href: string
}) {
  const badge = roles[role]
  const word = role === "strikes" ? `${strikes ?? 0} strikes` : badge.word

  return (
    <Link
      href={href}
      aria-label={`${name}, ${platforms[platform]}, ${word}`}
      className="flex flex-col gap-3 rounded-xl border border-transparent bg-raised p-4 text-foreground no-underline shadow-border transition-shadow duration-fast hover:shadow-border-hover"
    >
      <div className="flex items-start gap-3">
        <Avatar name={name} size="lg" badge={<PlatformIcon platform={platform} />} />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-body-sm font-semibold">{name}</span>
          <span className="text-caption text-muted-foreground">{since}</span>
        </div>
        <Badge variant={badge.variant}>
          {role === "mod" ? <ShieldIcon /> : null}
          {word}
        </Badge>
      </div>
      <dl className="flex flex-wrap gap-x-4 gap-y-1 text-caption text-muted-foreground">
        {stats.map((stat) => (
          <div key={stat.label} className="flex gap-1">
            <dd className="text-foreground tabular">{stat.value}</dd>
            <dt>{stat.label}</dt>
          </div>
        ))}
      </dl>
    </Link>
  )
}
