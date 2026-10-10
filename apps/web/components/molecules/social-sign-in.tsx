import { Button } from "@kibo/ui/components/button"

import { PlatformIcon, type Platform } from "@/components/atoms/platform-icon"

const providers: { platform: Platform; label: string }[] = [
  { platform: "google", label: "Google" },
  { platform: "twitch", label: "Twitch" },
  { platform: "youtube", label: "YouTube" },
]

/**
 * Sign-in with Google, Twitch and YouTube. Not connected yet, so each button
 * is disabled and the reason is written beside it.
 */
export function SocialSignIn() {
  return (
    <div className="flex flex-col gap-3">
      {providers.map((provider) => (
        <Button
          key={provider.platform}
          type="button"
          variant="secondary"
          disabled
          aria-describedby="social-sign-in-note"
          className="w-full disabled:bg-raised disabled:shadow-border"
        >
          <PlatformIcon platform={provider.platform} className="opacity-60" />
          Continue with {provider.label}
        </Button>
      ))}
      <p
        id="social-sign-in-note"
        className="text-center text-caption text-muted-foreground"
      >
        Google, Twitch and YouTube sign-in are coming soon.
      </p>
    </div>
  )
}
