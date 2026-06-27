import Link from "next/link"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { getBotsPageData } from "@/actions/bots/get-bots-page-data"
import { auth } from "@/lib/auth"
import { Button } from "@kibo/ui/components/button"
import { PlusIcon } from "lucide-react"
import { BotsList } from "@/components/bots/bots-list"

export default async function BotsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user.id) {
    redirect("/login")
  }

  const { bots } = await getBotsPageData(session.user.id)

  return (
    <>
      <section className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Bots
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Manage the bots you create for chat, moderation, and replies.
          </p>
        </div>
        <Button asChild>
          <Link href="/bots/new">
            <PlusIcon data-icon="inline-start" />
            Create bot
          </Link>
        </Button>
      </section>

      <BotsList bots={bots} />
    </>
  )
}
