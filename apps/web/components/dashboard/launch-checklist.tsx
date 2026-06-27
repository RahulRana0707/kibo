import { Button } from "@kibo/ui/components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@kibo/ui/components/card"
import Link from "next/link"
import { BotIcon, CableIcon, CircleHelpIcon } from "lucide-react"

const checklist = [
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
]

export function LaunchChecklist() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Launch checklist</CardTitle>
        <CardDescription>
          The shortest path to a useful Kibo for your next stream.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {checklist.map((item) => (
          <div key={item.title} className="flex gap-3 rounded-md border bg-background p-3">
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
          <Link href="/bots/new">Create bot</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/integrations">Connect chat</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
