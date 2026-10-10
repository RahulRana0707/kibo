"use client"

import * as React from "react"

import { cn } from "@kibo/ui/lib/utils"

const symbols: Record<string, { mac: string; other: string; spoken: string }> =
  {
    mod: { mac: "⌘", other: "Ctrl", spoken: "Command" },
    shift: { mac: "⇧", other: "Shift", spoken: "Shift" },
    alt: { mac: "⌥", other: "Alt", spoken: "Option" },
    enter: { mac: "↵", other: "Enter", spoken: "Enter" },
    esc: { mac: "Esc", other: "Esc", spoken: "Escape" },
  }

function subscribe() {
  return () => {}
}

/** True on Apple platforms, decided in the browser. */
function useIsMac() {
  return React.useSyncExternalStore(
    subscribe,
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => true
  )
}

/** One key: ⌘, Shift, K. On a dark surface (a tooltip) it turns transparent. */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-sm bg-sunken px-[5px] font-mono text-[0.6875rem] text-muted-foreground shadow-[inset_0_-1px_0_var(--vi-border-subtle)] in-data-[slot=tooltip-content]:bg-transparent in-data-[slot=tooltip-content]:text-inverse-foreground in-data-[slot=tooltip-content]:shadow-[inset_0_0_0_1px_var(--vi-text-secondary)]",
        className
      )}
      {...props}
    />
  )
}

/**
 * A shortcut such as ["mod", "k"]: ⌘ K on a Mac, Ctrl K elsewhere. Also put
 * aria-keyshortcuts on the control it triggers.
 */
function KbdGroup({
  keys,
  className,
  ...props
}: React.ComponentProps<"span"> & { keys: string[] }) {
  const isMac = useIsMac()

  return (
    <span
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    >
      {keys.map((key) => {
        const symbol = symbols[key]
        const shown = symbol
          ? isMac
            ? symbol.mac
            : symbol.other
          : key.toUpperCase()
        return (
          <Kbd key={key} aria-label={symbol?.spoken}>
            {shown}
          </Kbd>
        )
      })}
    </span>
  )
}

export { Kbd, KbdGroup, useIsMac }
