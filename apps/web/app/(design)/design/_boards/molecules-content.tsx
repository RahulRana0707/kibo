import {
  BookOpenIcon,
  MessageSquareIcon,
  ShieldIcon,
} from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import { Callout } from "@kibo/ui/components/callout"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@kibo/ui/components/empty"
import { Pagination } from "@kibo/ui/components/pagination"
import { Panel } from "@kibo/ui/components/panel"

import { MessageTag } from "@/components/atoms/message-tag"
import { PlatformIcon } from "@/components/atoms/platform-icon"
import { StatusPill } from "@/components/atoms/status-pill"
import { Breadcrumbs } from "@/components/molecules/breadcrumbs"
import { ChangeItem, ChangeList } from "@/components/molecules/change-item"
import { ChatFeed, ChatMessage } from "@/components/molecules/chat-message"
import {
  BarChart,
  ChartAxis,
  ChartLegend,
  ChartState,
  ChartTooltip,
  DonutChart,
  Heatmap,
  LineChart,
  MoodChart,
  Sparkline,
} from "@/components/molecules/charts"
import { CheckList } from "@/components/molecules/check-list"
import { DetailList } from "@/components/molecules/detail-list"
import { FeatureItem, FeatureLinkCard } from "@/components/molecules/feature"
import {
  AppIntegrationCard,
  IntegrationCard,
} from "@/components/molecules/integration-card"
import { LinkList } from "@/components/molecules/link-list"
import { ListRow } from "@/components/molecules/list-row"
import { NotificationItem } from "@/components/molecules/notification-item"
import { OnboardingStepper } from "@/components/molecules/onboarding-stepper"
import { PlanCard } from "@/components/molecules/plan-card"
import { SectionHeading } from "@/components/molecules/section-heading"
import { SetupChecklist } from "@/components/molecules/setup-checklist"
import { SideNav, TabLinks } from "@/components/molecules/tab-links"
import { integrations } from "@/lib/marketing/integrations"
import { plans } from "@/lib/marketing/plans"

import { Board, Group } from "../_components/showcase"

const youtube = integrations.find((item) => item.slug === "youtube")!
const twitch = integrations.find((item) => item.slug === "twitch")!
const kick = integrations.find((item) => item.slug === "kick")!
const discord = integrations.find((item) => item.slug === "discord")!

export function FeedbackBoard() {
  return (
    <Board
      id="callout"
      layer="Molecules"
      title="Callout and Empty state"
      origin="violet"
      description="A callout is an inline message tied to the content around it; page-wide state is a System banner, confirmations are Toasts. An empty state says what will appear and gives the one action that makes it appear."
      importLine='import { Callout } · { Empty, EmptyMedia, … } from "@kibo/ui/components/…"'
    >
      <Group title="Callout · tones × layouts" className="grid w-full grid-cols-2 gap-4 max-lg:grid-cols-1">
        <Callout tone="info">Pip only answers questions in your knowledge base.</Callout>
        <Callout tone="success" title="Twitch connected">
          Pip can read and reply in miraplays’ chat.
        </Callout>
        <Callout tone="warning">Too many attempts. Wait a minute and try again.</Callout>
        <Callout
          tone="danger"
          title="Fix 2 things to continue"
          tabIndex={-1}
        >
          <ul className="list-disc ps-5">
            <li>
              <a href="#callout">Enter your name.</a>
            </li>
            <li>
              <a href="#callout">Use at least 10 characters.</a>
            </li>
          </ul>
        </Callout>
        <Callout
          tone="info"
          title="Approval mode is on"
          action={<Button variant="secondary" size="sm">Review settings</Button>}
        >
          Every reply waits for you before Pip posts it.
        </Callout>
      </Group>
      <Group title="Empty state · inside a card · table · full page" className="grid w-full grid-cols-3 gap-6 max-lg:grid-cols-1">
        <Panel>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <BookOpenIcon />
              </EmptyMedia>
              <EmptyTitle>No knowledge yet</EmptyTitle>
              <EmptyDescription>
                Pip answers from what you add here: FAQs, links, your schedule.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button size="sm">Add an answer</Button>
              <Button variant="secondary" size="sm">Import</Button>
            </EmptyContent>
          </Empty>
        </Panel>
        <Panel flush>
          <Empty size="table">
            <EmptyHeader>
              <EmptyMedia variant="neutral">
                <MessageSquareIcon />
              </EmptyMedia>
              <EmptyTitle>No viewers match “raid”</EmptyTitle>
              <EmptyDescription>Try another name or clear the search.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="ghost" size="sm">Clear search</Button>
            </EmptyContent>
          </Empty>
        </Panel>
        <Panel>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="success">
                <ShieldIcon />
              </EmptyMedia>
              <EmptyTitle>Queue cleared</EmptyTitle>
              <EmptyDescription>Nothing is waiting for review.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button size="sm" soon aria-describedby="sched-reason">
                Schedule a stream
              </Button>
            </EmptyContent>
            <p id="sched-reason" className="text-caption text-muted-foreground">
              Scheduling opens in November.
            </p>
          </Empty>
        </Panel>
      </Group>
    </Board>
  )
}

