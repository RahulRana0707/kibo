import {
  ArrowRightIcon,
  DownloadIcon,
  PauseIcon,
  PlusIcon,
  SearchIcon,
  SparklesIcon,
  Trash2Icon,
  UserIcon,
  CircleCheckIcon,
  TriangleAlertIcon,
  CircleAlertIcon,
  InfoIcon,
} from "lucide-react"

import { Avatar, AvatarGroup, AvatarGroupCount } from "@kibo/ui/components/avatar"
import { Badge } from "@kibo/ui/components/badge"
import { Button } from "@kibo/ui/components/button"
import { Chip, ChipButton } from "@kibo/ui/components/chip"
import { Kbd, KbdGroup } from "@kibo/ui/components/kbd"
import { DividerText, Separator } from "@kibo/ui/components/separator"
import { Skeleton } from "@kibo/ui/components/skeleton"
import { SoonLabel } from "@kibo/ui/components/soon-label"
import { Spinner } from "@kibo/ui/components/spinner"
import { Meter, Progress, StrengthMeter } from "@kibo/ui/components/meter"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@kibo/ui/components/tooltip"

import { PlatformIcon } from "@/components/atoms/platform-icon"

import { Board, Example, Group } from "../_components/showcase"

const variants = [
  ["primary", "Save command"],
  ["secondary", "Export CSV"],
  ["ghost", "Cancel"],
  ["destructive", "Delete bot"],
  ["link", "Reset password"],
] as const

const sizes = ["xs", "sm", "default", "lg"] as const

