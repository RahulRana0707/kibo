"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  BarChart3Icon,
  BookOpenIcon,
  BotIcon,
  CableIcon,
  GaugeIcon,
  SearchIcon,
  Settings2Icon,
} from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@kibo/ui/components/command"

const commands = [
  {
    group: "Navigation",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: GaugeIcon,
        shortcut: "D",
      },
      { label: "Bots", href: "/bots", icon: BotIcon, shortcut: "B" },
      {
        label: "Knowledge Base",
        href: "/knowledge-base",
        icon: BookOpenIcon,
        shortcut: "K",
      },
      {
        label: "Integrations",
        href: "/integrations",
        icon: CableIcon,
        shortcut: "I",
      },
      {
        label: "Analytics",
        href: "/analytics",
        icon: BarChart3Icon,
        shortcut: "A",
      },
      {
        label: "Settings",
        href: "/settings",
        icon: Settings2Icon,
        shortcut: "S",
      },
    ],
  },
]

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function getKeyboardKey(event: KeyboardEvent) {
  return typeof event.key === "string" ? event.key.toLowerCase() : ""
}

export function CommandMenu() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.repeat ||
        isTypingTarget(event.target)
      ) {
        return
      }

      if ((event.metaKey || event.ctrlKey) && getKeyboardKey(event) === "k") {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  function runCommand(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <Button
        variant="outline"
        className="hidden min-w-44 justify-start gap-2 text-muted-foreground sm:inline-flex"
        onClick={() => setOpen(true)}
      >
        <SearchIcon data-icon="inline-start" />
        Search
        <kbd className="ml-auto rounded-sm bg-muted px-1 text-[0.625rem] text-muted-foreground">
          ⌘K
        </kbd>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="sm:hidden"
        aria-label="Open command menu"
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Kibo command menu"
        description="Search Kibo sections and creator workflows."
        className="sm:max-w-lg data-open:animate-none data-closed:animate-none"
      >
        <Command>
          <CommandInput placeholder="Search dashboard, bots, integrations..." />
          <CommandList>
            <CommandEmpty>No matching command.</CommandEmpty>
            {commands.map((section) => (
              <CommandGroup key={section.group} heading={section.group}>
                {section.items.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={item.label}
                    onSelect={() => runCommand(item.href)}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                    <CommandShortcut>{item.shortcut}</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
