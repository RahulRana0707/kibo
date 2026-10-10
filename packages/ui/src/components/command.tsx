"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"

import { cn } from "@kibo/ui/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@kibo/ui/components/dialog"
import { Spinner } from "@kibo/ui/components/spinner"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex size-full flex-col overflow-hidden bg-popover text-popover-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * The ⌘K dialog: 600 wide, 15% from the top, full screen on phone. Pass a
 * `footer` for key hints.
 */
function CommandDialog({
  title,
  description,
  children,
  footer,
  className,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title: string
  description: string
  footer?: React.ReactNode
  className?: string
}) {
  return (
    <Dialog {...props}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "gap-0 overflow-hidden p-0 max-sm:inset-0 max-sm:max-h-none max-sm:rounded-none max-sm:p-0 sm:top-[15vh] sm:max-w-150 sm:translate-y-0",
          className
        )}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        <Command className="max-sm:h-dvh">
          {children}
          {footer ? (
            <div className="flex items-center gap-4 border-t border-separator px-4 py-2.5 text-[0.75rem] text-muted-foreground max-sm:hidden">
              {footer}
            </div>
          ) : null}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

/**
 * The search field. `variant="dialog"` (56, search 20) heads the ⌘K
 * dialog; `inline` (40) sits inside pickers.
 */
function CommandInput({
  className,
  variant = "inline",
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input> & {
  variant?: "inline" | "dialog"
}) {
  return (
    <div
      data-slot="command-input-wrapper"
      className={cn(
        "flex items-center gap-2",
        variant === "dialog"
          ? "h-14 border-b border-separator px-4 [&>svg]:size-5"
          : "m-1 h-10 rounded-md border border-input bg-sunken px-3 [&>svg]:size-4"
      )}
    >
      <SearchIcon
        aria-hidden="true"
        className="shrink-0 text-muted-foreground"
      />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "h-full w-full min-w-0 bg-transparent text-body outline-none placeholder:text-disabled disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-90 scroll-py-1.5 overflow-x-hidden overflow-y-auto p-1.5 outline-none max-sm:max-h-none max-sm:flex-1",
        className
      )}
      {...props}
    />
  )
}

/** Shown when nothing matches. Echo the query and offer a way out. */
function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn(
        "flex flex-col items-center gap-1 px-4 py-8 text-center text-body-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

/** Records still streaming in. Pages show instantly. */
function CommandLoading({
  className,
  children = "Searching…",
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Loading>) {
  return (
    <CommandPrimitive.Loading
      data-slot="command-loading"
      className={cn("px-3 py-2.5", className)}
      {...props}
    >
      <span className="flex items-center gap-2 text-caption text-muted-foreground">
        <Spinner />
        {children}
      </span>
    </CommandPrimitive.Loading>
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:pt-3 **:[[cmdk-group-heading]]:pb-1 **:[[cmdk-group-heading]]:text-overline **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group-heading]]:uppercase",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1.5 my-1 h-px bg-separator", className)}
      {...props}
    />
  )
}

/**
 * One row: 44 in the ⌘K menu (52 on phone), highlight bg-hover like every
 * menu. Disabled rows stay visible and read as unavailable.
 */
function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "group/command-item relative flex min-h-11 cursor-default items-center gap-3 rounded-md px-3 py-2 text-body-sm outline-hidden select-none max-sm:min-h-13 data-[disabled=true]:text-disabled data-[selected=true]:bg-hovered [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground data-[disabled=true]:[&_svg]:text-disabled [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/** Trailing content of a row: a shortcut, or ↵ on the highlighted row. */
function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn("ms-auto flex items-center gap-1", className)}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandLoading,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
