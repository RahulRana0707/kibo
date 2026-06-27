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
import { BotIcon, PlusIcon, SparklesIcon } from "lucide-react"

export default function BotsPage() {
  return (
    <>
      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Bots
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Create the community manager your viewers will meet in chat.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>No bots yet</CardTitle>
          <CardDescription>
            Start with one Kibo bot for YouTube Live. Add personality and FAQs
            before connecting it to a stream.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-start gap-3">
          <div className="rounded-md bg-primary/10 p-2 text-primary">
            <BotIcon />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-medium">Recommended first bot</h2>
            <p className="text-xs text-muted-foreground">
              Friendly, concise, creator-approved answers with no autonomous
              moderation until you enable it.
            </p>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button>
            <PlusIcon data-icon="inline-start" />
            Create bot
          </Button>
          <Button variant="outline" asChild>
            <Link href="/knowledge-base">
              <SparklesIcon data-icon="inline-start" />
              Add knowledge first
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
