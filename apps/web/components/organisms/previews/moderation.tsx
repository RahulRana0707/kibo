import { DemoButton } from "@/components/atoms/demo-button"
import { MessageTag } from "@/components/atoms/message-tag"
import { Panel } from "@kibo/ui/components/panel"
import {
  PlatformIcon,
  platforms,
  type Platform,
} from "@/components/atoms/platform-icon"
import { ListRow } from "@/components/molecules/list-row"

const log: {
  platform: Platform
  tag: string
  tone: "spam" | "toxic" | "neutral"
  text: string
  action: string
}[] = [
  {
    platform: "youtube",
    tag: "Spam",
    tone: "spam",
    text: "free_vbux_now · “FREE SKINS at…”",
    action: "Deleted",
  },
  {
    platform: "twitch",
    tag: "Toxic",
    tone: "toxic",
    text: "saltyspud · disguised slur",
    action: "Timeout 10m",
  },
  {
    platform: "twitch",
    tag: "Link",
    tone: "neutral",
    text: "kvn.exe · bit.ly link",
    action: "Deleted",
  },
  {
    platform: "youtube",
    tag: "Flood",
    tone: "neutral",
    text: "shadowfax_tv · emoji ×40",
    action: "Warned",
  },
]

/** Recent moderation actions, each with Undo. */
export function ModerationLog() {
  return (
    <Panel>
      <div className="flex items-center justify-between gap-3">
        <p className="font-medium">Moderation log</p>
        <span className="text-caption text-muted-foreground">
          Last 10 minutes
        </span>
      </div>
      <div>
        {log.map((item) => (
          <ListRow
            key={item.text}
            leading={
              <>
                <PlatformIcon
                  platform={item.platform}
                  label={platforms[item.platform]}
                />
                <MessageTag tone={item.tone}>{item.tag}</MessageTag>
              </>
            }
            trailing={
              <>
                <span className="text-caption">{item.action}</span>
                <DemoButton variant="ghost">Undo</DemoButton>
              </>
            }
          >
            <span className="text-caption">{item.text}</span>
          </ListRow>
        ))}
      </div>
    </Panel>
  )
}

const recent = [
  {
    tag: "Spam",
    tone: "spam" as const,
    text: "free_vbux_now · link to giveaway scam",
    action: "Deleted",
  },
  {
    tag: "Toxic",
    tone: "toxic" as const,
    text: "saltyspud · slur, disguised spelling",
    action: "Timed out 10m",
  },
  {
    tag: "Caps",
    tone: "neutral" as const,
    text: "kvn.exe · ALL CAPS ×6",
    action: "Warned",
  },
]

/** Three recent catches, for the product overview. */
export function ModerationSnippet() {
  return (
    <Panel>
      <div>
        {recent.map((item) => (
          <ListRow
            key={item.text}
            leading={<MessageTag tone={item.tone}>{item.tag}</MessageTag>}
            trailing={
              <span className="text-caption text-muted-foreground">
                {item.action}
              </span>
            }
          >
            {item.text}
          </ListRow>
        ))}
      </div>
    </Panel>
  )
}
