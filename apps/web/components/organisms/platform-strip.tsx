import { cn } from "@kibo/ui/lib/utils"

import { Container } from "@/components/atoms/container"
import { PlatformIcon, type Platform } from "@/components/atoms/platform-icon"
import { Eyebrow } from "@/components/atoms/typography"

const strip: { platform: Platform; label: string; soon?: boolean }[] = [
  { platform: "youtube", label: "YouTube Live" },
  { platform: "twitch", label: "Twitch" },
  { platform: "kick", label: "Kick", soon: true },
  { platform: "tiktok", label: "TikTok Live", soon: true },
  { platform: "instagram", label: "Instagram Live", soon: true },
  { platform: "discord", label: "Discord", soon: true },
]

/** The "works where you stream" band under the hero. */
export function PlatformStrip() {
  return (
    <section className="border-y border-separator py-8">
      <Container className="flex flex-wrap items-center justify-between gap-6">
        <Eyebrow>Works where you stream</Eyebrow>
        <ul
          aria-label="Supported platforms"
          className="flex flex-wrap items-center gap-8"
        >
          {strip.map((item) => (
            <li
              key={item.platform}
              className={cn(
                "flex items-center gap-2 text-body-sm",
                item.soon ? "text-muted-foreground" : "font-medium"
              )}
            >
              <PlatformIcon platform={item.platform} size="lg" />
              {item.soon ? `${item.label} · soon` : item.label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
