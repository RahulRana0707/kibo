import { cn } from "@kibo/ui/lib/utils"

const stats = [
  {
    title: "Questions answered",
    description: "Waiting for your first connected chat.",
    value: "0",
  },
  {
    title: "Active integrations",
    description: "YouTube and Twitch are ready to connect.",
    value: "0",
  },
  {
    title: "Knowledge items",
    description: "FAQs, links, rules, and creator context.",
    value: "0",
  },
]

export function DashboardStats() {
  return (
    <section className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className={cn(
            "grid gap-2 px-5 py-4 sm:grid-cols-[auto_1fr] sm:items-end",
            index !== stats.length - 1 && "border-b border-border/60"
          )}
        >
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {stat.title}
            </p>
            <div className="font-heading text-3xl font-semibold leading-none text-foreground">
              {stat.value}
            </div>
          </div>
          <p className="max-w-xl text-sm text-muted-foreground sm:justify-self-end sm:text-right">
            {stat.description}
          </p>
        </div>
      ))}
    </section>
  )
}
