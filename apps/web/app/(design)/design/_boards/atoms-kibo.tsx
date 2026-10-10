import { BellIcon, MessageSquareIcon, ShieldIcon } from "lucide-react"

import { CodeBlock } from "@kibo/ui/components/code-block"
import { Panel, PanelHeader } from "@kibo/ui/components/panel"
import { Code, Eyebrow, Heading, Lede } from "@kibo/ui/components/typography"

import { BrandLogo } from "@/components/atoms/brand-logo"
import { IconTile } from "@/components/atoms/icon-tile"
import { MessageTag, type MessageKind } from "@/components/atoms/message-tag"
import { Placeholder } from "@/components/atoms/placeholder"
import { PlatformIcon, platforms, type Platform } from "@/components/atoms/platform-icon"
import { Prose } from "@/components/atoms/prose"
import { Section } from "@/components/atoms/section"
import { Confidence, SourceChip } from "@/components/atoms/source-chip"
import { Stat } from "@/components/atoms/stat"
import { StatusPill, type StatusTone } from "@/components/atoms/status-pill"

import { Board, Example, Group } from "../_components/showcase"

const tones: StatusTone[] = [
  "live",
  "offline",
  "paused",
  "error",
  "connecting",
  "reconnect",
  "draft",
]

const kinds: MessageKind[] = [
  "question",
  "command",
  "chatter",
  "first-time",
  "sponsor",
  "link",
  "caps",
  "emote-flood",
  "repeat",
  "spam",
  "self-promo",
  "spoiler",
  "toxic",
  "banned-word",
]

export function StatusBoard() {
  return (
    <Board
      id="status-pill"
      layer="Atoms"
      title="Status pill and Message tag"
      description="The one look for bot, stream and integration state: a dot and a word. Message tags label what Pip detected; the kind is the word, the tone groups them."
      importLine='import { StatusPill } from "@/components/atoms/status-pill" · import { MessageTag } from "@/components/atoms/message-tag"'
    >
      <Group title="Status pill · tones × sizes">
        {tones.map((tone) => (
          <Example key={tone} code={`tone="${tone}"`}>
            <StatusPill tone={tone} />
            <StatusPill tone={tone} size="sm" />
          </Example>
        ))}
        <Example code='tone="offline">Ready'>
          <StatusPill tone="offline">Ready</StatusPill>
        </Example>
      </Group>
      <Group title="Message tag · every kind">
        {kinds.map((kind) => (
          <Example key={kind} code={`kind="${kind}"`}>
            <MessageTag kind={kind} />
          </Example>
        ))}
      </Group>
    </Board>
  )
}

export function PlatformBoard() {
  return (
    <Board
      id="platform-icon"
      layer="Atoms"
      title="Platform icon and Icon tile"
      description="Official brand marks on a white tile, never recolored. Icon tiles hold an icon or a step number; the title beside them carries the meaning."
      importLine='import { PlatformIcon } from "@/components/atoms/platform-icon" · import { IconTile } from "@/components/atoms/icon-tile"'
    >
      <Group title="Platform icon · sizes × states">
        <Example code='size="sm" · "lg" · "xl"'>
          <PlatformIcon platform="twitch" />
          <PlatformIcon platform="twitch" size="lg" />
          <PlatformIcon platform="twitch" size="xl" />
        </Example>
        <Example code="muted (Soon)">
          <PlatformIcon platform="kick" size="lg" muted />
        </Example>
        <Example code='status="connected" · "reconnect" · "disconnected"'>
          <PlatformIcon platform="youtube" size="lg" label="YouTube" status="connected" />
          <PlatformIcon platform="twitch" size="lg" label="Twitch" status="reconnect" />
          <PlatformIcon platform="discord" size="lg" label="Discord" status="disconnected" />
        </Example>
      </Group>
      <Group title="The set">
        {(Object.keys(platforms) as Platform[]).map((platform) => (
          <PlatformIcon key={platform} platform={platform} size="lg" label={platforms[platform]} />
        ))}
      </Group>
      <Group title="Icon tile · tones × sizes · steps">
        {(["accent", "neutral", "success", "warning", "danger"] as const).map((tone) => (
          <Example key={tone} code={`tone="${tone}"`}>
            <IconTile tone={tone} size="sm">
              <BellIcon />
            </IconTile>
            <IconTile tone={tone}>
              <MessageSquareIcon />
            </IconTile>
            <IconTile tone={tone} size="lg">
              <ShieldIcon />
            </IconTile>
          </Example>
        ))}
        <Example code="step upcoming · current · done">
          <IconTile size="sm" step={{ number: 4, state: "upcoming" }} />
          <IconTile size="sm" step={{ number: 3, state: "current" }} />
          <IconTile size="sm" step={{ number: 2, state: "done" }} />
        </Example>
      </Group>
    </Board>
  )
}