export function NavigationBoard() {
  return (
    <Board
      id="navigation"
      layer="Molecules"
      title="Breadcrumbs, Tab links, Side nav, Pagination, Onboarding stepper"
      description="Breadcrumbs only on pages two or more levels deep. TabLinks sit under a page header; SideNav is for Settings and Help. Pagination pages through long tables, 25 rows a page."
      importLine='import { Breadcrumbs } · { TabLinks, SideNav } · { OnboardingStepper } from "@/components/molecules/…" · import { Pagination } from "@kibo/ui/components/pagination"'
    >
      <Group title="Breadcrumbs">
        <Breadcrumbs items={[{ label: "Bots", href: "#navigation" }, { label: "Pip" }]} />
        <Breadcrumbs
          items={[
            { label: "Help", href: "#navigation" },
            { label: "Overlays", href: "#navigation" },
            { label: "OBS", href: "#navigation" },
            { label: "Which widgets can I show?" },
          ]}
        />
      </Group>
      <Group title="TabLinks · counts · Soon">
        <TabLinks
          label="Knowledge sections"
          className="w-full"
          items={[
            { href: "#a", label: "All items", current: true },
            { href: "#b", label: "Sources" },
            { href: "#c", label: "Unanswered", count: 12, countTone: "warning" },
            { href: "#d", label: "Suggested", count: 5 },
            { href: "#e", label: "Health", soonReason: "Knowledge health is coming soon." },
          ]}
        />
      </Group>
      <Group title="SideNav">
        <SideNav
          label="Settings"
          className="w-56"
          groups={[
            {
              label: "Account",
              items: [
                { href: "#p", label: "Profile", current: true },
                { href: "#s", label: "Security" },
                { href: "#n", label: "Notifications", soonReason: "Notification settings are coming soon." },
              ],
            },
            {
              label: "Workspace",
              items: [
                { href: "#m", label: "Members", count: 3 },
                { href: "#b", label: "Billing", soonReason: "Billing is coming soon." },
              ],
            },
          ]}
        />
        <SideNav
          title="Overlays"
          label="Articles in this topic"
          className="w-60"
          items={[
            { href: "#1", label: "Which widgets can I show?", current: true },
            { href: "#2", label: "Add the chat widget to OBS" },
          ]}
        />
      </Group>
      <Group title="Pagination" className="flex-col items-stretch">
        <Pagination page={1} total={312} href={(page) => `#page-${page}`} noun="viewers" />
        <Pagination page={6} total={312} href={(page) => `#page-${page}`} noun="viewers" />
        <Pagination page={13} total={312} href={(page) => `#page-${page}`} noun="viewers" loading />
        <Pagination page={1} total={18} href={(page) => `#page-${page}`} noun="viewers" />
      </Group>
      <Group title="Onboarding stepper · bar and list" className="grid w-full grid-cols-2 gap-8 max-lg:grid-cols-1">
        <OnboardingStepper step={3} />
        <OnboardingStepper step={3} variant="list" />
      </Group>
    </Board>
  )
}

