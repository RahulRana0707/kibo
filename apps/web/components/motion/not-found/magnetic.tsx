"use client"

import { Magnetic } from "@/components/motion/magnetic"
import { cn } from "@kibo/ui/lib/utils"
import {
  NOT_FOUND_DEFAULTS,
  NotFoundActions,
  NotFoundStage,
  type NotFoundProps,
} from "./shared"

export function NotFoundMagnetic({
  className,
  code = NOT_FOUND_DEFAULTS.code,
  title = NOT_FOUND_DEFAULTS.title,
  description = NOT_FOUND_DEFAULTS.description,
  homeHref,
  homeLabel,
  browseHref,
  browseLabel,
}: NotFoundProps) {
  const chars = code.split("")

  return (
    <NotFoundStage className={className}>
      <h1
        aria-label={code}
        className="flex items-center justify-center font-heading [font-size:clamp(5rem,18vw,12rem)] leading-none font-bold tracking-tighter text-foreground select-none"
      >
        {chars.map((char, index) => (
          <Magnetic
            key={`${char}-${index}`}
            strength={0.6}
            className={cn(index > 0 && "-ml-2")}
          >
            <span aria-hidden className="inline-block px-1 tabular-nums">
              {char}
            </span>
          </Magnetic>
        ))}
      </h1>

      <div className="flex flex-col items-center gap-2">
        <p className="text-lg font-semibold text-foreground">{title}</p>
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>

      <NotFoundActions
        homeHref={homeHref}
        homeLabel={homeLabel}
        browseHref={browseHref}
        browseLabel={browseLabel}
      />
    </NotFoundStage>
  )
}
