import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Container } from "@/components/atoms/container"
import { MainAside } from "@/components/atoms/main-aside"
import { Breadcrumbs } from "@/components/molecules/breadcrumbs"
import {
  IntegrationAside,
  IntegrationDetails,
  IntegrationHeader,
} from "@/components/organisms/marketing/integration-detail"
import { getIntegration, integrations } from "@/lib/marketing/integrations"

type Props = { params: Promise<{ slug: string }> }

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

  const detailed = { ...integration, detail }

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
        <IntegrationHeader integration={detailed} />
        <MainAside
          mainClassName="gap-12"
          main={<IntegrationDetails integration={detailed} />}
          aside={<IntegrationAside integration={detailed} related={related} />}
        />
      </Container>
    </section>
  )
}
