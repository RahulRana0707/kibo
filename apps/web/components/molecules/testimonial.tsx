import { cn } from "@kibo/ui/lib/utils"

import { Avatar } from "@kibo/ui/components/avatar"
import {
  PlatformIcon,
  platforms,
  type Platform,
} from "@/components/atoms/platform-icon"

type Person = {
  name: string
  initials: string
  detail: string
  platforms?: Platform[]
}

function Attribution({ person }: { person: Person }) {
  return (
    <figcaption className="flex items-center gap-3">
      <Avatar name={person.initials} initials={person.initials} />
      <span className="flex flex-col gap-1">
        <span className="text-body-sm font-medium">{person.name}</span>
        <span className="flex items-center gap-1 text-caption text-muted-foreground">
          {person.platforms?.map((platform) => (
            <PlatformIcon
              key={platform}
              platform={platform}
              label={platforms[platform]}
            />
          ))}
          {person.detail}
        </span>
      </span>
    </figcaption>
  )
}

/** A creator quote on a card. */
export function TestimonialCard({
  quote,
  person,
  className,
}: {
  quote: string
  person: Person
  className?: string
}) {
  return (
    <figure
      className={cn(
        "flex flex-col justify-between gap-6 rounded-xl border border-transparent bg-raised p-6 shadow-border",
        className
      )}
    >
      <blockquote className="text-[1.125rem]/[1.5]">“{quote}”</blockquote>
      <Attribution person={person} />
    </figure>
  )
}

/** A single large pull quote for a section of its own. */
export function PullQuote({
  quote,
  person,
}: {
  quote: string
  person: Person
}) {
  return (
    <figure className="flex flex-col gap-4">
      <blockquote className="text-title font-medium">“{quote}”</blockquote>
      <Attribution person={person} />
    </figure>
  )
}
