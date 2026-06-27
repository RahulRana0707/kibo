import Link from "next/link"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { BotForm } from "@/components/bots/bot-form"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { updateBotAction } from "@/actions/bots/update-bot"

export default async function EditBotPage({
  params,
}: {
  params: Promise<{ botId: string }>
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user.id) {
    redirect("/login")
  }

  const { botId } = await params

  const bot = await prisma.bot.findFirst({
    where: { id: botId, userId: session.user.id },
    select: {
      id: true,
      name: true,
      avatarUrl: true,
      personality: true,
      welcomeMessage: true,
    },
  })

  if (!bot) {
    redirect("/bots")
  }

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
              Edit bot
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Update the bot name, avatar, personality, or welcome message.
            </p>
          </div>
        </div>

        <BotForm
          action={updateBotAction}
          submitLabel="Save changes"
          cancelHref="/bots"
          values={{
            botId: bot.id,
            name: bot.name,
            avatarUrl: bot.avatarUrl,
            personality: bot.personality,
            welcomeMessage: bot.welcomeMessage,
          }}
        />
      </section>

      <aside className="xl:pt-16">
        <div className="border-l border-border/60 pl-6">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Edit flow
            </p>
            <p className="text-sm font-medium text-foreground">{bot.name}</p>
          </div>

          <div className="mt-6 space-y-5 text-sm text-muted-foreground">
            <div className="space-y-1.5">
              <p className="font-medium text-foreground">1. Identity</p>
              <p>Adjust the visible bot name or avatar URL.</p>
            </div>
            <div className="space-y-1.5">
              <p className="font-medium text-foreground">2. Voice</p>
              <p>Refine the personality and welcome message to match the live tone.</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
