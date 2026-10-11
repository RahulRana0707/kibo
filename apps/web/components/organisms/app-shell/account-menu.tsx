"use client"

import Link from "next/link"
import {
  CircleHelpIcon,
  CreditCardIcon,
  KeyboardIcon,
  LogOutIcon,
  SettingsIcon,
  SparklesIcon,
  UserIcon,
} from "lucide-react"

import { Avatar } from "@kibo/ui/components/avatar"
import { Button } from "@kibo/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuUserHeader,
} from "@kibo/ui/components/dropdown-menu"

import { ThemeMenuSwitch } from "@/components/molecules/theme-switch"
import { useLogOut } from "@/hooks/use-log-out"

export type AccountUser = { name: string; email: string }

/**
 * The avatar menu: account pages, product links, theme and Log out (last,
 * no confirm). Profile, Settings and Billing are Soon with one reason.
 */
export function AccountMenu({ user }: { user: AccountUser }) {
  const logOut = useLogOut()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Account"
          className="max-lg:size-11"
        >
          <Avatar name={user.name} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-70">
        <DropdownMenuUserHeader
          name={user.name}
          email={user.email}
          avatar={<Avatar name={user.name} />}
        />
        <DropdownMenuSeparator />
        <DropdownMenuItem soon aria-describedby="account-soon-reason">
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem soon aria-describedby="account-soon-reason">
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem soon aria-describedby="account-soon-reason">
          <CreditCardIcon />
          Billing
        </DropdownMenuItem>
        <p
          id="account-soon-reason"
          className="px-2.5 pt-1 pb-2 text-caption text-muted-foreground"
        >
          Account settings are coming soon.
        </p>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/changelog">
            <SparklesIcon />
            What’s new
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem soon>
          <KeyboardIcon />
          Keyboard shortcuts
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/help">
            <CircleHelpIcon />
            Help &amp; support
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <ThemeMenuSwitch />
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => void logOut()}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
