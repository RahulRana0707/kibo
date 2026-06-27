import { EmptyState } from "@/components/empty-state"

export default function IntegrationsPage() {
  return (
    <>
      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Integrations
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Connect the places where your community already talks.
        </p>
      </section>

      <EmptyState
        iconName="bot"
        title="No integrations connected yet"
        description="Start with YouTube Live or Twitch so Kibo can read live chat. Once the first connection is in place, the rest of the setup becomes much easier."
        primaryAction={{ label: "Connect YouTube", href: "/integrations#youtube" }}
      />
    </>
  )
}
