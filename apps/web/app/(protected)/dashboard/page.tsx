import Link from "next/link"
import { Button } from "@kibo/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@kibo/ui/components/card"
import {
  BotIcon,
  CableIcon,
  CircleHelpIcon,
  MessageSquareTextIcon,
} from "lucide-react"

export default function Page() {
  return (
    <>
      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Set up Kibo once, then let it answer repeat questions and keep live
          chat moving while you focus on the stream.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Questions answered</CardTitle>
            <CardDescription>
              Waiting for your first connected chat.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-heading text-3xl font-semibold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active integrations</CardTitle>
            <CardDescription>
              YouTube and Twitch are ready to connect.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-heading text-3xl font-semibold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Knowledge items</CardTitle>
            <CardDescription>
              FAQs, links, rules, and creator context.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-heading text-3xl font-semibold">0</div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Launch checklist</CardTitle>
            <CardDescription>
              The shortest path to a useful Kibo for your next stream.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {[
              {
                icon: BotIcon,
                title: "Create your first bot",
                text: "Name it, choose a tone, and write the welcome message.",
              },
              {
                icon: CircleHelpIcon,
                title: "Add five common questions",
                text: "Start with gear, schedule, Discord, socials, and game info.",
              },
              {
                icon: CableIcon,
                title: "Connect a live chat",
                text: "YouTube Live is the first integration to prove the workflow.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-3 rounded-md border bg-background p-3"
              >
                <item.icon className="mt-0.5 text-primary" />
                <div className="flex flex-col gap-1">
                  <h2 className="text-sm font-medium">{item.title}</h2>
                  <p className="text-xs text-muted-foreground">{item.text}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="gap-2">
            <Button asChild>
              <Link href="/bots">
                <BotIcon data-icon="inline-start" />
                Create bot
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/integrations">
                <CableIcon data-icon="inline-start" />
                Connect chat
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What Kibo will answer first</CardTitle>
            <CardDescription>
              A starter queue based on the questions streamers repeat every day.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {[
              "What microphone do you use?",
              "Where is the Discord server?",
              "When is the next stream?",
              "What game is this?",
            ].map((question) => (
              <div
                key={question}
                className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2"
              >
                <MessageSquareTextIcon className="text-muted-foreground" />
                <span>{question}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  )
}
