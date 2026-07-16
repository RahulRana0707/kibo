import type { DashboardPageData } from "@/lib/api/types"
import { cn } from "@kibo/ui/lib/utils"

export function DashboardStats({ data }: { data: DashboardPageData }) {
  const knowledgeTypeCounts = new Map(
    data.activeBotKnowledgeTypes.map((item) => [item.type, item.count])
  )
  const stats = [
    {
      title: "Knowledge health",
      description: data.activeBot
        ? `${knowledgeTypeCounts.get("FAQ") ?? 0} FAQs, ${knowledgeTypeCounts.get("RULE") ?? 0} rules, ${knowledgeTypeCounts.get("LINK") ?? 0} links.`
        : "Create a bot to start building trusted knowledge.",
      value: (data.activeBot?._count.knowledgeItems ?? 0).toString(),
    },
    {
      title: "Connections",
      description: data.activeBot?.integrations.length
        ? data.activeBot.integrations
            .map((integration) =>
              integration.provider.replaceAll("_", " ").toLowerCase()
            )
            .join(", ")
        : "No channels are connected to the active bot yet.",
      value: data.connectedIntegrationCount.toString(),
    },
    {
      title: "Live activity",
      description: data.botReplyCount
        ? `${data.openConversationCount} open conversation${data.openConversationCount === 1 ? "" : "s"} need watching.`
        : "No bot replies yet. Activity will appear after chat is connected.",
      value: data.botReplyCount.toString(),
    },
  ]

  return (
    <section className="grid gap-2 md:grid-cols-3 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-200">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className={cn(
            "rounded-xl border border-border/60 bg-card/80 p-3 shadow-sm",
            index === 0 && "md:rounded-l-2xl",
            index === stats.length - 1 && "md:rounded-r-2xl"
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {stat.title}
            </p>
            <div className="font-heading text-2xl font-semibold leading-none text-foreground">
              {stat.value}
            </div>
          </div>
          <p className="mt-3 text-sm leading-5 text-muted-foreground">
            {stat.description}
          </p>
        </div>
      ))}
    </section>
  )
}
