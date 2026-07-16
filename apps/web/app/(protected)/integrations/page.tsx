import { redirect } from "next/navigation"

import { EmptyState } from "@/components/empty-state"
import { IntegrationsManager } from "@/components/integrations/integrations-manager"
import { getCurrentSession } from "@/lib/api/auth.server"
import { getIntegrationsPageData } from "@/lib/api/integrations.server"

export default async function IntegrationsPage({
  searchParams,
}: {
  searchParams: Promise<{ botId?: string }>
}) {
  const session = await getCurrentSession()

  if (!session?.user.id) {
    redirect("/login")
  }

  const { botId } = await searchParams
  const data = await getIntegrationsPageData(botId)

  return (
    <>
      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Integrations
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Connect the places where your community already talks.
        </p>
      </section>

      {data.selectedBot ? (
        <IntegrationsManager data={data} />
      ) : (
        <EmptyState
          iconName="bot"
          title="Create a bot first"
          description="Create your first bot before connecting YouTube Live or Twitch. Each integration belongs to the bot that will answer chat."
          primaryAction={{ label: "Create bot", href: "/bots/new" }}
        />
      )}
    </>
  )
}
