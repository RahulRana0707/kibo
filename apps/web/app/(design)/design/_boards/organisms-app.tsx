"use client"

import { useState } from "react"
import { MoreHorizontalIcon, PlusIcon } from "lucide-react"

import { Avatar } from "@kibo/ui/components/avatar"
import { Button } from "@kibo/ui/components/button"
import { ConfirmDialog } from "@kibo/ui/components/confirm-dialog"
import { DataTable } from "@kibo/ui/components/data-table"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@kibo/ui/components/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@kibo/ui/components/dropdown-menu"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@kibo/ui/components/empty"
import { Field, FieldLabel } from "@kibo/ui/components/field"
import { Input } from "@kibo/ui/components/input"
import { NativeSelect } from "@kibo/ui/components/select"
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@kibo/ui/components/sheet"
import { Switch } from "@kibo/ui/components/switch"
import { Textarea } from "@kibo/ui/components/textarea"

import { PlatformIcon } from "@/components/atoms/platform-icon"
import { StatusPill } from "@/components/atoms/status-pill"
import { DetailList } from "@/components/molecules/detail-list"
import { AccountMenu } from "@/components/organisms/app-shell/account-menu"
import { AppNav } from "@/components/organisms/app-shell/app-nav"
import { BotSwitcher } from "@/components/organisms/app-shell/bot-switcher"
import { NotificationsMenu } from "@/components/organisms/app-shell/notifications-menu"
import { PlanUsageCard } from "@/components/organisms/app-shell/plan-usage-card"
import { SystemBanner, SetupBanner } from "@/components/organisms/app-shell/system-banner"
import { WorkspaceSwitcher } from "@/components/organisms/app-shell/workspace-switcher"
import {
  LimitNotice,
  LockedInline,
  LockedPage,
} from "@/components/organisms/data/feature-locked"
import { FilterBar, type ActiveFilter } from "@/components/organisms/data/filter-bar"
import { PageHeader } from "@/components/organisms/data/page-header"
import { DangerZone, SettingsGroup, SettingsRow } from "@/components/organisms/data/settings"

import { Board, Group } from "../_components/showcase"

const viewers = [
  { id: "1", name: "GG_Rohan", platform: "twitch" as const, messages: 1204, streams: 41, role: "Regular" },
  { id: "2", name: "kaira_plays", platform: "twitch" as const, messages: 6, streams: 1, role: "New" },
  { id: "3", name: "aurora_fps", platform: "youtube" as const, messages: 412, streams: 18, role: "Regular" },
  { id: "4", name: "lowkeyLiam", platform: "youtube" as const, messages: 88, streams: 6, role: "2 strikes" },
]

