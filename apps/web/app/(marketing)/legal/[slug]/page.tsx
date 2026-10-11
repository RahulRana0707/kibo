import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Container } from "@/components/atoms/container"
import { Prose } from "@/components/atoms/prose"
import { Heading } from "@kibo/ui/components/typography"
import { Callout } from "@kibo/ui/components/callout"
import { TabLinks } from "@/components/molecules/tab-links"
import { TableOfContents } from "@/components/organisms/marketing/table-of-contents"
import { getHeadings, getLegalDocument, getLegalDocuments } from "@/lib/content"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const documents = await getLegalDocuments()
  return documents.map((document) => ({ slug: document.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const document = await getLegalDocument((await params).slug)
  return document ? { title: document.metadata.title } : {}
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params
  const document = await getLegalDocument(slug)

  if (!document) {
    notFound()
  }

  const { metadata, Content } = document
  const [documents, headings] = await Promise.all([
    getLegalDocuments(),
    getHeadings("legal", slug),
  ])

  return (
    <section className="pt-14 pb-24">
      <Container className="flex flex-col gap-8">
        <TabLinks
          label="Legal documents"
          items={documents.map((item) => ({
            href: `/legal/${item.slug}`,
            label: item.metadata.title,
            current: item.slug === slug,
          }))}
        />
        <header className="flex max-w-[760px] flex-col gap-3">
          <Heading as="h1">{metadata.title}</Heading>
          <p className="text-muted-foreground">
            Effective {metadata.effective} · Last updated {metadata.updated}
          </p>
          <Callout>
            <span className="font-medium">In plain words:</span>{" "}
            {metadata.plain}
          </Callout>
        </header>
        <div className="flex flex-wrap items-start gap-16">
          <TableOfContents
            title="Sections"
            headings={headings}
            className="flex-[0_1_240px]"
          />
          <Prose className="flex-[1_1_560px]">
            <Content />
          </Prose>
        </div>
      </Container>
    </section>
  )
}
