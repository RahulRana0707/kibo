import { EmptyState } from "@/components/empty-state"

export default function KnowledgeBasePage() {
  return (
    <>
      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Knowledge Base
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Give Kibo the approved facts, links, and boundaries it needs before it speaks for you.
        </p>
      </section>

      <EmptyState
        iconName="sparkles"
        title="No knowledge added yet"
        description="Start with a few FAQs, your socials, and the rules Kibo should respect. Once those are in place, the bot can answer with confidence."
        primaryAction={{ label: "Add FAQ", href: "/knowledge-base#faqs" }}
      />
    </>
  )
}
