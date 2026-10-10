import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  MessageSquareIcon,
  ShieldIcon,
  UserIcon,
  VideoIcon,
} from "lucide-react"

import { Badge } from "@kibo/ui/components/badge"
import { buttonVariants } from "@kibo/ui/components/button"

import { Container } from "@/components/atoms/container"
import { IconTile } from "@/components/atoms/icon-tile"
import { Panel } from "@kibo/ui/components/panel"
import { PlatformIcon } from "@/components/atoms/platform-icon"
import { Heading, Lede } from "@kibo/ui/components/typography"
import { Breadcrumbs } from "@/components/molecules/breadcrumbs"
import { CheckList } from "@/components/molecules/check-list"
import { DetailList } from "@/components/molecules/detail-list"
import { ListRow } from "@/components/molecules/list-row"
import { getIntegration, integrations } from "@/lib/marketing/integrations"

type Props = { params: Promise<{ slug: string }> }

const permissionIcons = {
  chat: <MessageSquareIcon />,
  shield: <ShieldIcon />,
  stream: <VideoIcon />,
  events: <UserIcon />,
}

/** Renders **bold** spans in a step. */
function Step({ text }: { text: string }) {
  return text.split("**").map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="font-medium">
        {part}
      </span>
    ) : (
      part
    )
  )
}

export function generateStaticParams() {
  return integrations
    .filter((item) => item.detail)
    .map((item) => ({ slug: item.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const integration = getIntegration((await params).slug)
  return integration
    ? {
        title: `${integration.name} integration`,
        description: integration.detail?.lede,
      }
    : {}
}

export default async function IntegrationPage({ params }: Props) {
  const integration = getIntegration((await params).slug)

  if (!integration?.detail || !integration.platform) {
    notFound()
  }

  const { detail } = integration
  const related = integrations
    .filter(
      (item) =>
        item.slug !== integration.slug &&
        item.platform &&
        ["youtube", "twitch", "elgato", "obs"].includes(item.slug)
    )
    .slice(0, 3)

  return (
    <section className="pt-14 pb-24">
      <Container className="flex flex-col gap-12">
        <Breadcrumbs
          items={[
            { label: "Integrations", href: "/integrations" },
            { label: "Streaming platforms" },
            { label: integration.name },
          ]}
        />
        <div className="flex flex-wrap items-start gap-6">
          <PlatformIcon platform={integration.platform} size="xl" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <Heading as="h1">{integration.name}</Heading>
              <Badge variant="success">Available</Badge>
            </div>
            <Lede>{detail.lede}</Lede>
          </div>
        </div>

        <div className="flex flex-wrap items-start gap-6">
          <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-12">
            <section className="flex flex-col gap-4">
              <h2 className="text-title">
                What Kibo does on {integration.name}
              </h2>
              <CheckList items={detail.does} />
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-title">Permissions, in plain words</h2>
              <Panel className="gap-0 p-0 max-sm:p-0">
                {detail.permissions.map((permission) => (
                  <ListRow
                    key={permission.title}
                    inset
                    align="start"
                    leading={
                      <IconTile tone="neutral" size="sm">
                        {permissionIcons[permission.icon]}
                      </IconTile>
                    }
                  >
                    <span className="flex flex-col gap-1">
                      <span className="font-medium">{permission.title}</span>
                      <span className="text-caption text-muted-foreground">
                        {permission.body}
                      </span>
                    </span>
                  </ListRow>
                ))}
              </Panel>
              <p className="text-caption text-muted-foreground">
                {detail.never}
              </p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-title">Set up in a minute</h2>
              <ol className="flex list-decimal flex-col gap-3 ps-5">
                {detail.steps.map((step) => (
                  <li key={step}>
                    <Step text={step} />
                  </li>
                ))}
              </ol>
            </section>
          </div>
          <aside className="flex min-w-0 flex-[1_1_320px] flex-col gap-6">
            <Panel>
              <Link href="/signup" className={buttonVariants()}>
                Connect {integration.name}
              </Link>
              <DetailList
                items={[
                  { term: "Category", value: "Streaming platform" },
                  { term: "Plans", value: "All plans" },
                  { term: "Connect with", value: detail.connectWith },
                  { term: "Works with", value: detail.worksWith },
                ]}
              />
            </Panel>
            <Panel className="gap-3">
              <p className="font-semibold">Related</p>
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={
                    item.available
                      ? `/integrations/${item.slug}`
                      : "/integrations"
                  }
                  className="flex items-center gap-3 text-foreground no-underline hover:underline"
                >
                  {item.platform ? (
                    <PlatformIcon platform={item.platform} />
                  ) : null}
                  {item.name}
                </Link>
              ))}
            </Panel>
            <Link
              href="/help/connecting-platforms"
              className="text-body-sm text-link"
            >
              Troubleshooting {integration.name} connections
            </Link>
          </aside>
        </div>
      </Container>
    </section>
  )
}
