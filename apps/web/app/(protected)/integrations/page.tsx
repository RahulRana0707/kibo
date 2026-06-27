import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@kibo/ui/components/card"
import { Button } from "@kibo/ui/components/button"
import { CableIcon, Disc3Icon, RadioTowerIcon, TvIcon } from "lucide-react"

const integrations = [
  {
    id: "youtube",
    title: "YouTube Live",
    description: "Read live chat and answer repeat viewer questions.",
    status: "Phase 1",
    icon: RadioTowerIcon,
  },
  {
    id: "twitch",
    title: "Twitch",
    description: "Bring the same Kibo behavior to Twitch chat.",
    status: "Next",
    icon: TvIcon,
  },
  {
    id: "discord",
    title: "Discord",
    description: "Reuse FAQs and rules for your community server.",
    status: "Later",
    icon: Disc3Icon,
  },
]

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

      <section className="grid gap-4 md:grid-cols-3">
        {integrations.map((integration) => (
          <Card key={integration.id} id={integration.id}>
            <CardHeader>
              <integration.icon className="text-primary" />
              <CardTitle>{integration.title}</CardTitle>
              <CardDescription>{integration.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-xs text-muted-foreground">
                {integration.status}
              </span>
            </CardContent>
            <CardFooter>
              <Button
                variant={integration.id === "youtube" ? "default" : "outline"}
              >
                <CableIcon data-icon="inline-start" />
                {integration.id === "youtube" ? "Connect" : "Notify me"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </>
  )
}
