import { cn } from "@kibo/ui/lib/utils"

export const platforms = {
  youtube: "YouTube Live",
  twitch: "Twitch",
  kick: "Kick",
  tiktok: "TikTok Live",
  instagram: "Instagram Live",
  discord: "Discord",
  obs: "OBS",
  streamlabs: "Streamlabs",
  elgato: "Elgato Stream Deck",
  "facebook-gaming": "Facebook Gaming",
  notion: "Notion",
  "google-drive": "Google Drive",
  linktree: "Linktree",
  "google-calendar": "Google Calendar",
  spotify: "Spotify",
  steam: "Steam",
  riot: "Riot Games",
  igdb: "IGDB",
  patreon: "Patreon",
  "ko-fi": "Ko-fi",
  "buy-me-a-coffee": "Buy Me a Coffee",
  shopify: "Shopify",
  x: "X",
  bluesky: "Bluesky",
  slack: "Slack",
  telegram: "Telegram",
  zapier: "Zapier",
  make: "Make",
  google: "Google",
} as const

export type Platform = keyof typeof platforms

const sizes = {
  sm: "size-[22px] rounded-sm p-1",
  lg: "size-10 rounded-md p-[9px]",
  xl: "size-14 rounded-lg p-[13px]",
}

/**
 * A brand mark on a white tile, so official colors read in both themes.
 * Pass `label` when the icon carries meaning on its own; omit it when text
 * beside the icon already names the platform.
 */
const statusDots = {
  connected: { className: "bg-success", word: "connected" },
  disconnected: { className: "bg-border-strong", word: "not connected" },
  reconnect: { className: "bg-warning", word: "needs reconnect" },
}

/**
 * A brand mark on a white tile, so official colors read in both themes.
 * Pass `label` when the icon carries meaning on its own; omit it when text
 * beside the icon already names the platform. `muted` is for platforms that
 * are coming soon and always sits next to a Soon label. `status` adds a
 * connection dot, and its word joins the label.
 */
export function PlatformIcon({
  platform,
  size = "sm",
  label,
  muted = false,
  status,
  className,
}: {
  platform: Platform
  size?: keyof typeof sizes
  label?: string
  muted?: boolean
  status?: keyof typeof statusDots
  className?: string
}) {
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/brands/${platform}.svg`}
      alt={
        label && status ? `${label}, ${statusDots[status].word}` : (label ?? "")
      }
      width={24}
      height={24}
      className={cn(
        "inline-block shrink-0 bg-white object-contain align-middle shadow-[inset_0_0_0_1px_var(--vi-border-subtle)]",
        sizes[size],
        muted && "opacity-55 grayscale",
        !status && className
      )}
    />
  )

  if (!status) {
    return image
  }

  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      {image}
      <span
        aria-hidden="true"
        className={cn(
          "absolute -inset-e-0.5 -bottom-0.5 rounded-full ring-2 ring-page",
          size === "sm" ? "size-2" : "size-3",
          statusDots[status].className
        )}
      />
    </span>
  )
}

/** A neutral tile for sources with no brand mark, such as a website or CSV. */
export function GlyphTile({
  children,
  size = "lg",
  className,
}: {
  children: React.ReactNode
  size?: keyof typeof sizes
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-grid shrink-0 place-items-center bg-sunken text-foreground shadow-[inset_0_0_0_1px_var(--vi-border-subtle)] [&_svg]:size-5",
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
