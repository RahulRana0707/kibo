import { redirect } from "next/navigation"
import Link from "next/link"

import { getCurrentSession } from "@/lib/api/auth.server"
import { CreateBotForm } from "@/components/bots/create-bot-form"
import { getBotsPageData } from "@/lib/api/bots.server"

export default async function NewBotPage() {
  const session = await getCurrentSession()

  if (!session?.user.id) {
    redirect("/login")
  }

  const { bots } = await getBotsPageData()
  const botCount = bots.length

  return (
    <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_280px]">
      <section className="space-y-6">
        <div className="space-y-3">
          <Link
            href="/bots"
            className="inline-flex w-fit items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to bots
          </Link>
          <div className="space-y-2">
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Create bot
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Start with a simple structure. Give the bot a name, define its
              voice, and set a welcoming first message.
            </p>
          </div>
        </div>

        <CreateBotForm />
      </section>

      <aside className="xl:pt-16">
        <div className="border-l border-border/60 pl-6">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Creation flow
            </p>
            <p className="text-sm font-medium text-foreground">
              {botCount} {botCount === 1 ? "bot" : "bots"} already created
            </p>
          </div>

          <div className="mt-6 space-y-5 text-sm text-muted-foreground">
            <div className="space-y-1.5">
              <p className="font-medium text-foreground">1. Identity</p>
              <p>Name the bot and optionally add an avatar URL.</p>
            </div>
            <div className="space-y-1.5">
              <p className="font-medium text-foreground">2. Voice</p>
              <p>Describe the personality and the way it should respond.</p>
            </div>
            <div className="space-y-1.5">
              <p className="font-medium text-foreground">3. Launch</p>
              <p>The bot is created in draft mode and becomes active from there.</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
