"use client"

import { useId } from "react"

import { Button } from "@kibo/ui/components/button"
import { SoonLabel } from "@kibo/ui/components/soon-label"
import { cn } from "@kibo/ui/lib/utils"

import { PlatformIcon } from "@/components/atoms/platform-icon"

const providerNames = {
  google: "Google",
  twitch: "Twitch",
  youtube: "YouTube",
}

type Provider = keyof typeof providerNames

/**
 * Continue with Google or Twitch on sign up and log in. Today it is not
 * available yet: every button is aria-disabled with a Soon label and one
 * shared reason under the group. YouTube stays out until it exists.
 */
export function SocialSignIn({
  providers = ["google", "twitch"],
  onSelect,
  connecting,
}: {
  providers?: Provider[]
  /** When set, the buttons work. Leave unset while sign-in is Soon. */
  onSelect?: (provider: Provider) => void
  /** The provider being connected to, which shows a spinner. */
  connecting?: Provider
}) {
  const reasonId = useId()
  const soon = !onSelect

  return (
    <div className="flex flex-col gap-3">
      {providers.map((provider) => {
        const name = providerNames[provider]
        const busy = connecting === provider
        return (
          <Button
            key={provider}
            type="button"
            variant="secondary"
            block
            loading={busy}
            aria-disabled={soon || undefined}
            aria-describedby={soon ? reasonId : undefined}
            onClick={() => {
              if (!soon && !connecting) onSelect(provider)
            }}
            className={cn(
              "max-sm:h-12",
              soon && "aria-disabled:bg-raised aria-disabled:shadow-border"
            )}
          >
            {busy ? null : (
              <PlatformIcon platform={provider} muted={soon} />
            )}
            {busy ? `Connecting to ${name}…` : `Continue with ${name}`}
            {soon ? <SoonLabel /> : null}
          </Button>
        )
      })}
      {soon ? (
        <p id={reasonId} className="text-center text-caption text-muted-foreground">
          Google and Twitch sign-in are coming soon.
        </p>
      ) : null}
    </div>
  )
}
