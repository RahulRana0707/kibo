"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LogOutIcon, SearchIcon } from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@kibo/ui/components/command"

import { SoonLabel } from "@kibo/ui/components/soon-label"
import { useLogOut } from "@/hooks/use-log-out"
import { appNavigation } from "@/lib/app-navigation"

const kbdClassName =
  "inline-flex h-5 min-w-5 items-center justify-center rounded-sm bg-sunken px-1.5 font-mono text-[0.6875rem] text-muted-foreground shadow-[inset_0_-1px_0_var(--vi-border-subtle)]"

/** "Search or jump to…" in the top bar, opened with ⌘K or Ctrl K. */
export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const logOut = useLogOut()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const pages = appNavigation.flatMap((group) => group.items)

  function go(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <Button
        variant="secondary"
        aria-keyshortcuts="Meta+K"
        onClick={() => setOpen(true)}
        className="max-w-[420px] flex-[1_1_260px] justify-start font-normal text-muted-foreground"
      >
        <SearchIcon aria-hidden="true" />
        <span className="flex-1 text-start">Search or jump to…</span>
        <kbd className={kbdClassName}>⌘K</kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search and commands"
        description="Search pages or run a command"
      >
        <CommandInput placeholder="Search or type a command" />
        <CommandList>
          <CommandEmpty>No pages or commands match.</CommandEmpty>
          <CommandGroup heading="Pages">
            {pages.map((page) => {
              const Icon = page.icon
              return (
                <CommandItem
                  key={page.href}
                  disabled={!page.ready}
                  onSelect={() => go(page.href)}
                >
                  <Icon aria-hidden="true" />
                  {page.label}
                  {page.ready ? null : <SoonLabel />}
                </CommandItem>
              )
            })}
          </CommandGroup>
          <CommandGroup heading="Actions">
            <CommandItem
              onSelect={() => {
                setOpen(false)
                void logOut()
              }}
            >
              <LogOutIcon aria-hidden="true" />
              Log out
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
