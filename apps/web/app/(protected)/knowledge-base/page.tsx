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
import { BookOpenIcon, LinkIcon, PlusIcon, ShieldCheckIcon } from "lucide-react"

const sections = [
  {
    id: "faqs",
    title: "FAQs",
    description: "Questions Kibo can answer instantly from approved responses.",
    icon: BookOpenIcon,
  },
  {
    id: "links",
    title: "Social links",
    description: "Discord, sponsor links, gear pages, and creator socials.",
    icon: LinkIcon,
  },
  {
    id: "rules",
    title: "Community rules",
    description: "The moderation baseline Kibo should respect before it acts.",
    icon: ShieldCheckIcon,
  },
]

export default function KnowledgeBasePage() {
  return (
    <>
      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Knowledge Base
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Give Kibo the approved facts, links, and boundaries it needs before it
          speaks for you.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.id} id={section.id}>
            <CardHeader>
              <section.icon className="text-primary" />
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-xs text-muted-foreground">0 items</span>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                <PlusIcon data-icon="inline-start" />
                Add {section.title.toLowerCase()}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Suggested first FAQ</CardTitle>
          <CardDescription>
            A tiny seed is enough to make the first stream demo useful.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <p className="text-sm font-medium">What microphone do you use?</p>
          <p className="text-sm text-muted-foreground">
            Add the exact answer once, then Kibo can reuse it whenever chat
            asks.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/bots">
              <BookOpenIcon data-icon="inline-start" />
              Pair with a bot
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
