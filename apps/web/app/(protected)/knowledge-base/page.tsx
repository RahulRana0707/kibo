import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { EmptyState } from "@/components/empty-state"
import { KnowledgeBaseManager } from "@/components/knowledge-base/knowledge-base-manager"
import { auth } from "@/lib/auth"
import { formatRelativeTime } from "@/lib/format-relative-time"
import { prisma } from "@/lib/prisma"

export default async function KnowledgeBasePage({
  searchParams,
}: {
  searchParams: Promise<{ botId?: string }>
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user.id) {
    redirect("/login")
  }

  const { botId } = await searchParams
  const [user, bots] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        activeBotId: true,
      },
    }),
    prisma.bot.findMany({
      where: { userId: session.user.id },
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            knowledgeItems: true,
          },
        },
      },
    }),
  ])

  const selectedBotId =
    bots.find((bot) => bot.id === botId)?.id ??
    bots.find((bot) => bot.id === user?.activeBotId)?.id ??
    bots[0]?.id

  const selectedBot = selectedBotId
    ? await prisma.bot.findFirst({
        where: {
          id: selectedBotId,
          userId: session.user.id,
        },
        select: {
          id: true,
          name: true,
          knowledgeItems: {
            orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
            select: {
              id: true,
              type: true,
              title: true,
              question: true,
              answer: true,
              content: true,
              sourceUrl: true,
              isActive: true,
              createdAt: true,
            },
          },
        },
      })
    : null

  const botOptions = bots.map((bot) => ({
    id: bot.id,
    name: bot.name,
    isActive: bot.id === user?.activeBotId,
    knowledgeCount: bot._count.knowledgeItems,
  }))
  const items =
    selectedBot?.knowledgeItems.map((item) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      question: item.question,
      answer: item.answer,
      content: item.content,
      sourceUrl: item.sourceUrl,
      isActive: item.isActive,
      createdAtLabel: formatRelativeTime(item.createdAt),
    })) ?? []

  return (
    <>
      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Knowledge Base
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Give Kibo the approved facts, links, and boundaries it needs before
          it speaks for you.
        </p>
      </section>

      {selectedBot ? (
        <KnowledgeBaseManager
          bot={selectedBot}
          bots={botOptions}
          items={items}
        />
      ) : (
        <EmptyState
          iconName="sparkles"
          title="Create a bot first"
          description="Create your first bot, then choose where each FAQ, rule, note, or link should be uploaded."
          primaryAction={{ label: "Create bot", href: "/bots/new" }}
        />
      )}
    </>
  )
}
