import Link from "next/link"
import {
  MessageSquareIcon,
  ShieldIcon,
  UserIcon,
  VideoIcon,
} from "lucide-react"

import { Badge } from "@kibo/ui/components/badge"
import { buttonVariants } from "@kibo/ui/components/button"
import { Panel } from "@kibo/ui/components/panel"
import { Heading, Lede } from "@kibo/ui/components/typography"

import { IconTile } from "@/components/atoms/icon-tile"
import { PlatformIcon } from "@/components/atoms/platform-icon"
import { CheckList } from "@/components/molecules/check-list"
import { DetailList } from "@/components/molecules/detail-list"
import { ListRow } from "@/components/molecules/list-row"
import type { Integration } from "@/lib/marketing/integrations"

type Detailed = Integration & { detail: NonNullable<Integration["detail"]> }

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

function Block({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-title">{title}</h2>
      {children}
    </section>
  )
}

/** The logo, name, Available badge and one-line pitch. */
export function IntegrationHeader({ integration }: { integration: Detailed }) {
  return (
    <div className="flex flex-wrap items-start gap-6">
      {integration.platform ? (
        <PlatformIcon platform={integration.platform} size="xl" />
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <Heading as="h1">{integration.name}</Heading>
          <Badge variant="success">Available</Badge>
        </div>
        <Lede>{integration.detail.lede}</Lede>
      </div>
    </div>
  )
}

/** What Kibo does, the permissions it asks for, and how to set it up. */
export function IntegrationDetails({ integration }: { integration: Detailed }) {
  const { detail } = integration
  return (
    <>
      <Block title={`What Kibo does on ${integration.name}`}>
        <CheckList items={detail.does} />
      </Block>
      <Block title="Permissions, in plain words">
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
        <p className="text-caption text-muted-foreground">{detail.never}</p>
      </Block>
      <Block title="Set up in a minute">
        <ol className="flex list-decimal flex-col gap-3 ps-5">
          {detail.steps.map((step) => (
            <li key={step}>
              <Step text={step} />
            </li>
          ))}
        </ol>
      </Block>
    </>
  )
}

/** Connect, the facts, related integrations and the troubleshooting link. */
export function IntegrationAside({
  integration,
  related,
}: {
  integration: Detailed
  related: Integration[]
}) {
  return (
    <>
      <Panel>
        <Link href="/signup" className={buttonVariants()}>
          Connect {integration.name}
        </Link>
        <DetailList
          items={[
            { term: "Category", value: "Streaming platform" },
            { term: "Plans", value: "All plans" },
            { term: "Connect with", value: integration.detail.connectWith },
            { term: "Works with", value: integration.detail.worksWith },
          ]}
        />
      </Panel>
      <Panel className="gap-3">
        <p className="font-semibold">Related</p>
        {related.map((item) => (
          <Link
            key={item.slug}
            href={item.available ? `/integrations/${item.slug}` : "/integrations"}
            className="flex items-center gap-3 text-foreground no-underline hover:underline"
          >
            {item.platform ? <PlatformIcon platform={item.platform} /> : null}
            {item.name}
          </Link>
        ))}
      </Panel>
      <Link href="/help/connecting-platforms" className="text-body-sm text-link">
        Troubleshooting {integration.name} connections
      </Link>
    </>
  )
}
