import type { Metadata } from "next"
import Link from "next/link"
import { LogOutIcon } from "lucide-react"

import { buttonVariants } from "@kibo/ui/components/button"

import { IconTile } from "@/components/atoms/icon-tile"
import { AuthCardTemplate } from "@/components/templates/auth-template"

export const metadata: Metadata = { title: "Logged out" }

export default function LoggedOutPage() {
  return (
    <AuthCardTemplate>
      <div
        role="status"
        className="flex flex-col items-center gap-6 text-center"
      >
        <IconTile tone="neutral" className="size-14 [&_svg]:size-6">
          <LogOutIcon />
        </IconTile>
        <div className="flex flex-col gap-2">
          <h1 className="text-title">You’re logged out</h1>
          <p className="text-muted-foreground">
            Your bots keep their current status. Log back in any time to check
            on them.
          </p>
        </div>
        <Link href="/login" className={buttonVariants({ className: "w-full" })}>
          Log in again
        </Link>
        <Link href="/" className="text-body-sm text-link">
          Go to the Kibo homepage
        </Link>
      </div>
    </AuthCardTemplate>
  )
}
