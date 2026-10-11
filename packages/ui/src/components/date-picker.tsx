"use client"

import * as React from "react"
import {
  CalendarIcon,
  ChevronDownIcon,
  ClockIcon,
  GlobeIcon,
  LockIcon,
} from "lucide-react"
import type { DateRange, Matcher } from "react-day-picker"

import { cn } from "@kibo/ui/lib/utils"
import { Calendar } from "@kibo/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@kibo/ui/components/popover"
import { Combobox } from "@kibo/ui/components/select"

const triggerClassName =
  "flex h-10 w-full min-w-0 items-center gap-2 rounded-md border border-input bg-sunken px-3 text-start text-[0.9375rem] text-foreground disabled:cursor-not-allowed disabled:text-disabled aria-invalid:border-destructive data-[placeholder]:text-disabled [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-muted-foreground"

const dateFormat = new Intl.DateTimeFormat("en", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
})

const shortDate = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
})

/** A stream date. Times and dates show in the workspace timezone. */
function DatePicker({
  value,
  onValueChange,
  disabled,
  placeholder = "Pick a date",
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "value" | "disabled"> & {
  value?: Date
  onValueChange: (value: Date | undefined) => void
  /** Days that can't be picked, such as past days on the Schedule. */
  disabled?: Matcher | Matcher[]
  placeholder?: string
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-haspopup="dialog"
          data-placeholder={value ? undefined : ""}
          className={cn(triggerClassName, className)}
          {...props}
        >
          <CalendarIcon aria-hidden="true" />
          <span className="flex-1 truncate">
            {value ? dateFormat.format(value) : placeholder}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(next) => {
            onValueChange(next)
            setOpen(false)
          }}
          disabled={disabled}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}

/** Every time of day at `step` minutes, labelled like “7:00 PM”. */
function timeOptions(step: number) {
  const format = new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  })
  const options: { value: string; label: string }[] = []
  for (let minutes = 0; minutes < 24 * 60; minutes += step) {
    const hours = Math.floor(minutes / 60)
    const rest = minutes % 60
    const value = `${String(hours).padStart(2, "0")}:${String(rest).padStart(2, "0")}`
    options.push({
      value,
      label: format.format(new Date(2026, 0, 1, hours, rest)),
    })
  }
  return options
}

/**
 * A start time in `step`-minute increments, with the timezone named
 * beside the value. Values are “HH:mm”.
 */
function TimePicker({
  value,
  onValueChange,
  step = 15,
  timezone,
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "value"> & {
  value?: string
  onValueChange: (value: string) => void
  step?: number
  /** Short timezone name shown after the time, such as “IST”. */
  timezone?: string
}) {
  const options = React.useMemo(() => timeOptions(step), [step])
  const [open, setOpen] = React.useState(false)
  const selected = options.find((option) => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-haspopup="listbox"
          data-placeholder={selected ? undefined : ""}
          className={cn(triggerClassName, className)}
          {...props}
        >
          <ClockIcon aria-hidden="true" />
          <span className="flex-1 truncate tabular">
            {selected?.label ?? "Pick a time"}
            {selected && timezone ? (
              <span className="text-muted-foreground"> {timezone}</span>
            ) : null}
          </span>
          <ChevronDownIcon aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="max-h-72 w-(--radix-popover-trigger-width) min-w-40 overflow-y-auto">
        <ul role="listbox" aria-label="Times" className="flex flex-col">
          {options.map((option) => (
            <li key={option.value} role="none">
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onValueChange(option.value)
                  setOpen(false)
                }}
                className={cn(
                  "flex min-h-9 w-full items-center rounded-md px-2.5 text-start text-body-sm tabular hover:bg-hovered max-sm:min-h-11",
                  option.value === value && "bg-primary-subtle text-link"
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

type RangePreset = {
  label: string
  range: DateRange
  /** Locked by plan, with the reason in text (“Creator plan”). */
  lockedReason?: string
}

/** A report range: presets on the left, two months on the right. */
function DateRangePicker({
  value,
  onValueChange,
  presets = [],
  disabled,
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "value" | "disabled"> & {
  value?: DateRange
  onValueChange: (value: DateRange | undefined) => void
  presets?: RangePreset[]
  disabled?: Matcher | Matcher[]
}) {
  const [open, setOpen] = React.useState(false)
  const label =
    value?.from && value.to
      ? `${shortDate.format(value.from)} – ${shortDate.format(value.to)}`
      : "Pick dates"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-haspopup="dialog"
          data-placeholder={value?.from ? undefined : ""}
          className={cn(triggerClassName, className)}
          {...props}
        >
          <CalendarIcon aria-hidden="true" />
          <span className="flex-1 truncate">{label}</span>
          <ChevronDownIcon aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto gap-3 p-3 max-sm:flex-col">
        {presets.length ? (
          <ul className="flex min-w-36 flex-col gap-0.5 border-e border-separator pe-3 max-sm:border-e-0 max-sm:border-b max-sm:pe-0 max-sm:pb-3">
            {presets.map((preset) => (
              <li key={preset.label}>
                <button
                  type="button"
                  aria-disabled={preset.lockedReason ? true : undefined}
                  title={preset.lockedReason}
                  onClick={() => {
                    if (preset.lockedReason) return
                    onValueChange(preset.range)
                    setOpen(false)
                  }}
                  className="flex min-h-9 w-full items-center justify-between gap-2 rounded-md px-2.5 text-start text-body-sm hover:bg-hovered aria-disabled:cursor-not-allowed aria-disabled:text-disabled"
                >
                  {preset.label}
                  {preset.lockedReason ? (
                    <LockIcon aria-hidden="true" className="size-3.5" />
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        <Calendar
          mode="range"
          numberOfMonths={2}
          selected={value}
          onSelect={onValueChange}
          disabled={disabled}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}

/** Every IANA timezone, labelled “Asia/Kolkata (GMT+5:30)”. */
function timezoneOptions() {
  const zones =
    typeof Intl.supportedValuesOf === "function"
      ? Intl.supportedValuesOf("timeZone")
      : ["UTC"]
  return zones.map((zone) => {
    const offset =
      new Intl.DateTimeFormat("en", {
        timeZone: zone,
        timeZoneName: "shortOffset",
      })
        .formatToParts(new Date())
        .find((part) => part.type === "timeZoneName")?.value ?? ""
    return {
      value: zone,
      label: `${zone.replaceAll("_", " ")} (${offset})`,
      icon: <GlobeIcon aria-hidden="true" className="size-4 text-muted-foreground" />,
    }
  })
}

/** A searchable timezone list. */
function TimezoneSelect({
  value,
  onValueChange,
  ...props
}: {
  value?: string
  onValueChange: (value: string) => void
  "aria-label"?: string
  id?: string
}) {
  const options = React.useMemo(() => timezoneOptions(), [])
  return (
    <Combobox
      options={options}
      value={value}
      onValueChange={onValueChange}
      placeholder="Pick a timezone"
      searchPlaceholder="Search timezones"
      emptyText="No timezone matches."
      {...props}
    />
  )
}

export { DatePicker, TimePicker, DateRangePicker, TimezoneSelect, type DateRange }
