"use client"

import Link from "next/link"

import { Button } from "@kibo/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@kibo/ui/components/dropdown-menu"

import { Monogram } from "@/components/atoms/monogram"
import { SoonLabel } from "@/components/molecules/soon-label"
import { ThemeMenuSwitch } from "@/components/molecules/theme-switch"
import { useLogOut } from "@/hooks/use-log-out"
import { initialsOf } from "@/lib/initials"

export type AccountUser = { name: string; email: string }

/** The avatar menu: account pages, help, theme and log out. */
export function AccountMenu({ user }: { user: AccountUser }) {
  const logOut = useLogOut()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Account menu, ${user.name}`}
        >
          <Monogram initials={initialsOf(user.name)} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-70 p-1.5">
        <div className="flex items-center gap-3 p-2.5">
          <Monogram initials={initialsOf(user.name)} />
          <span className="flex min-w-0 flex-col">
            <span className="truncate font-semibold">{user.name}</span>
            <span className="truncate text-caption text-muted-foreground">
              {user.email}
            </span>
          </span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          Profile
          <SoonLabel />
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          Settings
          <SoonLabel />
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          Billing
          <SoonLabel />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/changelog">What’s new</Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          Keyboard shortcuts
          <SoonLabel />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/help">Help &amp; support</Link>
        </DropdownMenuItem>
        <ThemeMenuSwitch />
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={logOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