export function SourceStatBoard() {
  return (
    <Board
      id="source-chip"
      layer="Atoms"
      title="Source chip, Confidence and Stat"
      description="Every answer shows where it came from and how sure Pip was. A Stat is a number, what it counts and how it moved, never color alone."
      importLine='import { SourceChip, Confidence } from "@/components/atoms/source-chip" · import { Stat } from "@/components/atoms/stat"'
    >
      <Group title="Source chip">
        <Example code='kind="faq"'>
          <SourceChip>FAQ · Discord link</SourceChip>
        </Example>
        <Example code='kind="integration"'>
          <SourceChip kind="integration">Google Calendar</SourceChip>
        </Example>
        <Example code='kind="command"'>
          <SourceChip kind="command">!schedule</SourceChip>
        </Example>
        <Example code="why · opens on click">
          <SourceChip
            why={
              <div className="flex flex-col gap-2 text-body-sm">
                <p>
                  Matched <strong>“discord link?”</strong> to the FAQ answer
                  “Discord”.
                </p>
                <Confidence value={92} suffix="sure" />
                <a href="#source-chip" className="text-link">
                  Edit this answer
                </a>
              </div>
            }
          >
            FAQ · Discord link
          </SourceChip>
        </Example>
        <Example code='state="stale"'>
          <SourceChip state="stale">Sponsors 2026</SourceChip>
        </Example>
        <Example code='state="removed"'>
          <SourceChip state="removed">Old schedule</SourceChip>
        </Example>
      </Group>
      <Group title="Confidence">
        <Example code="high">
          <Confidence value={92} suffix="sure" />
        </Example>
        <Example code="medium">
          <Confidence value={71} />
        </Example>
        <Example code="low">
          <Confidence value={54} suffix="· held" />
        </Example>
        <Example code="value={null}">
          <Confidence value={null} />
        </Example>
      </Group>
      <Group title="Stat · sizes × change · states" className="grid w-full grid-cols-4 gap-6 max-lg:grid-cols-2">
        <Stat size="sm" label="Answered" value="142" />
        <Stat
          label="Time saved"
          value="2h 40m"
          change={{ text: "+18% vs last stream", tone: "positive" }}
        />
        <Stat
          label="Messages held"
          value="37"
          change={{ text: "−12 vs last stream", tone: "positive" }}
        />
        <Stat
          size="lg"
          label="Peak viewers"
          value="1,284"
          change={{ text: "−9% vs last week", tone: "negative" }}
        />
        <Stat
          label="Chat activity"
          value="4,812"
          sparkline={{
            values: [12, 18, 15, 32, 48, 41, 56, 62, 44, 38],
            label: "Chat peaked at 9:40 PM",
          }}
        />
        <Stat label="Sponsor clicks" value={null} emptyReason="No sponsor this stream." />
        <Stat label="New chatters" value="" state="loading" />
        <Stat label="Response rate" value="" state="error" />
        <Stat size="xl" labelFirst={false} label="saved per creator each month" value="11 hrs" />
      </Group>
    </Board>
  )
}

export function SurfacesBoard() {
  return (
    <Board
      id="panel"
      layer="Atoms"
      title="Panel, Section, Typography, Prose"
      origin="kibo"
      description="Four containers with one job each. Section is the marketing band. Heading size is set apart from its level. Prose styles every element of rendered Markdown."
      importLine='import { Panel } · { Heading, Eyebrow, Lede, Code } · { CodeBlock } from "@kibo/ui/components/…" · import { Section, Prose } from "@/components/atoms/…"'
    >
      <Group title="Panel variants on bg-page" className="grid w-full grid-cols-4 gap-6 max-lg:grid-cols-2">
        <Panel>
          <PanelHeader>
            <h3 className="text-heading">Panel</h3>
          </PanelHeader>
          <p className="text-muted-foreground">A unit of content on a page.</p>
          <Panel variant="well">Well inside a panel</Panel>
        </Panel>
        <Panel variant="surface">Surface groups panels.</Panel>
        <Panel variant="raised" className="p-5">
          Raised floats above everything.
        </Panel>
        <Panel interactive selected>
          Selectable panel, selected
        </Panel>
      </Group>
      <Group title="Section tones" className="w-full flex-col items-stretch gap-0 overflow-hidden rounded-xl">
        {(["default", "alt", "dark"] as const).map((tone) => (
          <Section key={tone} tone={tone} className="py-8 max-sm:py-8">
            <p className="px-6">tone=&quot;{tone}&quot;</p>
          </Section>
        ))}
      </Group>
      <Group title="Typography">
        <div className="flex flex-col gap-3">
          <Eyebrow>Answers</Eyebrow>
          <Heading as="h3" size="hero">
            Focus on creating.
          </Heading>
          <Heading as="h3" size="display">
            Moderation
          </Heading>
          <Heading as="h3" size="title">
            Rules and filters
          </Heading>
          <Heading as="h3" size="heading">
            Hydrafuel campaign
          </Heading>
          <Lede>
            Pip answers repeat questions from your FAQ, so you can keep your
            eyes on the game.
          </Lede>
          <p>
            Type <Code>!discord</Code> in chat.
          </p>
          <CodeBlock
            code="https://kibo.gg/overlay/ws_8KdQ2m/chat?theme=dark"
            copyLabel="Copy overlay URL"
          />
        </div>
      </Group>
      <Group title="Prose">
        <Prose>
          <h2>Which widgets can I show?</h2>
          <p>
            Add the <a href="#panel">chat widget</a> as a browser source in
            OBS. It shows Pip’s answers as viewers see them.
          </p>
          <ol>
            <li>
              Copy the overlay URL from <b>Overlays</b>.
            </li>
            <li>
              In OBS, add a <code>Browser</code> source.
            </li>
          </ol>
          <blockquote>Pip only shows answers it already posted in chat.</blockquote>
          <table>
            <thead>
              <tr>
                <th>Widget</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chat with answers</td>
                <td>400 × 600</td>
              </tr>
            </tbody>
          </table>
        </Prose>
      </Group>
      <Group title="Brand logo · Placeholder">
        <Example code='size="md"'>
          <BrandLogo />
        </Example>
        <Example code='size="sm"'>
          <BrandLogo size="sm" />
        </Example>
        <Example code="markOnly">
          <BrandLogo markOnly />
        </Example>
        <Example code='ratio="4/3"' className="w-64">
          <Placeholder label="Blog cover: raid protection settings" ratio="4/3" className="w-full" />
        </Example>
      </Group>
    </Board>
  )
}
