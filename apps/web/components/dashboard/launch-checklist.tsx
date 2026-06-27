import { Button } from "@kibo/ui/components/button"
import Link from "next/link"
import { BotIcon, CableIcon, CircleHelpIcon } from "lucide-react"

const checklist = [
  {
    icon: BotIcon,
    title: "Create your first bot",
    text: "Name it, choose a tone, and write the welcome message.",
  },
  {
    icon: CircleHelpIcon,
    title: "Add five common questions",
    text: "Start with gear, schedule, Discord, socials, and game info.",
  },
  {
    icon: CableIcon,
    title: "Connect a live chat",
    text: "YouTube Live is the first integration to prove the workflow.",
  },
]

export function LaunchChecklist() {
  return (
    <section className="rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Launch checklist
        </p>
        <h2 className="font-heading text-lg font-semibold tracking-tight">
          The shortest path to a useful Kibo for your next stream.
        </h2>
      </div>

      <ol className="mt-5 space-y-3">
        {checklist.map((item, index) => (
          <li
            key={item.title}
            className="flex gap-3 rounded-xl border border-border/60 bg-background/60 p-3"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">
              {index + 1}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <item.icon className="size-4 text-primary" />
                <h3 className="text-sm font-medium">{item.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button asChild>
          <Link href="/bots/new">Create bot</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/integrations">Connect chat</Link>
        </Button>
      </div>
    </section>
  )
}
