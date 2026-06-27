import { MessageSquareTextIcon } from "lucide-react"

const questions = [
  "What microphone do you use?",
  "Where is the Discord server?",
  "When is the next stream?",
  "What game is this?",
]

export function AnswerQueue() {
  return (
    <section className="rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Answer queue
        </p>
        <h2 className="font-heading text-lg font-semibold tracking-tight">
          What Kibo will answer first
        </h2>
        <p className="text-sm text-muted-foreground">
          A starter queue based on the questions streamers repeat every day.
        </p>
      </div>

      <ul className="mt-5 space-y-2">
        {questions.map((question) => (
          <li
            key={question}
            className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/60 px-3 py-2.5"
          >
            <MessageSquareTextIcon className="mt-0.5 size-4 shrink-0 text-primary" />
            <span className="text-sm text-foreground">{question}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
