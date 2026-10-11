"use client"

import * as React from "react"
import { CheckIcon, ChevronRightIcon } from "lucide-react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"

import { cn } from "@kibo/ui/lib/utils"
import { SoonLabel } from "@kibo/ui/components/soon-label"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

const surface =
  "z-50 min-w-[220px] overflow-x-hidden overflow-y-auto rounded-lg border border-transparent bg-popover p-1.5 text-body-sm text-popover-foreground shadow-raised data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-instant data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-fast motion-safe:data-[state=open]:zoom-in-[0.98]"

/** One surface for every menu: bg-raised, shadow-raised, radius-lg. */
function DropdownMenuContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(
          surface,
          "max-h-(--radix-dropdown-menu-content-available-height) origin-(--radix-dropdown-menu-content-transform-origin)",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

const itemClassName =
  "group/menu-item relative flex min-h-9 cursor-default items-center gap-2.5 rounded-md px-2.5 py-1.5 text-body-sm outline-hidden select-none focus:bg-hovered active:bg-pressed data-[disabled]:text-disabled aria-disabled:text-disabled aria-disabled:focus:bg-hovered [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground aria-disabled:[&_svg]:text-disabled [&_svg:not([class*='size-'])]:size-4"

/**
 * One menu row: 36 tall, highlight bg-hover. `description` adds a second
 * line; `variant="destructive"` goes last, after a separator. `soon` keeps
 * the item focusable but inert, with a Soon label.
 */
function DropdownMenuItem({
  className,
  variant = "default",
  description,
  soon = false,
  onSelect,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  variant?: "default" | "destructive"
  description?: React.ReactNode
  soon?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-variant={variant}
      aria-disabled={soon || undefined}
      onSelect={(event) => {
        if (soon) {
          event.preventDefault()
          return
        }
        onSelect?.(event)
      }}
      className={cn(
        itemClassName,
        "data-[variant=destructive]:text-destructive-text data-[variant=destructive]:focus:bg-destructive-subtle data-[variant=destructive]:[&_svg]:text-destructive-text",
        description && "items-start",
        className
      )}
      {...props}
    >
      {description ? (
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="flex items-center gap-2.5">{children}</span>
          <span className="text-caption text-muted-foreground">
            {description}
          </span>
        </span>
      ) : (
        children
      )}
      {soon ? <SoonLabel className="ms-auto" /> : null}
    </DropdownMenuPrimitive.Item>
  )
}

const indicatorBox =
  "grid size-4 shrink-0 place-items-center border-[1.5px] border-border-strong text-on-accent"

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(itemClassName, className)}
      checked={checked}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          indicatorBox,
          "rounded-[4px]",
          checked === true && "border-transparent bg-primary"
        )}
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon strokeWidth={3} className="size-3! text-on-accent!" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn("group/radio-item", itemClassName, className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          indicatorBox,
          "rounded-full group-data-[state=checked]/radio-item:border-[5px] group-data-[state=checked]/radio-item:border-primary"
        )}
      />
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      className={cn(
        "px-2.5 pt-2 pb-1 text-overline text-muted-foreground uppercase",
        className
      )}
      {...props}
    />
  )
}

/** The signed-in person at the top of the account menu. Not focusable. */
function DropdownMenuUserHeader({
  name,
  email,
  avatar,
  className,
}: {
  name: string
  email: string
  avatar?: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-slot="dropdown-menu-user-header"
      className={cn("flex items-center gap-3 px-2.5 py-2", className)}
    >
      {avatar}
      <div className="flex min-w-0 flex-col">
        <span className="truncate font-medium">{name}</span>
        <span className="truncate text-caption text-muted-foreground">
          {email}
        </span>
      </div>
    </div>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1.5 my-1 h-px bg-separator", className)}
      {...props}
    />
  )
}

/** Trailing shortcut keys; hidden on phones. */
function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("ms-auto flex items-center gap-1 max-sm:hidden", className)}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger>) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      className={cn(itemClassName, "data-[state=open]:bg-hovered", className)}
      {...props}
    >
      {children}
      <ChevronRightIcon aria-hidden="true" className="ms-auto rtl:rotate-180" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        data-slot="dropdown-menu-sub-content"
        className={cn(
          surface,
          "origin-(--radix-dropdown-menu-content-transform-origin)",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuUserHeader,
}
