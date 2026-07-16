import { MessageSquareTextIcon } from "lucide-react"

import type { DashboardPageData } from "@/lib/api/types"
import { Button } from "@kibo/ui/components/button"
import Link from "next/link"

function eventLabel(type: string) {
  return type.replaceAll("_", " ").toLowerCase()
}

export function AnswerQueue({ data }: { data: DashboardPageData }) {
  const activeBot = data.activeBot
  const questions =
    activeBot?.knowledgeItems
      .map((item) => item.question ?? item.title ?? item.content ?? item.sourceUrl)
      .filter(Boolean) ?? []

  return (
    <section className="rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-200">
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Knowledge preview
        </p>
        <h2 className="font-heading text-base font-semibold tracking-tight">
          {activeBot
            ? `What ${activeBot.name} can answer first`
            : "What Kibo will answer first"}
        </h2>
        <p className="text-sm leading-5 text-muted-foreground">
          {activeBot
            ? "A quick look at the freshest knowledge available to the active bot."
            : "Create a bot and add FAQs to build its first answer queue."}
        </p>
      </div>

      {questions.length ? (
        <ul className="mt-4 flex flex-col gap-2">
          {questions.map((question) => (
            <li
              key={question}
              className="flex items-start gap-2 rounded-xl border border-border/60 bg-background/60 px-3 py-2"
            >
              <MessageSquareTextIcon className="mt-0.5 shrink-0 text-primary" />
              <span className="line-clamp-2 text-sm text-foreground">
                {question}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-dashed border-border/70 bg-background/60 p-3">
          <p className="text-sm font-medium">No answer queue yet</p>
          <p className="text-sm text-muted-foreground">
            Add FAQs or import a CSV so the dashboard can show what Kibo is
            ready to answer.
          </p>
          <Button asChild variant="outline" className="self-start">
            <Link href="/knowledge-base">Add knowledge</Link>
          </Button>
        </div>
      )}

      <div className="mt-4 border-border border-t pt-4">
        <div className="flex flex-col gap-1">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Recent activity
          </p>
          <p className="text-sm leading-5 text-muted-foreground">
            {data.recentEvents.length
              ? "Latest system events from your bots."
              : "Activity will appear here after chat and integrations start running."}
          </p>
        </div>

        {data.recentEvents.length ? (
          <ul className="mt-3 flex flex-col gap-2">
            {data.recentEvents.map((event) => (
              <li
                key={event.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/60 px-3 py-2"
              >
                <span className="text-sm capitalize">{eventLabel(event.type)}</span>
                <span className="text-xs text-muted-foreground">
                  {event.severity.toLowerCase()}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
