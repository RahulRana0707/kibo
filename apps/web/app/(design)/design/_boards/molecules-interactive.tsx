"use client"

import { useState } from "react"
import {
  CopyIcon,
  LogOutIcon,
  MoreHorizontalIcon,
  PencilIcon,
  RadioIcon,
  SettingsIcon,
  ShieldIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@kibo/ui/components/accordion"
import { Avatar } from "@kibo/ui/components/avatar"
import { Button } from "@kibo/ui/components/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@kibo/ui/components/command"
import { CopyField } from "@kibo/ui/components/copy-field"
import {
  DateRangePicker,
  DatePicker,
  TimePicker,
  TimezoneSelect,
  type DateRange,
} from "@kibo/ui/components/date-picker"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuUserHeader,
} from "@kibo/ui/components/dropdown-menu"
import { Field, FieldLabel } from "@kibo/ui/components/field"
import { FileDropzone, FileRow } from "@kibo/ui/components/file-upload"
import { KbdGroup } from "@kibo/ui/components/kbd"
import { SoonLabel } from "@kibo/ui/components/soon-label"
import { toast } from "@kibo/ui/components/sonner"
import { TagInput } from "@kibo/ui/components/tag-input"

import { ArticleFeedback } from "@/components/molecules/article-feedback"
import { BotStatus, PauseBotButton } from "@/components/molecules/bot-controls"
import { CommandTrigger } from "@/components/molecules/command-trigger"
import { PasswordField } from "@/components/molecules/password-field"
import { SearchField } from "@/components/molecules/search-field"
import { SocialSignIn } from "@/components/molecules/social-sign-in"
import { ThemeMenuSwitch } from "@/components/molecules/theme-switch"

import { Board, Example, Group } from "../_components/showcase"

export function MenusBoard() {
  const [columns, setColumns] = useState(true)
  return (
    <Board
      id="dropdown"
      layer="Molecules"
      title="Dropdown menu, Command items, Theme switch"
      description="One surface for every menu: bg-raised, shadow-raised, radius-lg. Items are 36 tall with a bg-hover highlight; command rows are 44 because people scan and type there."
      importLine='import { DropdownMenu, … } · { Command, … } from "@kibo/ui/components/…" · import { ThemeMenuSwitch } from "@/components/molecules/theme-switch"'
    >
      <Group title="Dropdown menu · every item type">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" aria-label="Row actions">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <PencilIcon />
              Edit answer
              <DropdownMenuShortcut>
                <KbdGroup keys={["e"]} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem description="Pip uses it in every bot.">
              <CopyIcon />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuCheckboxItem checked={columns} onCheckedChange={setColumns}>
              Show source column
            </DropdownMenuCheckboxItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <RadioIcon />
                Move to bot
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Pip</DropdownMenuItem>
                <DropdownMenuItem soon>Cozy Pip</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem soon>
              <ShieldIcon />
              Test in playground
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash2Icon />
              Delete answer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Account">
              <Avatar name="Mira Okafor" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-70">
            <DropdownMenuUserHeader name="Mira Okafor" email="mira@miraplays.gg" avatar={<Avatar name="Mira Okafor" />} />
            <DropdownMenuSeparator />
            <DropdownMenuItem soon>
              <UserIcon />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem soon>
              <SettingsIcon />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <ThemeMenuSwitch />
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <p className="text-caption text-muted-foreground">Open both menus to check item states.</p>
      </Group>
      <Group title="Command items">
        <Command className="w-[560px] max-w-full rounded-xl shadow-raised">
          <CommandInput variant="dialog" placeholder="Search or type a command" />
          <CommandList>
            <CommandEmpty>No pages or commands match.</CommandEmpty>
            <CommandGroup heading="Recent">
              <CommandItem value="raid protection">
                <ShieldIcon />
                raid protection
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Go to">
              <CommandItem value="dashboard">
                <RadioIcon />
                <span className="text-muted-foreground">Bot ›</span> Dashboard
              </CommandItem>
              <CommandItem value="moderation" disabled>
                <ShieldIcon />
                Moderation
                <SoonLabel className="ms-auto" />
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Actions">
              <CommandItem value="slow mode">
                <SettingsIcon />
                Turn on slow mode
                <CommandShortcut>
                  <KbdGroup keys={["shift", "s"]} />
                </CommandShortcut>
              </CommandItem>
              <CommandItem value="log out">
                <LogOutIcon />
                Log out
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </Group>
    </Board>
  )
}

