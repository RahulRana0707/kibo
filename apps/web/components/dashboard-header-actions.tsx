"use client"

import { CommandMenu } from "@/components/command-menu"
import { ThemeToggle } from "@/components/motion/theme-toggle"

export function DashboardHeaderActions() {
  return (
    <div className="ml-auto flex items-center gap-2">
      <CommandMenu />
      <ThemeToggle
        variant="circle-blur"
        start="top-right"
        className="size-8 rounded-md border border-border bg-background/70 text-foreground shadow-sm transition-colors hover:bg-muted"
        iconClassName="size-4"
      />
    </div>
  )
}
