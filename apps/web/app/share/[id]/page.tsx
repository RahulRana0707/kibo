import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import {
  SummaryChatChart,
  SummaryCreatorBar,
  SummaryHighlights,
  SummarySponsor,
  SummaryStats,
  SummaryTitle,
  SummaryTopQuestions,
} from "@/components/organisms/summary/shared-summary"
import { ShareTemplate } from "@/components/templates/share-template"
import { sampleSummary } from "@/lib/marketing/sample-summary"

type Props = { params: Promise<{ id: string }> }

const summaries = { sample: sampleSummary }

export function generateStaticParams() {
  return Object.keys(summaries).map((id) => ({ id }))
}

export const dynamicParams = false

export const metadata: Metadata = {
  title: "Stream summary",
  robots: { index: false },
}

export default async function SharedSummaryPage({ params }: Props) {
  const summary = summaries[(await params).id as keyof typeof summaries]

  if (!summary) {
    notFound()
  }

  return (
    <ShareTemplate
      bar={<SummaryCreatorBar summary={summary} />}
      header={<SummaryTitle summary={summary} />}
      main={<SummaryHighlights summary={summary} />}
      aside={
        <>
          <SummaryTopQuestions summary={summary} />
          <SummarySponsor summary={summary} />
        </>
      }
      footer={
        <>
          <span>
            Shared by {summary.creator.name}. Viewer names and moderation
            details are hidden.
          </span>
          <Link href="/" className="text-link">
            Get summaries like this with Kibo
          </Link>
        </>
      }
    >
      <SummaryStats summary={summary} />
      <SummaryChatChart summary={summary} />
    </ShareTemplate>
  )
}