export function ToastAccordionBoard() {
  return (
    <Board
      id="toast"
      layer="Molecules"
      title="Toast and Accordion"
      origin="violet"
      description="Toasts confirm what someone just did, bottom right; reversible actions get Undo; errors stay until dismissed. Accordions hold questions and rarely used settings."
      importLine='import { toast } from "@kibo/ui/components/sonner" · import { Accordion, … } from "@kibo/ui/components/accordion"'
    >
      <Group title="Toast · tones">
        <Button variant="secondary" size="sm" onClick={() => toast("Answer saved")}>
          Default
        </Button>
        <Button variant="secondary" size="sm" onClick={() => toast.success("Twitch connected")}>
          Success
        </Button>
        <Button variant="secondary" size="sm" onClick={() => toast.error("Unable to save. Check your connection and try again.")}>
          Error
        </Button>
        <Button variant="secondary" size="sm" onClick={() => toast.warning("Approaching your AI reply limit", { description: "9,610 of 15,000 used this month." })}>
          Warning + description
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            toast("Answer archived", {
              action: { label: "Undo", onClick: () => toast("Answer restored") },
            })
          }
        >
          With Undo
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
              loading: "Saving changes…",
              success: "Changes saved",
              error: "Unable to save changes.",
            })
          }
        >
          Loading → success
        </Button>
      </Group>
      <Group title="Accordion" className="w-full max-w-2xl">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="kick">
            <AccordionTrigger>Does Pip work on Kick?</AccordionTrigger>
            <AccordionContent>Kick support is coming soon. Today Pip works on YouTube Live and Twitch.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="trial">
            <AccordionTrigger>What happens after the trial?</AccordionTrigger>
            <AccordionContent>You pick a plan, or Pip stops replying. Nothing is deleted for 30 days.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Group>
    </Board>
  )
}

