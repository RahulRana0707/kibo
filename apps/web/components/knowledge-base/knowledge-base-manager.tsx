import { KnowledgeBotSelector } from "@/components/knowledge-base/knowledge-bot-selector"
import { KnowledgeDrawer } from "@/components/knowledge-base/knowledge-drawer"
import { KnowledgeList } from "@/components/knowledge-base/knowledge-list"
import type {
  KnowledgeBaseBot,
  KnowledgeBaseBotOption,
  KnowledgeBaseItem,
} from "@/components/knowledge-base/types"

export function KnowledgeBaseManager({
  bot,
  bots,
  items,
}: {
  bot: KnowledgeBaseBot
  bots: KnowledgeBaseBotOption[]
  items: KnowledgeBaseItem[]
}) {
  const faqCount = items.filter((item) => item.type === "FAQ").length

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">
            Knowledge target:{" "}
            <span className="font-medium text-foreground">{bot.name}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Anything you add here belongs only to this bot. {faqCount}{" "}
            {faqCount === 1 ? "FAQ" : "FAQs"} ready for approved answers.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <KnowledgeBotSelector bots={bots} selectedBotId={bot.id} />
          <KnowledgeDrawer botId={bot.id} botName={bot.name} />
        </div>
      </div>

      <KnowledgeList items={items} />
    </section>
  )
}
