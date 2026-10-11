import type { Metadata } from "next"
import { CalendarIcon, ChartColumnIcon, UserIcon } from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@kibo/ui/components/empty"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { Panel } from "@kibo/ui/components/panel"
import { Heading } from "@kibo/ui/components/typography"
import {
  SetupChecklist,
  type SetupStep,
} from "@/components/molecules/setup-checklist"
import { getCurrentSession } from "@/lib/api/auth.server"

export const metadata: Metadata = { title: "Dashboard" }

const steps: SetupStep[] = [
  {
    title: "Create your bot",
    detail: "Name it and pick a personality",
    status: "current",
  },
  { title: "Add your first knowledge", detail: "A few FAQs your viewers ask" },
  { title: "Pick a reply mode", detail: "Approval, Auto or Silent" },
  {
    title: "Connect YouTube or Twitch",
    detail: "Your bot needs this to read and reply in chat",
  },
  {
    title: "Import more knowledge",
    detail: "Your channel About and video descriptions",
  },
  {
    title: "Test your bot in the playground",
    detail: "Ask questions as a viewer would",
  },
]

const cards = [
  {
    icon: <ChartColumnIcon />,
    title: "Your numbers start here",
    body: "After your first stream you’ll see questions answered, response rate and time saved.",
  },
  {
    icon: <CalendarIcon />,
    title: "No streams scheduled",
    body: "Add your next stream so your bot knows the title, game and sponsor.",
    action: "Schedule a stream",
  },
  {
    icon: <UserIcon />,
    title: "Streaming with mods?",
    body: "Invite them so they can approve replies and handle the review queue.",
    action: "Invite a moderator",
  },
]

export default async function DashboardPage() {
  const session = await getCurrentSession()
  const firstName = session?.user.name?.split(" ")[0]

  return (
    <>
      <div className="flex flex-col gap-1">
        <Heading as="h1">
          {firstName ? `Welcome, ${firstName}` : "Welcome"}
        </Heading>
        <p className="text-muted-foreground">
          Six steps and your bot can join your next stream. Setup opens soon.
        </p>
      </div>

      <SetupChecklist
        title="Get your bot ready"
        steps={steps.map((step) => ({ ...step, soon: true }))}
      />

      <AutoGrid min="300px">
        {cards.map((card) => (
          <Panel key={card.title}>
            <Empty className="p-0">
              <EmptyHeader>
                <EmptyMedia variant="icon">{card.icon}</EmptyMedia>
                <EmptyTitle>{card.title}</EmptyTitle>
                <EmptyDescription>{card.body}</EmptyDescription>
              </EmptyHeader>
              {card.action ? (
                <EmptyContent>
                  <Button variant="secondary" disabled>
                    {card.action}
                  </Button>
                  <span className="text-caption text-muted-foreground">
                    Coming soon
                  </span>
                </EmptyContent>
              ) : null}
            </Empty>
          </Panel>
        ))}
      </AutoGrid>
    </>
  )
}
