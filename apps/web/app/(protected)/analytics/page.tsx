import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@kibo/ui/components/card"
import { BarChart3Icon, ClockIcon, MessageSquareTextIcon } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <>
      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Analytics
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Once Kibo joins a live chat, this page will show the community work it
          took off your plate.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <MessageSquareTextIcon className="text-primary" />
            <CardTitle>Questions answered</CardTitle>
            <CardDescription>Approved replies sent by Kibo.</CardDescription>
          </CardHeader>
          <CardContent className="font-heading text-3xl font-semibold">
            0
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <ClockIcon className="text-primary" />
            <CardTitle>Time saved</CardTitle>
            <CardDescription>
              Estimated creator attention preserved.
            </CardDescription>
          </CardHeader>
          <CardContent className="font-heading text-3xl font-semibold">
            0m
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <BarChart3Icon className="text-primary" />
            <CardTitle>Most asked topic</CardTitle>
            <CardDescription>The next FAQ Kibo should learn.</CardDescription>
          </CardHeader>
          <CardContent className="font-heading text-3xl font-semibold">
            -
          </CardContent>
        </Card>
      </section>
    </>
  )
}