export function FormMoleculesBoard() {
  const [password, setPassword] = useState("mira123")
  const [query, setQuery] = useState("rohan")
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 9, 13))
  const [time, setTime] = useState("19:00")
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 9, 1),
    to: new Date(2026, 9, 10),
  })
  const [timezone, setTimezone] = useState("Asia/Kolkata")
  const [words, setWords] = useState(["free skins", "sub4sub"])

  return (
    <Board
      id="form-molecules"
      layer="Molecules"
      title="Password, Search, Pickers, Upload, Tag input, Copy field"
      description="Composed form controls. Pickers show times in the workspace timezone. Uploads hand each file to a row with progress and the result. Tag input edits a list of words in one field. Copy field holds values people paste elsewhere."
      importLine='import { PasswordField } · { SearchField } from "@/components/molecules/…" · import { DatePicker, … } · { FileDropzone, FileRow } · { TagInput } · { CopyField } from "@kibo/ui/components/…"'
    >
      <Group title="Password and search" className="grid w-full grid-cols-3 gap-6 max-lg:grid-cols-1">
        <PasswordField
          id="pw-1"
          labelAside={
            <span className="flex items-center gap-1.5 text-caption text-disabled">
              Forgot password? <SoonLabel />
            </span>
          }
          defaultValue="immortal-push"
        />
        <PasswordField id="pw-2" showStrength value={password} onChange={(event) => setPassword(event.target.value)} />
        <SearchField
          label="Search viewers"
          placeholder="Search viewers"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onClear={() => setQuery("")}
          resultCount={query ? "3 viewers" : undefined}
        />
      </Group>
      <Group title="Date and time" className="grid w-full grid-cols-4 gap-6 max-lg:grid-cols-1">
        <Field>
          <FieldLabel>Stream date</FieldLabel>
          <DatePicker value={date} onValueChange={setDate} disabled={{ before: new Date() }} />
        </Field>
        <Field>
          <FieldLabel>Start time</FieldLabel>
          <TimePicker value={time} onValueChange={setTime} timezone="IST" />
        </Field>
        <Field>
          <FieldLabel>Report range</FieldLabel>
          <DateRangePicker
            value={range}
            onValueChange={setRange}
            presets={[
              { label: "Last 7 days", range: { from: new Date(2026, 9, 4), to: new Date(2026, 9, 10) } },
              { label: "Last 30 days", range: { from: new Date(2026, 8, 11), to: new Date(2026, 9, 10) } },
              { label: "Last 90 days", range: { from: new Date(2026, 6, 13), to: new Date(2026, 9, 10) }, lockedReason: "Creator plan" },
            ]}
          />
        </Field>
        <Field>
          <FieldLabel>Timezone</FieldLabel>
          <TimezoneSelect value={timezone} onValueChange={setTimezone} aria-label="Timezone" />
        </Field>
      </Group>
      <Group title="File upload" className="grid w-full grid-cols-2 gap-6 max-lg:grid-cols-1">
        <FileDropzone
          accept=".csv,.xlsx,.pdf,.txt,.md"
          maxSize={10 * 1024 * 1024}
          hint="CSV, XLSX, PDF or TXT · up to 10 MB"
          onFiles={(files) => toast(`${files.length} file added`)}
        />
        <div className="flex flex-col gap-2">
          <FileRow name="faq-october.csv" size={142_000} status="uploading" progress={42} onCancel={() => undefined} />
          <FileRow name="sponsors-2026.pdf" size={2_400_000} status="processing" />
          <FileRow name="faq-september.csv" size={98_000} status="done" result="142 answers added" />
          <FileRow name="overlay.mov" size={48_000_000} status="failed" error="Use CSV, XLSX, PDF or TXT." onRetry={() => undefined} />
        </div>
        <FileDropzone accept=".csv" hint="CSV · up to 10 MB" disabledReason="Imports are available on Creator." onFiles={() => undefined} />
      </Group>
      <Group title="Tag input and copy field" className="grid w-full grid-cols-3 gap-6 max-lg:grid-cols-1">
        <Field>
          <FieldLabel>Banned words</FieldLabel>
          <TagInput label="Banned words" value={words} onValueChange={setWords} />
        </Field>
        <CopyField label="Share link" value="https://kibo.gg/s/oct-9-ranked" />
        <CopyField label="API key" value="kb_live_8KdQ2mXa81k93f9a" secret />
        <CopyField label="Overlay URL" value="" disabledReason="Overlays are coming soon." />
      </Group>
      <Group title="Article feedback">
        <ArticleFeedback />
      </Group>
    </Board>
  )
}

export function AuthAndBotBoard() {
  return (
    <Board
      id="bot-controls"
      layer="Molecules"
      title="Social sign-in, Bot controls, Command trigger"
      description="Social sign-in is Not available yet: disabled with Soon and one shared reason. Bot status and Pause sit side by side; Pause is Soon until pausing ships."
      importLine='import { SocialSignIn } · { BotStatus, PauseBotButton } · { CommandTrigger } from "@/components/molecules/…"'
    >
      <Group title="Social sign-in · today · later · connecting" className="grid w-full grid-cols-3 gap-6 max-lg:grid-cols-1">
        <SocialSignIn />
        <SocialSignIn onSelect={() => undefined} />
        <SocialSignIn onSelect={() => undefined} connecting="google" />
      </Group>
      <Group title="Bot controls">
        <Example code='status="offline" soonReason'>
          <BotStatus />
          <PauseBotButton soonReason="Pausing is coming soon." />
        </Example>
        <Example code='status="live"'>
          <BotStatus status="live" label="Live on 2 platforms" />
          <PauseBotButton status="live" />
        </Example>
        <Example code='status="paused"'>
          <BotStatus status="paused" />
          <PauseBotButton status="paused" />
        </Example>
        <Example code="pending">
          <BotStatus status="live" />
          <PauseBotButton status="live" pending />
        </Example>
        <Example code='status="error"'>
          <BotStatus status="error" />
          <PauseBotButton status="error" />
        </Example>
        <Example code="compact">
          <BotStatus status="live" size="sm" />
          <PauseBotButton status="live" compact />
        </Example>
      </Group>
      <Group title="Command trigger" className="w-full">
        <CommandTrigger onOpen={() => toast("Opens the command menu")} />
      </Group>
    </Board>
  )
}
