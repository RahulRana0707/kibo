import Link from "next/link"
import {
  BotIcon,
  CableIcon,
  CheckCircle2Icon,
  CircleHelpIcon,
} from "lucide-react"

import type { DashboardPageData } from "@/actions/dashboard/get-dashboard-page-data"
import { Button } from "@kibo/ui/components/button"

function getNextStep(data: DashboardPageData) {
  const activeKnowledgeCount = data.activeBot?._count.knowledgeItems ?? 0
  const hasConnectedChat =
    data.activeBot?.integrations.some(
      (integration) => integration.status === "CONNECTED"
    ) ?? false

  if (!data.botCount) {
    return {
      label: "Start here",
      title: "Create the bot your community will meet.",
      description:
        "Give it a name, a personality, and the welcome message it should use.",
      href: "/bots/new",
      cta: "Create bot",
    }
  }

  if (activeKnowledgeCount < 5) {
    return {
      label: "Most important next",
      title: "Teach the bot the questions you answer every stream.",
      description: `${Math.max(0, 5 - activeKnowledgeCount)} more starter item${Math.max(0, 5 - activeKnowledgeCount) === 1 ? "" : "s"} will make ${data.activeBot?.name ?? "this bot"} feel useful.`,
      href: `/knowledge-base?botId=${data.activeBot?.id}`,
      cta: "Add knowledge",
    }
  }

  if (!hasConnectedChat) {
    return {
      label: "Ready to test",
      title: "Connect the first live chat source.",
      description:
        "The knowledge base is ready. Now connect YouTube, Twitch, or Discord.",
      href: "/integrations",
      cta: "Connect chat",
    }
  }

  return {
    label: "Keep improving",
    title: "Review what Kibo knows before your next stream.",
    description:
      "Tighten answers, add rules, and keep the active bot aligned with your voice.",
    href: `/knowledge-base?botId=${data.activeBot?.id}`,
    cta: "Review knowledge",
  }
}

export function LaunchChecklist({ data }: { data: DashboardPageData }) {
  const nextStep = getNextStep(data)
  const checklist = [
    {
      icon: BotIcon,
      title: "Create your first bot",
      text: data.activeBot
        ? `${data.activeBot.name} is ready to configure.`
        : "Name it, choose a tone, and write the welcome message.",
      complete: data.botCount > 0,
    },
    {
      icon: CircleHelpIcon,
      title: "Add five common questions",
      text:
        data.knowledgeCount >= 5
          ? `${data.knowledgeCount} knowledge items are ready.`
          : `${Math.max(0, 5 - data.knowledgeCount)} more knowledge item${Math.max(0, 5 - data.knowledgeCount) === 1 ? "" : "s"} to hit the starter baseline.`,
      complete: data.knowledgeCount >= 5,
    },
    {
      icon: CableIcon,
      title: "Connect a live chat",
      text: data.connectedIntegrationCount
        ? `${data.connectedIntegrationCount} integration${data.connectedIntegrationCount === 1 ? "" : "s"} connected.`
        : "YouTube Live is the first integration to prove the workflow.",
      complete: data.connectedIntegrationCount > 0,
    },
  ]

  return (
    <section className="rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-200">
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {nextStep.label}
        </p>
        <h2 className="font-heading text-base font-semibold tracking-tight">
          {nextStep.title}
        </h2>
        <p className="text-sm leading-5 text-muted-foreground">
          {nextStep.description}
        </p>
      </div>

      <Button asChild className="mt-4">
        <Link href={nextStep.href}>{nextStep.cta}</Link>
      </Button>

      <ol className="mt-4 flex flex-col gap-2">
        {checklist.map((item, index) => (
          <li
            key={item.title}
            className="flex gap-2 rounded-xl border border-border/60 bg-background/60 p-2.5"
          >
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">
              {item.complete ? <CheckCircle2Icon /> : index + 1}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <item.icon className="text-primary" />
                <h3 className="text-sm font-medium">{item.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
