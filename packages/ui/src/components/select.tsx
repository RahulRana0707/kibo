"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"
import { Select as SelectPrimitive } from "radix-ui"

import { cn } from "@kibo/ui/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@kibo/ui/components/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@kibo/ui/components/popover"

// Triggers share the input surface; open lists share the popover surface.
const triggerClassName =
  "flex w-full min-w-0 items-center gap-2 rounded-md border border-input bg-sunken px-3 text-start text-body text-foreground disabled:cursor-not-allowed disabled:border-border-control disabled:text-disabled aria-invalid:border-destructive data-[placeholder]:text-disabled [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-muted-foreground"

const sizes = { default: "h-10", lg: "h-12" }

const optionClassName =
  "relative flex min-h-9 w-full cursor-default items-center gap-2.5 rounded-md py-1.5 ps-2.5 pe-8 text-body-sm outline-none select-none data-[disabled]:text-disabled data-[highlighted]:bg-hovered data-[selected=true]:bg-hovered [&_svg]:size-4 [&_svg]:shrink-0"

/** The browser's select, styled like the inputs. For simple forms. */
function NativeSelect({
  className,
  size = "default",
  ...props
}: Omit<React.ComponentProps<"select">, "size"> & {
  size?: keyof typeof sizes
}) {
  return (
    <span className={cn("relative block", className)}>
      <select
        data-slot="native-select"
        className={cn(
          "w-full appearance-none rounded-md border border-input bg-sunken ps-3 pe-9 text-body text-foreground disabled:cursor-not-allowed disabled:text-disabled aria-invalid:border-destructive",
          sizes[size]
        )}
        {...props}
      />
      <ChevronDownIcon
        aria-hidden="true"
        className="pointer-events-none absolute inset-e-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </span>
  )
}

/* ------------------------------ Select ------------------------------ */

function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectValue(
  props: React.ComponentProps<typeof SelectPrimitive.Value>
) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

/** For options that need icons or status. Arrows move, typing jumps. */
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: keyof typeof sizes
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(triggerClassName, sizes[size], className)}
      {...props}
    >
      <span className="flex min-w-0 flex-1 items-center gap-2 truncate">
        {children}
      </span>
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon aria-hidden="true" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        sideOffset={4}
        className={cn(
          "z-50 max-h-80 min-w-(--radix-select-trigger-width) overflow-y-auto rounded-lg border border-transparent bg-popover p-1.5 text-popover-foreground shadow-raised data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-fast data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-fast motion-safe:data-[state=open]:slide-in-from-top-1",
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectGroup(props: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "px-2.5 pt-2 pb-1 text-overline text-muted-foreground uppercase",
        className
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(optionClassName, className)}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute inset-e-2.5 text-link">
        <CheckIcon aria-hidden="true" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("-mx-1.5 my-1 h-px bg-separator", className)}
      {...props}
    />
  )
}

/* ----------------------------- Combobox ----------------------------- */

type Option = {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

function OptionList({
  options,
  isSelected,
  onSelect,
  searchPlaceholder,
  emptyText,
}: {
  options: Option[]
  isSelected: (value: string) => boolean
  onSelect: (value: string) => void
  searchPlaceholder: string
  emptyText: string
}) {
  return (
    <Command>
      <CommandInput placeholder={searchPlaceholder} />
      <CommandList className="max-h-72 p-0 pt-1">
        <CommandEmpty>{emptyText}</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              value={option.label}
              disabled={option.disabled}
              onSelect={() => onSelect(option.value)}
              className={cn(optionClassName, "min-h-9 gap-2.5 px-2.5 max-sm:min-h-12")}
            >
              {option.icon}
              {option.label}
              {isSelected(option.value) ? (
                <CheckIcon
                  aria-hidden="true"
                  className="absolute inset-e-2.5 text-link!"
                />
              ) : null}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

/** A select you can type into, for lists longer than ten. */
function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select…",
  searchPlaceholder = "Search",
  emptyText = "No matches.",
  size = "default",
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "value"> & {
  options: Option[]
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  size?: keyof typeof sizes
}) {
  const [open, setOpen] = React.useState(false)
  const selected = options.find((option) => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          data-placeholder={selected ? undefined : ""}
          className={cn(triggerClassName, sizes[size], className)}
          {...props}
        >
          <span className="flex min-w-0 flex-1 items-center gap-2 truncate">
            {selected?.icon}
            {selected?.label ?? placeholder}
          </span>
          <ChevronDownIcon aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) min-w-64 p-1">
        <OptionList
          options={options}
          isSelected={(option) => option === value}
          onSelect={(option) => {
            onValueChange(option)
            setOpen(false)
          }}
          searchPlaceholder={searchPlaceholder}
          emptyText={emptyText}
        />
      </PopoverContent>
    </Popover>
  )
}

/** Pick several, shown as chips in the trigger (languages, tags). */
function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select…",
  searchPlaceholder = "Search",
  emptyText = "No matches.",
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "defaultValue"> & {
  options: Option[]
  value: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
}) {
  const [open, setOpen] = React.useState(false)
  const toggle = (option: string) =>
    onValueChange(
      value.includes(option)
        ? value.filter((item) => item !== option)
        : [...value, option]
    )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div
        className={cn(
          "flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-sunken py-1.5 ps-1.5 pe-1",
          className
        )}
        {...props}
      >
        {value.map((item) => {
          const option = options.find((candidate) => candidate.value === item)
          return (
            <span
              key={item}
              className="inline-flex h-6 items-center gap-1 rounded-full bg-primary-subtle ps-2 pe-0.5 text-caption font-medium text-link"
            >
              {option?.label ?? item}
              <button
                type="button"
                aria-label={`Remove ${option?.label ?? item}`}
                onClick={() => toggle(item)}
                className="grid size-[18px] place-items-center rounded-full hover:bg-primary-subtle-hover"
              >
                <XIcon aria-hidden="true" className="size-3" />
              </button>
            </span>
          )
        })}
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-expanded={open}
            className="flex h-7 min-w-24 flex-1 items-center justify-between gap-2 rounded-sm px-1.5 text-start text-body text-disabled"
          >
            {value.length ? "Add" : placeholder}
            <ChevronDownIcon
              aria-hidden="true"
              className="size-4 text-muted-foreground"
            />
          </button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="min-w-64 p-1">
        <OptionList
          options={options}
          isSelected={(option) => value.includes(option)}
          onSelect={toggle}
          searchPlaceholder={searchPlaceholder}
          emptyText={emptyText}
        />
      </PopoverContent>
    </Popover>
  )
}

export {
  NativeSelect,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Combobox,
  MultiSelect,
  type Option as SelectOption,
}