export function ListsBoard() {
  return (
    <Board
      id="lists"
      layer="Molecules"
      title="Section heading, Check list, Detail list, List row, Link list"
      description="Content blocks for marketing and app pages. List row is the building block for settings lists, integrations, bots and members."
      importLine='import { SectionHeading } · { CheckList } · { DetailList } · { ListRow } · { LinkList } from "@/components/molecules/…"'
    >
      <Group title="Section heading" className="grid w-full grid-cols-2 gap-8 max-lg:grid-cols-1">
        <SectionHeading eyebrow="Answers" title="Replies from your FAQ" lede="Pip answers repeat questions, so you keep playing." />
        <SectionHeading
          size="title"
          title="Recent streams"
          action={<Button variant="ghost" size="sm">View all</Button>}
        />
        <SectionHeading align="center" size="title" title="Pick the plan your chat needs" lede="14-day free trial on every plan." action={<Button variant="secondary">Compare plans</Button>} />
      </Group>
      <Group title="Check list · sizes · excluded">
        <CheckList size="sm" items={["1 bot", "2,000 AI replies"]} />
        <CheckList items={["14-day free trial", "Approval mode", { text: "Custom roles", included: false }]} />
        <CheckList size="lg" items={["Pause any time", "Every action logged"]} />
      </Group>
      <Group title="Detail list" className="grid w-full grid-cols-3 gap-8 max-lg:grid-cols-1">
        <DetailList
          items={[
            { term: "Reply mode", value: "Auto above 85%" },
            { term: "Cooldown per viewer", value: "30 s" },
            { term: "Discord invite", value: null },
          ]}
        />
        <DetailList
          total
          items={[
            { term: "Creator, monthly", value: "$24.00" },
            { term: "Starter credit", value: "−$3.90" },
            { term: "GST 18%", value: "$3.62" },
            { term: "Due Oct 19", value: "$23.72" },
          ]}
        />
        <DetailList
          items={[
            { term: "Channel", value: "miraplays" },
            { term: "Channel ID", value: "UC7m2Pq…k9A", copy: "UC7m2PqXa81k9A" },
          ]}
        />
      </Group>
      <Group title="List row" className="grid w-full grid-cols-2 gap-8 max-lg:grid-cols-1">
        <div className="flex flex-col">
          <ListRow
            leading={<PlatformIcon platform="youtube" size="lg" />}
            title="YouTube Live"
            detail="miraplays · connected Oct 2"
            trailing={<StatusPill tone="live" size="sm">Connected</StatusPill>}
          />
          <ListRow
            leading={<PlatformIcon platform="twitch" size="lg" />}
            title="Twitch"
            detail="Login expired Oct 9"
            trailing={<Button variant="secondary" size="xs">Reconnect</Button>}
          />
          <ListRow href="#lists" title="Security" detail="Password and sessions" />
          <ListRow title="Billing" detail="Coming soon" disabled />
        </div>
        <div className="flex gap-10">
          <LinkList
            title="Product"
            links={[
              { href: "#a", label: "AI Answers" },
              { href: "#b", label: "Moderation", current: true },
              { href: "#c", label: "API docs", external: true },
            ]}
          />
          <LinkList
            title="Related articles"
            tone="accent"
            links={[
              { href: "#d", label: "Add the chat widget to OBS" },
              { href: "#e", label: "Choose a reply mode" },
            ]}
          />
        </div>
      </Group>
    </Board>
  )
}

export function ChatBoard() {
  return (
    <Board
      id="chat"
      layer="Molecules"
      title="Chat message and feed"
      description="One row per chat event from YouTube and Twitch, plus Pip’s replies and system notes. Used in the live console, moderation queue, viewer history and the hero demo."
      importLine='import { ChatMessage, ChatFeed } from "@/components/molecules/chat-message"'
    >
      <ChatFeed className="max-w-2xl">
        <ChatMessage author="GG_Rohan" platform="twitch" time="7:41" tag={<MessageTag kind="question" />}>
          when’s the next stream?
        </ChatMessage>
        <ChatMessage
          author="Pip"
          bot
          time="7:41"
          source="FAQ · Schedule"
          confidence={96}
          sourceWhy={<p className="text-body-sm">Matched “next stream” to the FAQ answer “Schedule”.</p>}
        >
          @GG_Rohan Tue, Thu and Sat at 7 pm IST. Schedule’s on the Discord.
        </ChatMessage>
        <ChatMessage
          author="Pip → nyx.wav"
          bot
          status="pending"
          time="7:44"
          tag={<MessageTag tone="question">Draft</MessageTag>}
          actions={
            <>
              <Button size="xs">Approve</Button>
              <Button variant="secondary" size="xs">Edit</Button>
              <Button variant="ghost" size="xs">Reject</Button>
            </>
          }
        >
          HydraFuel is vegan. Code MIRA10 gets 10% off.
        </ChatMessage>
        <ChatMessage author="Pip" bot status="edited" time="7:45">
          @nyx.wav HydraFuel is vegan. Code MIRA10 gets 10% off, #ad
        </ChatMessage>
        <ChatMessage author="free_vbux_now" platform="youtube" tone="flagged" time="7:46" tag={<MessageTag kind="spam" />}>
          FREE SKINS at vbux-free.co
        </ChatMessage>
        <ChatMessage
          author="free_vbux_now"
          platform="youtube"
          status="removed"
          time="7:46"
          footnote={<>Removed by Pip · link not allowed · <a href="#chat" className="text-link">Undo</a></>}
        >
          Message removed
        </ChatMessage>
        <ChatMessage author="lowkeyLiam timed out for 10 min" note noteKind="timeout" time="7:47">
          Second toxic message this stream. By Pip.
        </ChatMessage>
        <ChatMessage author="Slow mode on · 10 s" note time="7:48">
          Turned on by Mira Okafor.
        </ChatMessage>
        <ChatMessage author="Mira Okafor" platform="youtube" status="pinned" time="7:30">
          Ranked grind tonight. !discord for the scrims sign-up.
        </ChatMessage>
        <ChatMessage author="kaira_plays" platform="twitch" time="7:49" tag={<MessageTag kind="first-time" />}>
          hi from the raid!
        </ChatMessage>
        <ChatMessage author="momo_draws" platform="youtube" time="7:50" clamp>
          okay so I have a question about your settings, what sens do you play on
          and do you use raw input buffer, also what monitor is that and is it 240
          or 360, and would you recommend it for someone starting out on a budget
          because I can only spend about 20k
        </ChatMessage>
      </ChatFeed>
    </Board>
  )
}

