import { redirect } from "next/navigation"

import { EmptyState } from "@/components/empty-state"
import { KnowledgeBaseManager } from "@/components/knowledge-base/knowledge-base-manager"
import { getCurrentSession } from "@/lib/api/auth.server"
import { getKnowledgeBasePageData } from "@/lib/api/knowledge-base.server"

export default async function KnowledgeBasePage({
  searchParams,
}: {
  searchParams: Promise<{ botId?: string }>
}) {
  const session = await getCurrentSession()

  if (!session?.user.id) {
    redirect("/login")
  }

  const { botId } = await searchParams
  const data = await getKnowledgeBasePageData(botId)
  const selectedBot = data.selectedBot
  const items = selectedBot?.knowledgeItems ?? []

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
          bots={data.bots}
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