export function ShellBoard() {
  return (
    <Board
      id="app-shell"
      layer="Organisms"
      title="App shell: sidebar, switchers, menus, banners"
      description="The sidebar is workspace switcher, grouped nav and plan usage. The top bar holds the bot switcher, notifications and account. System banners carry account-wide state, one at a time."
      importLine='import { AppNav, WorkspaceSwitcher, PlanUsageCard, BotSwitcher, NotificationsMenu, AccountMenu, SystemBanner } from "@/components/organisms/app-shell/…"'
    >
      <Group title="Sidebar parts" className="grid w-full grid-cols-3 gap-8 max-lg:grid-cols-1">
        <div className="flex w-62 flex-col gap-5 rounded-xl bg-surface p-3">
          <WorkspaceSwitcher
            current={{ id: "1", name: "Mira Okafor", role: "Owner", live: true }}
            workspaces={[
              { id: "1", name: "Mira Okafor", role: "Owner", live: true },
              { id: "2", name: "Nightowl Studios", role: "Moderator" },
            ]}
          />
          <AppNav />
        </div>
        <div className="flex w-62 flex-col gap-3">
          <PlanUsageCard />
          <PlanUsageCard usage={{ kind: "plan", plan: "Creator", trialDaysLeft: 9, used: 9000, limit: 15000 }} />
          <PlanUsageCard usage={{ kind: "plan", plan: "Creator", used: 13500, limit: 15000 }} />
          <PlanUsageCard usage={{ kind: "plan", plan: "Starter", used: 2000, limit: 2000 }} />
        </div>
        <div className="flex flex-col items-start gap-4">
          <BotSwitcher />
          <BotSwitcher bots={[{ id: "pip", name: "Pip", status: "live" }, { id: "cozy", name: "Cozy Pip", status: "paused" }]} currentId="pip" />
          <div className="flex gap-2">
            <NotificationsMenu />
            <NotificationsMenu
              notifications={[
                { id: "1", type: "payment-failed", title: "Payment failed", body: "Visa ending 4242 was declined.", time: "3h", href: "#app-shell", unread: true },
                { id: "2", type: "bot-paused", title: "Pip paused itself", body: "Twitch rate limit.", time: "2m", href: "#app-shell", unread: true },
                { id: "3", type: "summary-ready", title: "Stream summary ready", time: "1d", href: "#app-shell" },
              ]}
            />
            <AccountMenu user={{ name: "Mira Okafor", email: "mira@miraplays.gg" }} />
          </div>
          <p className="text-caption text-muted-foreground">Open each menu to check its states.</p>
        </div>
      </Group>
      <Group title="System banners" className="w-full flex-col items-stretch gap-2 overflow-hidden rounded-xl">
        <SetupBanner />
        <SystemBanner kind="trial" tone="info" action={<Button variant="secondary" size="sm">Choose a plan</Button>} onDismiss={() => undefined} dismissLabel="Dismiss for 3 days">
          Your trial ends in 9 days.
        </SystemBanner>
        <SystemBanner kind="payment" tone="danger" action={<Button variant="secondary" size="sm">Update payment method</Button>}>
          Payment failed. Update your card by Oct 14 to keep Kibo running.
        </SystemBanner>
        <SystemBanner kind="reconnect" tone="warning" icon={<PlatformIcon platform="twitch" />} action={<Button variant="secondary" size="sm">Reconnect Twitch</Button>}>
          Twitch needs reconnecting. Kibo can’t read Twitch chat until you do.
        </SystemBanner>
        <SystemBanner kind="paused" tone="danger" action={<Button variant="secondary" size="sm">Resume Pip</Button>}>
          Pip is paused. Viewers get no answers until you resume.
        </SystemBanner>
        <SystemBanner kind="maintenance" tone="neutral" onDismiss={() => undefined}>
          Scheduled maintenance Oct 14, 2–3 AM IST. Live bots keep running.
        </SystemBanner>
      </Group>
    </Board>
  )
}