export function ChartsBoard() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  return (
    <Board
      id="charts"
      layer="Molecules"
      title="Charts"
      description="Small, honest charts: one accent series, a muted comparison, numbers always available as text."
      importLine='import { BarChart, LineChart, Sparkline, DonutChart, Heatmap, … } from "@/components/molecules/charts"'
    >
      <Group title="Kinds" className="grid w-full grid-cols-2 gap-8 max-lg:grid-cols-1">
        <div className="flex flex-col gap-3">
          <ChartLegend items={[{ label: "This week", tone: "accent" }, { label: "Last week", tone: "muted" }]} />
          <BarChart
            values={[40, 65, 30, 80, 55, 90, 70]}
            compare={[35, 50, 45, 60, 50, 70, 65]}
            summary="Questions answered peaked on Saturday."
          />
          <ChartAxis labels={days} />
        </div>
        <div className="flex flex-col gap-3">
          <ChartLegend items={[{ label: "Messages", tone: "accent" }, { label: "Last stream", tone: "dashed" }]} />
          <LineChart
            summary="Chat activity rose to 62 messages a minute at 9:40 PM."
            points={[12, 18, 15, 32, 48, 41, 62].map((value, index) => ({ label: `${7 + Math.floor(index / 2)}:${index % 2 ? "30" : "00"}`, value }))}
            compare={[10, 14, 20, 25, 30, 28, 35].map((value, index) => ({ label: String(index), value }))}
          />
        </div>
        <div className="flex flex-col gap-3">
          <MoodChart label="Chat mood stayed positive, dipping at 9:10 PM." />
          <div className="relative w-fit">
            <ChartTooltip label="Sat, Oct 10" value="312 answered" compare="Last week 248" />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <DonutChart
            summary="78% of questions were answered automatically."
            segments={[
              { label: "Answered", value: 78, tone: "accent" },
              { label: "Held for you", value: 15, tone: "muted" },
              { label: "Skipped", value: 7, tone: "negative" },
            ]}
          />
          <Heatmap
            summary="Your chat is busiest Saturday from 7 to 10 PM."
            rows={days}
            columns={Array.from({ length: 12 }, (_, index) => `${index * 2}h`)}
            values={days.map((_, row) => Array.from({ length: 12 }, (_, col) => (col >= 9 && col <= 11 ? (row === 5 ? 1 : 0.5) : col > 6 ? 0.2 : 0)))}
          />
        </div>
        <div className="w-48">
          <Sparkline values={[12, 18, 15, 32, 48, 41, 56]} summary="Chat peaked at 9:40 PM." />
          <BarChart size="sm" values={[30, 50, 40, 80, 60, 90, 70]} />
        </div>
      </Group>
      <Group title="Empty · loading · error" className="grid w-full grid-cols-3 gap-6 max-lg:grid-cols-1">
        <ChartState state="empty" />
        <ChartState state="loading" />
        <ChartState state="error" />
      </Group>
    </Board>
  )
}

