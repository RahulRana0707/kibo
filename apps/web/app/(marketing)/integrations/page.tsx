import type { Metadata } from "next"

import { Container } from "@/components/atoms/container"
import { Eyebrow, Heading, Lede } from "@kibo/ui/components/typography"
import { IntegrationsDirectory } from "@/components/organisms/integrations-directory"

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Connect Kibo to streaming platforms, stream tools, knowledge sources and more.",
}

export default function IntegrationsPage() {
  return (
    <section className="pt-18 pb-24">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <Eyebrow>Integrations</Eyebrow>
          <Heading as="h1" size="hero" className="max-w-[18ch]">
            Connect Kibo to the tools you stream with
          </Heading>
          <Lede className="max-w-[56ch]">
            Streaming platforms, stream tools, knowledge sources and more. Every
            connection explains its permissions in plain words.
          </Lede>
        </div>
        <IntegrationsDirectory />
      </Container>
    </section>
  )
}
