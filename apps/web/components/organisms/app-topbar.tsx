"use client"

import { useState } from "react"
import Link from "next/link"
import { CircleHelpIcon, MenuIcon, PauseIcon, XIcon } from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@kibo/ui/components/sheet"

import { BrandLogo } from "@/components/atoms/brand-logo"
import { Panel } from "@kibo/ui/components/panel"
import { BotStatus, PauseBotButton } from "@/components/molecules/bot-controls"
import {
  AccountMenu,
  type AccountUser,
} from "@/components/organisms/account-menu"
import { AppNav } from "@/components/organisms/app-nav"
import { BotSwitcher } from "@/components/organisms/bot-switcher"
import { CommandMenu } from "@/components/organisms/command-menu"
import { NotificationsMenu } from "@/components/organisms/notifications-menu"
import { WorkspaceSwitcher } from "@/components/organisms/workspace-switcher"
import { useLogOut } from "@/hooks/use-log-out"

/** The full-screen menu at phone width. */
function MobileMenu({ user }: { user: AccountUser }) {
  const [open, setOpen] = useState(false)
  const logOut = useLogOut()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="size-11"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="gap-0 overflow-y-auto data-[side=left]:w-full data-[side=left]:border-r-0 data-[side=left]:sm:max-w-none"
      >
        <div className="flex min-h-16 items-center justify-between border-b border-separator py-2.5 ps-4 pe-2">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <BrandLogo href="/dashboard" size="sm" />
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close menu"
              className="size-11"
            >
              <XIcon />
            </Button>
          </SheetClose>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <WorkspaceSwitcher workspace={user.name} large />
          <Panel className="gap-3 p-3.5 max-sm:p-3.5">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-6 rounded-full border border-dashed border-border-strong"
                />
                <span className="font-semibold">No bot yet</span>
              </span>
              <BotStatus />
            </div>
            <Button
              variant="secondary"
              size="lg"
              disabled
              className="w-full"
              aria-describedby="pause-bot-reason-menu"
            >
              <PauseIcon aria-hidden="true" />
              Pause bot
            </Button>
            <span id="pause-bot-reason-menu" className="sr-only">
              No bot is running yet.
            </span>
          </Panel>
          <AppNav onNavigate={() => setOpen(false)} />
          <hr className="border-separator" />
          <div className="flex flex-col gap-0.5">
            <Link
              href="/help"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center rounded-md px-2.5 text-body-sm font-medium text-muted-foreground no-underline hover:bg-hovered hover:text-foreground"
            >
              Help
            </Link>
            <button
              type="button"
              onClick={() => void logOut()}
              className="flex min-h-11 items-center rounded-md px-2.5 text-start text-body-sm font-medium text-muted-foreground hover:bg-hovered hover:text-foreground"
            >
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

/** The bar above every signed-in page: search, bot controls and account. */
export function AppTopbar({ user }: { user: AccountUser }) {
  return (
    <>
      <header className="sticky top-0 z-30 flex min-h-16 flex-wrap items-center gap-3 border-b border-separator bg-background px-6 py-3 max-lg:hidden">
        <CommandMenu />
        <div className="ms-auto flex items-center gap-3">
          <BotSwitcher />
          <BotStatus />
          <PauseBotButton />
          <span aria-hidden="true" className="h-6 w-px bg-separator" />
          <Button
            asChild
            variant="ghost"
            size="icon"
            aria-label="Help and support"
          >
            <Link href="/help">
              <CircleHelpIcon />
            </Link>
          </Button>
          <NotificationsMenu />
          <AccountMenu user={user} />
        </div>
      </header>
      <header className="sticky top-0 z-30 flex min-h-16 items-center gap-1 border-b border-separator bg-background py-2.5 ps-1 pe-2 lg:hidden">
        <MobileMenu user={user} />
        <BrandLogo href="/dashboard" size="sm" />
        <BotStatus className="ms-auto h-6.5" />
        <PauseBotButton compact />
        <NotificationsMenu compact />
      </header>
    </>
  )
}