export function CardsBoard() {
  const creator = plans.find((plan) => plan.code === "creator")!
  const studio = plans.find((plan) => plan.code === "studio")!
  const starter = plans.find((plan) => plan.code === "starter")!
  return (
    <Board
      id="cards"
      layer="Molecules"
      title="Feature, Integration, Plan, Change item, Notification item, Setup checklist"
      description="Cards for marketing and the app. The marketing integration card links to details; the app card adds status and the one action for its state. Plan cards change their action with the account’s plan."
      importLine='import { FeatureLinkCard, FeatureItem } · { IntegrationCard, AppIntegrationCard } · { PlanCard } · … from "@/components/molecules/…"'
    >
      <Group title="Feature" className="grid w-full grid-cols-3 gap-6 max-lg:grid-cols-1">
        <FeatureLinkCard href="#cards" icon={<MessageSquareIcon />} title="Answers" description="Replies from your FAQ, with sources." cta="Learn about answers" />
        <FeatureItem icon={<ShieldIcon />} title="Moderation">Spam, links and raids handled before you see them.</FeatureItem>
        <FeatureItem boxed layout="inline" icon={<BookOpenIcon />} title="Knowledge">Teach Pip once.</FeatureItem>
      </Group>
      <Group title="Integration · marketing" className="grid w-full grid-cols-3 gap-4 max-lg:grid-cols-1">
        <IntegrationCard integration={youtube} />
        <IntegrationCard integration={kick} />
        <IntegrationCard integration={twitch} compact />
      </Group>
      <Group title="Integration · in-app states" className="grid w-full grid-cols-3 gap-4 max-lg:grid-cols-1">
        <AppIntegrationCard integration={youtube} state="connected" account="miraplays" action={<Button variant="secondary" size="sm">Manage</Button>} />
        <AppIntegrationCard integration={twitch} state="reconnect" account="miraplays" detail="Login expired Oct 9. Pip can’t read Twitch chat." action={<Button size="sm">Reconnect Twitch</Button>} />
        <AppIntegrationCard integration={discord} state="not-connected" detail="Post go-live alerts to your server." action={<Button variant="secondary" size="sm">Connect</Button>} />
        <AppIntegrationCard integration={twitch} state="connecting" />
        <AppIntegrationCard integration={youtube} state="error" detail="YouTube rejected replies. Check the channel’s chat settings." action={<Button variant="secondary" size="sm">View details</Button>} />
        <AppIntegrationCard integration={discord} state="not-connected" lockedPlan="Studio" detail="Available on Studio." />
      </Group>
      <Group title="Plan card · marketing and in-app" className="grid w-full grid-cols-3 gap-4 max-lg:grid-cols-1">
        <PlanCard plan={starter} />
        <PlanCard plan={creator} yearly />
        <PlanCard plan={studio} />
        <PlanCard plan={starter} relation={{ kind: "downgrade", href: "#cards" }} />
        <PlanCard plan={creator} relation={{ kind: "current", trialDaysLeft: 9, trialEnds: "Oct 19" }} />
        <PlanCard plan={studio} relation={{ kind: "upgrade", href: "#cards" }} />
        <PlanCard plan={creator} compact />
      </Group>
      <Group title="Change item · Notification item" className="grid w-full grid-cols-2 gap-8 max-lg:grid-cols-1">
        <ChangeList>
          <ChangeItem type="new">Connect Twitch alongside YouTube.</ChangeItem>
          <ChangeItem type="improved">Approval queue keeps your place.</ChangeItem>
          <ChangeItem type="fixed">Summaries now count emotes once.</ChangeItem>
        </ChangeList>
        <ul className="flex flex-col gap-1">
          <NotificationItem unread type="payment-failed" title="Payment failed" body="Visa ending 4242 was declined. We’ll retry Oct 12." time="3h" href="#cards" action={<Button variant="secondary" size="xs">Update card</Button>} />
          <NotificationItem unread type="bot-paused" title="Pip paused itself" body="Twitch rate limit. Resumes in 2 min." time="2m" href="#cards" />
          <NotificationItem type="summary-ready" title="Stream summary ready" body="Oct 9 · 412 questions answered · 37 held" time="1d" href="#cards" />
          <NotificationItem type="team-invite" title="Dev Kapoor joined as Moderator" time="2d" href="#cards" />
        </ul>
      </Group>
      <Group title="Setup checklist" className="w-full">
        <div className="w-full max-w-3xl">
          <SetupChecklist
            title="Get your bot ready"
            steps={[
              { title: "Create your bot", status: "done" },
              { title: "Add your first knowledge", status: "done" },
              { title: "Pick a reply mode", detail: "Approval, Auto or Silent", status: "current", action: <Button size="sm">Choose mode</Button> },
              { title: "Connect YouTube or Twitch", status: "skipped" },
              { title: "Import more knowledge", status: "todo" },
              { title: "Test your bot", status: "todo", soon: true },
            ]}
          />
        </div>
      </Group>
    </Board>
  )
}
