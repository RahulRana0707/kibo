"use client"

import { useState } from "react"
import {
  CalendarDaysIcon,
  ListIcon,
  SearchIcon,
  XIcon,
} from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import { Checkbox, CheckboxField } from "@kibo/ui/components/checkbox"
import { RemovableChip } from "@kibo/ui/components/chip"
import {
  Field,
  FieldCounter,
  FieldLabel,
  FieldLegend,
  FieldMessage,
  FieldSet,
} from "@kibo/ui/components/field"
import { Input } from "@kibo/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@kibo/ui/components/input-group"
import {
  ChoiceCard,
  RadioGroup,
  RadioItem,
} from "@kibo/ui/components/radio-group"
import { SegmentedControl } from "@kibo/ui/components/segmented-control"
import {
  Combobox,
  MultiSelect,
  NativeSelect,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@kibo/ui/components/select"
import { NumberStepper, Slider } from "@kibo/ui/components/slider"
import { SoonLabel } from "@kibo/ui/components/soon-label"
import { Switch, SwitchField } from "@kibo/ui/components/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@kibo/ui/components/tabs"
import { Badge } from "@kibo/ui/components/badge"
import { Textarea } from "@kibo/ui/components/textarea"

import { PlatformIcon } from "@/components/atoms/platform-icon"

import { Board, Example, Group } from "../_components/showcase"

const timezones = [
  { value: "Asia/Kolkata", label: "India · IST (UTC+5:30)" },
  { value: "Asia/Singapore", label: "Singapore · SGT (UTC+8)" },
  { value: "Europe/London", label: "London · BST (UTC+1)" },
  { value: "America/New_York", label: "New York · EDT (UTC−4)" },
  { value: "America/Los_Angeles", label: "Los Angeles · PDT (UTC−7)" },
  { value: "Asia/Tokyo", label: "Tokyo · JST (UTC+9)" },
]

const languages = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "es", label: "Spanish" },
  { value: "pt", label: "Portuguese" },
  { value: "ja", label: "Japanese" },
]

export function InputBoard() {
  const [query, setQuery] = useState("raid")
  const [handle, setHandle] = useState("miraplays")
  const [reply, setReply] = useState(
    "Mira streams Tue, Thu and Sat at 7 pm IST. The schedule is on the Discord."
  )

  return (
    <Board
      id="input"
      layer="Atoms"
      title="Input, Textarea and field text"
      origin="violet"
      description="Single and multi-line text, always 16px so iOS never zooms. Placeholders show an example, never an instruction. Every control has a visible label; an error replaces the helper."
      importLine='import { Input } · { InputGroup, … } · { Textarea } · { Field, FieldLabel, FieldMessage, FieldCounter } from "@kibo/ui/components/…"'
    >
      <Group title="Input states · default 40 and lg 48" className="grid w-full grid-cols-3 gap-6 max-lg:grid-cols-1">
        <Field>
          <FieldLabel htmlFor="in-1">Email</FieldLabel>
          <Input id="in-1" type="email" placeholder="name@example.com" />
          <FieldMessage>We’ll send the receipt here.</FieldMessage>
        </Field>
        <Field>
          <FieldLabel htmlFor="in-2">Email</FieldLabel>
          <Input
            id="in-2"
            type="email"
            defaultValue="mira@"
            aria-invalid="true"
            aria-describedby="in-2-msg"
          />
          <FieldMessage id="in-2-msg" error>
            Enter an email address like name@example.com.
          </FieldMessage>
        </Field>
        <Field>
          <FieldLabel htmlFor="in-3">Workspace ID</FieldLabel>
          <Input id="in-3" readOnly defaultValue="ws_8KdQ2m" />
          <FieldMessage>Read-only.</FieldMessage>
        </Field>
        <Field>
          <FieldLabel htmlFor="in-4">Channel</FieldLabel>
          <Input id="in-4" disabled defaultValue="miraplays" />
        </Field>
        <Field>
          <FieldLabel htmlFor="in-5" optional>
            Discord invite
          </FieldLabel>
          <Input id="in-5" size="lg" placeholder="discord.gg/miraplays" />
          <FieldMessage>size=&quot;lg&quot; for touch-first forms.</FieldMessage>
        </Field>
        <Field>
          <FieldLabel
            htmlFor="in-6"
            aside={
              <span className="flex items-center gap-1.5 text-caption text-disabled">
                Forgot password? <SoonLabel />
              </span>
            }
          >
            Password
          </FieldLabel>
          <Input id="in-6" type="password" defaultValue="immortal-push" />
        </Field>
      </Group>
      <Group title="Input group" className="grid w-full grid-cols-3 gap-6 max-lg:grid-cols-1">
        <Example code='<InputGroupAddon><SearchIcon/></InputGroupAddon> · clearable'>
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              aria-label="Search viewers"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query ? (
              <InputGroupAddon align="end">
                <InputGroupButton
                  size="icon-xs"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                >
                  <XIcon />
                </InputGroupButton>
              </InputGroupAddon>
            ) : null}
          </InputGroup>
        </Example>
        <Example code='prefix "discord.gg/"'>
          <InputGroup>
            <InputGroupAddon>discord.gg/</InputGroupAddon>
            <InputGroupInput aria-label="Discord invite" defaultValue="miraplays" />
          </InputGroup>
        </Example>
        <Example code='suffix "seconds"'>
          <InputGroup>
            <InputGroupInput aria-label="Cooldown" defaultValue="30" />
            <InputGroupAddon align="end">
              <span>seconds</span>
            </InputGroupAddon>
          </InputGroup>
        </Example>
        <Example code="endAction · counter">
          <Field className="w-full">
            <InputGroup>
              <InputGroupAddon>@</InputGroupAddon>
              <InputGroupInput
                aria-label="Handle"
                maxLength={24}
                value={handle}
                onChange={(event) => setHandle(event.target.value)}
              />
              <InputGroupAddon align="end">
                <InputGroupButton variant="secondary">Check</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <FieldCounter value={handle.length} max={24} />
          </Field>
        </Example>
      </Group>
      <Group title="Textarea · auto-grow and counter" className="grid w-full grid-cols-2 gap-6 max-lg:grid-cols-1">
        <Field>
          <FieldLabel htmlFor="ta-1">Answer</FieldLabel>
          <Textarea
            id="ta-1"
            autoGrow
            value={reply}
            onChange={(event) => setReply(event.target.value)}
          />
          <FieldCounter value={reply.length} max={200} />
        </Field>
        <Field>
          <FieldLabel htmlFor="ta-2">Notes</FieldLabel>
          <Textarea id="ta-2" aria-invalid="true" defaultValue="" />
          <FieldMessage error>Write the answer Pip should give.</FieldMessage>
        </Field>
      </Group>
      <Group title="Fieldset · horizontal field">
        <FieldSet className="w-full max-w-xl">
          <FieldLegend>Where do you stream?</FieldLegend>
          <FieldMessage>Pick every platform; Kick is coming soon.</FieldMessage>
        </FieldSet>
        <Field orientation="horizontal" className="w-full max-w-2xl">
          <FieldLabel htmlFor="h-1">Bot name</FieldLabel>
          <Input id="h-1" defaultValue="Pip" />
          <FieldMessage>Viewers see this name in chat.</FieldMessage>
        </Field>
      </Group>
    </Board>
  )
}