export function DataBoard() {
  const [query, setQuery] = useState("")
  const [active, setActive] = useState<ActiveFilter[]>([{ field: "platform", value: "Twitch" }])
  const [selected, setSelected] = useState<string[]>(["2"])
  const [sort, setSort] = useState<{ key: string; direction: "asc" | "desc" }>({ key: "messages", direction: "desc" })
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [quiet, setQuiet] = useState(true)

  const rows = [...viewers].sort((a, b) =>
    sort.key === "messages"
      ? (a.messages - b.messages) * (sort.direction === "asc" ? 1 : -1)
      : a.name.localeCompare(b.name) * (sort.direction === "asc" ? 1 : -1)
  )

  const columns = [
    {
      key: "name",
      header: "Viewer",
      primary: true,
      sortable: true,
      cell: (row: (typeof viewers)[number]) => (
        <span className="flex items-center gap-2">
          <Avatar name={row.name} size="sm" badge={<PlatformIcon platform={row.platform} />} />
          {row.name}
        </span>
      ),
    },
    { key: "role", header: "Role", cell: (row: (typeof viewers)[number]) => row.role },
    { key: "messages", header: "Messages", align: "end" as const, sortable: true, cell: (row: (typeof viewers)[number]) => row.messages.toLocaleString() },
    { key: "streams", header: "Streams", align: "end" as const, cell: (row: (typeof viewers)[number]) => row.streams },
  ]

  const rowMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-xs" aria-label="Row actions">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Open viewer</DropdownMenuItem>
        <DropdownMenuItem variant="destructive">Ban</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <Board
      id="data"
      layer="Organisms"
      title="Page header, Filter bar, Data table, Dialog, Confirm, Sheet, Settings, Feature locked"
      description="The building blocks of every app section. One page header replaces the five section headers; tables share sorting, selection, a bulk bar and stacked cards on phones."
      importLine='import { PageHeader, FilterBar, SettingsGroup, … } from "@/components/organisms/data/…" · import { DataTable } · { ConfirmDialog } · { Sheet } · { Dialog } from "@kibo/ui/components/…"'
    >
      <Group title="Page header" className="w-full flex-col items-stretch gap-10">
        <PageHeader
          title="Pip"
          breadcrumbs={[{ label: "Bots", href: "#data" }, { label: "Pip" }]}
          media={<Avatar name="Pip" variant="bot" size="xl" />}
          status={<StatusPill tone="offline">Ready</StatusPill>}
          meta={
            <>
              <span className="flex gap-1">
                <PlatformIcon platform="youtube" label="YouTube" />
                <PlatformIcon platform="twitch" label="Twitch" />
              </span>
              Hype · Auto above 85% · 64 knowledge items
            </>
          }
          actions={
            <>
              <Button variant="secondary" soon>
                Pause Pip
              </Button>
              <Button variant="secondary">Test in playground</Button>
            </>
          }
          tabs={{
            label: "Bot sections",
            items: [
              { href: "#a", label: "Overview", current: true },
              { href: "#b", label: "Personality & voice" },
              { href: "#c", label: "Behavior & safety" },
              { href: "#d", label: "Platforms" },
              { href: "#e", label: "Playground" },
              { href: "#f", label: "History" },
            ],
          }}
        />
        <PageHeader
          title="Knowledge"
          description="Everything Pip can answer from. 64 of 1,000 items on Creator."
          actions={
            <>
              <Button variant="secondary">Import</Button>
              <Button>Add item</Button>
            </>
          }
          tabs={{
            label: "Knowledge sections",
            items: [
              { href: "#g", label: "All items", current: true },
              { href: "#h", label: "Unanswered", count: 12, countTone: "warning" },
              { href: "#i", label: "Suggested", count: 5 },
            ],
          }}
        />
      </Group>
      <Group title="Filter bar · data table" className="w-full flex-col items-stretch">
        <FilterBar
          query={query}
          onQueryChange={setQuery}
          searchLabel="Search viewers"
          options={[
            { field: "platform", label: "Platform", values: ["YouTube", "Twitch"] },
            { field: "role", label: "Role", values: ["Regular", "New", "Mod"] },
          ]}
          active={active}
          onActiveChange={setActive}
          count={`${rows.length} of 1,204 viewers`}
        />
        <DataTable
          caption="Viewers"
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          sort={sort}
          onSortChange={setSort}
          selectable
          selected={selected}
          onSelectedChange={setSelected}
          bulkActions={
            <>
              <Button variant="secondary" size="xs">Mark trusted</Button>
              <Button variant="secondary" size="xs">Export</Button>
            </>
          }
          rowActions={rowMenu}
        />
        <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
          <DataTable caption="Viewers loading" columns={columns} rows={[]} getRowId={(row) => row.id} state="loading" />
          <DataTable
            caption="No viewers"
            columns={columns}
            rows={[]}
            getRowId={(row) => row.id}
            empty={
              <Empty size="table">
                <EmptyHeader>
                  <EmptyTitle>No viewers yet</EmptyTitle>
                  <EmptyDescription>They appear after your first stream with Pip.</EmptyDescription>
                </EmptyHeader>
              </Empty>
            }
          />
        </div>
      </Group>
      <Group title="Dialog · confirm · sheet">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">
              <PlusIcon />
              Add an answer (dialog md)
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add an answer</DialogTitle>
              <DialogDescription>Pip uses it the next time chat asks.</DialogDescription>
            </DialogHeader>
            <DialogBody>
              <Field>
                <FieldLabel htmlFor="dq">Question</FieldLabel>
                <Input id="dq" placeholder="discord link?" />
              </Field>
              <Field>
                <FieldLabel htmlFor="da">Answer</FieldLabel>
                <Textarea id="da" autoGrow />
              </Field>
            </DialogBody>
            <DialogFooter>
              <Button variant="ghost">Cancel</Button>
              <Button>Save answer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
          Delete Cozy Pip (confirm)
        </Button>
        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title="Delete Cozy Pip?"
          description="Its 64 answers, 3 commands and 41 stream summaries are deleted for good. To stop it for now, pause it instead."
          confirmLabel="Delete bot"
          pendingLabel="Deleting…"
          typeToConfirm="Cozy Pip"
          onConfirm={() => new Promise((resolve) => setTimeout(resolve, 1000))}
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary">Open viewer (sheet)</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <Avatar name="GG Rohan" size="lg" badge={<PlatformIcon platform="twitch" />} />
              <div className="flex flex-col">
                <SheetTitle>GG_Rohan</SheetTitle>
                <SheetDescription>Twitch · since Mar 2026</SheetDescription>
              </div>
            </SheetHeader>
            <SheetBody>
              <DetailList
                items={[
                  { term: "Messages", value: "1,204" },
                  { term: "Streams watched", value: "41" },
                  { term: "Questions Pip answered", value: "63" },
                  { term: "Strikes", value: "None" },
                ]}
              />
            </SheetBody>
            <SheetFooter>
              <Button variant="secondary">Time out</Button>
              <Button>Mark trusted</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Group>
      <Group title="Settings rows and danger zone" className="w-full flex-col items-stretch">
        <SettingsGroup title="Replies" description="How Pip answers in chat.">
          <SettingsRow label="Quiet mode" description="Pip only answers direct questions." htmlFor="sr-quiet" control={<Switch id="sr-quiet" checked={quiet} onCheckedChange={setQuiet} />} saveState="saved" />
          <SettingsRow
            label="Reply language"
            htmlFor="sr-lang"
            stack
            control={
              <NativeSelect id="sr-lang" className="w-50" defaultValue="match">
                <option value="match">Match the viewer</option>
                <option value="en">English</option>
              </NativeSelect>
            }
            saveState="saving"
          />
          <SettingsRow label="Weekly email report" soonReason="Email reports are coming soon." />
          <SettingsRow label="Custom roles" description="Make roles with exactly the access they need." lockedPlan="Studio" />
        </SettingsGroup>
        <DangerZone>
          <SettingsRow label="Archive Pip" description="Pip stops replying; you can restore it any time." control={<Button variant="secondary" size="sm">Archive bot</Button>} />
          <SettingsRow label="Delete Pip" description="Deletes answers, commands and summaries for good." control={<Button variant="destructive" size="sm">Delete bot</Button>} />
        </DangerZone>
      </Group>
      <Group title="Feature locked · limits" className="w-full flex-col items-stretch">
        <LockedInline title="Custom roles" description="Give clip editors and sponsor managers exactly the access they need." plan="Studio" price="$79 a month" onUpgrade={() => undefined} />
        <LimitNotice label="Knowledge items" used={920} limit={1000} valueText="920 / 1,000" message="You’re close to your limit. Archive old items or upgrade for more." upgrade={<Button size="sm">Upgrade to Studio</Button>} alternative={<Button variant="secondary" size="sm">Archive old items</Button>} />
        <LimitNotice label="AI replies this month" used={15000} limit={15000} valueText="15,000 / 15,000" message="Pip has stopped answering until Nov 1. Approval mode still works." upgrade={<Button size="sm">Add replies</Button>} alternative={<Button variant="secondary" size="sm">Switch to Approval</Button>} />
        <LockedPage title="Team roles" description="Make roles like “Clip editor” or “Sponsor manager” with exactly the access they need. Available on Studio." plan="Studio" priceLine="$79 / month · 14-day trial" onUpgrade={() => undefined} />
      </Group>
    </Board>
  )
}
