"use client"

import Link from "next/link"
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  Clock3Icon,
  Loader2Icon,
  PlugZapIcon,
} from "lucide-react"

import { BotAvatar } from "@/components/bots/bot-avatar"
import { Icons } from "@/components/icons"
import { useIntegrationsPage } from "@/components/integrations/use-integrations-page"
import type {
  IntegrationProvider,
  IntegrationsPageData,
} from "@/lib/api/types"
import { Badge } from "@kibo/ui/components/badge"
import { Button } from "@kibo/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@kibo/ui/components/card"
import { Separator } from "@kibo/ui/components/separator"
import { cn } from "@kibo/ui/lib/utils"

type Integration = IntegrationsPageData["integrations"][number]

const platforms: Array<{
  provider: IntegrationProvider
  name: string
  description: string
  icon: typeof Icons.youtube
}> = [
  {
    provider: "YOUTUBE",
    name: "YouTube Live",
    description: "Read live chat from a connected channel.",
    icon: Icons.youtube,
  },
  {
    provider: "TWITCH",
    name: "Twitch",
    description: "Bring Twitch chat into the same bot brain.",
    icon: Icons.twitch,
  },
]

const statusCopy = {
  PENDING: {
    label: "Pending",
    badgeVariant: "secondary" as const,
    icon: Clock3Icon,
  },
  CONNECTED: {
    label: "Connected",
    badgeVariant: "default" as const,
    icon: CheckCircle2Icon,
  },
  DISCONNECTED: {
    label: "Disconnected",
    badgeVariant: "outline" as const,
    icon: PlugZapIcon,
  },
  ERROR: {
    label: "Needs attention",
    badgeVariant: "destructive" as const,
    icon: AlertCircleIcon,
  },
}

function getProviderIntegration(
  integrations: IntegrationsPageData["integrations"],
  provider: IntegrationProvider
) {
  return (
    integrations.find((integration) => integration.provider === provider) ??
    null
  )
}

function getStatus(integration: Integration | null) {
  if (!integration) {
    return {
      label: "Not connected",
      badgeVariant: "outline" as const,
      icon: PlugZapIcon,
    }
  }

  return statusCopy[integration.status]
}

function getActionLabel(integration: Integration | null) {
  if (!integration) {
    return "Connect"
  }

  if (integration.status === "CONNECTED") {
    return "Connected"
  }

  if (integration.status === "PENDING") {
    return "Continue"
  }

  return "Reconnect"
}

export function IntegrationsManager({ data }: { data: IntegrationsPageData }) {
  const { startIntegration, isStartingIntegration, startingProvider } =
    useIntegrationsPage()
  const selectedBot = data.selectedBot

  if (!selectedBot) {
    return null
  }

  const selectedBotMeta = data.bots.find((bot) => bot.id === selectedBot.id)

  return (
    <section className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
      <Card className="lg:sticky lg:top-20 lg:self-start">
        <CardHeader>
          <CardTitle>Bot</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {data.bots.map((bot) => (
            <Link
              key={bot.id}
              href={`/integrations?botId=${bot.id}`}
              className={cn(
                "flex min-w-0 items-center gap-3 rounded-md border border-transparent p-2 text-left transition-colors hover:bg-muted/70",
                bot.isSelected && "border-border bg-muted"
              )}
            >
              <BotAvatar
                name={bot.name}
                avatarUrl={bot.avatarUrl}
                className="size-9 shrink-0 rounded-md"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">
                  {bot.name}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {bot.knowledgeCount} knowledge item
                  {bot.knowledgeCount === 1 ? "" : "s"}
                </span>
              </span>
              {bot.isActive ? (
                <Badge variant="secondary">Active</Badge>
              ) : null}
            </Link>
          ))}
        </CardContent>
      </Card>

      <div className="flex min-w-0 flex-col gap-4">
        <Card>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <BotAvatar
                name={selectedBot.name}
                avatarUrl={selectedBot.avatarUrl}
                className="size-10 shrink-0 rounded-lg"
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="truncate font-heading text-base font-semibold">
                    {selectedBot.name}
                  </h2>
                  {selectedBotMeta?.isActive ? (
                    <Badge variant="secondary">Active bot</Badge>
                  ) : null}
                </div>
                <p className="text-sm text-muted-foreground">
                  Choose where this bot can listen.
                </p>
              </div>
            </div>
            <Button asChild variant="outline">
              <Link href={`/knowledge-base?botId=${selectedBot.id}`}>
                Review knowledge
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platforms</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-0">
            {platforms.map((platform, index) => {
              const integration = getProviderIntegration(
                data.integrations,
                platform.provider
              )
              const status = getStatus(integration)
              const StatusIcon = status.icon
              const PlatformIcon = platform.icon
              const isConnected = integration?.status === "CONNECTED"
              const actionLabel = getActionLabel(integration)
              const isStarting =
                isStartingIntegration && startingProvider === platform.provider

              return (
                <div key={platform.provider}>
                  {index > 0 ? <Separator /> : null}
                  <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-background ring-1 ring-border/70">
                        <PlatformIcon className="text-2xl" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-heading text-sm font-medium">
                            {platform.name}
                          </h3>
                          <Badge variant={status.badgeVariant}>
                            <StatusIcon data-icon="inline-start" />
                            {status.label}
                          </Badge>
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {integration?.externalChannelId ??
                            platform.description}
                        </p>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant={isConnected ? "secondary" : "outline"}
                      disabled={isConnected || isStartingIntegration}
                      onClick={() =>
                        startIntegration({
                          botId: selectedBot.id,
                          provider: platform.provider,
                        })
                      }
                    >
                      {isStarting ? (
                        <Loader2Icon
                          data-icon="inline-start"
                          className="animate-spin"
                        />
                      ) : null}
                      {isStarting ? "Starting" : actionLabel}
                    </Button>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