export function SelectionBoard() {
  const [mode, setMode] = useState("approve")
  const [audience, setAudience] = useState("500")
  const [period, setPeriod] = useState<"monthly" | "yearly">("yearly")
  const [view, setView] = useState<"month" | "week" | "list">("month")
  const [quiet, setQuiet] = useState(true)
  const [timezone, setTimezone] = useState("Asia/Kolkata")
  const [langs, setLangs] = useState(["en", "hi"])
  const [threshold, setThreshold] = useState([85])
  const [cooldown, setCooldown] = useState(30)
  const [chips, setChips] = useState(["English", "Hindi"])

  return (
    <Board
      id="selection"
      layer="Atoms"
      title="Checkbox, Radio, Switch, Select, Segmented control, Slider"
      origin="violet"
      description="Checkbox for a form saved later; Switch for an instant setting; radio list up to five options, choice cards when options need a sentence, Select above seven. Segmented sets a value in place; Slider when a value is easier to feel than type."
      importLine='import { Checkbox } · { RadioGroup, RadioItem, ChoiceCard } · { Switch } · { Select, Combobox, MultiSelect } · { SegmentedControl } · { Slider, NumberStepper } from "@kibo/ui/components/…"'
    >
      <Group title="Checkbox">
        <Example code="checked={false}">
          <Checkbox aria-label="Unchecked" />
        </Example>
        <Example code="checked">
          <Checkbox aria-label="Checked" defaultChecked />
        </Example>
        <Example code='checked="indeterminate"'>
          <Checkbox aria-label="Some" checked="indeterminate" />
        </Example>
        <Example code="disabled">
          <Checkbox aria-label="Disabled" disabled />
          <Checkbox aria-label="Disabled checked" disabled defaultChecked />
        </Example>
        <Example code="invalid">
          <Checkbox aria-label="Invalid" aria-invalid="true" />
        </Example>
        <CheckboxField
          label="Keep me logged in for 30 days"
          description="Only on this device."
          defaultChecked
        />
      </Group>
      <Group title="Radio list · choice cards" className="grid w-full grid-cols-2 gap-8 max-lg:grid-cols-1">
        <RadioGroup value={mode} onValueChange={setMode} aria-label="Reply mode">
          <RadioItem value="approve" label="Approve each reply" description="Pip drafts; you approve." />
          <RadioItem value="auto" label="Auto above 85%" description="Pip posts when it’s sure." />
          <RadioItem value="silent" label="Silent" description="Pip only learns." />
          <RadioItem value="off" label="Off" disabled />
        </RadioGroup>
        <RadioGroup
          value={audience}
          onValueChange={setAudience}
          aria-label="Audience size"
          className="grid-cols-2 gap-3"
        >
          <ChoiceCard value="50" label="Under 50" />
          <ChoiceCard value="500" label="500–5,000" description="Most creators on Creator." />
          <ChoiceCard
            value="yt"
            label="YouTube Live"
            media={<PlatformIcon platform="youtube" size="lg" />}
          />
          <ChoiceCard
            value="kick"
            label="Kick"
            description="Kick support is on the way."
            media={<PlatformIcon platform="kick" size="lg" muted />}
            aside={<SoonLabel />}
            disabled
          />
        </RadioGroup>
      </Group>
      <Group title="Switch">
        <Example code="checked={false}">
          <Switch aria-label="Off" />
        </Example>
        <Example code="checked">
          <Switch aria-label="On" defaultChecked />
        </Example>
        <Example code="disabled">
          <Switch aria-label="Disabled" disabled />
          <Switch aria-label="Disabled on" disabled defaultChecked />
        </Example>
        <SwitchField
          className="w-96"
          label="Quiet mode"
          description="Pip only answers direct questions."
          checked={quiet}
          onCheckedChange={setQuiet}
        />
      </Group>
      <Group title="Select" className="grid w-full grid-cols-3 gap-6 max-lg:grid-cols-1">
        <Field>
          <FieldLabel htmlFor="ns">Timezone · native</FieldLabel>
          <NativeSelect id="ns" defaultValue="Asia/Kolkata">
            {timezones.map((zone) => (
              <option key={zone.value} value={zone.value}>
                {zone.label}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field>
          <FieldLabel>Default bot · custom</FieldLabel>
          <Select defaultValue="pip">
            <SelectTrigger aria-label="Default bot">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Bots</SelectLabel>
                <SelectItem value="pip">Pip</SelectItem>
                <SelectItem value="cozy">Cozy Pip</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectItem value="hindi" disabled>
                Hindi Pip (draft)
              </SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel>Timezone · combobox</FieldLabel>
          <Combobox
            aria-label="Timezone"
            options={timezones}
            value={timezone}
            onValueChange={setTimezone}
            searchPlaceholder="Search timezones"
          />
        </Field>
        <Field className="col-span-2 max-lg:col-span-1">
          <FieldLabel>Languages your chat uses · multi</FieldLabel>
          <MultiSelect
            options={languages}
            value={langs}
            onValueChange={setLangs}
            searchPlaceholder="Search languages"
          />
        </Field>
      </Group>
      <Group title="Segmented control">
        <Example code='size="default"'>
          <SegmentedControl
            label="Billing period"
            value={period}
            onValueChange={setPeriod}
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly · save 20%" },
            ]}
          />
        </Example>
        <Example code='size="sm" · icons'>
          <SegmentedControl
            label="Calendar view"
            size="sm"
            value={view}
            onValueChange={setView}
            options={[
              { value: "month", label: "Month", icon: <CalendarDaysIcon /> },
              { value: "week", label: "Week" },
              { value: "list", label: "List", icon: <ListIcon /> },
            ]}
          />
        </Example>
        <Example code="block · phone" className="w-80">
          <SegmentedControl
            label="Billing period"
            block
            value={period}
            onValueChange={setPeriod}
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly" },
            ]}
          />
        </Example>
      </Group>
      <Group title="Slider · number stepper · removable chips">
        <Field className="w-80">
          <div className="flex justify-between text-body-sm">
            <span className="font-medium">Answer automatically above</span>
            <span className="font-semibold tabular">{threshold[0]}%</span>
          </div>
          <Slider
            aria-label="Confidence threshold"
            min={50}
            max={100}
            step={5}
            value={threshold}
            onValueChange={setThreshold}
          />
        </Field>
        <Field>
          <FieldLabel>Cooldown per viewer (seconds)</FieldLabel>
          <NumberStepper
            name="cooldown"
            aria-label="Cooldown per viewer"
            value={cooldown}
            onValueChange={setCooldown}
            min={0}
            max={600}
            step={5}
          />
        </Field>
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <RemovableChip
              key={chip}
              label={chip}
              onRemove={() => setChips(chips.filter((item) => item !== chip))}
            />
          ))}
        </div>
      </Group>
      <Group title="Tabs · underline and contained" className="grid w-full grid-cols-2 gap-8 max-lg:grid-cols-1">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rules">Rules &amp; filters</TabsTrigger>
            <TabsTrigger value="review">
              Review queue <Badge variant="warning" count={4} />
            </TabsTrigger>
            <TabsTrigger value="appeals" disabled>
              Appeals
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="text-muted-foreground">
            Overview panel
          </TabsContent>
          <TabsContent value="rules">Rules panel</TabsContent>
          <TabsContent value="review">Review panel</TabsContent>
        </Tabs>
        <Tabs defaultValue="week">
          <TabsList variant="contained">
            <TabsTrigger value="week">This week</TabsTrigger>
            <TabsTrigger value="month">This month</TabsTrigger>
            <TabsTrigger value="all">All time</TabsTrigger>
          </TabsList>
          <TabsContent value="week" className="text-muted-foreground">
            Leaderboard for this week
          </TabsContent>
        </Tabs>
      </Group>
      <Button variant="ghost" size="sm" className="self-start" onClick={() => setChips(["English", "Hindi"])}>
        Reset examples
      </Button>
    </Board>
  )
}
