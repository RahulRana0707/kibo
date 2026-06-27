import Link from "next/link"
import {
  BotIcon,
  CableIcon,
  CheckCircle2Icon,
  CircleHelpIcon,
  SparklesIcon,
} from "lucide-react"

import type { DashboardPageData } from "@/actions/dashboard/get-dashboard-page-data"
import { BotAvatar } from "@/components/bots/bot-avatar"
import { Badge } from "@kibo/ui/components/badge"
import { Button } from "@kibo/ui/components/button"

function getReadiness(data: DashboardPageData) {
  const hasBot = data.botCount > 0
  const activeKnowledgeCount = data.activeBot?._count.knowledgeItems ?? 0
  const hasStarterKnowledge = activeKnowledgeCount >= 5
  const hasConnectedChat =
    data.activeBot?.integrations.some(
      (integration) => integration.status === "CONNECTED"
    ) ?? false
  const completed = [hasBot, hasStarterKnowledge, hasConnectedChat].filter(
    Boolean
  ).length

  if (!hasBot) {
    return {
      label: "No bot yet",
      description: "Create the bot Kibo will use before adding knowledge.",
      cta: "Create bot",
      href: "/bots/new",
      completed,
    }
  }

  if (!hasStarterKnowledge) {
    return {
      label: "Needs knowledge",
      description: `${Math.max(0, 5 - activeKnowledgeCount)} more starter item${Math.max(0, 5 - activeKnowledgeCount) === 1 ? "" : "s"} before this bot feels useful.`,
      cta: "Add knowledge",
      href: `/knowledge-base?botId=${data.activeBot?.id}`,
      completed,
    }
  }

  if (!hasConnectedChat) {
    return {
      label: "Ready for chat",
      description: "The bot has enough context. Connect a channel to test it live.",
      cta: "Connect chat",
      href: "/integrations",
      completed,
    }
  }

  return {
    label: "Launch-ready",
    description: "Knowledge and chat are connected. Review behavior before going live.",
    cta: "Review knowledge",
    href: `/knowledge-base?botId=${data.activeBot?.id}`,
    completed,
  }
}

export function DashboardCommandCenter({ data }: { data: DashboardPageData }) {
  const readiness = getReadiness(data)
  const readinessPercent = Math.round((readiness.completed / 3) * 100)
  const activeBot = data.activeBot

  return (
    <section className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-200">
      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              {activeBot ? (
                <BotAvatar
                  name={activeBot.name}
                  avatarUrl={activeBot.avatarUrl}
                  className="size-11 shrink-0 rounded-xl"
                />
              ) : (
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <BotIcon />
                </div>
              )}

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{readiness.label}</Badge>
                  {activeBot ? (
                    <span className="text-xs text-muted-foreground">
                      Active bot
                    </span>
                  ) : null}
                </div>
                <h1 className="mt-1 truncate font-heading text-xl font-semibold tracking-tight">
                  {activeBot ? activeBot.name : "Build your first Kibo"}
                </h1>
                <p className="mt-0.5 max-w-2xl text-sm leading-5 text-muted-foreground">
                  {readiness.description}
                </p>
              </div>
            </div>

            <Button asChild>
              <Link href={readiness.href}>
                <SparklesIcon data-icon="inline-start" />
                {readiness.cta}
              </Link>
            </Button>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            {[
              {
                icon: BotIcon,
                label: "Bot",
                done: data.botCount > 0,
                text: data.botCount ? `${data.botCount} created` : "Not created",
              },
              {
                icon: CircleHelpIcon,
                label: "Knowledge",
                done: (activeBot?._count.knowledgeItems ?? 0) >= 5,
                text: `${activeBot?._count.knowledgeItems ?? 0} items`,
              },
              {
                icon: CableIcon,
                label: "Chat",
                done:
                  activeBot?.integrations.some(
                    (integration) => integration.status === "CONNECTED"
                  ) ?? false,
                text: `${data.connectedIntegrationCount} connected`,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-3 py-2"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
                  {item.done ? <CheckCircle2Icon /> : <item.icon />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-2xl bg-background/70 p-3 ring-1 ring-border/70">
          <div className="flex flex-col gap-1">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Readiness
            </p>
            <div className="font-heading text-4xl font-semibold leading-none">
              {readinessPercent}%
            </div>
            <p className="text-sm leading-5 text-muted-foreground">
              {readiness.completed} of 3 launch foundations are complete.
            </p>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-200 ease-out"
              style={{ width: `${readinessPercent}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
