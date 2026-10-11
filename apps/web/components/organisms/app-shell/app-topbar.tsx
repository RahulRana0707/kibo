"use client"

import { useState } from "react"
import Link from "next/link"
import { CircleHelpIcon, LogOutIcon, MenuIcon, XIcon } from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import { Separator } from "@kibo/ui/components/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@kibo/ui/components/sheet"

import { BrandLogo } from "@/components/atoms/brand-logo"
import {
  BotStatus,
  PauseBotButton,
  type BotState,
} from "@/components/molecules/bot-controls"
import {
  AccountMenu,
  type AccountUser,
} from "@/components/organisms/app-shell/account-menu"
import { AppNav } from "@/components/organisms/app-shell/app-nav"
import {
  BotSwitcher,
  type BotSummary,
} from "@/components/organisms/app-shell/bot-switcher"
import { CommandMenu } from "@/components/organisms/app-shell/command-menu"
import { NotificationsMenu } from "@/components/organisms/app-shell/notifications-menu"
import {
  WorkspaceSwitcher,
  type Workspace,
} from "@/components/organisms/app-shell/workspace-switcher"
import { useLogOut } from "@/hooks/use-log-out"

const pauseSoonReason = "Pausing is coming soon."

/**
 * Below 1024 the sidebar becomes this full-screen menu: live work first,
 * then the rest, with the bot row and Pause on top.
 */
export function MobileMenu({
  workspace,
  bot,
}: {
  workspace: Workspace
  bot?: BotSummary
}) {
  const [open, setOpen] = useState(false)
  const logOut = useLogOut()
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu" className="size-11 text-foreground">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" showCloseButton={false} className="overflow-y-auto">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <div className="flex min-h-16 items-center justify-between border-b border-separator py-2.5 ps-4 pe-2">
          <BrandLogo href="/dashboard" size="sm" />
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close menu" className="size-11 text-foreground">
              <XIcon />
            </Button>
          </SheetClose>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <WorkspaceSwitcher current={workspace} large />
          <div className="flex min-h-11 items-center justify-between gap-3 rounded-lg bg-surface p-2.5">
            <BotSwitcher bots={bot ? [bot] : []} />
            <span className="flex items-center gap-2">
              <BotStatus status={bot?.status} size="sm" />
              <PauseBotButton status={bot?.status} compact soonReason={pauseSoonReason} />
            </span>
          </div>
          <AppNav size="touch" liveFirst onNavigate={close} />
          <Separator />
          <div className="flex flex-col gap-0.5">
            <Link
              href="/help"
              onClick={close}
              className="flex min-h-11 items-center gap-2.5 rounded-md px-2.5 text-[0.9375rem] font-medium text-muted-foreground no-underline hover:bg-hovered hover:text-foreground [&_svg]:size-4"
            >
              <CircleHelpIcon aria-hidden="true" />
              Help &amp; support
            </Link>
            <button
              type="button"
              onClick={() => void logOut()}
              className="flex min-h-11 items-center gap-2.5 rounded-md px-2.5 text-start text-[0.9375rem] font-medium text-muted-foreground hover:bg-hovered hover:text-foreground [&_svg]:size-4"
            >
              <LogOutIcon aria-hidden="true" />
              Log out
            </button>
          </div>
          <p className="px-2.5 text-caption text-muted-foreground">
            Editing bots and knowledge works best on a larger screen.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}

/**
 * Above every app page: ⌘K search on the left; the bot, its status and
 * Pause, then help, notifications and account on the right. Its bot state
 * is the single source for “is Pip live?”. Phones get a compact bar.
 */
export function AppTopbar({
  user,
  workspace,
  bot,
}: {
  user: AccountUser
  workspace: Workspace
  bot?: BotSummary
}) {
  const status: BotState | undefined = bot?.status

  return (
    <>
      <header className="sticky top-0 z-30 flex min-h-16 items-center gap-3 border-b border-separator bg-page px-6 max-lg:hidden">
        <CommandMenu />
        <div className="ms-auto flex items-center gap-3">
          <BotSwitcher bots={bot ? [bot] : []} />
          <BotStatus status={status} />
          <PauseBotButton status={status} soonReason={pauseSoonReason} />
          <Separator orientation="vertical" className="h-6 self-center" />
          <Button asChild variant="ghost" size="icon" aria-label="Help and support">
            <Link href="/help">
              <CircleHelpIcon />
            </Link>
          </Button>
          <NotificationsMenu />
          <AccountMenu user={user} />
        </div>
      </header>
      <header className="sticky top-0 z-30 flex min-h-16 items-center gap-1 border-b border-separator bg-page py-2.5 ps-1 pe-2 lg:hidden">
        <MobileMenu workspace={workspace} bot={bot} />
        <BrandLogo href="/dashboard" size="sm" />
        <BotStatus status={status} size="sm" className="ms-auto" />
        <PauseBotButton status={status} compact soonReason={pauseSoonReason} />
        <NotificationsMenu compact />
        <CommandMenu showTrigger={false} />
      </header>
    </>
  )
}