export function ButtonBoard() {
  return (
    <Board
      id="button"
      layer="Atoms"
      title="Button"
      origin="violet"
      description="Starts an action. One primary per view. Navigation that looks like a button is a link with the same classes (asChild)."
      importLine='import { Button } from "@kibo/ui/components/button"'
    >
      <Group title="Variants × sizes">
        <div className="grid grid-cols-[80px_repeat(5,minmax(0,1fr))] items-center gap-4 max-lg:overflow-x-auto">
          <span />
          {variants.map(([variant]) => (
            <span key={variant} className="text-caption text-muted-foreground">
              {variant}
            </span>
          ))}
          {sizes.map((size) => (
            <div key={size} className="contents">
              <span className="font-mono text-[0.75rem] text-muted-foreground">
                {size}
              </span>
              {variants.map(([variant, label]) => (
                <div key={variant}>
                  <Button variant={variant} size={size}>
                    {label}
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Group>
      <Group title="States · size default">
        {variants.slice(0, 4).map(([variant, label]) => (
          <div key={variant} className="flex flex-wrap items-center gap-3">
            <Button variant={variant}>{label}</Button>
            <Button variant={variant} disabled>
              {label}
            </Button>
            <Button variant={variant} loading>
              {variant === "destructive" ? "Deleting…" : "Saving…"}
            </Button>
            <Button variant={variant} soon>
              {label}
            </Button>
          </div>
        ))}
        <p className="w-full text-caption text-muted-foreground">
          Rows: default · disabled · loading · soon (aria-disabled, reason
          written nearby). Hover, focus and press are live.
        </p>
      </Group>
      <Group title="Icon buttons · always with an aria-label and a tooltip">
        {(["icon-xs", "icon-sm", "icon", "icon-lg"] as const).map((size) => (
          <Example key={size} code={`size="${size}"`}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size={size} aria-label="Search">
                  <SearchIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Search</TooltipContent>
            </Tooltip>
            <Button variant="secondary" size={size} aria-label="Pause bot">
              <PauseIcon />
            </Button>
          </Example>
        ))}
      </Group>
      <Group title="With icons, full width, on a dark section">
        <Example code="icon start">
          <Button data-icon="inline-start">
            <PlusIcon />
            Add item
          </Button>
        </Example>
        <Example code="icon end">
          <Button variant="secondary">
            Continue
            <ArrowRightIcon />
          </Button>
        </Example>
        <Example code="destructive names the object">
          <Button variant="destructive">
            <Trash2Icon />
            Delete bot
          </Button>
        </Example>
        <Example code='size="lg" block' className="w-80">
          <Button size="lg" block>
            Create account
          </Button>
        </Example>
        <div className="dark flex gap-3 rounded-xl bg-page p-6">
          <Button>Start free trial</Button>
          <Button variant="secondary">
            <DownloadIcon />
            Watch the demo
          </Button>
        </div>
      </Group>
    </Board>
  )
}

export function BadgeBoard() {
  return (
    <Board
      id="badge"
      layer="Atoms"
      title="Badge"
      origin="violet"
      description="A short, non-interactive label: plan, role, state, count. Interactive pills are Chips; bot and platform state is the Status pill."
      importLine='import { Badge } from "@kibo/ui/components/badge"'
    >
      <Group title="Variants · one size, 24">
        <Example code='variant="default"'>
          <Badge>
            <UserIcon />
            Starter
          </Badge>
        </Example>
        <Example code='variant="accent"'>
          <Badge variant="accent">
            <SparklesIcon />
            Current plan
          </Badge>
        </Example>
        <Example code='variant="success"'>
          <Badge variant="success">
            <CircleCheckIcon />
            Connected
          </Badge>
        </Example>
        <Example code='variant="warning"'>
          <Badge variant="warning">
            <TriangleAlertIcon />
            Reconnect
          </Badge>
        </Example>
        <Example code='variant="destructive"'>
          <Badge variant="destructive">
            <CircleAlertIcon />
            Past due
          </Badge>
        </Example>
        <Example code='variant="outline"'>
          <Badge variant="outline">
            <InfoIcon />
            Example
          </Badge>
        </Example>
      </Group>
      <Group title="Count, Soon and New">
        <Example code="count={3}">
          <Badge variant="accent" count={3} />
        </Example>
        <Example code="count={12} max={9}">
          <Badge variant="accent" count={12} max={9} />
        </Example>
        <Example code="<SoonLabel />">
          <SoonLabel />
        </Example>
        <Example code='variant="accent"'>
          <Badge variant="accent">New</Badge>
        </Example>
      </Group>
    </Board>
  )
}

export function AvatarBoard() {
  const sizes = ["xs", "sm", "default", "md", "lg", "xl"] as const
  return (
    <Board
      id="avatar"
      layer="Atoms"
      title="Avatar"
      origin="kibo"
      description="A person, viewer, workspace or bot. Image when we have one, otherwise one or two initials. Bots use the accent tint so they never look like a person."
      importLine='import { Avatar, AvatarGroup } from "@kibo/ui/components/avatar"'
    >
      <Group title="Sizes × kinds">
        {sizes.map((size) => (
          <Example key={size} code={`size="${size}"`}>
            <Avatar size={size} name="Mira Okafor" />
            <Avatar size={size} name="Pip" variant="bot" />
            <Avatar size={size} name="Mira Okafor" shape="square" />
          </Example>
        ))}
      </Group>
      <Group title="Group with count · status dots · platform badge">
        <Example code="<AvatarGroup> + <AvatarGroupCount count={2} />">
          <AvatarGroup>
            <Avatar name="Mira Okafor" />
            <Avatar name="Dev Kapoor" />
            <Avatar name="Ananya Rao" />
            <AvatarGroupCount count={2} />
          </AvatarGroup>
        </Example>
        <Example code='status="live" · "paused" · "offline"'>
          <Avatar name="Pip" variant="bot" status="live" />
          <Avatar name="Pip" variant="bot" status="paused" />
          <Avatar name="Pip" variant="bot" status="offline" />
        </Example>
        <Example code="badge={<PlatformIcon />}">
          <Avatar
            name="GG Rohan"
            size="lg"
            badge={<PlatformIcon platform="twitch" />}
          />
        </Example>
      </Group>
    </Board>
  )
}

export function TooltipKbdBoard() {
  return (
    <Board
      id="tooltip"
      layer="Atoms"
      title="Tooltip and Kbd"
      origin="kibo"
      description="Tooltips name icon-only controls or add a shortcut; never the only copy of important information. Kbd shows ⌘ on Mac and Ctrl elsewhere."
      importLine='import { Tooltip } from "@kibo/ui/components/tooltip" · import { Kbd, KbdGroup } from "@kibo/ui/components/kbd"'
    >
      <Group title="Sides · with a shortcut">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="sm">
                {side}
              </Button>
            </TooltipTrigger>
            <TooltipContent side={side}>Help and support</TooltipContent>
          </Tooltip>
        ))}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" size="icon" aria-label="Pause bot">
              <PauseIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Pause bot
            <KbdGroup keys={["shift", "p"]} />
          </TooltipContent>
        </Tooltip>
      </Group>
      <Group title="Kbd">
        <Example code='<KbdGroup keys={["mod", "k"]} />'>
          <KbdGroup keys={["mod", "k"]} />
        </Example>
        <Example code="<Kbd>Esc</Kbd>">
          <Kbd>Esc</Kbd>
          <Kbd>↵</Kbd>
        </Example>
      </Group>
    </Board>
  )
}

export function FeedbackAtomsBoard() {
  return (
    <Board
      id="feedback-atoms"
      layer="Atoms"
      title="Separator, Skeleton, Spinner, Meter"
      origin="kibo"
      description="Separators divide content, never controls. Skeletons are for first load and appear after 300ms. Spinners for work under ten seconds. Meters show a known amount with the value written."
      importLine='import { Separator, DividerText } · { Skeleton } · { Spinner } · { Meter, Progress, StrengthMeter } from "@kibo/ui/components/…"'
    >
      <Group title="Separator">
        <div className="flex w-80 flex-col gap-4">
          <Separator />
          <DividerText>or with email</DividerText>
          <div className="flex h-6 items-center gap-3 text-caption">
            Help
            <Separator orientation="vertical" />
            Status
          </div>
        </div>
      </Group>
      <Group title="Skeleton">
        <Example code='variant="text"' className="w-64">
          <Skeleton variant="text" className="w-full" />
        </Example>
        <Example code='variant="avatar-line"' className="w-64">
          <Skeleton variant="avatar-line" className="w-full" />
        </Example>
        <Example code='variant="card"' className="w-64">
          <Skeleton variant="card" className="w-full" />
        </Example>
        <Example code='variant="row"' className="w-96">
          <Skeleton variant="row" className="w-full" />
        </Example>
        <Example code='variant="chart"' className="w-64">
          <Skeleton variant="chart" className="w-full" />
        </Example>
      </Group>
      <Group title="Spinner">
        <Example code='size="sm"'>
          <Spinner />
        </Example>
        <Example code='size="md"'>
          <Spinner size="md" />
        </Example>
        <Example code="on accent">
          <span className="inline-flex size-10 items-center justify-center rounded-md bg-primary text-on-accent">
            <Spinner />
          </span>
        </Example>
      </Group>
      <Group title="Meter and progress" className="grid w-full grid-cols-2 gap-8 max-md:grid-cols-1">
        <div className="flex flex-col gap-3">
          <Meter value={64} />
          <Meter value={64} tone="success" />
          <Meter value={64} tone="warning" />
          <Meter value={64} tone="danger" />
          <Meter value={64} size="thin" />
        </div>
        <div className="flex flex-col gap-4">
          <Meter label="AI replies" value={9610} max={15000} usage valueText="9,610 / 15,000" />
          <Meter label="Knowledge items" value={920} max={1000} usage />
          <Meter label="Bots" value={1} max={1} usage valueText="1 / 1" />
          <StrengthMeter strength="weak" />
          <StrengthMeter strength="fair" />
          <StrengthMeter strength="strong" />
          <Progress label="Importing faq.csv" value={42} />
          <Progress label="Exporting viewers" />
        </div>
      </Group>
    </Board>
  )
}

export function ChipBoard() {
  return (
    <Board
      id="chip"
      layer="Atoms"
      title="Chip"
      origin="kibo"
      description="An interactive pill: filter toggles, onboarding choices, removable values. If pressing it does nothing, it’s a Badge."
      importLine='import { Chip, ChipButton, RemovableChip } from "@kibo/ui/components/chip"'
    >
      <Group title="States">
        <Example code="ChipButton">
          <ChipButton>Gaming</ChipButton>
        </Example>
        <Example code="selected">
          <ChipButton selected>Music</ChipButton>
        </Example>
        <Example code="with logo">
          <ChipButton selected>
            <PlatformIcon platform="youtube" />
            YouTube Live
          </ChipButton>
        </Example>
        <Example code='variant="add"'>
          <Chip variant="add">
            <PlusIcon />
            Add language
          </Chip>
        </Example>
        <Example code="soon">
          <ChipButton soon>
            <PlatformIcon platform="kick" muted />
            Kick
          </ChipButton>
        </Example>
      </Group>
    </Board>
  )
}
