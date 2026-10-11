"use client"

import { useState } from "react"

import { Button } from "@kibo/ui/components/button"
import { DataTable } from "@kibo/ui/components/data-table"
import { Skeleton } from "@kibo/ui/components/skeleton"

import { ApprovalCard } from "@/components/organisms/cards/approval-card"
import { BotCard, BotCardEmpty } from "@/components/organisms/cards/bot-card"
import {
  InvoiceAction,
  InvoiceAmount,
  InvoiceDescription,
  InvoiceStatusBadge,
  type Invoice,
} from "@/components/organisms/cards/invoice-row"
import {
  SourceAction,
  SourceName,
  SourceStatusCell,
  type KnowledgeSource,
} from "@/components/organisms/cards/knowledge-source-row"
import {
  MemberActions,
  MemberIdentity,
  MemberRole,
  SeatFooter,
  type Member,
} from "@/components/organisms/cards/member-row"
import { ModQueueItem } from "@/components/organisms/cards/mod-queue-item"
import {
  AddPaymentMethod,
  PaymentMethodRow,
} from "@/components/organisms/cards/payment-method"
import {
  ScheduleEventChip,
  ScheduleEventRow,
} from "@/components/organisms/cards/schedule-event"
import { SponsorCard } from "@/components/organisms/cards/sponsor-card"
import { StreamSummaryCard } from "@/components/organisms/cards/stream-summary-card"
import { ViewerCard } from "@/components/organisms/cards/viewer-card"
import { WidgetPreviewCard } from "@/components/organisms/cards/widget-preview-card"

import { Board, Group } from "../_components/showcase"

const sources: KnowledgeSource[] = [
  { id: "1", name: "faq-october.csv", kind: "Spreadsheet · 148 rows", glyph: "file", answers: 142, status: "ready", updated: "Oct 9" },
  { id: "2", name: "Channel About · miraplays", kind: "YouTube · syncs daily", platform: "youtube", answers: 18, status: "importing", progress: 40, updated: "now" },
  { id: "3", name: "miraplays.gg/setup", kind: "Website · 1 page", glyph: "website", answers: null, status: "queued", reason: "2nd in line", updated: "—" },
  { id: "4", name: "Sponsors 2026", kind: "Google Drive doc", platform: "google-drive", answers: 9, status: "stale", reason: "Doc changed Oct 8", updated: "Sep 30" },
  { id: "5", name: "Stream rules", kind: "Notion page", platform: "notion", answers: null, status: "failed", reason: "Kibo lost access to this page.", updated: "Oct 2" },
]

const members: Member[] = [
  { id: "1", name: "Mira Okafor", email: "mira@miraplays.gg", role: "Owner", lastActive: "now", you: true },
  { id: "2", name: "Dev Kapoor", email: "dev.kapoor@gmail.com", role: "Head moderator", lastActive: "Oct 9" },
  { id: "3", name: "Tom Castillo", email: "tom.castillo@outlook.com", handle: "tacocat_88", role: "Moderator", lastActive: "Sep 28" },
  { id: "4", email: "sana@cooks.tv", role: "Moderator", lastActive: "—", pending: { invited: "Oct 8", expires: "Oct 15" } },
]

const invoices: Invoice[] = [
  { id: "1", date: "Oct 19, 2026", description: "Creator, monthly", note: "After a $3.90 Starter credit", total: "$23.72", split: "$20.10 + $3.62 GST", status: "upcoming" },
  { id: "2", date: "Oct 8, 2026", description: "Extra AI replies · 2,500", note: "Card declined · we retry Oct 12", total: "$5.90", split: "$5.00 + $0.90 GST", status: "failed" },
  { id: "3", date: "Oct 2, 2026", description: "Starter, monthly", total: "$10.62", split: "$9.00 + $1.62 GST", status: "paid", pdfUrl: "#cards" },
  { id: "4", date: "Sep 25, 2026", description: "Extra seat removed, prorated", total: "−$4.25", status: "refunded", pdfUrl: "#cards" },
]

