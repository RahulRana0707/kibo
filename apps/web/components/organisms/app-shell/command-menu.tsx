"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LogOutIcon } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@kibo/ui/components/command"
import { Kbd } from "@kibo/ui/components/kbd"
import { SoonLabel } from "@kibo/ui/components/soon-label"

import { CommandTrigger } from "@/components/molecules/command-trigger"
import { useLogOut } from "@/hooks/use-log-out"
import { appNavigation } from "@/lib/app-navigation"

/**
 * ⌘K / Ctrl K anywhere in the app: jump to a page or run an action. The
 * trigger lives in the top bar; on phones it is full screen.
 */
export function CommandMenu({ showTrigger = true }: { showTrigger?: boolean }) {
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

  const groups = appNavigation.map((group) => ({
    title: group.title,
    items: group.items,
  }))

  function go(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      {showTrigger ? <CommandTrigger onOpen={() => setOpen(true)} /> : null}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search and commands"
        description="Search pages or run a command"
        footer={
          <>
            <span className="flex items-center gap-1.5">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd> to move
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>↵</Kbd> to open
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>Esc</Kbd> to close
            </span>
          </>
        }
      >
        <CommandInput variant="dialog" placeholder="Search or jump to…" />
        <CommandList>
          <CommandEmpty>No pages or commands match.</CommandEmpty>
          <CommandGroup heading="Go to">
            {groups.flatMap((group) =>
              group.items.map((page) => {
                const Icon = page.icon
                return (
                  <CommandItem
                    key={page.href}
                    value={`${group.title ?? ""} ${page.label}`}
                    disabled={!page.ready}
                    onSelect={() => go(page.href)}
                  >
                    <Icon aria-hidden="true" />
                    {group.title ? (
                      <span className="text-muted-foreground">{group.title} ›</span>
                    ) : null}
                    {page.label}
                    {page.ready ? null : <SoonLabel className="ms-auto" />}
                  </CommandItem>
                )
              })
            )}
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