export function ProductCardsBoard() {
  const [selected, setSelected] = useState(true)

  return (
    <Board
      id="product-cards"
      layer="Organisms"
      title="Product cards"
      description="Presentational cards for features that don’t have a backend yet. Each shows its states with sample data; empty and loading use the shared Empty and Skeleton."
      importLine='import { BotCard, KnowledgeSource…, ApprovalCard, ModQueueItem, ViewerCard, … } from "@/components/organisms/cards/…"'
    >
      <Group title="Bot card" className="grid w-full grid-cols-3 gap-4 max-lg:grid-cols-1">
        <BotCard name="Pip" purpose="Ranked nights · Hype" status="live" href="#product-cards" stats={[{ label: "answered", value: "412" }, { label: "held", value: "37" }, { label: "approved", value: "92%" }]} />
        <BotCard name="Cozy Pip" purpose="Sunday streams · Calm" status="paused" href="#product-cards" note="Paused by Mira Okafor on Oct 4. Sunday streams on break." />
        <BotCard name="Hindi Pip" purpose="Hindi chat · Friendly" status="draft" href="#product-cards" note="Not on a platform yet. 12 answers written." />
        <BotCard name="Pip" purpose="Ranked nights · Hype" status="error" href="#product-cards" note="YouTube rejected 5 replies in a row. Pip paused itself at 9:58 PM." />
        <BotCardEmpty href="#product-cards" />
        <Skeleton variant="card" />
      </Group>
      <Group title="Knowledge source rows" className="w-full">
        <DataTable
          caption="Sources"
          className="w-full"
          columns={[
            { key: "source", header: "Source", primary: true, cell: (row: KnowledgeSource) => <SourceName source={row} /> },
            { key: "answers", header: "Answers", align: "end", cell: (row: KnowledgeSource) => row.answers ?? "—" },
            { key: "status", header: "Status", cell: (row: KnowledgeSource) => <SourceStatusCell source={row} /> },
            { key: "updated", header: "Updated", cell: (row: KnowledgeSource) => row.updated },
          ]}
          rows={sources}
          getRowId={(row) => row.id}
          rowActions={(row) => <SourceAction source={row} />}
        />
      </Group>
      <Group title="Approval queue card" className="grid w-full grid-cols-2 gap-4 max-lg:grid-cols-1">
        <ApprovalCard viewer="nyx.wav" time="7:44" question="is hydrafuel vegan?" draft="@nyx.wav Yes, HydraFuel is vegan. Code MIRA10 gets 10% off. #ad" source="Sponsor · HydraFuel" confidence={78} secondsLeft={42} />
        <div className="flex flex-col gap-2">
          <ApprovalCard state="approved" resolvedBy="Mira Okafor · posted to Twitch" viewer="kvn.exe" time="7:40" question="what rank are you" draft="" source="" confidence={0} secondsLeft={0} onUndo={() => undefined} />
          <ApprovalCard state="rejected" viewer="momo_draws" time="7:38" question="can you draw my oc" draft="" source="" confidence={0} secondsLeft={0} onUndo={() => undefined} />
          <ApprovalCard state="expired" viewer="tacocat_88" time="7:30" question="is the giveaway still on" draft="" source="" confidence={0} secondsLeft={0} />
        </div>
      </Group>
      <Group title="Moderation queue item" className="w-full">
        <ul className="w-full overflow-hidden rounded-xl bg-raised shadow-border">
          <ModQueueItem viewer="free_vbux_now" kinds={["link", "spam"]} context="7:46 · first message" message="FREE SKINS at vbux-free.co" reason="Held by Links rule: domain not on your allowed list." onSelectedChange={() => undefined} selected={false} />
          <ModQueueItem viewer="lowkeyLiam" kinds={["toxic"]} context="7:47 · 2 strikes" message="uninstall lmao" reason="Held by AI toxicity (91% sure). Second strike this stream." />
          <ModQueueItem viewer="h8raid_0291" kinds={["banned-word"]} context="8:20 · account 2 h old · raid" message="[banned phrase]" reason="Held by Banned words." hidden selected={selected} onSelectedChange={setSelected} />
          <ModQueueItem viewer="momo_draws" kinds={["link"]} context="7:50" message="artstation.com/momo_draws" reason="" resolved="Allowed by kvn.exe · posted to chat" onUndo={() => undefined} />
        </ul>
      </Group>
      <Group title="Viewer card · stream summary" className="grid w-full grid-cols-3 gap-4 max-lg:grid-cols-1">
        <ViewerCard name="GG_Rohan" platform="twitch" since="Since Mar 2026 · sub 8 months" role="regular" href="#product-cards" stats={[{ label: "messages", value: "1,204" }, { label: "streams", value: "41" }, { label: "answered", value: "63" }]} />
        <ViewerCard name="kaira_plays" platform="twitch" since="First seen Oct 9 · came with a raid" role="new" href="#product-cards" stats={[{ label: "messages", value: "6" }, { label: "stream", value: "1" }]} />
        <ViewerCard name="lowkeyLiam" platform="youtube" since="Last strike Oct 9 · toxic" role="strikes" strikes={2} href="#product-cards" stats={[{ label: "messages", value: "88" }, { label: "streams", value: "6" }]} />
        <StreamSummaryCard title="Ranked grind to Immortal, day 13" date="Fri, Oct 9 · 7:00–10:42 PM · 3 h 42 m" platforms={["youtube", "twitch"]} href="#product-cards" stats={[{ label: "answered", value: "412" }, { label: "peak viewers", value: "1,284" }, { label: "held", value: "37" }]} activity={[12, 18, 15, 32, 48, 41, 56, 62, 44, 38]} note="Raid from nightowl_gg · 340 viewers at 8:20 PM" />
        <StreamSummaryCard title="Ranked grind to Immortal, day 14" date="Sat, Oct 10 · started 7:02 PM" platforms={["youtube", "twitch"]} href="#product-cards" status="live" stats={[{ label: "answered so far", value: "96" }, { label: "watching", value: "842" }, { label: "in queue", value: "4" }]} />
        <StreamSummaryCard title="Cozy Sunday: Stardew" date="Sun, Oct 4 · ended 9:15 PM" platforms={["youtube"]} href="#product-cards" status="processing" stats={[{ label: "answered", value: "" }, { label: "peak", value: "" }, { label: "held", value: "" }]} note="Building the summary. Usually under 5 minutes." />
      </Group>
      <Group title="Schedule event" className="grid w-full grid-cols-2 gap-6 max-lg:grid-cols-1">
        <div className="grid grid-cols-3 gap-2">
          <ScheduleEventChip title="Ranked grind, day 15" meta="Tue 7:00 PM · Valorant" status="upcoming" href="#product-cards" when="Tuesday October 13, 7 PM" />
          <ScheduleEventChip title="Ranked grind, day 14" meta="Live · since 7:02 PM" status="live" href="#product-cards" when="Saturday October 10" />
          <ScheduleEventChip title="Ranked grind, day 13" meta="Fri · 3 h 42 m" status="ended" href="#product-cards" when="Friday October 9" />
          <ScheduleEventChip title="Cozy Sunday" meta="Sun 6:00 PM" status="cancelled" href="#product-cards" when="Sunday October 11" />
          <ScheduleEventChip title="Scrims w/ team" meta="Thu 9:00 PM · synced" status="synced" href="#product-cards" when="Thursday October 15" />
          <ScheduleEventChip title="Sponsor segment" meta="Overlaps Scrims w/ team" status="conflict" href="#product-cards" when="Thursday October 15" />
        </div>
        <ul>
          <ScheduleEventRow day="Tue" date="13" title="Ranked grind to Immortal, day 15" meta="7:00 PM IST · Valorant · YouTube + Twitch" sponsor="HydraFuel" />
          <ScheduleEventRow day="Thu" date="15" title="Scrims with the team" meta="9:00 PM IST · from Google Calendar · edit there" status="synced" />
          <ScheduleEventRow day="Sat" date="17" title="Viewer customs night" meta="7:00 PM IST · No game set, so Pip can’t answer “what are we playing?”" action={<Button variant="secondary" size="xs">Add game</Button>} />
        </ul>
      </Group>
      <Group title="Sponsor card · overlay widget" className="grid w-full grid-cols-3 gap-4 max-lg:grid-cols-1">
        <SponsorCard brand="HydraFuel" dates="Oct 1 – Oct 31" status="active" code="MIRA10" href="#product-cards" stats={[{ label: "mentions", value: "312" }, { label: "clicks", value: "1,140" }, { label: "answered", value: "48" }]} />
        <SponsorCard brand="HydraFuel" dates="Paused Oct 8" status="paused" href="#product-cards" note="Paused by Mira Okafor. Pip won’t mention it until you resume." />
        <SponsorCard brand="HydraFuel" dates="Oct 1 – Oct 31" status="error" href="#product-cards" note="The link hydrafuel.in/mira returns 404. Pip stopped sharing it." />
        <WidgetPreviewCard
          name="Chat with answers"
          placement="Bottom left · 420 × 300"
          status="live"
          preview={<span className="rounded-md bg-raised px-2 py-1 text-[0.6875rem] text-foreground">Pip: 0.32 at 800 DPI</span>}
          action={<Button variant="secondary" size="xs">Edit</Button>}
        />
        <WidgetPreviewCard name="Now playing" placement="Hidden in this scene" status="hidden" preview={<span className="rounded-md bg-raised px-2 py-1 text-[0.6875rem] text-foreground">Odesza · A Moment Apart</span>} action={<Button variant="secondary" size="xs">Show</Button>} />
        <WidgetPreviewCard name="Chat with answers" placement="" status="error" note="OBS isn’t loading this URL. Check the Browser Source." preview={null} action={<Button variant="secondary" size="xs">How to fix</Button>} />
      </Group>
      <Group title="Team members · invoices · payment methods" className="w-full flex-col items-stretch">
        <DataTable
          caption="Members"
          columns={[
            { key: "person", header: "Person", primary: true, cell: (row: Member) => <MemberIdentity member={row} /> },
            { key: "role", header: "Role", cell: (row: Member) => <MemberRole member={row} /> },
            { key: "active", header: "Last active", cell: (row: Member) => row.lastActive },
          ]}
          rows={members}
          getRowId={(row) => row.id}
          rowActions={(row) => <MemberActions member={row} />}
        />
        <SeatFooter used={4} seats={5} plan="Creator" pending={1} action={<Button size="sm">Invite</Button>} />
        <DataTable
          caption="Invoices"
          columns={[
            { key: "date", header: "Date", cell: (row: Invoice) => row.date },
            { key: "description", header: "Description", primary: true, cell: (row: Invoice) => <InvoiceDescription invoice={row} /> },
            { key: "amount", header: "Amount", align: "end", cell: (row: Invoice) => <InvoiceAmount invoice={row} /> },
            { key: "status", header: "Status", cell: (row: Invoice) => <InvoiceStatusBadge status={row.status} /> },
          ]}
          rows={invoices}
          getRowId={(row) => row.id}
          rowActions={(row) => <InvoiceAction invoice={row} />}
        />
        <div className="flex flex-col gap-2">
          <PaymentMethodRow method={{ id: "1", label: "Visa ending 4242", detail: "Expires 08/28", kind: "card", isDefault: true }} />
          <PaymentMethodRow method={{ id: "2", label: "PayPal", detail: "mira@miraplays.gg", kind: "paypal" }} />
          <PaymentMethodRow method={{ id: "3", label: "Visa ending 1881", detail: "Expires end of October", kind: "card", state: "expiring" }} />
          <PaymentMethodRow method={{ id: "4", label: "Visa ending 0005", detail: "", kind: "card", state: "failed", reason: "Declined Oct 8 · insufficient funds" }} />
          <AddPaymentMethod />
        </div>
      </Group>
    </Board>
  )
}
